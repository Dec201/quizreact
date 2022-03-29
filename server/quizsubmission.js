const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const quizSubmissionRouter = express.Router();

require('dotenv'). config();

app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_LOCK_KEY,
    database: process.env.DB_USERS_TABLE_NAME
});

quizSubmissionRouter.post("/quizSubmission", (req, res) => {

    const questionName = req.body.questionName
    const questionAnswer = req.body.questionAnswer
    const quizAnswerA = req.body.quizAnswerA
    const quizAnswerB = req.body.quizAnswerB
    const globalCurrentUserid = req.body.globalCurrentUserid
    const globalTimeState = req.body.globalTimeState

    db.query("INSERT into question_submit (questionName, questionAnswer, quizAnswerA, quizAnswerB, globalCurrentUserid, globalTimeState) VALUES (?, ?, ?, ?, ?, ?)",
    [questionName, questionAnswer, quizAnswerA, quizAnswerB, globalCurrentUserid, globalTimeState], (err, result) => {

        if(err){
            res.json({postedQuestion: false, message: "Quiz question has not been registered"});
        }

        if(result){
            res.json({postedQuestion: true, message: "Quiz question has been sent"});
        }

    })

});


quizSubmissionRouter.post("/quizDailyPerformance", (req, res) => {

    const globalCurrentUserGameid = req.body.globalCurrentUserid
    const globalDateOnly = req.body.globalDateOnly
    const userScore = req.body.userScore
    const userTimer = req.body.userTimer

    
    db.query("INSERT into user_quiz_performance (userid, date, score, timer) VALUES (?, ?, ?, ?)",
    [globalCurrentUserGameid, globalDateOnly, userScore, userTimer], (err, result) => {

        if(err){
            res.json({quizPerformanceSubmitted: false, message: "Quiz question has not been registered"});
        }

        if(result){
            res.json({quizPerformanceSubmitted: true, message: "Quiz question has been sent"});
        }

    })

});

// quizSubmissionRouter.get("/quizDailyPerformance", (req, res) => {

// });
















module.exports = quizSubmissionRouter;