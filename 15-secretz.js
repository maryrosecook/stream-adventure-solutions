var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var through = require('through');

var cipherName = process.argv[2];
var passPhrase = process.argv[3];
var decipheredInputStream = crypto.createDecipher(cipherName, passPhrase);

var tarParser = tar.Parse();
tarParser.on('entry', function (e) {
  if (e.type === "File") {
    e.pipe(crypto.createHash('md5', { encoding: 'hex' }))
      .pipe(through(null, function() {
        this.queue(" " + e.path + "\n");
      }))
      .pipe(process.stdout);
  }
});


process.stdin
  .pipe(decipheredInputStream)
  .pipe(zlib.createGunzip())
  .pipe(tarParser);
