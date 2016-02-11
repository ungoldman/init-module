var test = require('tape')
var exec = require('child_process').exec
var correctPath = require.resolve('../init-module.js')

test('cli: path option', function (t) {
  exec('./bin/cli.js --path', function (err, stdout, stderr) {
    t.error(err, 'no error')
    t.error(stderr, 'no stderr')
    t.equals(stdout.replace('\n',''), correctPath, 'returned correct path')
    t.end()
  })
})
