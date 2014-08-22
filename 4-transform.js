var through = require('through');

process.stdin.pipe(through(function(data) {
  this.queue(data.toString().toUpperCase());
})).pipe(process.stdout);
