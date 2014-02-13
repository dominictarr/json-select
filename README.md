# json-select

filter out a portion of a (very large) json file.

## Example

pipe a text stream of json into json-select, and pull out just 3 keys per row.

``` js
var request = require('request')
var JSONSelect = require('json-select')

request('https://npmjs.org/browserify')
  .pipe(JSONSelect(
    ['versions', true, {name: true, version: true, dependencies:true}]
  ))
  .pipe(process.stdout)
```

## cli tool

to do the same as above, but from bash:

``` js
npm install json-select
curl https://npmjs.org/browserify | json-select 'versions.*.{name, version, dependencies}'
```
the selector can be either valid json, or the terse syntax as in this example.

## use on a js object

``` js
var select = require('json-select/select')

select(
//the object to select from
{
  hello: [
    {foo: 1, bar: 2, baz: {whatever: true}},
    {foo: 3, bar: 13, baz: {whatever: false}},
    {foo: 70, bar: 77, baz: {whatever: null}}
  ]
},

['hello', true, {foo: true, BAR: 'bar', z: ['whatever']}])

//outputs ==>

[
  {foo: 1, BAR: 2, z: true},
  {foo: 3, BAR: 13, z: false},
  {foo: 70, BAR: 77, z: null}
]

```

## Selector Syntax

The selector syntax is based on `JSONStream`,
except you can provide an object which collects values the object.
the object can be a `{}` object or an array.
each value can be a string, a boolean or an array.

### key: (string) name

allows you to map to a different named key.
set `{key: data[name]}`

### key: true

short hand for `{key: key}`

set `{[name]: data[name]}`

### key: [path...]

extract the value from the given path,
this can contain selectors.

## Usage

json-select can also be used as a command, if you `npm install json-select -g`

```
json-select [selector] --arrays? < json_source
  # path is a json array indicating the selector into the json file.
  # if --arrays is passed, any unmatched groups will default to arrays.
```

## License

MIT
