import React, {useEffect, useState} from 'react';
import './css/App.css';
import Home from "./Home";
import Header from './commonPages/header';
import Footer from './commonPages/footer';
import MainBoard from './mainBoard';
import Register from "./userDomain/Register";
import NotFound from './commonPages/NotFound';
import QuestionSubmission from "./questionPages/questionSubmission";
import {Routes, Route} from "react-router-dom";
import Axios from "axios";
import {LoginContext, LoginUserDetails} from "./helper/Context";



function App() {

  const [globalLoggedIn, setGlobalLoggedIn] = useState(false);

  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  Axios.defaults.withCredentials = true;


 

    useEffect(() => {
      Axios.get("http://localhost:3001/login").then((response) => {
          console.log(response);

          if(response.data.loggedIn === true && loggedInStatus === false){
            setLoggedInStatus(true);
              setCurrentUser(response.data);
          }
          else{
            setLoggedInStatus(false);
            setCurrentUser("");
          }

      }).catch(error => {
        console.log("login error", error);
      })

    }, []);

 
  



  return (
    <div className="App">
    <LoginContext.Provider value={{globalLoggedIn, setGlobalLoggedIn}}>
      <Header />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        
        <Route path="/mainboard" element={<MainBoard />} />
        <Route path="/questionSubmission" element={<QuestionSubmission />} />
        

        
      </Routes>

      {globalLoggedIn ? <h1>Hi</h1> : <h1>You are not loggedin</h1>}
    <Footer />
    </LoginContext.Provider>
    </div>
    );
}

export default App;
