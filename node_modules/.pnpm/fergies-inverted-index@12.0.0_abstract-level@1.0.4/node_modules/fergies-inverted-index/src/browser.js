const fii = require('./main.js')
const { BrowserLevel } = require('browser-level')

module.exports = ({ name = 'fii', ...ops }) => fii({
  db: new BrowserLevel(name),
  ...ops
})
