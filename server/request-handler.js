/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var dataBAse = {
  results: []
};
var requestHandler = function(request, response) {
//console.log(request)
  if (request.method === 'OPTIONS') {
    console.log('OPTIONS SUCCESS');
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    response.writeHead(statusCode, headers);
    response.end('great..ended');    
  }
  //Notes:
  console.log(request.method, request.url);
  // if this is a Get request 
  if (request.method === 'GET' ) { //for Get request
    if (request.url === '/classes/messages') { //for Get request
      // if it is succesful request 
      // return a 200 
      console.log('Serving request type ' + request.method + ' for url ' + request.url);
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/json';
      
      response.writeHead(statusCode, headers);

      response.end(JSON.stringify(dataBAse));
      
    } else {
      // console.log('Im here.')
      var statusCode = 404;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/javascript';
      
      response.writeHead(statusCode, headers);

      response.end('error');
      //else (bad request)
      //return a 404
    }  
  } else if (request.method === 'POST') { // for post requests
    if (request.url === '/classes/messages') {
      var postCode = 201;
      console.log('Serving request type ' + request.method + ' for url ' + request.url);
      
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/javascript';
      let body = [];
      request.on('data', (chunk) => {
        // let body = [];
        body.push(chunk); 
        // body = Buffer.concat(body).toString();
        console.log('Message saved to Database', JSON.stringify(dataBAse));     
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        dataBAse.results.push(JSON.parse(body));
        console.log(dataBAse.results);
      });


      response.writeHead(postCode, headers);
      response.end('Message saved to Database');


    } else {
      var statusCode = 404;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/javascript';
      
      response.writeHead(statusCode, headers);

      response.end('error');
    }
    
  }
  // else (Post)
  // add message to result


  // console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // // The outgoing status.
  // var statusCode = 200;

  // // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  
  // headers['Content-Type'] = 'application/javascript';

  // // .writeHead() writes to the request line and headers of the response,
  // // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  
  // response.end(JSON.stringify(dataBAse));
};





exports.requestHandler = requestHandler;
