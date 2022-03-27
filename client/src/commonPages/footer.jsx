import React, {useEffect, useContext} from "react";
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { format } from 'date-fns';
import {LocalTimeState} from "../helper/Context";

function Footer(){


  const {globalTimeState, setGlobalTimeState} = useContext(LocalTimeState);

    useEffect(() => {
      const timer = setInterval(() => { 
        setGlobalTimeState(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  });


    return(
        <div id="footer">
        <div>QuizFive {globalTimeState.getFullYear()} <CopyrightOutlinedIcon /> - Dec Gregorczyk</div>
        <div className="DateMove"><DateRangeIcon /> Date : {format(globalTimeState, "dd/MM/yyyy")}</div>
        <div className="TimeAlign">Time : {format(globalTimeState, "HH:mm:ss")}</div>
        </div>
    )
}

export default Footer;