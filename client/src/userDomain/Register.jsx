import React, {useState} from "react";
import '../css/Registration.css';
import "../css/App.css"
import Axios from "axios";



function Register() {


const [emailRegistration, setEmailRegistration] = useState("");
const [passwordRegistration, setPasswordRegistration] = useState("");
const [newRegisteredEmail, setNewRegisteredEmail] = useState("");

const [userRegistered, setUserRegistered] = useState(false);

Axios.defaults.withCredentials = true;




function EmailChange(e){
    setEmailRegistration(e.target.value);
}

function PasswordChange(e){
    setPasswordRegistration(e.target.value);
}

function RegisterUser(){

    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    Axios.post("http://localhost:3001/register", {
        emailAddress: emailRegistration,
        password: passwordRegistration,
        dateTimeCreated: currentDateTime
    }).then((response) => {
        setNewRegisteredEmail(response.data.emailAddress);
        setUserRegistered(true);
    });
};


function RegistrationNotComplete(){
    return (
        <div>
        <h1 className="MainTitle">Registration</h1>


        <div className="registration">
        <label className="Registration-label">Username</label>
        <input id="username" className="register--username" type="email" 
        placeholder="Email" onChange={EmailChange} />
        <label className="Registration-label" htmlFor="password">Password</label>
        <input id="password" className="register--password" type="password" 
        placeholder="Password" onChange={PasswordChange}></input>

        <button className="btn-login" onClick={RegisterUser}>Register</button>
    </div>
    </div>
    )
}

function RegistrationComplete(){
    return(
    <div>
        <h1>Congratulation on Registering with QuizFive</h1>
        <h2 className="RegisteredEmail-title">{newRegisteredEmail}</h2>
        <p>Please log into your account above to play QuizFive</p>
    </div>
    )
}

return(
<div className="MainContent">
{userRegistered === false ? RegistrationNotComplete() : RegistrationComplete()}
</div>
)

}

export default Register;
