// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Create a server
http.createServer((req, res) => {
    // Get the path
    let pathname = url.parse(req.url).pathname;
    // Get the extension of the file
    let extname = path.extname(pathname);
    // Get the type of the file
    let type = getContentType(extname);
    // Read the file
    fs.readFile(pathname.substring(1), (err, data) => {
        if (err) {
            // Page not found
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1>');
        } else {
            // Page found
            res.writeHead(200, {'Content-Type': type});
            res.write(data.toString());
            res.end();
        }
    });
}).listen(8080);

console.log('Server running at http://');
