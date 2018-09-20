const checkLogin = (req) => {
    if(!req.session.saveName);
        return res.redirect ("/login");
}
module.exports = checkLogin;