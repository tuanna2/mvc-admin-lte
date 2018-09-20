const customer = require("../../models/customer");
const rd = require("randomstring");
const user = require("../../models/user");

const controllerCustomer = {};

controllerCustomer.add_get = (req,res) => {
    if(req.session.saveName){
        user.getUsername(req.session.saveName).then((results)=> res.render("add",{results}));
    }
    else
        res.redirect("../login");
}
controllerCustomer.add_post = (req,res) => {
    if(req.session.saveName){
        customer.add(rd.generate(10),req.body.name,req.body.age);
        res.redirect("/");
        console.log("Them thanh cong");
    }
    else
        res.redirect("../login");
}
controllerCustomer.update_get = (req,res) => {
    if(req.session.saveName){
        const update = async () =>{
            let results =await customer.detail(req.params.id);
            res.render("update",{results});
        };
        update();
    }
    else
        res.redirect("../login")
};
controllerCustomer.update_post = (req,res) => {
    customer.update_post(req.body.newname,req.body.newage,req.params.id);
    res.redirect("/");
    console.log("update thanh cong"); 
}
controllerCustomer.detail = (req,res) => {
    if(req.session.saveName){
        const detail = async () =>{
            let results =await customer.detail(req.params.id);
            res.render("detail",{results});
        };
        detail();
    }
    else
        res.redirect("../login")
}
controllerCustomer.deleteid = (req,res) => {
    customer.delete(req.params.id);
    res.redirect("/");
}
controllerCustomer.page = (req,res) => {
    if(req.session.saveName){
        let showPage = async ()=>{
            let results = await user.getUsername(req.session.saveName);
            let results1 = await customer.showPage(req.params.page);
            const value = await customer.showAll();
            let results2 = Math.ceil(value.length/10);
            let results3 = await parseInt(req.params.page); 
            res.render("home",{results:results ,results1 : results1, results2:results2, results3:results3});     
        }
        showPage();
    }
    else
        res.redirect("../login")
}



module.exports = controllerCustomer;