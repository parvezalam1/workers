let mysql=require('mysql')
let conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'constructor'
})
module.exports=conn;