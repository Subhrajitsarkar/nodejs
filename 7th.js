const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;

  switch (url) {
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Welcome to my Node Js project');
      break;
    case '/home':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Welcome home');
      break;
    case '/about':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Welcome to About Us page');
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Page not found');
  }
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});