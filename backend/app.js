//Importing modules
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

//Environment variable
const { environment } = require('./config');
const isProduction = environment === 'production';

//Initializes the Express application
const app = express();


//====Global Middleware====//

//==Utilities==//

//Logs req/res info
app.use(morgan('dev'));
//Parses cookies
app.use(cookieParser());
//Parses JSON bodies of requests with Content-Type of "application/json"
app.use(express.json());

//==Security==/

//Enables cors only in development
if (!isProduction) {
  app.use(cors());
}
//Helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);
// Sets the _csrf token and creates req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

//Adds routers to app
const routes = require('./routes');
app.use(routes);


//==Error-handling middlewares==/

//Handles any undefined routes (generic 404)
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
})

//Handles any sequelize errors
const { ValidationError } = require('sequelize');
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

//Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});


module.exports = app;
