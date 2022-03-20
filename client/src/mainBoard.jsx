import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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


function MainBoard() {


    const [currentScore, setCurrentScore] = useState(0);
    const [questionSelector, setQuestionSelector] = useState(1);
    const [endGame, setEndGame] = useState(null);
    const [gameTimer, setGameTimer] = useState(0);
  
  
    function failGame(){
      setQuestionSelector(0);
      setEndGame(false);
      console.log("You lose" + questionSelector);
    };
  
    function nextRound(){
  
      console.log(process.env.REACT_APP_JWT_API_KEY);
      setCurrentScore(currentScore + 1);
      
  
      if(currentScore < 4){
      setQuestionSelector(questionSelector + 1);
      console.log(Time.seconds);
      } else {
        winEndGame();
      }
    };
  
    function winEndGame(){
      setEndGame(true);
      console.log(gameTimer);
      console.log("End Game Won!");
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
          </div>
        )
      }
      if(endGame === false){
        return(
          <div>
          <img className="WinnerImage" src={Lost} alt="Losing"></img>
        <p>You lose, better luck tomorrow</p>
        </div>
        )
      }
  
    }
  
  
  
    return (
        <div>
      <div className="MainContent">
      <h1 className="MainTitle">QuizFive</h1>
      <p>Answer all five questions correctly to win the daily QuizFive trophy!</p>
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
                  onNextRound={nextRound}
              />
            );
          })
      : endGameChecker()}
      <div>
      <Score 
        currentScore={currentScore}
      />
      <Time timeStatus={endGame} question={questionSelector} onChange={handleChange} />
      {(currentScore === 5 && <Confetti gravity={0.02}/>)} 
      <img className="QuizImage" src={QuizImage} alt="Quiz"></img>
      </div>
      </div>
      </div>
  
    );
  }

  export default MainBoard;