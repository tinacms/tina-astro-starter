(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("abstract-level"), require("module-error"), require("better-sqlite3")) : typeof define === "function" && define.amd ? define(["exports", "abstract-level", "module-error", "better-sqlite3"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["sqlite-level"] = {}, global.NOOP, global.NOOP, global.NOOP));
})(this, function(exports2, abstractLevel, ModuleError, Database) {
  "use strict";
  const queryFromOptions = (options) => {
    let query = "SELECT key, value FROM kv";
    const params = [];
    if (options.gt) {
      query += ` WHERE key > ?`;
      params.push(options.gt);
    } else if (options.gte) {
      query += ` WHERE key >= ?`;
      params.push(options.gte);
    }
    if (options.lt) {
      query += ` ${options.gt || options.gte ? "AND" : "WHERE"} key < ?`;
      params.push(options.lt);
    } else if (options.lte) {
      query += ` ${options.gt || options.gte ? "AND" : "WHERE"} key <= ?`;
      params.push(options.lte);
    }
    if (options.reverse) {
      query += " ORDER BY key DESC";
    } else {
      query += " ORDER BY key ASC";
    }
    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }
    return { query, params };
  };
  class SqliteIterator extends abstractLevel.AbstractIterator {
    constructor(db, options, client) {
      super(db, options);
      this.client = client;
      const { query, params } = queryFromOptions(options);
      const stmt = this.client.prepare(query);
      this.iterator = stmt.iterate(params);
    }
    async _next(callback) {
      const result = this.iterator.next();
      if (!result.done) {
        return this.db.nextTick(callback, null, result.value.key, result.value.value);
      } else {
        return this.db.nextTick(callback, null, void 0, void 0);
      }
    }
  }
  class SqliteKeyIterator extends abstractLevel.AbstractKeyIterator {
    constructor(db, options, client) {
      super(db, options);
      this.client = client;
      const { query, params } = queryFromOptions(options);
      const stmt = this.client.prepare(query);
      this.iterator = stmt.iterate(params);
    }
    async _next(callback) {
      const result = this.iterator.next();
      if (!result.done) {
        return this.db.nextTick(callback, null, result.value.key);
      } else {
        return this.db.nextTick(callback, null, void 0);
      }
    }
  }
  class SqliteValueIterator extends abstractLevel.AbstractValueIterator {
    constructor(db, options, client) {
      super(db, options);
      this.client = client;
      const { query, params } = queryFromOptions(options);
      const stmt = this.client.prepare(query);
      this.iterator = stmt.iterate(params);
    }
    async _next(callback) {
      const result = this.iterator.next();
      if (!result.done) {
        return this.db.nextTick(callback, null, result.value.value);
      } else {
        return this.db.nextTick(callback, null, void 0);
      }
    }
  }
  class SqliteLevel extends abstractLevel.AbstractLevel {
    constructor(options) {
      const encodings = { utf8: true };
      super({ encodings }, options);
      this.readOnly = false;
      this.db = new Database(options.filename);
      this.db.pragma("journal_mode = WAL");
      if (options.readOnly !== void 0) {
        this.readOnly = options.readOnly;
      }
    }
    get type() {
      return "sqlite3";
    }
    async _open(options, callback) {
      this.db.exec("CREATE TABLE IF NOT EXISTS kv (key TEXT, value TEXT)");
      this.nextTick(callback);
    }
    async _close(callback) {
      this.db.close();
      this.nextTick(callback);
    }
    async _get(key, options, callback) {
      const stmt = this.db.prepare("SELECT value FROM kv WHERE key = ?");
      const row = stmt.get(key.toString());
      if (row) {
        return this.nextTick(callback, null, row.value);
      } else {
        return this.nextTick(
          callback,
          new ModuleError(`Key ${key} was not found`, {
            code: "LEVEL_NOT_FOUND"
          })
        );
      }
    }
    async _put(key, value, options, callback) {
      if (this.readOnly) {
        return this.nextTick(
          callback,
          new ModuleError("not authorized to write to branch", {
            code: "LEVEL_READ_ONLY"
          })
        );
      }
      const stmt = this.db.prepare("INSERT INTO kv (key, value) VALUES (?, ?)");
      stmt.run(key.toString(), value.toString());
      this.nextTick(callback);
    }
    async _del(key, options, callback) {
      if (this.readOnly) {
        return this.nextTick(
          callback,
          new ModuleError("not authorized to write to branch", {
            code: "LEVEL_READ_ONLY"
          })
        );
      }
      const stmt = this.db.prepare("DELETE FROM kv WHERE key = ?");
      stmt.run(key.toString());
      this.nextTick(callback);
    }
    async _batch(batch, options, callback) {
      if (this.readOnly) {
        return this.nextTick(
          callback,
          new ModuleError("not authorized to write to branch", {
            code: "LEVEL_READ_ONLY"
          })
        );
      }
      let batches = [];
      let curBatch = [];
      let curType = void 0;
      for (const op of batch) {
        if (curType === void 0) {
          curType = op.type;
        } else if (curType !== op.type) {
          if (curType === "put") {
            batches.push(`INSERT INTO kv (key, value) VALUES ${curBatch.join(",")}`);
          } else if (curType === "del") {
            batches.push(`DELETE FROM kv WHERE key IN (${curBatch.join(",")})`);
          }
          curBatch = [];
          curType = op.type;
        }
        if (op.type === "put") {
          curBatch.push(`('${op.key.toString()}', '${op.value.toString()}')`);
        } else if (op.type === "del") {
          curBatch.push(`'${op.key.toString()}'`);
        }
      }
      if (curBatch.length > 0) {
        if (curType === "put") {
          batches.push(`INSERT INTO kv (key, value) VALUES ${curBatch.join(",")}`);
        } else if (curType === "del") {
          batches.push(`DELETE FROM kv WHERE key IN (${curBatch.join(",")})`);
        }
      }
      for (const batch2 of batches) {
        this.db.exec(batch2);
      }
      this.nextTick(callback);
    }
    async _clear(options, callback) {
      this.db.exec(`DELETE FROM kv WHERE key like '${options.gte}%'`);
      this.nextTick(callback);
    }
    _iterator(options) {
      return new SqliteIterator(
        this,
        options,
        this.db
      );
    }
    _keys(options) {
      return new SqliteKeyIterator(this, options, this.db);
    }
    _values(options) {
      return new SqliteValueIterator(this, options, this.db);
    }
  }
  exports2.SqliteLevel = SqliteLevel;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
