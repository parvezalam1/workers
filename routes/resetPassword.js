let routes=require('express').Router();
let db=require('../connections');

routes.post('/',async(req,res)=>{
let resetUsername=req.body.resetUsername;
let resetMobile=req.body.resetMobile;
let sql=`select rid, password from owner_register where
 username='${resetUsername}' and mobile=${resetMobile}`;
db.query(sql,(err,result)=>{
if(result!==undefined){
let rid=result.rid;
    res.json({status:200,result:1,rid:rid})    
}else{
    res.json({status:500,result:0})    
}
})
})


//update password here
routes.put('/:rid',async(req,res)=>{
let rid=req.params.rid;
let newPassword=req.body.newPassword;
let update=`update owner_register set password='${newPassword}' where rid=${rid}`;
db.query(update,(err)=>{
    if(err) res.json({status:500,result:0})    
    res.json({status:200,result:1})    
});
})

module.exports=routes;