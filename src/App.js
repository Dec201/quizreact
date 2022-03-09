import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import Header from './template/header';
import Questions from './questions';
import Footer from './template/footer';
import QuizImage from "./images/quizImage1.jpg";
import Winner from "./images/winner.jpg";
import Lost from "./images/lost.jpg";
import Score from './score';
import QuestionList from '../src/questions/dailyQuestionList';
import Confetti from 'react-confetti';
import { v4 as uuidv4 } from 'uuid';
import Time from './time';



function App() {

  const [currentScore, setCurrentScore] = useState(0);
  const [questionSelector, setQuestionSelector] = useState(1);
  const [endGame, setEndGame] = useState(null);

  function failGame(){
    setQuestionSelector(0);
    setEndGame(false);
    console.log("You lose" + questionSelector);
  }

  function nextRound(){

    setCurrentScore(currentScore + 1);

    if(currentScore < 4){
    setQuestionSelector(questionSelector + 1);
    } else {
      winEndGame();
    }
  }

  function winEndGame(){
    setEndGame(true);
    console.log("End Game Won!");
  }

  function mainBoard(){

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
    <div className="App">
    <Header />
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
                questionTitle={question.Title}
                answerA={question.answerA}
                answerB={question.answerB}
                answerC={question.answerC}
                correctAnswer={question.correctAnswer}
                onFailGame={failGame}
                onNextRound={nextRound}
            />
          );
        })
    : mainBoard()}
    <div>
    <Score 
      currentScore={currentScore}
    />
    <Time timeStatus={endGame} question={questionSelector} />
    {(currentScore === 5 && <Confetti gravity={0.02}/>)} 
    <img className="QuizImage" src={QuizImage} alt="Quiz"></img>
    </div>
    </div>
    <Footer />
    </div>

  );
}

export default App;
