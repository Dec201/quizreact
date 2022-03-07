import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import Header from './template/header';
import Questions from './questions';
import Footer from './template/footer';
import QuizImage from "./images/quizImage1.jpg";
import Score from './score';
import QuestionList from '../src/questions/dailyQuestionList';
import Confetti from 'react-confetti';
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [currentScore, setCurrentScore] = useState(0);
  const [questionSelector, setQuestionSelector] = useState(1);
  const [endGameWinner, setEndGameWinner] = useState(false);
  const [endGameLoser, setEndGameLoser] = useState(false);

  function failGame(){
    setEndGameLoser(true);
    console.log("You lose");
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
    setEndGameWinner(true);
    console.log("End Game Won!");
  }

  // renderInputField(){
  //   if(!endGameWinner){
      
  //   }
  // }



  return (
    <div className="App">
    <Header />
    <div className="MainContent">
    <h1 className="MainTitle">QuizFive</h1>
    <p>Answer all five questions correctly to win the daily QuizFive trophy!</p>
    {QuestionList.filter(questionFilter => questionFilter.id === questionSelector)
        .map((question, index) => {
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
        })}
           
    <div>
    <Score 
      currentScore={currentScore}
    />
    {(currentScore === 5 && <Confetti gravity={0.02}/>)} 
    <img className="QuizImage" src={QuizImage} alt="quiz image"></img>
    </div>
    </div>
    <Footer />
    </div>

  );
}

export default App;
