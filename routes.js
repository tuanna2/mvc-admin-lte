const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const controllerCustomer= require("./controllers/customer/index.js");
const controllerHome= require("./controllers/home/index.js");
const controllerLogin= require("./controllers/login/index.js");
const controllerRegister= require("./controllers/register/index.js");

const routes = express();
routes.get("/login",controllerLogin.login_get);
routes.post("/login",urlencodedParser,controllerLogin.login_post);
routes.get("/logout",controllerLogin.logout);

routes.get("/register",controllerRegister.register_get);
routes.post("/register",urlencodedParser,controllerRegister.register_post);

routes.get("/",controllerHome);

routes.get("/page/:page",controllerCustomer.page);
routes.get("/delete/:id",controllerCustomer.deleteid);
routes.get("/add",controllerCustomer.add_get);
routes.post("/add",urlencodedParser,controllerCustomer.add_post);
routes.get("/update/:id",controllerCustomer.update_get);
routes.post("/update/:id",urlencodedParser,controllerCustomer.update_post);
routes.get("/detail/:id",controllerCustomer.detail);

routes.get('*',controllerHome);
module.exports = routes;