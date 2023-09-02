const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
   res.sendFile('login.html', { root: 'views' });
});

router.post('/admin/login', (req, res) => {
   const username = req.body.username;
   localStorage.setItem('username', username);
   res.redirect('/message');
});

module.exports = router;
