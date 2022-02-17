const config = require('./config/index.config');
const mongoose = require('mongoose');
const connectionURL = config.MONGO_CONNECTION_URL;

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