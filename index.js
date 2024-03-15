let express=require('express');
let app=express();
let PORT=5000;
let newWorker=require('./routes/newWorkers');
let addAttendance=require('./routes/addAttendance');
let resetPassword=require('./routes/resetPassword');
let auth=require('./routes/auth');
app.use(express.json());

app.use('/api/register',auth);
app.use('/api/addNewWorkers',newWorker);
app.use('/api/addAttendance',addAttendance);
app.use('/api/resetPassword',resetPassword);

// app.use('/api/auth',authRouter);

app.listen(PORT,()=>{
    console.log('backend is running on port',PORT);
})


//create register table
// db.run(
//     `create table owner_register (rid INTEGER PRIMARY KEY AUTOINCREMENT,
//         username text not null unique,
//         mobile  BIGINT NOT NULL UNIQUE,  
//         password text NOT NULL UNIQUE
//         )`
//     );
// db.all('SELECT * FROM owner_register',(err,data)=>{
//     if(err) return console.log(err.message)
//     console.log(data)
// });
//create table
// db.run(
//     `create table workers(id INTEGER PRIMARY KEY AUTOINCREMENT,worker_name text NOT NULL,mobile INT unique NOT NULL
//         ,address VARCHAR(70) NOT NULL,charge REAL NOT NULL,Timestamp  DEFAULT CURRENT_TIMESTAMP )`
// );

// db.run(
//     `create table worker_attendance(id INTEGER PRIMARY KEY AUTOINCREMENT,mobile INT NOT NULL ,
//         work_date DATE not null,work_period text NOT NULL,gave_money INTEGER DEFAULT 'not',
//         FOREIGN KEY(mobile) REFERENCES workers(mobile))`
// );
// db.run(
//     `alter table  worker_attendance change gave_money money text`,(e)=>{
//         if(e) return console.log('table not modified')
//         else return console.log('table has been modified')
//     }
//     );
    // db.run(
    //     `update worker_attendance set work_date=CAST(work_date as date)`,(e)=>{
    //         if(e) return console.log('table not modified')
    //         else return console.log('table has been modified')
    //     }
    //     );
// insert table
// let insert=`insert into worker_attendance(mobile,work_date,work_period,gave_money) values(?,?,?,?)`;
// db.run(insert,['700122','1-03-2023','full day'],(succ)=>{
//     if(succ) return console.log('something went wrong')
// console.log('one record has been inserted')
// });
// db.all("select * from worker_attendance", function (err, table) {
//     if(err) console.log(err.message)
//     console.log(table);
// });
// db.serialize(function () {
// });
//alter table 
// db.run(
//     `alter table workers add Timestamp DATETIME DEFAULT CURRENT_TIEMSTAMP`,(e)=>{
//         if(e) return console.log('table not modified')
//         else return console.log('table has been modified')
//     }
//     );

// let update=`UPDATE workers SET
// worker_name='hsl',
// mobile=7721,
// address='s',
// charge=20 where mobile=37`;
// db.run(update,(err)=>{
// if(err) return console.log(err.message)
// console.log('update')
// })

// insert table
// let insert=`insert into workers(worker_name,mobile,address,charge) values(?,?,?,?)`;
// db.run(insert,['temp',75534372,'abdd',250],(succ)=>{
//     if(succ) return console.log('something went wrong')
// console.log('one record has been inserted')
// });

//select 
// let sql=`select mobile from workers where mobile=377`;
// db.all('select mobile from workers where mobile=3771',(err,data)=>{
// if(data){
// console.log('f',data)
// }else{
//     console.log('n',data)
// }
// });
// db.all(sql,(err,ele)=>{
//    ele.forEach(element => {
//     console.log(element)
//    });
// })
//  db.run('alter table workers drop Timestamp',(err)=>{
// if(err) return console.log(err.message)
// console.log('column drop');
//  });
// drop table
// db.run('drop table workers',(err)=>{
//     if(err){
//         console.log('something wrong');
//     }
//         console.log('table has been droped');
    
// });
//delete
// db.run('delete from owner_register ',(err)=>{
//     if(err) return console.log('wrong')
//     console.log('all record deleted')
// })