const knex = require ("./connect");
const user = {};

user.checkLogin = (email, pass) => {
    return new Promise((resolve,reject) => {
        knex('user').where({Email: email,Password: pass}).select('*')
        .then( results => {
            if(results.length ==0)
                return reject("Incorrect");
            resolve();
        })
        .catch(err => {
            console.log(err);
        });
    });
 }
user.register = (name,age,email,pass) =>{
    knex('user').insert({Username:name,Age:age,Email:email,Password:pass})
    .then(()=>{
        console.log("Tao acc thanh cong");
    })
    .catch(err =>{
        console.log("Loi tao acc:" +err);
    })

};
user.getUsername = (email) =>{
    return new Promise((resolve,reject) => {
        knex('user').where({Email: email}).select('Username')
        .then( results => {
            resolve(results);
        })
        .catch(err => {
            console.log("Err get email:", err);
        })
     }); 
}
module.exports = user;