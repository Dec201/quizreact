import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom";
import './css/App.css';
import Questions from './questionPages/questions';
import QuizImage from "./images/quizImage1.jpg";
import Winner from "./images/winner.jpg";
import Lost from "./images/lost.jpg";
import Score from './pages/score';
import QuestionList from './questionPages/dailyQuestionList';
import Confetti from 'react-confetti';
import { v4 as uuidv4 } from 'uuid';
import Time from './pages/time';
import Axios from "axios";
import {LoginContext, LoginUserDetails, LocalTimeState} from "./helper/Context";


function MainBoard() {

  const {globalLoggedIn} = useContext(LoginContext);
  const {globalCurrentUser} = useContext(LoginUserDetails);
  const {globalTimeState} = useContext(LocalTimeState);

  let WinningScoreHackJobToAvoidAnnoyingUseEffect = 0;

    const [currentScore, setCurrentScore] = useState(0);
    const [questionSelector, setQuestionSelector] = useState(1);
    const [endGame, setEndGame] = useState(null);
    const [gameTimer, setGameTimer] = useState(0);
  
    // const [questionIdNumber, setQuestionIdNumbner] = useState(0);
  
    Axios.defaults.withCredentials = true;


    function logDailyQuizPerformance(){

      if(WinningScoreHackJobToAvoidAnnoyingUseEffect < 5){
        WinningScoreHackJobToAvoidAnnoyingUseEffect = currentScore;
      }

      if(globalLoggedIn && globalCurrentUser.userid > 0)
      {
      Axios.post("http://localhost:3001/quizDailyPerformance", {
          globalCurrentUserid: globalCurrentUser.userid,
          globalDateOnly: globalTimeState.toISOString().slice(0, 19).replace('T', ' '),
          userScore: WinningScoreHackJobToAvoidAnnoyingUseEffect,
          userTimer: gameTimer         
      }).then((response) => {
          console.log(response);
      })};
    }
    


    function failGame(){
      setQuestionSelector(0);
      setEndGame(false);
      console.log("You lose" + questionSelector);
      logDailyQuizPerformance();

    };
  
    function NextRound(){
  
      setCurrentScore(currentScore + 1);
        
      if(currentScore < 4)
      {
      setQuestionSelector(questionSelector + 1);
      } 
      else 
      {
        WinningScoreHackJobToAvoidAnnoyingUseEffect = 5;
        setEndGame(true);
        console.log("End Game Won!");
        logDailyQuizPerformance();
      }
    };

    

  
    function handleChange(newValue){
      setGameTimer(newValue);
      console.log(gameTimer);
    };
  
    function endGameChecker(){
  
      if(endGame === true){
        return(
          <div>
          <img className="WinnerImage" src={Winner} alt="Winning"></img>
          <p>You smashed the quiz!</p>
          <Link to={"/"}>
             <button className="btn-login mainboard-btn" as={Link} to="/">Home</button>
             </Link>
          </div>
        )
      }
      if(endGame === false){
        return(
          <div>
          <img className="WinnerImage" src={Lost} alt="Losing"></img>
        <p>You lose, better luck tomorrow</p>
              <Link to={"/"}>
             <button className="btn-login mainboard-btn" as={Link} to="/">Home</button>
             </Link>
        </div>
        )
      }
  
    }
  
  
  
    return (
        <div>
      <div className="MainContent">
      <h1 className="MainTitle">QuizFive</h1>
      <p className="MainPara">Answer all five questions correctly to win the daily QuizFive trophy!</p>
      {endGame === null ? 
      QuestionList.filter(questionFilter => questionFilter.id === questionSelector)
          .map((question) => {
            return (
              <Questions 
                  key={uuidv4()}
                  id={question.id}
                  questionNumber={question.questionNumber}
                  questionTitle={question.questionTitle}
                  answerA={question.answerA}
                  answerB={question.answerB}
                  answerC={question.answerC}
                  correctAnswer={question.correctAnswer}
                  onFailGame={failGame}
                  onNextRound={NextRound}
              />
            );
          })
      : endGameChecker()}
      <div>
      <Score 
        currentScore={currentScore}
      />
      <Time timeStatus={endGame} question={questionSelector} onChange={handleChange} setTimer={setGameTimer} />
      {(currentScore === 5 && <Confetti gravity={0.02}/>)} 
      <img className="QuizImage" src={QuizImage} alt="Quiz"></img>
      </div>
      </div>
      </div>
  
    );
  }


  export default MainBoard;