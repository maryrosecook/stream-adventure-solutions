var duplexer = require('duplexer');
var through = require('through');

module.exports = function (counter) {
  var counts = {};

  var reader = through(function(dataItem) {
    counts[dataItem.country] = counts[dataItem.country] || 0;
    counts[dataItem.country]++;
  }, function() {
    counter.setCounts(counts);
  });

  return duplexer(reader, counter);
};
