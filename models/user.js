const con = require ("./connect");
const user = {};

user.checkLogin = (email, pass) => {
    return new Promise((resolve,reject) => {
        let sql="select * from user where Email='"+email +"' and Password='"+pass+"';";
         con.query(sql,(err,results) => {
             if(err || results.length==0)
                return reject("Incorrect");
             else
                 resolve();
         });
     });
 }
user.register = (name,age,email,pass) =>{
    let sql="insert into user(Username,Age,Email,Password) values('"+name+"','"+age+"','"+email +"','"+pass+"');";
    con.query(sql,(err) =>{
        if(err) console.log("Loi tao acc:" +err);
    });
};
user.getUsername = (email) =>{
    return new Promise((resolve,reject) => {
        let sql = "select Username from user where Email='"+email+"';";
        con.query(sql,(err,results) => {
            if(err) reject("Err get Username:" +err);
            else resolve(results);
         });
     }); 
}
module.exports = user;