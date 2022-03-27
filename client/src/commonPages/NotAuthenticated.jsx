import React from "react";
import '../css/App.css';
import {Link} from "react-router-dom";
import PadLock from "../images/padlock.jpg";

function NotAuthenticated(){

    return(
        <div className="MainContent">
        <h1 className="MainTitle">Page Not Found</h1>
        <p>You shouldn't be here without authentication, press the main page button to return back</p>
        <div className="NotFoundFlexContainer">
              <Link to={"./"}>
             <button className="btn-login" as={Link} to="./">Main Page</button>
             </Link>

             <img className="QuestionImage" src={PadLock} alt="Question Mark"></img>
             </div>
             </div>

    )


}

export default NotAuthenticated;