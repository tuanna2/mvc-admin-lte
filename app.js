const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const async = require("async");
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

const controllerCustomer= require("./controllers/customer/index.js");
const controllerHome= require("./controllers/home/index.js");
const controllerLogin= require("./controllers/login/index.js");
const controllerRegister= require("./controllers/register/index.js");

app.get("/login",controllerLogin.login_get);
app.post("/login",urlencodedParser,controllerLogin.login_post);
app.get("/logout",controllerLogin.logout);

app.get("/register",controllerRegister.register_get);
app.post("/register",urlencodedParser,controllerRegister.register_post);

app.get("/",controllerHome);

app.get("/page/:page",controllerCustomer.page);
app.get("/delete/:id",controllerCustomer.deleteid);
app.get("/add",controllerCustomer.add_get);
app.post("/add",urlencodedParser,controllerCustomer.add_post);
app.get("/update/:id",controllerCustomer.update_get);
app.post("/update/:id",urlencodedParser,controllerCustomer.update_post);
app.get("/detail/:id",controllerCustomer.detail);

app.listen(3000,function(){
    console.log("Run port 3000");
});