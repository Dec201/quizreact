import React from 'react';
import './css/App.css';
import Header from './commonPages/header';
import Footer from './commonPages/footer';
import MainBoard from './mainBoard';
import Register from "./userDomain/Register";
import {Router, Routes, Route} from "react-router-dom";


function App() {


  // const [currentScore, setCurrentScore] = useState(0);
  // const [questionSelector, setQuestionSelector] = useState(1);
  // const [endGame, setEndGame] = useState(null);
  // const [gameTimer, setGameTimer] = useState(0);


  // function failGame(){
  //   setQuestionSelector(0);
  //   setEndGame(false);
  //   console.log("You lose" + questionSelector);
  // };

  // function nextRound(){

  //   console.log(process.env.REACT_APP_JWT_API_KEY);
  //   setCurrentScore(currentScore + 1);
    

  //   if(currentScore < 4){
  //   setQuestionSelector(questionSelector + 1);
  //   console.log(Time.seconds);
  //   } else {
  //     winEndGame();
  //   }
  // };

  // function winEndGame(){
  //   setEndGame(true);
  //   console.log(gameTimer);
  //   console.log("End Game Won!");
  // };

  // function handleChange(newValue){
  //   setGameTimer(newValue);
  //   console.log(gameTimer);
  // };

  // function mainBoard(){

  //   if(endGame === true){
  //     return(
  //       <div>
  //       <img className="WinnerImage" src={Winner} alt="Winning"></img>
  //       <p>You smashed the quiz!</p>
  //       </div>
  //     )
  //   }
  //   if(endGame === false){
  //     return(
  //       <div>
  //       <img className="WinnerImage" src={Lost} alt="Losing"></img>
  //     <p>You lose, better luck tomorrow</p>
  //     </div>
  //     )
  //   }

  // }



  return (
    <div className="App">
    <Header />
    {/* <MainBoard /> */}

      <Routes>
        <Route path="/" element={<MainBoard />} />
        <Route path="/register" element={<Register />} />
      </Routes>


    <Footer />
    </div>
    );
}

export default App;
