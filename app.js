// // Use Node.js to perform look ups and server our template via HTTP
// //Create web server;
 // NOTE: New sever rendering output below.
var router = require('./router.js');

var http = require('http');
http.createServer(function (request, response) {
  router.home(request, response);
  router.shirt(request, response);
}).listen(3000);
console.log('Server running at http://<localhost-url:PortNumber(3000)>/');
