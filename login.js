const mysql = require('mysql2');
const express = require ("express");


const app = express();
app.use("/assets",express.static("assets"));
  
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'Mysql',
    database: 'nodejs' 
  });

  //connect database use (mysql2 and use node i myslq2 to install)
connection.connect(function(error) {
    if (error) throw error
    else console.log('Connected to MySQL');
  });

  app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
  })

  app.post("/",function(req,res){
    connection.query("select * from loginuser where user_name ? and user_password = ?",function(error,results,fields){
      is (results.length > 0) {
        req.redirect("/welcome.html")
      }
    })
  })
  //set app port
  app.listen(4500);

