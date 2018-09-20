const user = require("../../models/user");
const controllerRegister = {};

controllerRegister.register_get = (req,res)=>{
    res.render("register");
};
controllerRegister.register_post = (req,res) =>{
    user.register(req.body.name,req.body.age,req.body.email,req.body.pass);
    res.redirect("/");
};

module.exports = controllerRegister;