import React, { useState, useEffect } from 'react';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';



const Timer = props => {

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState({
        gameStatus: props.timeStatus,
        questionNumber: props.question,
    });


    useEffect(() => {
        if(isActive.gameStatus !== props.timeStatus || isActive.questionNumber !== props.question){
            setIsActive({...isActive, gameStatus: props.timeStatus, questionNumber: props.question});
        }
    }, [isActive, props.timeStatus, props.question]);


    useEffect(() => {
      let interval = null;
      if (isActive.gameStatus === null && isActive.questionNumber !== 1) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
        props.setTimer(seconds);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds, props]);


    return (
        <div>
        <p> <AccessAlarmsIcon /> Time Taken - {seconds} Seconds</p>
        </div>
    )
  };


  
  export default Timer;