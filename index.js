'use strict';

/**
 * Module dependencies.
 */

var execFile = require('child_process').execFile;

/**
 * Execute `cmd`.
 */

module.exports = function(cmd, opts){
  return function(done){
    execFile(cmd, opts, function(err, stdout, stderr){
      if(err) {
        err.stdout = stdout;
        err.stderr = stderr;
      }
      done(err, stdout);
    });
  };
};
