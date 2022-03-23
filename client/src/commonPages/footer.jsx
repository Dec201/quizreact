import React, {useEffect, useState} from "react";
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { format } from 'date-fns';

function Footer(){

    const currentDate = new Date();
    const [timeState, setTimeState] = useState(currentDate);

    const year = new Date().getFullYear();


    useEffect(() => {
        const timer = setInterval(() => { 
        setTimeState(new Date());
      }, 1000);
      return () => {
        clearInterval(timer);
      }
    }, []);


    return(
        <div id="footer">
        <div>QuizFive {year} <CopyrightOutlinedIcon /> - Dec Gregorczyk</div>
        <div className="DateMove"><DateRangeIcon /> Date : {format(timeState, "dd/MM/yyyy")}</div>
        <div className="TimeAlign">Time : {format(timeState, "HH:mm:ss")}</div>
        </div>
    )
}

export default Footer;