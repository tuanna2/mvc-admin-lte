var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mysql =require('mysql');
var session = require('express-session'); 
var rd = require("randomstring");


var con = mysql.createConnection({
    host: "localhost",
    user: "tuanna2",
    password: "anhtuan",
    database: "contacto"
});
con.connect(function(err){
    if(err) throw err;
});

app.use(express.static("views/display"));
app.set("view engine","ejs"); 
app.set("views","./views"); 

app.use(session({
    secret: '5ads2v5d8fad53r65f5adfa5sdf25c5',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60 }
  })) ; 

app.get("/",function(req,res){
    if(req.session.saveName){
        var sql="select * from user where Email='"+req.session.saveName+"';";
        con.query(sql,function(err,results){
            if(err) throw err;
            con.query("select * from customer;",function(err,results1){
                if(err) throw err;
                res.render("home",{results:results, results1 : results1});
            });
                
        });
    }
    else
        res.redirect("login");
});
app.get("/login",function(req,res){
    if(req.session.saveName){
        return res.redirect("/");
    }
    res.render("login",{err:""});
});
app.post("/login",urlencodedParser,function(req,res){
    var sql="select * from user where Email='"+req.body.email +"' and Password='"+req.body.pass+"';";
    con.query(sql,function(err,results){
        if(err || results.length==0)
            res.render("login", {err: "Incorrect"});
        else{
            req.session.saveName=req.body.email;
            res.redirect("/");
        }
   });
  
});

app.get("/register",function(req,res){
    res.render("register");
});
app.post("/register",urlencodedParser,function(req,res){
    var sql="insert into user(Username,Age,Email,Password) values('"+req.body.name+"','"+req.body.age+"','"+req.body.email +"','"+req.body.pass+"');";
    con.query(sql,function(err){
        if(err) throw err;
        console.log("Tao acc thanh cong");
    });
    res.redirect("/");

});
app.get("/logout",function(req,res){
    if (req.session.saveName) {
        req.session.destroy(); 
      }
      return res.redirect('/');
});
app.get("/add",function(req,res){
    if(req.session.saveName){
        var sql="select * from user where Email='"+req.session.saveName+"';";
        con.query(sql,function(err,results){
            if(err) throw err;
        res.render("add",{results});
        });
    }
    else
    return res.redirect("/login");
});
app.post("/add",urlencodedParser,function(req,res){
    var sql="insert into customer(id,name,age) values('"+rd.generate(10)+"','"+req.body.name+"','"+req.body.age+"');";
    con.query(sql,function(err){
        if(err) throw err;
        console.log("them thanh cong");
    });
    return res.redirect("/");

});
app.get("/delete/:id",function(req,res){
    var sql="delete from customer where id='"+req.params.id+"';";
    con.query(sql,function(err){
        if(err) throw err;
        console.log("xoa thanh cong");
    });
    res.redirect("/");
});
app.get("/update/:id",function(req,res){
    var sql="select * from customer where id='"+req.params.id+"';";
    con.query(sql,function(err,results){
        if(err) throw err;
        res.render("update",{results});
    });
    
});
app.post("/update/:id",urlencodedParser,function(req,res){
    console.log(req.params.id);
    var sql="update customer set name='"+req.body.newname+"',age='"+req.body.newage+"' where id ='"+req.params.id+"';";
    con.query(sql,function(err){
        if (err) throw err;
        console.log("update thanh cong");
    });
    res.redirect("/");
});
app.get("/detail/:id",function(req,res){
    var sql="select * from customer where id='"+req.params.id+"';";
    con.query(sql,function(err,results){
        if(err) throw err;
        res.render("detail",{results});
    });
});
app.listen(8080,function(){

});
