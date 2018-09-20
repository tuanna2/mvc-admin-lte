const knex = require("./connect");
const customer = {};

customer.showPage = (page) =>{
    return new Promise((resolve,reject) => {
        knex('customers').select('*').orderBy('stt','ASC').limit(10).offset((page-1)*10)
        .then( results => {
            resolve(results);
        })
        .catch(err => {
            reject("Err show page",err);
        });
    });    
}
customer.showAll =() =>{
    return new Promise((resolve,reject) => {
        knex('customers').select('*')
        .then( results => {
            resolve(results);
        })
        .catch(err => {
            reject("Err show page",err);
        });
     });   
}
customer.add =(id,name,age) => {
    knex('customers').insert({id:id,name:name,age:age})
    .then(()=>{
        console.log("Add customer thanh cong");
    })
    .catch(err =>{
        console.log("Loi add customer:" +err);
    })
}

customer.delete =(id) => {
    knex('customers')
    .where({id:id})
    .del().then(()=> console.log("Xoa thanh cong"))
    .catch(err =>{
        console.log("loi xoa ",err);
    });
}
customer.detail =(id) => {
    return new Promise((resolve,reject) => {
        knex('customers').where({id:id}).select('*')
        .then( results => {
            resolve(results);
        })
        .catch(err => {
            reject("Err show detail",err);
        });
     }); 
    
}

customer.update_post =(newname,newage,id) => {
    knex('customers').where('id',id).update({name:newname,age:newage})
    .catch(err =>console.log(err));
}
module.exports = customer;