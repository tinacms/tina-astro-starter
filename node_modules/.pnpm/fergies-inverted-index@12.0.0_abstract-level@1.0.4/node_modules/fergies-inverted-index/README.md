# Fergie's Inverted Index

![tests](https://github.com/fergiemcdowall/fergies-inverted-index/actions/workflows/tests.yml/badge.svg)

#### This is an inverted index library. There are many like it, but this one is Fergie's.

Throw JavaScript objects at the index and they will become retrievable by their properties using promises and map-reduce ([see examples](https://github.com/fergiemcdowall/fergies-inverted-index/tree/master/test/src))

This lib will work in node and also in the browser

## Getting started

### Initialise and populate an index

```javascript
import fii from 'fergies-inverted-index'

const db = fii()

db.PUT([ /* my array of objects to be searched */ ]).then(doStuff)

```

### Query the index

```javascript

// (given objects that contain: { land: <land>, colour: <colour>, population: <number> ... })

// get all object IDs where land=SCOTLAND and colour=GREEN
db.AND(|'land:SCOTLAND', 'colour:GREEN']).then(result)

// the query strings above can alternatively be expressed using JSON objects
db.AND([
  {
    FIELD: 'land'
    VALUE: 'SCOTLAND'
  }, {
    FIELD: 'colour',
    VALUE: 'GREEN'
  }
]).then(result)

// as above, but return whole objects
db.AND(['land:SCOTLAND', 'colour:GREEN']).then(db.OBJECT).then(result)

// Get all object IDs where land=SCOTLAND, and those where land=IRELAND
db.OR(['land:SCOTLAND', 'land:IRELAND']).then(result)

// queries can be embedded within each other
db.AND([
  'land:SCOTLAND',
  db.OR(['colour:GREEN', 'colour:BLUE'])
]).then(result)

// get all object IDs where land=SCOTLAND and colour is NOT GREEN
db.NOT(
  db.GET('land:SCOTLAND'),                 // everything in this set
  db.GET('colour:GREEN', 'colour:RED').    // minus everything in this set
).then(result)

// Get max population
db.MAX('population').then(result)

```

(See the [tests](https://github.com/fergiemcdowall/fergies-inverted-index/tree/master/test) for more examples.)


## API

- <a href="#open"><code><b>fii()</b></code></a>
- <a href="#AGGREGATION_FILTER"><code>db.<b>AGGREGATION_FILTER()</b></code></a>
- <a href="#AND"><code>db.<b>AND()</b></code></a>
- <a href="#BUCKETS"><code>db.<b>BUCKETS()</b></code></a>
- <a href="#CREATED"><code>db.<b>CREATED()</b></code></a>
- <a href="#DELETE"><code>db.<b>DELETE()</b></code></a>
- <a href="#DISTINCT"><code>db.<b>DISTINCT()</b></code></a>
- <a href="#EXIST"><code>db.<b>EXIST()</b></code></a>
- <a href="#EXPORT"><code>db.<b>EXPORT()</b></code></a>
- <a href="#FACET"><code>db.<b>FACET()</b></code></a>
- <a href="#FIELDS"><code>db.<b>FIELDS()</b></code></a>
- <a href="#GET"><code>db.<b>GET()</b></code></a>
- <a href="#IMPORT"><code>db.<b>IMPORT()</b></code></a>
- <a href="#LAST_UPDATED"><code>db.<b>LAST_UPDATED()</b></code></a>
- <a href="#MAX"><code>db.<b>MAX()</b></code></a>
- <a href="#MIN"><code>db.<b>MIN()</b></code></a>
- <a href="#NOT"><code>db.<b>NOT()</b></code></a>
- <a href="#OBJECT"><code>db.<b>OBJECT()</b></code></a>
- <a href="#OR"><code>db.<b>OR()</b></code></a>
- <a href="#PUT"><code>db.<b>PUT()</b></code></a>
- <a href="#SORT"><code>db.<b>SORT()</b></code></a>
- <a href="#STORE"><code>db.<b>STORE</b></code></a>
- <a href="#TIMESTAMP_LAST_UPDATED"><code>db.<b>TIMESTAMP_LAST_UPDATED</b></code></a>


<a name="fii"></a>

### `fii(options)`

Returns a promise

```javascript
import fii from 'fergies-inverted-index'

// creates a DB called "myDB" using levelDB (node.js), or indexedDB (browser)
const db = await fii({ name: 'myDB' })
```

In some cases you will want to start operating on the database
instentaneously. In these cases you can wait for the callback:

```javascript
import fii from 'fergies-inverted-index'

// creates a DB called "myDB" using levelDB (node.js), or indexedDB (browser)
fii({ name: 'myDB' }, (err, db) => {
  // db is guaranteed to be open and available
})
```


<a name="AGGREGATION_FILTER"></a>

### `db.AGGREGATION_FILTER(aggregation, query).then(result)`

The aggregation (either FACETS or BUCKETS) is filtered by the query

```javascript
Promise.all([
  FACETS({
    FIELD: ['drivetrain', 'model']
  }),
  AND(['colour:Black'])
])
  .then(([facetResult, queryResult]) =>
    db.AGGREGATION_FILTER(facetResult, queryResult)
  )
  .then(result)

```


<a name="AND"></a>

### `db.AND([ ...token ]).then(result)`

`db.AND` returns a set of object IDs that match every clause in the query.

For example- get the set of objects where the `land` property is set
to `scotland`, `year` is `1975` and `color` is `blue`
```javascript
db.AND([ 'land:scotland', 'year:1975', 'color:blue' ]).then(result)
```


<a name="BUCKETS"></a>

### `db.BUCKETS( ...token ).then(result)`

Every bucket returns all object ids for objects that contain the given token

```javascript
BUCKETS(
  {
    FIELD: ['year'],
    VALUE: {
      LTE: 2010
    }
  },
  {
    FIELD: ['year'],
    VALUE: {
      GTE: 2010
    }
  }
).then(result)
```


<a name="CREATED"></a>

### `db.CREATED().then(result)`

Returns the timestamp that indicates when the index was created

```javascript
db.CREATED().then(result)
```


<a name="DELETE"></a>

### `db.DELETE([ ...id ]).then(result)`

Delete all objects by id. The result indicated if the delete operation
was successful or not.

```javascript
db.DELETE([ 1, 2, 3 ]).then(result)
```

<a name="DISTINCT"></a>

### `db.DISTINCT(options).then(result)`

`db.DISTINCT` returns every value in the db that is greater than equal
to `GTE` and less than or equal to `LTE` (sorted alphabetically)

For example- get all names between `h` and `l`:

```javascript
db.DISTINCT({ GTE: 'h', LTE: 'l' }).then(result)
```

<a name="EXIST"></a>

### `db.EXIST( ...id ).then(result)`

Indicates whether the documents with the given ids exist in the index

```javascript
db.EXIST(1, 2, 3).then(result)
```


<a name="EXPORT"></a>

### `db.EXPORT().then(result)`

Exports the index to text file. See also IMPORT.

```javascript
db.EXPORT().then(result)
```


<a name="FACETS"></a>

### `db.FACETS( ...token ).then(result)`

Creates an aggregation for each value in the given range. FACETS
differs from BUCKETS in that FACETS creates an aggregation per value
whereas BUCKETS can create aggregations on ranges of values

```javascript
db.FACETS(
  {
    FIELD: 'colour'
  },
  {
    FIELD: 'drivetrain'
  }
).then(result)
```

<a name="FIELDS"></a>

### `db.FIELDS().then(result)`

`db.FIELDS` returns all available fields

```javascript
db.FIELDS().then(result) // 'result' is an array containing all available fields
```


<a name="GET"></a>

### `db.GET(token).then(result)`

`db.GET` returns all object ids for objects that contain the given
property, aggregated by object id.

For example to get all Teslas do:

```javascript
db.GET('Tesla').then(result)  // get all documents that contain Tesla, somewhere in their structure
```

Perhaps you want to be more specific and only return documents that contain `Tesla` in the `make` FIELD

```javascript
db.GET('make:Tesla').then(result)
```

which is equivalent to:

```javascript
db.GET({
  FIELD: 'make',
  VALUE: 'Tesla'
}).then(result)
```

You can get all cars that begin with `O` to `V` in which case you could do

```javascript
db.GET({
  FIELD: 'make',
  VALUE: {
    GTE: 'O',   // GTE == greater than or equal to
    LTE: 'V'    // LTE == less than or equal to
  }
}).then(result)
```

<a name="IMPORT"></a>

### `db.IMPORT(exportedIndex).then(result)`

Reads in an exported index and returns a status.

See also EXPORT.

```javascript
db.IMPORT(exportedIndex).then(result)
```


<a name="LAST_UPDATED"></a>

### `db.LAST_UPDATED().then(result)`

Returns a timestamp indicating when the index was last updated.

```javascript
db.LAST_UPDATED().then(result)
```


<a name="MAX"></a>

### `db.MAX(token).then(result)`

Get the highest alphabetical value in a given token

For example- see the highest price:

```javascript
db.MAX('price')
```


<a name="MIN"></a>

### `db.MIN(token).then(result)`

Get the lowest alphabetical value in a given token

For example- see the lowest price:

```javascript
db.MIN('price')
```


<a name="NOT"></a>

### `db.NOT(A, B).then(result)`

Where A and B are sets, `db.NOT` Returns the ids of objects that are
present in A, but not in B.

For example:

```javascript
db.NOT(
  global[indexName].GET({
    FIELD: 'sectorcode',
    VALUE: {
      GTE: 'A',
      LTE: 'G'
    }
  }),
  'sectorcode:YZ'
)

```


<a name="OBJECT"></a>

### `db.OBJECT([ ...id ]).then(result)`

Given an array of ids, `db.OBJECT` will return the corresponding
objects.

```javascript
db.AND([
  'board_approval_month:October',
  global[indexName].OR([
    'sectorcode:LR',
    global[indexName].AND(['sectorcode:BC', 'sectorcode:BM'])
  ])
])
  .then(db.OBJECT)
  .then(result)
```


<a name="OR"></a>

### `db.OR([ ...tokens ]).then(result)`

Return ids of objects that are in one or more of the query clauses

For example- get the set of objects where the `land` property is set
to `scotland`, or `year` is `1975` or `color` is `blue`
```javascript
db.AND([ 'land:scotland', 'year:1975', 'color:blue' ]).then(result)
```


<a name="PUT"></a>

### `db.PUT([ ...documents ]).then(result)`

Add documents to index

For example:

```javascript
db.PUT([
  {
    _id: 8,
    make: 'BMW',
    colour: 'Silver',
    year: 2015,
    price: 81177,
    model: '3-series',
    drivetrain: 'Petrol'
  },
  {
    _id: 9,
    make: 'Volvo',
    colour: 'White',
    year: 2004,
    price: 3751,
    model: 'XC90',
    drivetrain: 'Hybrid'
  }
]).then(result)
```


<a name="SORT"></a>

### `db.SORT(resultSet).then(result)`

Example:

```javascript
db.GET('blue').then(db.SORT)
```

<a name="STORE"></a>

### `db.STORE`

Property that points to the underlying [level](https://github.com/Level/level) store


test
