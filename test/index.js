'use strict';

var fs = require('fs');
var co = require('co');
var execFile = require('..');
require('should');

describe('exec(cmd)', function(){
  before(function(done) {
    fs.writeFile('hello.sh', 'echo hello', {mode: '0700'}, done);
  });
  after(function(done) {
    fs.unlink('hello.sh', done);
  });
  it('should return stdout', function(done){
    co(function *(){
      var ret = yield execFile('./hello.sh');
      ret.should.equal('hello\n');
    })(done);
  });

  it('should throw on error', function(done){
    co(function *(){
      yield execFile('does_not_exist');
    })(function(err) {
      err.should.have.properties('stderr', 'stdout');
      err.message.should.containEql('does_not_exist');
      done();
    });
  });
});

describe('exec(cmd, opts)', function(){
  before(function(done) {
    fs.writeFile('hello.sh', 'echo hello', {mode: '0700'}, done);
  });
  after(function(done) {
    fs.unlink('hello.sh', done);
  });
  it('should set options', function(done){
    co(function *(){
      var ret = yield execFile('./hello.sh', { encoding: 'base64' });
      new Buffer(ret, 'base64').toString().should.equal('hello\n');
    })(done);
  });
});
