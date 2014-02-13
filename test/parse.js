
//parse the terse syntax

var tape = require('tape')
var parse = require('../parse')

tape('simple', function (t) {

  var pattern = 'versions.*.{version, optimist: dependencies.optimist}'
  console.log(parse(pattern))
  t.deepEqual(parse(pattern), 
    ['versions', true, {
      version: true,
      optimist: ['dependencies', 'optimist']
    }])

  t.end()
})
