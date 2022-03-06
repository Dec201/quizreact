import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';


function Questions(props){


    function handleClickAnswer(event){
        if(event.target.id === props.correctAnswer){
            // console.log("winner");
            props.onNextRound();
        } else {
            // console.log("loser");
            props.onFailGame();
        }
    };

    return(

        <div className="questionsMain">
            <div>           
            <h3>Question {props.questionNumber}</h3>
                <p>{props.questionTitle}</p>
                <ul>
                    <li onClick={handleClickAnswer} id="A">{props.answerA}</li>
                    <li onClick={handleClickAnswer} id="B">{props.answerB}</li>
                    <li onClick={handleClickAnswer} id="C">{props.answerC}</li>
                </ul>
                </div>
        </div>
        )
    }

export default Questions;