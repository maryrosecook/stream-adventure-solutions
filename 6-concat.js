var concatStream = require('concat-stream');

process.stdin.pipe(concatStream(function(str) {
  process.stdout.write(str.toString().split("").reverse().join("") + "\n");
}));
