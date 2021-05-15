var http = require('http');

http.createServer(function(req,res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world!');
}).listen(7431);

console.log('Server started on localhost:7431; press Ctrl-C to terminate....');
