require('./db');
require('./auth');

const express = require("express");
const app = express();
const path = require('path');
const passport = require('passport');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, "../front-end/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const playerRoutes = require('./routes/player');
app.use('/api', playerRoutes);

const teamRoutes = require('./routes/team');
app.use('/api', teamRoutes);

  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));