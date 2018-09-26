const customer = require("../../../models/customer");
const rd = require("randomstring");
const async = require("async");
const controllers = {};
    controllers.showAll = (req,res) => {
        const get = async ()=>{
            let results = await customer.showAll();
            if(results.length ==0)
                res.json({code:'0',message:'error',data:results})
            else
                res.json({code:'1',message:'success!',data:results});
        }
        get();
    };
    controllers.showPage = (req,res) =>{
        const page = async () =>{
            let results = await customer.showPage(req.params.page);
            if(results.length ==0)
                res.json({code:'0',message:'error',data:results})
            else
                res.json({code:'1',message:'success!',data:results});
        }
        page();
    };
    controllers.add = (req,res) => {
            customer.add(rd.generate(10),req.body.name,req.body.age);
            res.json({code:rd.generate(5),message:'Add success!'});
            console.log("Them thanh cong");
    };
    controllers.update = (req,res) => {
        customer.update(req.body.name,req.body.age,req.body.id);
        res.json({code:rd.generate(5),message:'Update success!'});
        console.log("update thanh cong"); 
    };
    controllers.detail = (req,res) => {
        const detail = async () =>{
            let results =await customer.detail(req.params.id);
            if(results.length ==0)
                res.json({code:'0',message:'error',data:results})
            else
                res.json({code:'1',message:'success!',data:results});
        };
        detail();
    };
    controllers.deleteid = (req,res) => {
        customer.delete(req.params.id);
        res.json({code:'1',message:'Delete success!'});
    };
    controllers.searchName = (req,res) =>{
        const searchName = async ()=>{
            let results = await customer.search(req.params.data);
            if(results.length ==0)
                res.json({code:'0',message:'error',data:results})
            else
                res.json({code:'1',message:'success',data:results});
        }
        searchName();
    };

module.exports = controllers;