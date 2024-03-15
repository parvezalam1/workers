// let routes=require('express').Router();
let routes = require('express').Router();
let db = require('../connections');

// routes.post('/register',async (req,res)=>{

routes.post('/', async (req, res) => {
    let workerName = req.body.name;
    let workerMobile = req.body.mobile;
    let workerAddress = req.body.address;
    let workerCharge = req.body.charge;
    let currentUserId = req.body.currentUserId;
    // let select=`select * from workers where mobile=${workerMobile}`;
    db.query(`select mobile from workers where mobile=${workerMobile}`, (err, data) => {
        if (data.length) {
            res.status(201).json({ "match": 'match-mobile' });
        } else {
            let insert = `insert into workers(worker_name,mobile,address,charge,user_id) values(?,?,?,?,?)`;

            db.query(insert, [workerName, workerMobile, workerAddress, workerCharge, currentUserId], (err) => {
                if (err) return res.status(500).json(err.message);


                res.status(201).json('ok');
            })
        }
    });
})

routes.get('/:rid', async (req, res) => {
    let sql = `select * from workers where user_id=${req.params.rid}`;

    db.query(await sql, (err, ele) => {
        if (ele.length > 0) {

            if (err) return res.status(500).json(err.message);

            res.status(200).json(ele);
        } else {
            res.status(200).json('Record not found');
        }
    })
})

routes.get('/getEditRecord/:mobile', async (req, res) => {
    let sql = `select * from workers where mobile=${req.params.mobile}`;

    db.query(await sql, (err, ele) => {
        if (ele.length > 0) {

            if (err) return res.status(500).json(err.message);

            res.status(200).json(ele);
        } else {
            res.status(200).json('Record not found');
        }
    })
})

//delete record 

routes.delete('/:mob', async (req, res) => {
    let sql = `delete  from workers where mobile=${req.params.mob}`;
    let sql2 = `delete from worker_attendance where mobile=${req.params.mob}`;
    // res.status(200).json(req.params.mob);
    await db.query(sql, (err) => {
        db.query(sql2)
        if (err) return res.status(500).json('Record not Delete')

        res.status(200).json('Record Deleted Successfully')

    })
})

//update record
// routes.put('/',async(req,res) => {
//     res.status(200).json(req.body)
// console.log(req.body)
// })

routes.put('/',async(req,res) => {
  
    let workerName = req.body.name;
    let workerMobile = req.body.mobile;
    let workerAddress = req.body.address;
    let workerCharge = req.body.charge;
    let tempHolder = req.body.tempHolder
    // let select=`select * from workers where mobile=${workerMobile}`;


    db.query(`select mobile from workers where mobile!=${tempHolder} AND mobile=${workerMobile}`, (err, data) => {
        if (data.length>0) {
            res.status(201).json('match');
        } 
        else {
            if (workerMobile !== tempHolder) {
                db.query(`update worker_attendance set mobile=${workerMobile} where mobile=${tempHolder}`);
            }
            let update = `update workers set
            worker_name='${workerName}',
            mobile=${workerMobile},
            address='${workerAddress}',
            charge=${workerCharge} where mobile=${tempHolder}`;
            db.query(update, (err) => {
                if (err) return res.status(500).json('rescord not update')
                res.status(200).json(1)
            })
        }
    });
})


// db.close((err)=>{
//     if(err) return console.log(err.message)
//     console.log('db has been closed')
// })


// app.use('./newworker',(req,res)=>{
//     console.log('newworker')
// });
module.exports = routes;