const fii = require('./main.js')
const { MemoryLevel } = require('memory-level')

module.exports = ({ name = 'fii', ...ops }) => fii({
  db: new MemoryLevel(),
  ...ops
})
