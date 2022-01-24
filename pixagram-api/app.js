const express = require('express');
const app = express();
const path = require('path')
const PORT = 7000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
// DB connection 
require('./db_init');
const mainRoute = require('./routes/api.routes');


// Cors
app.use(cors())

// Dev Tool
var logger = require('morgan');
app.use(logger('dev'));

// parsers
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// user cookie parser 
app.use(cookieParser());

//serve static files
app.use('/file', express.static(path.join(process.cwd(), 'public'))) // serve for external request

// Routes
app.use('/api', mainRoute);

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

//   // render the error page
//   res.render('./pages/error', {
//     msg: err.msg || err,
//     status: err.status,
//     currentUser: req.currentUser
//   });
});

app.listen(PORT, (err) => {
    if(err){
        console.log('Error in LISTEN');
        return
    }
console.log(`App is listening at http://localhost:${PORT}`);
})