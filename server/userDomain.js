const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const saltRounds = 10;

const app = express();
const userDomainRouter = express.Router();

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
      key: "userCookieId",
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 500000,
      },
    })
  );



userDomainRouter.get("/login", (req, res) => {
    if(req.session.user){
      res.send({loggedIn: true, userid: req.session.user[0].id, emailAddress: req.session.user[0].emailAddress})
    } else {
      res.send({loggedIn: false})
    }
});


userDomainRouter.get("/logout", (req, res) => {

  if(req.session.user){

    req.session.destroy();
    res.json({message: "You have been logged out", loggedOut: true});
  }
  else {
    res.json({message: "You have not been logged out", loggedOut: false});
  }

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

              if(error){
                console.log(error);
              }

              if (response) {
                req.session.user = result;
                console.log(req.session.user);
                res.json({userid: req.session.user[0].id, emailAddress: req.session.user[0].emailAddress, message: "You have logged in"});

              } else {
                res.json({message: "Incorrect username or password"});
              }
            });
          } else {
            res.json({message: "no user exists"});
          }
        }
      );
    });






module.exports = userDomainRouter;