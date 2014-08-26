var tr = require('trumpet')();
var through = require('through');

var loudInners = tr.select('.loud').createStream();
loudInners.pipe(through(function(data) {
  this.queue(data.toString().toUpperCase());
})).pipe(loudInners);

process.stdin.pipe(tr).pipe(process.stdout);
