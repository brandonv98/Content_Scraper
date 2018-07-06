// // Use Node.js to perform look ups
// //Create web server;
 // NOTE: New sever rendering output below.
var scraper = require('./scraper.js');
var http = require('http');
var config = { // Config for server options
  portNumber: 3000,
};

http.createServer(function (request, response) {
  scraper.shirt(request, response);
}).listen(config.portNumber);
console.log(`Server running at http://<localhost-url:${config.portNumber}>/`);
