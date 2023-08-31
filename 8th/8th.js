const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    if (req.method === 'GET') {
      const messages = fs.readFileSync('messages.txt', 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <html>
          <head>
            <title>Message</title>
          </head>
          <body>
            <h1>Message</h1>
            <ul>
              ${messages.split('\n').map((message) => `<li>${message}</li>`).join('')}
            </ul>
            <div>
              <input type="text" id="message">
              <button id="send">Send</button>
            </div>
            <script>
              const messageBox = document.getElementById('message');
              const sendButton = document.getElementById('send');
              const messagesList = document.querySelector('ul');

              sendButton.addEventListener('click', () => {
                const message = messageBox.value;

                // Update the message list in the DOM
                const newMessageElement = document.createElement('li');
                newMessageElement.textContent = message;
                messagesList.appendChild(newMessageElement);

                // Write the new message to the file
                const filePath = path.join(__dirname, 'messages.txt');
                fs.appendFile(filePath, message + '\\n', 'utf8', (err) => {
                  if (err) {
                    console.log(err);
                  }
                });

                messageBox.value = '';
              });
            </script>
          </body>
        </html>
      `);
    } else {
      res.statusCode = 405; // Method Not Allowed
      res.setHeader('Content-Type', 'text/plain');
      res.end('Method not allowed.');
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found');
  }
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});