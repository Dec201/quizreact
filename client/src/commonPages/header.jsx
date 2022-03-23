import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { Link } from "react-router-dom";
import Axios from "axios";


function Header(){

 

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState("");

    Axios.defaults.withCredentials = true;





    useEffect(() => {
      Axios.get("http://localhost:3001/login").then((response) => {
        if(response.data.loggedIn == true){
        setLoggedInUserEmail(response.data.emailAddress);
        }
      });
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
        password: passwordLogin,
      }).then((response) => {

        if(response.data.message === "You have logged in"){
          console.log(response);
          setUserLoggedIn(true);
          setLoggedInUserEmail(response.data.emailAddress);
          console.log(response.data);
          console.log(userLoggedIn);
          console.log(loggedInUserEmail);
        }
        else{
          console.log(response.message);
        }

      }       
    )}

    
  




function UserLoggedOutNavBar(){
  return(
    <form className="nav-item">
    <label htmlFor="email" className="main-label">Email Address</label>
    <input id="email" className="main-inputBox" type="email" placeholder="Email" onChange={EmailChange}></input>
    <label htmlFor="password" className="main-label">Password</label>
    <input id="password" className="main-inputBox" type="password" placeholder="Password" onChange={PasswordChange}></input>
    <button className="btn-login" type="button" onClick={AttemptUserLogin}>Login</button>
    <Link to={"./register"}>
    <button className="btn-login" as={Link} to="./register" type="button">Register</button>
    </Link>
    </form>
  )
};

function UserLoggedInNavBar(){
  return(
    <div className="nav-item">
    Quiz Master : {loggedInUserEmail}
    </div>
  )
}



return(

    <header className="App-header">
      <div className="nav-flex-bar">

        <a className="nav-item nav-brand" href="/"><QuizOutlinedIcon className="quizIcon" fontSize="large"  />QuizFive</a>

        
        {userLoggedIn === false ? UserLoggedOutNavBar() : UserLoggedInNavBar()}       
        

      </div>
    </header>
    
    )}
    

export default Header;