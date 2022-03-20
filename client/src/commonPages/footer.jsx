import React from "react";
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';

function footer(){

    const year = new Date().getFullYear();

    return(
        <div id="footer">
            QuizFive {year} <CopyrightOutlinedIcon /> - Dec Gregorczyk
        </div>
    )
}

export default footer;