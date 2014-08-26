var combine = require('stream-combiner')
var through = require('through');
var zlib = require('zlib');

module.exports = function () {
  var bufferToJson = through(function(buffer) {
    this.queue(JSON.parse(buffer.toString()));
  });

  var currentGenre;
  var genreCollator = through(function(line) {
    if (line.type === "genre") {
      if (currentGenre !== undefined) {
        this.queue(currentGenre);
      }

      currentGenre = { name: line.name, books: [] };
    } else if (line.type === "book") {
      currentGenre.books.push(line.name);
    }
  }, function() {
    this.queue(currentGenre);
    this.queue(null);
  });

  var toStringer = through(function(genreObj) {
    this.queue(JSON.stringify(genreObj) + "\n");
  });

  return combine(
    bufferToJson,
    genreCollator,
    toStringer,
    zlib.createGzip()
  );
}
