const express = require('express');
const bodyParser = require('body-parser');
const routes = express();
const api = require("./controllers/customer/index");
routes.use(bodyParser.urlencoded({ extended: true }))
routes.use(bodyParser.json()); 

routes.get('/customer',api.showAll);
routes.get("/customer/page/:page",api.showPage);
routes.post('/customer',api.add);

routes.get('/customer/search/:data',api.searchName);

routes.get("/customer/:id",api.detail);
routes.delete("/customer/:id",api.deleteid);
routes.put("/customer",api.update);
module.exports = routes;
