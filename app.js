const express = require('express');
const app = express();
const async = require("async");
const routes = require("./routes");
app.use(express.static("views/display"));
app.set("view engine","ejs"); 
app.set("views","./views"); 
const session = require('express-session'); 
app.use(session({
    secret: '5ads2v5d8fad53r65f5adfa5sdf25c5',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60 }
  })) ; 
app.use('/',routes);

app.listen(3000,function(){
    console.log("Run port 3000");
});