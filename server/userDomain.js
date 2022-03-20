const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const saltRounds = 10;

const app = express();
const userDomainRouter = express.Router();

app.use(bodyParser.urlencoded({extended: true}));

require('dotenv'). config();


const db = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_LOCK_KEY,
    database: process.env.DB_USERS_TABLE_NAME
});


userDomainRouter.use(
    session({
      key: "userId",
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 50000,
      },
    })
  );



userDomainRouter.get("/login", (req, res) => {
    res.send("hi");
});




userDomainRouter.post("/register", (req, res) => {

    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    const dateTimeCreated = req.body.dateTimeCreated;

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        
        if(err){
            console.log(err);
        }
        
        db.query("INSERT INTO users (emailAddress, password, dateTimeCreated) VALUES (?, ?, ?)", 
        [emailAddress, hashedPassword, dateTimeCreated], (err, result) => {
            
            if(err){
                console.log(err);
            }

            console.log("Added New Account To Database");
            res.json({emailAddress: emailAddress});
        })
    });
});

userDomainRouter.post("/login", (req, res) => {

    const emailAddress = req.body.emailAddress;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE emailAddress = ?;",
        emailAddress,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
    
          if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
              if (response) {
  
                

                req.session.user = result;
  
                res.json({result: result});

                console.log(result);

              } else {
                res.json({message: "Wrong username/password combo"});
              }
            });
          } else {
            res.json({message: "no user exists"});
          }
        }
      );
    });






module.exports = userDomainRouter;