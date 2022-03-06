import React, { useState } from "react";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function Score(props){

    return(
        <p className="Score"><EmojiEventsIcon />  Score  -  {props.currentScore} / 5</p>
    )
}

export default Score;