const { encode } = require('.')

const encoder = encode()
encoder.on('data', function (data) {
  process.stdout.write(data.toString('hex'))
})

encoder.write('hey')
encoder.end('hello world')
