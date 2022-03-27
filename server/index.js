const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userDomainRouter = require("./userDomain");
const quizSubmissionRouter = require("./quizSubmission");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );







app.get("/", (req, res) => {
    res.send("hello");
})

app.use("/", userDomainRouter);
app.use("/", quizSubmissionRouter);

app.listen(3001, () => {
    console.log("Running server on port 3001");
})