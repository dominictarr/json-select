#! /usr/bin/env node

//select on a text stream.

var JSONStream = require('JSONStream')
var select = require('./select')
var parse = require('./parse')

function isObject(o) {
  return o && 'object' === typeof o
}

function isSpecial(o, a) {
  if(!isObject(o)) return false
  var keys = Object.keys(o)
  return keys.length === 1 && o[keys[0]] === a[keys[0]]
}

function isString (s) {
  return 'string' === typeof s
}

module.exports = function (path, opts) {
  if(isString(path)) path = parse(path)
  var post = path.slice()
  var pre = []
  while(post[0] && (!isObject(post[0]) || isSpecial(post[0], {recurse: true})))
    pre.push(post.shift())

  return JSONStream.parse(pre, function (obj) {
    return select(obj, post, opts)
  })
}

if(!module.parent) {
  var path = [true], opts = {}
  process.argv.slice(2).forEach(function (e) {
    if(/^-+(a|arrays)$/.test(e))
      opts.arrays = true
    else if(/^-+(l|lines)$/.test(e))
      opts.lines = true
    else
      try { path = JSON.parse(e) }
      catch (err) { path = parse(e) }
    //TODO: make a nice syntax that allows you give a terser pattern.
  })

  process.stdin
    .pipe(module.exports(path, opts))    
    .pipe(opts.lines
      ? JSONStream.stringify('', '\n', '\n', 0)
      : JSONStream.stringify('[\n', ',\n', ']\n', 2)
    )
    .pipe(process.stdout)
}
