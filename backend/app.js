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



module.exports = app;
