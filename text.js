#! /usr/bin/env node

//select on a text stream.

var JSONStream = require('JSONStream')
var select = require('./')

function isObject(o) {
  return o && 'object' === typeof o
}

module.exports = function (path, opts) {
  var post = path.slice()
  var pre = []
  while(post[0] && !isObject(post[0]))
    pre.push(post.shift())
  console.log(pre, post)
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
