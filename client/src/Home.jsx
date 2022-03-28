import React, {useContext} from "react";
import './css/App.css';
import Trophy from "./images/trophy.jpg"
import {LoginContext, LoginUserDetails} from "./helper/Context";


function Home(){

    const {globalLoggedIn} = useContext(LoginContext);
    const {globalCurrentUser} = useContext(LoginUserDetails);


function HomePageLoggedIn(){
return(
    <div className="MainContent">
    <h1 className="MainTitle">QuizFive</h1>
    <p className="MainText">Howdy {globalCurrentUser.emailAddress}</p>
    <p className="MainText">Here is a breakdown of your past statistics</p>
    <div className="HomeContent">
    <p className="HomeMainText">If you haven't played before everyday there are is a new set of five questions.
        Try your best to answer all five correctly to win the QuizFive daily trophy. Your historical stats will be 
        shown on the main page. Good Luck!
        </p>
        <p className="HomeMainText">If you haven't played before everyday there are is a new set of five questions.
        Try your best to answer all five correctly to win the QuizFive daily trophy. Your historical stats will be 
        shown on the main page. Good Luck!
        </p>
    </div>
    </div>
)
};


function HomePageLoggedOut(){

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


return (
<div>
{globalLoggedIn === true ? HomePageLoggedIn() : HomePageLoggedOut()}
</div>
)


}


export default Home;