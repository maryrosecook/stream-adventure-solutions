var split = require('split');
var through = require('through');

var uppercase = false;
process.stdin
  .pipe(split())
  .pipe(through(function(str) {
    var output = uppercase ? str.toUpperCase() : str.toLowerCase();
    this.queue(output + "\n");
    uppercase = !uppercase;
  }))
  .pipe(process.stdout);
