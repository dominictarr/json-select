
module.exports = match

function isString (s) {
  return 'string' === typeof s
}

function isObject (o) {
  return o && 'object' === typeof o
}

function isNullish (o) {
  return null == o
}

function isFunction (f) {
  return 'function' === typeof f
}

var isArray = Array.isArray

function match (obj, path, opts) {
  opts = opts || {}
  if(!path.length) return obj
  if(isNullish(obj)) return null

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
        isArray(a) ? a.push(v) : a[key] = v
    }
    return a
  }
  else if('object' === typeof head) {
    var o = create(head)
    for(var key in head) {
      //if key: string -> o[key] = obj[head[key]]
      var _path = head[key]
      if(true === _path) _path = key

      if(isString(_path)) o[key] = obj[_path]
      else
      if(isArray(_path))  o[key] = match(obj, _path, opts)
      else
      if(isObject(_path)) o[key] = match(obj, [_path], opts)
      else
      if(isFunction(_path)) o[key] = _path(obj)

    }
    return o
  }
}

