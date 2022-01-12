const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');
const connectionURL = dbConfig.connectionURL;

mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if(err){
        console.log('Error in db connection', err);
        return;
    }
    console.log('DB connection successful')
})