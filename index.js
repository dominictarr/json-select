
module.exports = match

function isString (s) {
  return 'string' === typeof s
}

function isObject (o) {
  return o && 'object' === typeof o
}

var isArray = Array.isArray

function match (obj, path, opts) {
  opts = opts || {}
  if(!path.length) return obj
  function create (o) {
    return isArray(o) ? [] : {}
  }
  var rest = path.slice()
  var head = rest.shift()
  if(isString(head))
    return match(obj[head], rest, opts)
  else if(true === head) {
    var a = opts.arrays ? [] : create(obj)
    for(var key in obj) {
      var v = match(obj[key], rest, opts)
      if(v !== undefined)
        a[key] = v
    }
    return a
  }
  else if('object' === typeof head) {
    var o = create(head)
    for(var key in head) {
      //if key: string -> o[key] = obj[head[key]]
      var _path = head[key]
      if(true === _path)  _path = key
      if(isString(_path)) o[key] = obj[_path]
      if(isArray(_path))  o[key] = match(obj, _path, opts)
    }
    return o
  }
}
