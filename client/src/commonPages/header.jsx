import React, {useState, useContext, useEffect} from "react";
import '../css/App.css';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { Link } from "react-router-dom";
import Axios from "axios";
import swal from 'sweetalert';
import {LoginContext, LoginUserDetails} from "../helper/Context";


function Header(){

    const {globalLoggedIn, setGlobalLoggedIn} = useContext(LoginContext);
    const {globalCurrentUser, setGlobalCurrentUser} = useContext(LoginUserDetails);

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");


    Axios.defaults.withCredentials = true;



    useEffect(() => {
       Axios.get("http://localhost:3001/login").then((response) => {
        if(response.data.loggedIn === true){
          setGlobalLoggedIn(true);
          setGlobalCurrentUser(response.data);
        }
      });
    }, [setGlobalLoggedIn , setGlobalCurrentUser]);



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
          setGlobalCurrentUser(true);
          setGlobalCurrentUser(response.data);
          setGlobalLoggedIn(true);
        }
        else{
          console.log(response.message);
        }

      }       
    )}

    function LogCurrentUserOut(){

      Axios.get("http://localhost:3001/logout").then((response) => {

        if(response.data.loggedOut === true){

          swal({
            title: "Come Back Soon!",
            text: response.data.message,
            icon: "success",
            button: "Confirm",
          });

        } else {
          
          swal({
            title: "Something Went Wrong!",
            text: response.data.message,
            icon: "warning",
            button: "Confirm",
          });

        }

      });

      setGlobalCurrentUser(null);
      setGlobalLoggedIn(false);

    }
  




function UserLoggedOutNavBar(){
  return(
    <form className="nav-item">
    <div className="nav-item__block">
    <label htmlFor="email" className="main-label">Email Address</label>
    <input id="email" className="main-inputBox" type="email" placeholder="Email" onChange={EmailChange}></input>
    </div>
    <div className="nav-item__block">
    <label htmlFor="password" className="main-label">Password</label>
    <input id="password" className="main-inputBox" type="password" placeholder="Password" onChange={PasswordChange}></input>
    </div>
    <div className="nav-item__block">
    <button className="btn-login" type="button" onClick={AttemptUserLogin}>Login</button>
    <Link to={"./register"}>
    <button className="btn-login" as={Link} to="./register" type="button">Register</button>
    </Link>
    </div>
    </form>
  )
};

function UserLoggedInNavBar(){
  return(
    <div className="nav-item">
    Quiz Master : {globalCurrentUser === null ? "" : globalCurrentUser.emailAddress}   
    <Link to={"./"}>
    <button className="btn-login" onClick={LogCurrentUserOut} as={Link} to="./" type="submit">Logout</button>
    </Link>
    <Link to={"./mainboard"}>
    <button className="btn-login" as={Link} to="./mainboard" type="button">Quiz</button>
    </Link>
    <Link to={"./questionSubmission"}>
    <button className="btn-login" as={Link} to="./questionSubmission" type="button">Submit Q</button>
    </Link>
    </div>
  )
}



return(

    <header className="App-header">
      <div className="nav-flex-bar">
        <Link to={"./"}>
        <div className="nav-item nav-brand"><QuizOutlinedIcon className="quizIcon" fontSize="large"  />QuizFive</div>
        </Link>
        {globalLoggedIn === false ? UserLoggedOutNavBar() : UserLoggedInNavBar()}    

      </div>
    </header>
    
    )}
    

export default Header;