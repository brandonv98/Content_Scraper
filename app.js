// // Use Node.js to perform look ups
// //Create web server;
 // NOTE: New sever rendering output below.
var scraper = require('./scraper.js');
var http = require('http');

http.createServer(function (request, response) {
  scraper.shirt(request, response);
}).listen(3000);
console.log('Server running at http://<localhost-url:PortNumber(3000)>/');
