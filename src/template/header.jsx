import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { format } from 'date-fns';
import DateRangeIcon from '@mui/icons-material/DateRange';


function Header(){

    const currentDate = new Date();
    const [timeState, setTimeState] = useState(currentDate);


      useEffect(() => {
        const timer = setInterval(() => { 
        setTimeState(new Date());
      }, 1000);
      return () => {
        clearInterval(timer);
      }
    }, []);


return(
    <header className="App-header">

        <Navbar bg="dark" variant="dark">
        <Nav className="container-fluid">
        <QuizOutlinedIcon className="quizIcon" />
        <Navbar.Brand href="#home">QuizFive</Navbar.Brand>
        </Nav>
        </Navbar>

        <Nav className="ms-auto DateAlign">
        
        <Navbar.Brand className="DateMove"><DateRangeIcon /> Date : {format(timeState, "dd/MM/yyyy")}</Navbar.Brand>
        <Navbar.Brand className="TimeAlign">Time : {format(timeState, "HH:mm:ss")}</Navbar.Brand>
        </Nav>  

    </header>
)
    }

export default Header;