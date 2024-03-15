let routes=require('express').Router();
let db=require('../connections');

routes.post('/',async(req,res)=>{
    let work_date=req.body.workDate;
    let work_period=req.body.workPeriod;
    let gave_money=req.body.gaveMoney;
    let att_mobile=req.body.attWorkerMobile;
    if(gave_money===null || gave_money===''){
        gave_money='No Money'
    }
    let insert=`insert into  worker_attendance(mobile,work_date,work_period,gave_money) values(?,?,?,?)`;
            
    db.query(insert,[att_mobile,work_date,work_period,gave_money],(err)=>{
        if(err) return  res.status(500).json(err.message);
         
        
        res.status(201).json(1);
    })
})


//fetch record 

routes.get('/:mobile',async(req,res)=>{
let sql=`select * from worker_attendance where mobile=${req.params.mobile}`;
db.query(sql,(err,ress)=>{
    if(err) return res.status(501).json(err.message);
if(ress.length>0){
    let select=`select a.id, a.work_date,a.work_period,a.gave_money,w.worker_name,w.mobile,w.charge
    from  worker_attendance a inner join workers w ON w.mobile=a.mobile AND a.mobile=${req.params.mobile}`;
db.query(select,(err,result)=>{
    
        if(err) return res.status(501).json(err.message);
        
        res.status(201).json(result);
    })
}else{
    res.status(201).json(0);
}
})
})

//get record according id

routes.get('/edit/:id',(req,res)=>{
let sql=`select  * from worker_attendance where id=${req.params.id}`;
db.query(sql,(err,result)=>{
    if(err) res.status(500).json(err.message)
    res.status(200).json(result)

})
})

//update record

routes.put('/',async(req,res)=>{
    let time=req.body.time;
    let date=req.body.date;
    let money=req.body.money;
    if(money==""){
        money='No Money';
    }
    // res.status(200).json(req.body)
    // let select=`select * from workers where mobile=${workerMobile}`;
   
   
            let update=`update worker_attendance set
            gave_money='${money}',
            work_date='${date}',
        work_period='${time}' where id=${req.body.tempIdHolder}`;
   db.query(update,(err)=>{
       if(err) return res.status(500).json('rescord not update')
       res.status(200).json(1)
   })
        
})


//delete record 

routes.delete('/:id',async(req,res)=>{
    let sql=`delete  from worker_attendance where id=${req.params.id}`;
        // res.status(200).json(req.params.mob);
    db.query(sql,(err)=>{
    if(err) return res.status(500).json('Record not Delete')
    
        res.status(200).json('Record Deleted Successfully')
    
    })
    })
    

module.exports=routes;


