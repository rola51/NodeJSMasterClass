/*
 * Primary file for API
 *
 */

// Constants
var httpPort = 8888;

// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder; // for payload

// Instantiate http server
// ready for https, not required for this assignment

var httpServer = http.createServer(function(req,res){
  unifiedServer(req,res);
});

// Start http server
httpServer.listen(httpPort, function(){
  console.log("HTTP Server is listening on port  " + httpPort);
});

// function to contain http and/or https protocols common code
var unifiedServer = function(req, res){
  // parse url
  var parsedUrl = url.parse(req.url, true);

  // get path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // get query method
  var method = req.method.toLowerCase();

  // get queryString as object
  var queryStringObject = parsedUrl.query;

  // get headers as object
  var headers = req.headers;

  // get payload if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data) {
      buffer += decoder.write(data);
  });
  req.on('end', function() {
    buffer += decoder.end();
      // Check the router for a matching path for a handler.
	  // If one is not found, use the notFound handler instead.
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    var data = {
     'trimmedPath' : trimmedPath,
     'queryStringObject' : queryStringObject,
     'method' : method,
     'headers' : headers,
     'payload' : buffer
    };

    // Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload){

     // Use status code called by callback  or default status of 200
     statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

     // Use the payload returned by the handler, or set an empty object as default payload
     payload = typeof(payload) == 'object'? payload : {};

     // Convert the payload to a string
     var payloadString = JSON.stringify(payload);

     // Return response
     res.setHeader('Content-type', 'application/json');  // notify JSON returned
     res.writeHead(statusCode);
     res.end(payloadString);
    });
  });
};

// get Server time as hours:minutes
var timeNow = function() {
		var d = new Date(); // for now
		return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	}


// define handlers
var handlers = {};

// Hello handler
handlers.hello = function(data,callback){
	callback(200, {msg: 'Hello - Welcome! Time now is ' + timeNow()})
};


// Define a notFound handler
handlers.notFound = function(data, callback){
  callback(404);  // no payload required
};


// Define the router for the hello request
var router = {
  'hello' : handlers.hello
};
