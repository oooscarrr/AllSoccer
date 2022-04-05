
require('./db');
// require('./auth');

// const passport = require('passport');
// const express = require('express');
// const path = require('path');

// const routes = require('./routes/index');
// const list = require('./routes/list');
// const listItem = require('./routes/list-item');

// const app = express();

// // view engine setup
// // app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// // enable sessions
// const session = require('express-session');
// const sessionOptions = {
//     secret: 'secret cookie thang (store this elsewhere!)',
//     resave: true,
//       saveUninitialized: true
// };
// app.use(session(sessionOptions));

// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// // passport setup
// app.use(passport.initialize());
// app.use(passport.session());

// // make user data available to all templates
// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });

// app.use('/', routes);
// app.use('/list', list);
// app.use('/list-item', listItem);

// app.listen(3000);



const express = require("express");
const app = express();
  
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));