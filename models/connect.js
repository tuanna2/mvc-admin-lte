const mysql =require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "tuanna2",
    password: "anhtuan",
    database: "contacto"
});
con.connect(function(err){
    if(err) throw err;
});
 
module.exports = con;