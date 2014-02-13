#! /usr/bin/env node

//select on a text stream.

var JSONStream = require('JSONStream')
var select = require('./')

function isObject(o) {
  return o && 'object' === typeof o
}

function isSpecial(o, a) {
  if(!isObject(o)) return false
  var keys = Object.keys(o)
  return keys.length === 1 && o[keys[0]] === a[keys[0]]
}

module.exports = function (path, opts) {
  var post = path.slice()
  var pre = []
  while(post[0] && (!isObject(post[0]) || isSpecial(post[0], {recurse: true}))
    pre.push(post.shift())

  return JSONStream.parse(pre, function (obj) {
    return select(obj, post, opts)
  })
}

if(!module.parent) {
  var path = [true], opts = {}
  process.argv.slice(2).forEach(function (e) {
    console.log(e)
    if(/^-+(a|arrays)$/.test(e))
      opts.arrays = true
    else
      path = JSON.parse(e)
      //TODO: make a nice syntax that allows you give a terser pattern.
  })

  console.log(path)

  process.stdin
    .pipe(module.exports(path, opts))    
    .pipe(JSONStream.stringify('[\n', ',\n', ']', 2))
    .pipe(process.stdout)
}
