// server.js (Node Core HTTP Server)
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello from Node.js Backend!' }));
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});