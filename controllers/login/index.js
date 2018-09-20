const user = require("../../models/user");
const controllerLogin = {};

controllerLogin.login_get = (req,res) =>{
    if(req.session.saveName)
        return res.redirect("/");
    else
        res.render("login",{err:""});
};
controllerLogin.login_post = (req,res) =>{
    user.checkLogin(req.body.email,req.body.pass).
    then(()=>{
        req.session.saveName=req.body.email;
            res.redirect("/");}
        ,() => res.render("login", {err: "Incorrect"})
    );
};
controllerLogin.logout = (req,res) =>{
    req.session.destroy(); 
    res.redirect("/");
};

module.exports = controllerLogin;