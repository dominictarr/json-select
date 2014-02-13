var tape = require('tape')
var select = require('../')

var path = [
      'rows', 
      true, 
      {
        thing: 'whatever',
        other: ['more', true, {a: true, c: ['C', true]}] 
      }
    ]


var obj = {rows: [
  {
    whatever: 1,
    more: [
      {a: 1, C: [9,8,7]},
      {a: 2, b:'B'},
      {b:'BB'},
      {a: 3}
    ]
  },
  {
    whatever: 10,
    more: [
      {a: 10},
      {a: 20, b:'B'},
      {b:'BB'},
      {a: 30, C: [9,8,7]}
    ]
  },
  {
    whatever: 100,
    more: [
      {a: 100},
      {a: 200, b:'B'},
      {b:'BB', C: [9,8,7]},
      {a: 300}
    ]
  },

]}

var expected = [
  {
    "thing": 1,
    "other": [
      {
        "a": 1,
        "c": [
          9,
          8,
          7
        ]
      },
      {
        "a": 2,
        "c": []
      },
      {
        "c": []
      },
      {
        "a": 3,
        "c": []
      }
    ]
  },
  {
    "thing": 10,
    "other": [
      {
        "a": 10,
        "c": []
      },
      {
        "a": 20,
        "c": []
      },
      {
        "c": []
      },
      {
        "a": 30,
        "c": [
          9,
          8,
          7
        ]
      }
    ]
  },
  {
    "thing": 100,
    "other": [
      {
        "a": 100,
        "c": []
      },
      {
        "a": 200,
        "c": []
      },
      {
        "c": [
          9,
          8,
          7
        ]
      },
      {
        "a": 300,
        "c": []
      }
    ]
  }
]


tape('produce the correct output', function (t) {
  console.error(
    JSON.stringify(select(obj, path, {arrays: true}),null, 2)
  )
  t.equal(
    JSON.stringify(select(obj, path, {arrays: true})),
    JSON.stringify(expected)
  )
  t.end()
})
