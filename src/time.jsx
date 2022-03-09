import React, { useState, useEffect } from 'react';


const Timer = props => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState({
        gameStatus: props.timeStatus,
        questionNumber: props.question
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
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    });
    // , [isActive, seconds]);
  
    return (
        <p>Time Taken - {seconds} Seconds</p>
    );
  };


  
  export default Timer;