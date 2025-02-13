const trav = require('traverse')
const reader = require('./read.js')
const levelOptions = require('./options.js')

module.exports = ops => {
  // TODO: set reset this to the max value every time the DB is restarted
  let incrementalId = 0

  // use trav lib to find all leaf nodes with corresponding paths
  const invertDoc = (obj, putOptions) => {
    // console.log(JSON.stringify(obj._object, null, 2))

    if (obj._object == null) {
      return {
        _id: obj._id,
        keys: []
      }
    }

    const keys = []
    trav(obj._object).forEach(function (node) {
      const fieldName = this.path
        // allowing numbers in path names create ambiguity with arrays
        // so just strip numbers from path names
        .filter(item => !Number.isInteger(+item))
        .join('.')
      if (fieldName !== '_id') {
        // Skip fields that are not to be indexed
        if (
          !putOptions.doNotIndexField.filter(item => fieldName.startsWith(item))
            .length
        ) {
          if (ops.isLeaf(this.node)) {
            // deal with stopwords
            if (!ops.stopwords.includes(this.node)) {
              const key = JSON.stringify([
                fieldName,
                [this.node].flat(Infinity)
              ])
              // bump to lower case if not case sensitive
              keys.push(ops.caseSensitive ? key : key.toLowerCase())
            }
            // calling .update is the only way to move on to the next node
            this.update(this.node, true)
          }
        }
      }
    })

    return {
      // _id: obj._id + '', // cast to string
      _id: obj._id,
      keys
    }
  }

  // TODO: merging indexes needs a proper test
  const createMergedReverseIndex = (index, _db, mode) => {
    // does a wb.get that simply returns "[]" rather than rejecting the
    // promise so that you can do Promise.all without breaking on keys
    // that dont exist in the db
    const gracefullGet = key =>
      new Promise((resolve, reject) =>
        _db
          .get(key, levelOptions)
          .then(resolve)
          .catch(e => resolve([]))
      )
    const indexKeys = Object.keys(index)

    return Promise.all(
      indexKeys.map(k => ['IDX', ...JSON.parse(k)]).map(gracefullGet)
    ).then(currentValues =>
      currentValues.map((cur, i) => {
        // set of current values in store
        const curSet = new Set(cur)
        // set of keys in delta index that is being merged in
        const deltaSet = new Set(index[indexKeys[i]])

        if (mode === 'put') {
          return {
            key: ['IDX', ...JSON.parse(indexKeys[i])],
            type: mode,
            value: [...new Set([...curSet, ...deltaSet])].sort() // union
          }
        } else if (mode === 'del') {
          // difference
          const newSet = [...new Set([...curSet].filter(x => !deltaSet.has(x)))]
          return {
            key: ['IDX', ...JSON.parse(indexKeys[i])],

            // if newSet is [] then simply remove the index entry
            // otherwise update
            type: newSet.length === 0 ? 'del' : 'put',
            value: newSet
          }
        }
        return cur // should never be called: appease standard
      })
    )
  }

  const objectIndex = (docs, mode) =>
    docs.map(doc => ({
      key: ['DOC', doc._id],
      type: mode,
      value: doc._object
    }))

  const reverseIndex = (acc, cur) => {
    cur.keys.forEach(key => {
      acc[key] = acc[key] || []
      acc[key].push(cur._id)
    })
    return acc
  }

  const createDeltaReverseIndex = (docs, putOptions) =>
    docs.map(doc => invertDoc(doc, putOptions)).reduce(reverseIndex, {})

  const sanitizeID = id => {
    if (id === undefined) return ++incrementalId
    if (typeof id === 'string') return id
    if (typeof id === 'number') return id
  }

  const availableFields = reverseIndex =>
    [...new Set(reverseIndex.map(item => item.key[1].split(':')[0]))].map(
      f => ({
        type: 'put',
        // key: '￮FIELD￮' + f + '￮',
        key: ['FIELD', f],
        value: f
      })
    )

  const writer = (docs, _db, mode, MODE, putOptions) =>
    new Promise(resolve => {
      // check for _id field, autogenerate if necessary
      // TODO: get this back at some point, maybe "sanitize ID" that
      // sanitize doc._ids
      docs = docs.map(doc => {
        doc._id = sanitizeID(doc._id)
        if (doc._object) {
          doc._object._id = doc._id
        }
        return doc
      })
      putOptions = Object.assign(ops, putOptions)

      reader(ops)
        .EXIST(...docs.map(d => d._id))
        .then(existingDocs =>
          createMergedReverseIndex(
            createDeltaReverseIndex(docs, putOptions),
            _db,
            mode
          ).then(mergedReverseIndex =>
            _db.batch(
              mergedReverseIndex
                .concat(putOptions.storeVectors ? objectIndex(docs, mode) : [])
                .concat(availableFields(mergedReverseIndex)),
              levelOptions,
              e =>
                resolve(
                  docs.map(doc => {
                    let status
                    if (mode === 'put') {
                      if (existingDocs.includes(doc._id)) {
                        status = 'UPDATED'
                      } else {
                        status = 'CREATED'
                      }
                    } else if (mode === 'del') {
                      if (doc._object === null) {
                        status = 'FAILED'
                      } else {
                        status = 'DELETED'
                      }
                    }
                    return {
                      _id: doc._id,
                      operation: MODE,
                      status
                    }
                  })
                )
            )
          )
        )
    })

  // docs needs to be an array of ids (strings)
  // first do an 'objects' call to get all of the documents to be
  // deleted
  const DELETE = _ids =>
    reader(ops)
      .OBJECT(_ids.map(_id => ({ _id })))
      .then(docs => writer(docs, ops._db, 'del', 'DELETE', {}))
      .then(TIMESTAMP_LAST_UPDATED)

  // when importing, index is first cleared. This means that "merges"
  // are not currently supported
  const IMPORT = index =>
    ops._db
      .clear()
      .then(() =>
        ops._db.batch(index.map(entry => Object.assign(entry, { type: 'put' })), levelOptions)
      )

  const PUT = (docs, putOptions = {}) =>
    writer(
      docs.map(doc => ({
        _id: doc._id,
        _object: doc
      })),
      ops._db,
      'put',
      'PUT',
      putOptions
    ).then(TIMESTAMP_LAST_UPDATED)

  const TIMESTAMP_LAST_UPDATED = passThrough =>
    ops._db.put(['~LAST_UPDATED'], Date.now(), levelOptions).then(() => passThrough)

  const TIMESTAMP_CREATED = () =>
    ops._db
      .get(['~CREATED'], levelOptions)
      .then(/* already created- do nothing */)
      .catch(e =>
        ops._db.put(['~CREATED'], Date.now(), levelOptions).then(TIMESTAMP_LAST_UPDATED)
      )

  return {
    DELETE,
    IMPORT,
    PUT,
    TIMESTAMP_CREATED,
    TIMESTAMP_LAST_UPDATED
  }
}
