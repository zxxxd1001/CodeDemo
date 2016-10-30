const http= require('http');
var hostname='127.0.0.1',
 port='3000';

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("<h1>Node.js</h1>");
  res.write("<p>Hello World</p>");
  res.end("<p>beyondweb.cn</p>");
}).listen(port,hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});