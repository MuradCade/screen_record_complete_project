const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard.ejs');
});

router.post('/createaccount', (req, res) => {
  const errors = [];

  if (typeof req.body.username !== 'string') req.body.username = '';
  if (typeof req.body.email !== 'string') req.body.email = '';
  if (typeof req.body.pwd !== 'string') req.body.pwd = '';

  req.body.username = req.body.username.trim();
  req.body.email = req.body.email.trim();
  req.body.pwd = req.body.pwd.trim();

  if (!req.body.username) {
    errors.push('You Must Provide username');
  }
  if (!req.body.email) {
    errors.push('You Must Provide email');
  }
  if (!req.body.pwd) {
    errors.push('You Must Provide password');
  }
  if (req.body.username && req.body.username.length < 5) {
    errors.push('Username must be at least more then 5 characters');
  }

  if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) {
    errors.push('Username can only contains letters and numbers ');
  }

  if (errors.length) {
    return res.render('signup.ejs', { errors });
  }

  // Add user to database
  const stmt = db.prepare(`
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `);
  
  stmt.run([req.body.username, req.body.email, req.body.pwd], (err) => {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        errors.push('Username already exists');
        return res.render('signup.ejs', { errors });
      }
      errors.push('An error occurred');
      return res.render('signup.ejs', { errors });
    }
    res.redirect('/login');
  });
});

module.exports = router;