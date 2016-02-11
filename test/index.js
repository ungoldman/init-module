var test = require('tape')
var initModule = require.resolve('../')

test('Example Test', function (t) {
  t.plan(1)
  console.log(initModule)
  t.error('No tests defined.')
})
