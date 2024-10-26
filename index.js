const express = require('express');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errors');

const app = express();

// Middleware
app.set('views engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(errorHandler);

// Routes
app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.use('/', authRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});