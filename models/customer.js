const con = require("./connect");
const customer = {};

customer.showPage = (page) =>{
    return new Promise((resolve,reject) => {
        let sql="select * from customers order by stt limit "+ (page-1)*10 +",10;";
         con.query(sql,(err,results) => {
            if(err) reject("Err show page:" +err);
            else resolve(results);
         });
     });    
}
customer.showAll =() =>{
    return new Promise((resolve,reject) => {
        let sql="select * from customers;";
         con.query(sql,(err,results) => {
            if(err) reject("Err show all:" +err);
            else resolve(results);
         });
     });   
}
customer.add =(id,name,age) => {
    let sql="insert into customers(id,name,age) values('"+id+"','"+name+"','"+age+"');";
    con.query(sql,(err) =>{
        if(err) console.log("Err add :" +err);
    });
}

customer.delete =(id) => {
    let sql="delete from customers where id='"+id+"';";
    con.query(sql,(err) =>{
        if(err) console.log("Err delete :" +err);
    });
}
customer.detail =(id) => {
    return new Promise((resolve,reject) => {
        let sql="select * from customers where id='"+id+"';";
         con.query(sql,(err,results) => {
            if(err) reject("Err show detail:" +err);
            else resolve(results);
         });
     }); 
    
}
customer.update_get =(id) => {
    return new Promise((resolve,reject) => {
        let sql="select * from customers where id='"+id+"';";
         con.query(sql,(err,results) => {
            if(err) reject("Err show update:" +err);
            else resolve(results);
         });
     }); 
}
customer.update_post =(newname,newage,id) => {
    let sql="update customers set name='"+newname+"',age='"+newage+"' where id ='"+id+"';";
    con.query(sql,(err) =>{
        if(err) console.log("Err Update :" +err);
    });
}
module.exports = customer;