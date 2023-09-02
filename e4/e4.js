const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Initialize an array to store messages
const messages = [];

// Routes
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
   res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/admin/login', (req, res) => {
   const username = req.body.username;
   localStorage.setItem('username', username);
   res.redirect('/message');
});

app.get('/message', (req, res) => {
   res.sendFile(path.join(__dirname, 'views', 'message.html'));
});

app.post('/message/send-message', (req, res) => {
   const username = localStorage.getItem('username') || 'Anonymous';
   const message = req.body.message;

   // Store the message in the array
   const newMessage = { username, message };
   messages.push(newMessage);

   // Save the messages to a JSON file for persistence
   fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));

   res.redirect('/message');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
