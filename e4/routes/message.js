const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
   res.sendFile('message.html', { root: 'views' });
});

router.post('/message/send-message', (req, res) => {
   const username = localStorage.getItem('username') || 'Anonymous';
   const message = req.body.message;
   const data = `${username}: ${message}\n`;

   fs.appendFile('messages.txt', data, (err) => {
       if (err) {
           console.error(err);
       } else {
           console.log('Message saved to file');
       }
   });

   res.redirect('/message');
});

module.exports = router;
