const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const blogRouter = require('./routes/postRoutes');
const loginRouter = require('./routes/loginRoutes');
const middleware = require('./middlewares/middlewares');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(middleware.loggingMiddleware);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.Token, // Secret key used to sign the session ID cookie
    resave: false, // Whether to save the session for every request, even if it hasn't changed
    saveUninitialized: false // Whether to save uninitialized sessions (new but not modified)
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(''  , loginRouter);
app.use(''  ,blogRouter);

app.use(middleware.errorMiddleware);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

