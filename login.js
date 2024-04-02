const mysql = require('mysql2');
const express = require ("express");
const bodyParser = require("body-parser");

const app = express();
const encoder = bodyParser.urlencoded();

app.use("/assets",express.static("assets"));
app.use(encoder);
  
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

  app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

  app.post("/", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    connection.query("SELECT * FROM loginuser WHERE user_name = ? AND user_password = ?", [username, password], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
    });
});

  //when login success
  app.get("/welcome", function(req,res){
    res.sendFile(__dirname + "/welcome.html")
  })
  //set app port
  app.listen(4000);

