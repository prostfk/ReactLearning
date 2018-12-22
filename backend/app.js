const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registrationRouter = require('./routes/registration');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const app = express();
const session = require('express-session');
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//URLS
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/registration', registrationRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
//URLS




app.use((req, res, next) =>  {
  next(createError(404));
});



app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
