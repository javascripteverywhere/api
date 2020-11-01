const mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {
        mongoose.set('useNewUrlParser', true);
        // use findAndUpdate in place of findAndModify
        mongoose.set('usefindAndModify', false);
        // use createIndex instead of ensureIndex
        mongoose.set('useCreateIndex', true);
        //use new server discovery and monitoring engine
        mongoose.set('useUnifiedTopology', true);
        // connect to db
        mongoose.connect(DB_HOST);
        // log an error if we fail to connect
        mongoose.connection.on('error', err => {
            console.log(err);
            console.log(
                'MongoDB connection error. Please make sure mongoDB is running.'
            );
            process.exit();
        });
    },
    close: () => {
        mongoose.connection.close();
    }
};