import Axios from "axios";
import React, {useState, useContext, useEffect} from "react";
import '../css/App.css';
import {LoginContext, LoginUserDetails, LocalTimeState} from "../helper/Context";
import swal from 'sweetalert';


function QuestionSubmission(){


    const {globalLoggedIn} = useContext(LoginContext);
    const {globalCurrentUser} = useContext(LoginUserDetails);
    const {globalTimeState} = useContext(LocalTimeState);

    const [questionName, setQuestionName] = useState("");
    const [questionAnswer, setquestionAnswer] = useState("");
    const [quizAnswerA, setquizAnswerA] = useState("");
    const [quizAnswerB, setquizAnswerB] = useState("");

    Axios.defaults.withCredentials = true;
  
    // const [quizQuestionList, setQuizQuestionList] = useState({});


    //local storage to save quiz question

    useEffect(() => {
        const formData = window.localStorage.getItem("questionFormStorage");
        const savedValues = JSON.parse(formData);
        setQuestionName(savedValues.questionName);
        setquestionAnswer(savedValues.questionAnswer);
        setquizAnswerA(savedValues.quizAnswerA);
        setquizAnswerB(savedValues.quizAnswerB);
    }, [])

    useEffect(() => {
        const valuesToSave = {questionName, questionAnswer, quizAnswerA, quizAnswerB}
        window.localStorage.setItem("questionFormStorage", JSON.stringify(valuesToSave));
    });


    // send quiz question + user id/email to server
  

    function submitQuizQuestion(){

        if(globalLoggedIn && globalCurrentUser.userid > 0)
        {
        Axios.post("http://localhost:3001/quizSubmission", {
            questionName: questionName,
            questionAnswer: questionAnswer,
            quizAnswerA: quizAnswerA,
            quizAnswerB: quizAnswerB,
            globalCurrentUserid: globalCurrentUser.userid,
            globalCurrentUserEmail: globalCurrentUser.emailAddress,
            globalTimeState: globalTimeState.toISOString().slice(0, 19).replace('T', ' ')
        }).then((response) => {

            if(response.data.postedQuestion === true){
            swal({
                title: "Thanks!",
                text: response.data.message,
                icon: "success",
                button: "Confirm",
              });

              setQuestionName("");
              setquestionAnswer("");
              setquizAnswerA("");
              setquizAnswerB("");
            }
            if(response.data.postedQuestion === false){
                swal({
                    title: "Failed",
                    text: response.data.message,
                    icon: "warning",
                    button: "Confirm",
                  });
                }
        });
            
            //   setQuizQuestionList([...quizQuestionList,
            //      {questionName: questionName,
            //       questionAnswer: questionAnswer,
            //       quizAnswerA: quizAnswerA,
            //       quizAnswerB: quizAnswerB,
            //       globalCurrentUserid: globalCurrentUser.id,
            //       globalCurrentUserEmail: globalCurrentUser.emailAddress            
            //    }]);    
        };

        if(!globalLoggedIn || globalCurrentUser === null)
        {
            swal({
                title: "Get Yourself Logged In!",
                text: "Try Again",
                icon: "warning",
                button: "Confirm",
              });
        }

    }
    
    


return(
    <div className="MainContent">
      <h1 className="MainTitle">Submit a Quiz Question</h1>
      <p className="MainText">Our database is always exicted and hungry for new Quiz Questions! Keep them clean please!</p>

    <div className="form nav-item questionForm">
    <label htmlFor="QuestionName">Quiz Question</label>
    <textarea id="QuestionName" className="questionName-Input" maxLength="200" type="text" name="questionName" placeholder="Quiz Question" rows="3" cols="40" value={questionName} onChange={(e) => {
      setQuestionName(e.target.value)
    }}></textarea>
    <label htmlFor="CorrectAnswer">Correct Answer</label>
    <input id="CorrectAnswer" className="questionName-Input" type="text" name="questionAnswer" placeholder="Correct Answer" value={questionAnswer} onChange={(e) => {
      setquestionAnswer(e.target.value)
    }}></input>
    <label htmlFor="WrongAnswerA">Wrong Answer A</label>
    <input id="WrongAnswerA" className="questionName-Input" type="text" name="quizAnswerA" placeholder="Wrong Answer A" value={quizAnswerA} onChange={(e) => {
      setquizAnswerA(e.target.value)
    }}></input>
    <label htmlFor="WrongAnswerB">Wrong Answer B</label>
    <input id="WrongAnswerB" className="questionName-Input" type="text" name="quizAnswerB" placeholder="Wrong Answer B" value={quizAnswerB} onChange={(e) => {
      setquizAnswerB(e.target.value)
    }}></input>

    <button className="btn-login" type="submit" onClick={submitQuizQuestion}>Submit</button>
    </div>
    </div>
)

}






export default QuestionSubmission;