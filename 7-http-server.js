var through = require('through');
var http = require('http');

http.createServer(function(req, res) {
  req.pipe(through(function(data) {
    this.queue(data.toString().toUpperCase());
  })).pipe(res);
}).listen(process.argv[2]);
