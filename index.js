const http = require('http');
const port = process.env.PORT || 8000;
const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const ejsLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const passportGoogle = require('./config/passport_google_strategy');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/custom_middleware');

// firing express
const app = express();

app.use(express.urlencoded());


app.use(sassMiddleware({
    src:'./assets/SCSS',
    dest:'./assets/CSS',
    debug:true,
    outputStyle:'extended',
    prefix:'/CSS'
}))

// using express-ejs-layout as a middleware
app.use(ejsLayouts);

// using ejs as our view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(express.static('./assets'));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(session({
    name:'befriends',
    secret:'keshav',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*100
    },
    store: new mongoStore({
        mongoUrl:process.env.MONGODB_URI || 'mongodb://localhost:27017/befriends_Development',
        autoRemove:false
    }, function(err){
        if(err){console.log('Error in creating mongostore inside session cookie: ', err); return;}
        console.log('mongoStore implemented Successfully!!!');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// app.set('layout signin', false);


app.use('/', require('./routes/index'));






app.listen(process.env.PORT || port, function(err){
    if(err){console.log('Error in listening the server: ', err); return;}
    console.log('server is running on port: ', port);
});




// Server is running without express through node only
// 
// const port1 = 8000;
// const server = http.createServer(requestHandler);
// function requestHandler(req, res){
//     console.log(req.url);
//     fs.readFile(path.join(__dirname,'../Basichttpserver/index.html'), function(err, data){
//         if(err){console.log('Error in fetching the file: ', err); return;}
//         if(data){
//             return res.end(data);
//         }else{
//             return res.end('<h1>No file found!!</h1>');
//         }
//     });
    
// };



// server.listen(port1, function(err){
//     if(err){console.log('Error in listening the server: ', err); return;}
//     console.log('Server is up and running on port: ', port1);
//     return;
// });