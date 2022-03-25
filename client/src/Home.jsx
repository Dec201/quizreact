import React from "react";
import './css/App.css';
import Trophy from "./images/trophy.jpg"


function Home(){





// return(
    
// )





return(
    <div className="MainContent">
      <h1 className="MainTitle">Welcome to QuizFive</h1>
      <p className="MainText">In order to start playing or viewing your stats either login or register</p>
      <div className="HomeContent">
      <img className="TrophyImage" src={Trophy} alt="Trophy"></img>
          <p className="HomeMainText">If you haven't played before everyday there are is a new set of five questions.
          Try your best to answer all five correctly to win the QuizFive daily trophy. Your historical stats will be 
          shown on the main page. Good Luck!
          </p>
      </div>
      </div>

)


}


export default Home;