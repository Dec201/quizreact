import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import { Navbar, Nav } from 'react-bootstrap';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { format } from 'date-fns';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Axios from "axios";


function Header(){

    const currentDate = new Date();
    const [timeState, setTimeState] = useState(currentDate);

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState("");

    Axios.defaults.withCredentials = true;


      useEffect(() => {
        const timer = setInterval(() => { 
        setTimeState(new Date());
      }, 1000);
      return () => {
        clearInterval(timer);
      }
    }, []);


    function EmailChange(e){
        setEmailLogin(e.target.value);
    }

    function PasswordChange(e){
        setPasswordLogin(e.target.value);
    } 

    function AttemptUserLogin(){

      Axios.post("http://localhost:3001/login", {
        emailAddress: emailLogin,
        password: passwordLogin
      }).then((response) => {

        if(response){
          setUserLoggedIn(true);
          setLoggedInUserEmail(response.emailAddress);
          console.log(response);
        }
        else{
          console.log(response.id);
          console.log(response.emailAddress);
        }

      }
        
      )}
  




function UserLoggedOutNavBar(){
  return(
    <form>
    <label className="main-label">Email Address</label>
    <input className="main-inputBox" type="email" placeholder="Email" onChange={EmailChange}></input>
    <label className="main-label">Password</label>
    <input className="main-inputBox" type="password" placeholder="Password" onChange={PasswordChange}></input>
    <button className="btn-login" onClick={AttemptUserLogin}>Login</button>
    <Link to={"./register"}>
    <button className="btn-login" as={Link} to="./register" type="button">Register</button>
    </Link>
    </form>
  )
};

function UserLoggedInNavBar(){
  return(
    <p>quizer : {loggedInUserEmail}</p>
  )
}





return(
    <header className="App-header">

        <Navbar bg="dark" variant="dark">
        <Nav className="container-fluid">
        <QuizOutlinedIcon className="quizIcon" />
        <Navbar.Brand href="/">QuizFive</Navbar.Brand>
        </Nav>
        </Navbar>

        {userLoggedIn === false ? UserLoggedOutNavBar() : UserLoggedInNavBar()}

        <Nav className="ms-auto DateAlign">
        <Navbar.Brand className="DateMove"><DateRangeIcon /> Date : {format(timeState, "dd/MM/yyyy")}</Navbar.Brand>
        <Navbar.Brand className="TimeAlign">Time : {format(timeState, "HH:mm:ss")}</Navbar.Brand>
        </Nav>  

    </header>
)
    }

export default Header;