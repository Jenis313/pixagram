const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');
const mainRoute = require('./routes/api.routes');
const config = require('./config/index.config');
const PORT = config.PORT || 7000;
// DB connection 
require('./db_init');

// Cors
app.use(cors());

// Dev Tool
var logger = require('morgan');
app.use(logger('dev'));

// parsers
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// user cookie parser 
app.use(cookieParser());

// Routes
app.use('/api', mainRoute);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(process.cwd(), 'pixagram-web/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'pixagram-web/build/index.html'))
  })
}else{
  app.get('/', (req, res) => {
    res.send('api running');
  })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next({
    msg: 'Not found',
    status: 404
  });
});
// error handler middleware
app.use(function(err, req, res, next) {
  console.log('ERROR Handling middleware in execution!!! --> ', err);
  res.status(err.status || 500);
  res.json({
    msg: err.msg || err,
    status: err.status || 404
  })
});

app.listen(PORT, (err) => {
    if(err){
        console.log('Error in LISTEN');
        return
    }
console.log(`App is listening at  ${PORT}`);
})