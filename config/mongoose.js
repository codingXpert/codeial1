const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/befriends_Development');
const db = mongoose.connection;

db.on('error', function(err){
    console.log('Error while connecting database : ', err);
});

db.on('open', function(){
    console.log('Successfully connected to database');
});

module.exports = db;