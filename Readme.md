
# co-execFile

  Node core `execFile()` wrapped to return a thunk for [co](https://github.com/visionmedia/co).

## Installation

```
$ npm install co-execFile
```

## Example

  Do some stuff with git:

```js
var co = require('co');
var exec = require('co-exec');

co(function *(){
  var result = yield execFile('~/myscript.sh');
  console.log('the result of myscript is %s', result);
});
```

## License

  MIT
