module.exports = parse

function parse (pattern) {
  var tokens = pattern.split(/(\/(?:(?:\\\/|[^\/]))+\/\w*|[{},.:])/)
    .filter(Boolean)

  function object () {
    var obj = {}, token

    tokens.shift()
    do {
      //should be a name
      token = tokens.shift().trim()

      if(token === ',') continue
      if(/,|}/.test(token)) throw new Error('unexpected '+token)

      var key = token
      //should be a separator
      token = tokens.shift().trim()

      if(/[,}]/.test(token)) obj[key] = true
      else if(':' === token) obj[key] = more()
      
      if(tokens[0] === '}')  return obj

    } while (tokens.length && token !== '}')
    return obj
  }

  function more () {
    var path = [], m
    while(tokens.length) {
      var token = tokens[0].trim()
      switch(token) {
        case '.': break;
        case '*': path.push(true); break;
        case '{': path.push(object()); break;
        case '}': return path; break;
        case ',': return path; break;
        case '': break;
        default :
          if (m = /^\/(.+)\/(\w*)$/.exec(token)) {
            path.push(new RegExp(m[1], m[2]))
          }
          else {
            path.push(token)
          }
          break;
      }
      tokens.shift()
    }
    return path
  }
  return more()
}


if(!module.parent) {
  var pattern = 'versions.*.{version, dependencies: optimist}'
  console.log(parse(pattern))
}

