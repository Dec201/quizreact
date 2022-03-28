import React from "react";
import '../css/App.css';
import {Link} from "react-router-dom";
import QuestionMark from "../images/question-mark.jpg";

function NotFound(){

    return(
        <div className="MainContent">
        <h1 className="MainTitle">Page Not Found</h1>
        <p>You seemed to have stumbled into the unknown, press the main page button to return back</p>
        <div className="NotFoundFlexContainer">
        
              <Link to={"./"}>
             <button className="btn-login" as={Link} to="./">Main Page</button>
             </Link>

             <img className="QuestionImage" src={QuestionMark} alt="Question Mark"></img>
             </div>
             </div>

    )


}

export default NotFound;