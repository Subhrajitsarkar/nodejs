const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`My name is Subhrajit`);
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});