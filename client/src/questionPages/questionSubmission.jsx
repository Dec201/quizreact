import Axios from "axios";
import React, {useState} from "react";
import '../css/App.css';


function QuestionSubmission(){


    const [questionName, setQuestionName] = useState("");
    const [questionAnswer, setquestionAnswer] = useState("");
    const [quizAnswerA, setquizAnswerA] = useState("");
    const [quizAnswerB, setquizAnswerB] = useState("");
  
    const [quizQuestionList, setQuizQuestionList] = useState([]);
  
    const [newQuestionAnswer, setNewQuestionAnswer] = useState("");


    function submitQuizQuestion(){
        Axios.post("http://localhost:3001/api/insert", {
            questionName: questionName,
            questionAnswer: questionAnswer,
            quizAnswerA: quizAnswerA,
            quizAnswerB: quizAnswerB});
            
              setQuizQuestionList([...quizQuestionList,
                 {questionName: questionName,
                  questionAnswer: questionAnswer,
                  quizAnswerA: quizAnswerA,
                  quizAnswerB: quizAnswerB}]);    
        };
    
    


return(
    <div className="MainContent">
      <h1 className="MainTitle">Submit a Quiz Question</h1>
      <p className="MainText">Our database is always exicted and hungry for new Quiz Questions! Keep them clean please!</p>

    <div className="form">
    <label>Quiz Question</label>
    <input type="text" name="questionName" placeholder="Quiz Question" onChange={(e) => {
      setQuestionName(e.target.value)
    }}></input>
    <label>Quiz Correct Answer</label>
    <input type="text" name="questionAnswer" placeholder="Correct Answer" onChange={(e) => {
      setquestionAnswer(e.target.value)
    }}></input>
    <label>Quiz Wrong Answer A</label>
    <input type="text" name="quizAnswerA" placeholder="Wrong Answer A" onChange={(e) => {
      setquizAnswerA(e.target.value)
    }}></input>
    <label>Quiz Wrong Answer B</label>
    <input type="text" name="quizAnswerB" placeholder="Wrong Answer B" onChange={(e) => {
      setquizAnswerB(e.target.value)
    }}></input>

    <button className="btn-login" type="submit" onClick={submitQuizQuestion}>Submit</button>
    </div>
    </div>
)

}






export default QuestionSubmission;