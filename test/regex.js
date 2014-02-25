var tape = require('tape')
var select = require('../')
var parse = require('../parse')

var data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { NAME: 'Montclair' },
      geometree: { type: 'Polygon', coordinates: [ [ 1, 2, 3 ] ] }
    },
    {
      type: 'Feature',
      properties: { Name: 'Fruitvale' },
      GeoMetry: { type: 'Polygon', coordinates: [ [ 4, 5, 6 ] ] }
    },
    {
      type: 'Feature',
      properties: { name: 'Lakeshore' },
      geom: { type: 'Polygon', coordinates: [ [ 7, 8, 9 ] ] }
    }
  ]
}

var expected = [
  { name: 'Montclair', points: [ [ 1, 2, 3 ] ] },
  { name: 'Fruitvale', points: [ [ 4, 5, 6 ] ] },
  { name: 'Lakeshore', points: [ [ 7, 8, 9 ] ] }
]

tape('regex on keys', function (t) {
  t.plan(1)
  var s = select(['features', true, {
    name: ['properties', /^name$/i],
    points: [/^geo/i, 'coordinates']
  }])
  var rows = []
  s.on('data', function (row) { rows.push(row) })
  s.on('end', function () {
    t.deepEqual(rows, expected)
  })
  s.end(JSON.stringify(data))
})

tape('regex parse', function (t) {
  var pattern = 'features.*.{name: properties./^name$/i, points: /^geo/i.coordinates}'
  console.log(parse(pattern))
  t.deepEqual(parse(pattern), 
    ['features', true, {
      name: ['properties', /^name$/i],
      points: [/^geo/i, 'coordinates']
    }])
  t.end()
})
