var beautify = require('../');
var expect = require('chai').expect;
var gutil = require('gulp-util');
var path = require('path');
var sinon = require('sinon');

function newVinyl(filename, contents) {
  var base = path.join(__dirname, 'fixtures');
  var filePath = path.join(base, filename);

  return new gutil.File({
    cwd: __dirname,
    base: base,
    path: filePath,
    contents: contents
  });
}

describe('prettify.reporter()', function () {
  beforeEach(function () {
    sinon.spy(console, 'log');
  });

  afterEach(function () {
    console.log.restore();
  });

  it('should not report anything if prettify() has not been called', function (done) {
    var stream = beautify.reporter();
    var vinylFile = newVinyl('file.js', new Buffer(''));

    stream.on('error', done);
    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.be.undefined;
      expect(console.log.called).to.be.false;
      done();
    });
    stream.write(vinylFile);
  });

  it('should report which files have been beautified with log verbosity set to ALL.', function (done) {
    var stream = beautify.reporter({
      verbosity: beautify.report.ALL
    });
    var vinylFile = newVinyl('file.js', new Buffer(''));
    vinylFile.jsbeautify = {};
    vinylFile.jsbeautify.type = 'js';
    vinylFile.jsbeautify.beautified = true;
    vinylFile.jsbeautify.canBeautify = false;

    stream.on('error', done);
    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.exist;
      expect(newFile.jsbeautify.type).to.exist;
      expect(newFile.jsbeautify.type).to.equal('js');
      expect(newFile.jsbeautify.beautified).to.exist;
      expect(newFile.jsbeautify.beautified).to.be.true;
      expect(newFile.jsbeautify.canBeautify).to.exist;
      expect(newFile.jsbeautify.canBeautify).to.be.false;
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWithExactly('Beautified ' + gutil.colors.cyan('file.js') + ' [js]')).to.be.true;
      done();
    });
    stream.write(vinylFile);
  });

  it('should report which files have been beautified without specify log verbosity', function (done) {
    var stream = beautify.reporter();
    var vinylFile = newVinyl('file.js', new Buffer(''));
    vinylFile.jsbeautify = {};
    vinylFile.jsbeautify.type = 'js';
    vinylFile.jsbeautify.beautified = true;
    vinylFile.jsbeautify.canBeautify = false;

    stream.on('error', done);
    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.exist;
      expect(newFile.jsbeautify.type).to.exist;
      expect(newFile.jsbeautify.type).to.equal('js');
      expect(newFile.jsbeautify.beautified).to.exist;
      expect(newFile.jsbeautify.beautified).to.be.true;
      expect(newFile.jsbeautify.canBeautify).to.exist;
      expect(newFile.jsbeautify.canBeautify).to.be.false;
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWithExactly('Beautified ' + gutil.colors.cyan('file.js') + ' [js]')).to.be.true;
      done();
    });
    stream.write(vinylFile);
  });

  it('should report which files are already beautified with log verbosity set to ALL', function (done) {
    var stream = beautify.reporter({
      verbosity: beautify.report.ALL
    });
    var vinylFile = newVinyl('file.js', new Buffer(''));
    vinylFile.jsbeautify = {};
    vinylFile.jsbeautify.type = 'js';
    vinylFile.jsbeautify.beautified = false;
    vinylFile.jsbeautify.canBeautify = false;

    stream.on('error', done);
    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.exist;
      expect(newFile.jsbeautify.type).to.exist;
      expect(newFile.jsbeautify.type).to.equal('js');
      expect(newFile.jsbeautify.beautified).to.exist;
      expect(newFile.jsbeautify.beautified).to.be.false;
      expect(newFile.jsbeautify.canBeautify).to.exist;
      expect(newFile.jsbeautify.canBeautify).to.be.false;
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWithExactly('Already beautified ' + gutil.colors.cyan('file.js') + ' [js]')).to.be.true;
      done();
    });
    stream.write(vinylFile);
  });

  it('should not report which files are already beautified without specify log verbosity', function (done) {
    var stream = beautify.reporter();
    var vinylFile = newVinyl('file.js', new Buffer(''));
    vinylFile.jsbeautify = {};
    vinylFile.jsbeautify.type = 'js';
    vinylFile.jsbeautify.beautified = false;
    vinylFile.jsbeautify.canBeautify = false;

    stream.on('error', done);
    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.exist;
      expect(newFile.jsbeautify.type).to.exist;
      expect(newFile.jsbeautify.type).to.equal('js');
      expect(newFile.jsbeautify.beautified).to.exist;
      expect(newFile.jsbeautify.beautified).to.be.false;
      expect(newFile.jsbeautify.canBeautify).to.exist;
      expect(newFile.jsbeautify.canBeautify).to.be.false;
      expect(console.log.calledOnce).to.be.false;
      done();
    });
    stream.write(vinylFile);
  });

  it('should report which files can be beautified with log verbosity set to ALL', function (done) {
    var stream = beautify.reporter({
      verbosity: beautify.report.ALL
    });
    var vinylFile = newVinyl('file.js', new Buffer(''));
    vinylFile.jsbeautify = {};
    vinylFile.jsbeautify.type = 'js';
    vinylFile.jsbeautify.beautified = false;
    vinylFile.jsbeautify.canBeautify = true;

    stream.on('error', done);
    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.exist;
      expect(newFile.jsbeautify.type).to.exist;
      expect(newFile.jsbeautify.type).to.equal('js');
      expect(newFile.jsbeautify.beautified).to.exist;
      expect(newFile.jsbeautify.beautified).to.be.false;
      expect(newFile.jsbeautify.canBeautify).to.exist;
      expect(newFile.jsbeautify.canBeautify).to.be.true;
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWithExactly('Can beautify ' + gutil.colors.cyan('file.js') + ' [js]')).to.be.true;
      done();
    });
    stream.write(vinylFile);
  });

  it('should report which files can be beautified without specify log verbosity', function (done) {
    var stream = beautify.reporter();
    var vinylFile = newVinyl('file.js', new Buffer(''));
    vinylFile.jsbeautify = {};
    vinylFile.jsbeautify.type = 'js';
    vinylFile.jsbeautify.beautified = false;
    vinylFile.jsbeautify.canBeautify = true;

    stream.on('error', done);
    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.exist;
      expect(newFile.jsbeautify.type).to.exist;
      expect(newFile.jsbeautify.type).to.equal('js');
      expect(newFile.jsbeautify.beautified).to.exist;
      expect(newFile.jsbeautify.beautified).to.be.false;
      expect(newFile.jsbeautify.canBeautify).to.exist;
      expect(newFile.jsbeautify.canBeautify).to.be.true;
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWithExactly('Can beautify ' + gutil.colors.cyan('file.js') + ' [js]')).to.be.true;
      done();
    });
    stream.write(vinylFile);
  });

  // TODO: Test flush() method
  it('should emit an error if a file can be beautified', function (done) {
    var stream = beautify.reporter();
    var vinylFile = newVinyl('file.js', new Buffer(''));
    vinylFile.jsbeautify = {};
    vinylFile.jsbeautify.type = 'js';
    vinylFile.jsbeautify.beautified = false;
    vinylFile.jsbeautify.canBeautify = true;

    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.exist;
      expect(newFile.jsbeautify.type).to.exist;
      expect(newFile.jsbeautify.type).to.equal('js');
      expect(newFile.jsbeautify.beautified).to.exist;
      expect(newFile.jsbeautify.beautified).to.be.false;
      expect(newFile.jsbeautify.canBeautify).to.exist;
      expect(newFile.jsbeautify.canBeautify).to.be.true;
      done();
    });

    stream.write(vinylFile);
  });

  it('should report which files can not be beautified with log verbosity set to ALL', function (done) {
    var stream = beautify.reporter({
      verbosity: beautify.report.ALL
    });
    var vinylFile = newVinyl('file.js', new Buffer(''));
    vinylFile.jsbeautify = {};
    vinylFile.jsbeautify.type = null;
    vinylFile.jsbeautify.beautified = false;
    vinylFile.jsbeautify.canBeautify = false;

    stream.on('error', done);
    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.exist;
      expect(newFile.jsbeautify.type).to.be.null;
      expect(newFile.jsbeautify.beautified).to.exist;
      expect(newFile.jsbeautify.beautified).to.be.false;
      expect(newFile.jsbeautify.canBeautify).to.exist;
      expect(newFile.jsbeautify.canBeautify).to.be.false;
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWithExactly('Can not beautify ' + gutil.colors.cyan('file.js'))).to.be.true;
      done();
    });
    stream.write(vinylFile);
  });

  it('should not report which files can not be beautified without specify log verbosity', function (done) {
    var stream = beautify.reporter();
    var vinylFile = newVinyl('file.js', new Buffer(''));
    vinylFile.jsbeautify = {};
    vinylFile.jsbeautify.type = null;
    vinylFile.jsbeautify.beautified = false;
    vinylFile.jsbeautify.canBeautify = false;

    stream.on('error', done);
    stream.on('data', function (newFile) {
      expect(newFile).to.exist;
      expect(newFile.path).to.exist;
      expect(newFile.path.toString()).to.equal(path.join(__dirname, 'fixtures', 'file.js'));
      expect(newFile.relative).to.exist;
      expect(newFile.relative.toString()).to.equal('file.js');
      expect(newFile.contents).to.exist;
      expect(newFile.contents.toString()).to.equal('');
      expect(newFile.jsbeautify).to.exist;
      expect(newFile.jsbeautify.type).to.be.null;
      expect(newFile.jsbeautify.beautified).to.exist;
      expect(newFile.jsbeautify.beautified).to.be.false;
      expect(newFile.jsbeautify.canBeautify).to.exist;
      expect(newFile.jsbeautify.canBeautify).to.be.false;
      expect(console.log.calledOnce).to.be.false;
      done();
    });
    stream.write(vinylFile);
  });
});
