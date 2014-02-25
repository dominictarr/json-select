var tape = require('tape')
var select = require('../select')
var parse = require('../parse')

var data = {
  type: 'Feature',
  properties: { NAME: 'Montclair', name: 'monty', Name: 'mclair'},
  geometree: { type: 'Polygon', coordinates: [ [ 1, 2, 3 ] ] }
}

var expected = [
  { name: 'Montclair', points: [ [ 1, 2, 3 ] ] },
]

tape('regex on keys', function (t) {
  var s = select(data, [{
    name: ['properties', function (o) { 
      for(var k in o)
        if(/^name$/i.test(k)) return o[k]
    }]
  }])
  t.deepEqual(s, {name: 'Montclair'})
  t.end()
})

//tape('regex parse', function (t) {
//  var pattern = '*.{name: properties./^name$/i, points: /^geo/i.coordinates}'
//  console.log(parse(pattern))
//  t.deepEqual(parse(pattern), 
//    [{
//      name: ['properties', /^name$/i],
//      points: [/^geo/i, 'coordinates']
//    }])
//  t.end()
//})
//
