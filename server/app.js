const createError = require('http-errors');
const express = require('express');
const ConnectCas = require('connect-cas2');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const MemoryStore = require('session-memory-store')(session)
const app = express();
const ejs = require('ejs');
// const casInit = require('./lib/casInit')

app.use(cookieParser());
app.use(session({
  name: 'NSESSIONID',
  secret: 'Hello I am a long long long secret',
  store: new MemoryStore() // or other session store
}));

const casClient = new ConnectCas({
  debug: true,
  ignore: [
    /\/ignore/
  ],
  match: [],
  servicePrefix: 'http://192.168.120.183:3000',
  serverPath: 'http://192.168.108.47',
  paths: {
    validate: '/cas/validate',
    serviceValidate: '/sso/serviceValidate',
    proxy: '',
    login: '/sso/login',
    logout: '/sso/logout',
    proxyCallback: '',
    pgtUrl: '',
  },
  redirect: false,
  gateway: false,
  renew: false,
  slo: true,
  cache: {
    enable: false,
    ttl: 5 * 60 * 1000,
    filter: []
  },
  fromAjax: {
    header: 'x-client-ajax',
    status: 418
  }
});

// view engine setup
app.set('views', path.resolve(__dirname, 'dist'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// 接入单点登录
// casInit(app)
app.use(casClient.core())

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('/favicon.ico', function (req, res) {
  res.end('ok');
});

app.use(function (req, res, next) {
  res.render('index.html', { title: 'Express' });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => console.log('3000 is start'))