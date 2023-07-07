const express = require('express');
const app = express();
const session = require('express-session');

// Require the route files
const processRoutes = require('./routes/process');
const pointsRoutes = require('./routes/points');

// Instantiate id to points dictionary
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Middleware to initialize session data
app.use((req, res, next) => {
  if (!req.session.receiptPoints) {
    // Set initial session data
    req.session.receiptPoints = {};
  }
  next();
});

// Use the routes in your application
app.use('/', processRoutes);
app.use('/', pointsRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});