let routes = require('express').Router();
let db = require('../connections');

//insert new register 

routes.post('/', async (req, res) => {
    let username = req.body.username;
    let mobile = req.body.mobile;
    let password = req.body.password;
    let sql = `select * from owner_register where username='${username}'
or mobile=${mobile} or password='${password}'`;

    db.query(sql, [], (err, rows) => {

        if (rows.length > 0) {
            if (rows[0].username === username || rows[0].mobile === mobile) {
                res.status(200).json('user');

            } else {

                res.status(200).json('pass');
            }
        }
        else {
            let insert = `insert into owner_register(username,mobile,password) values (?,?,?)`;
            db.query(insert, [username, mobile, password], (err, result) => {

                if (err) {
                    console.log(err)
                    res.status(501).json(0);
                } else {
                    console.log(result)
                    res.status(200).json(1);
                }
            })
        }
    })
})

//login process

routes.post('/login', async (req, res) => {
    let sql = null;
    let loginUser = req.body.loginUsername;
    let loginPassword = req.body.loginPassword;
    if (!isNaN(loginUser)) {
        sql = `select * from owner_register 
    where mobile=${loginUser}
    `;
    } else {

        sql = `select * from owner_register 
    where username='${loginUser}'
    `;
    }
    db.query(sql, (err, result) => {
        if (result.length > 0) {
            if (result[0].password === `${loginPassword}`) {
                // res.status(201).json(result)
                res.json({ status: 201, result: result, data: 1 })

            } else {
                res.status(201).json('pass')
            }
        } else {
            res.status(201).json('user')
        }


    })

})


routes.get('/:username', async (req, res) => {
    db.query(`select * from owner_register where username='${req.params.username}'`, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(501).json(err.message)
        }
    })
})

routes.get('/edit/:rid', async (req, res) => {
    // res.status(200).json(11);
    db.query(`select * from owner_register where rid=${req.params.rid}`, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(501).json(err.message)
        }
    })
})

//update record

routes.put('/', async (req, res) => {
    let updateUser = req.body.updateuser;
    let updateMobile = req.body.updatemobile;
    let updatePassword = req.body.updatepassword;
    let rid = req.body.tempHolder;
    // res.status(201).json(req.body);
//     let sql = `select  * from owner_register where rid!=${rid} or username='${updateUser}' or mobile=${updateMobile} or
//  password='${updatePassword}'`;
 
let sql=`select  * from owner_register where rid!=${rid}`;
    db.query(sql, (err, result) => {
        for(rest in result){
                if (result[rest].username === updateUser || result[rest].mobile === updateMobile) {
                    res.status(201).json('user');
                }
                else if(result[rest].password===updatePassword){
                    res.status(201).json('pass');
                }
            else {
                let update = `update owner_register set username='${updateUser}',
    mobile=${updateMobile},
    password='${updatePassword}' where rid=${rid}
    `;
                db.query(update, (err) => {
                    if (err) return res.status(501).json(0);
    
                    res.status(201).json(1);
                });
            }
        }
    })

})


//delte record
routes.delete('/:delid', async (req, res) => {
    db.query(`delete from owner_register where rid=${req.params.delid}`, (err) => {
        if (err) res.status(501).json(0);

        res.status(201).json(1);
    })
})
module.exports = routes;