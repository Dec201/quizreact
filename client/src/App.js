import React, {useState} from 'react';
import './css/App.css';
import Home from "./Home";
import Header from './commonPages/header';
import Footer from './commonPages/footer';
import MainBoard from './mainBoard';
import Register from "./userDomain/Register";
import NotFound from './commonPages/NotFound';
import QuestionSubmission from "./questionPages/questionSubmission";
import {Routes, Route} from "react-router-dom";
import {LoginContext, LoginUserDetails, LocalTimeState} from "./helper/Context";



function App() {

  const [globalLoggedIn, setGlobalLoggedIn] = useState(false);
  const [globalCurrentUser, setGlobalCurrentUser] = useState(null);
  const [globalTimeState, setGlobalTimeState] = useState(new Date());


  return (
    <div className="App">
    <LocalTimeState.Provider value={{globalTimeState, setGlobalTimeState}}>
    <LoginUserDetails.Provider value={{globalCurrentUser, setGlobalCurrentUser}}>
    <LoginContext.Provider value={{globalLoggedIn, setGlobalLoggedIn}}>
      <Header />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        
        <Route path="/mainboard" element={<MainBoard />} />
        <Route path="/questionSubmission" element={<QuestionSubmission />} />
        

        
      </Routes>

      {/* {globalLoggedIn ? <h1>{globalLoggedIn.toString() + "" + globalCurrentUser.emailAddress + globalCurrentUser.userid}</h1> : <h1>You are not loggedin</h1>} */}
    <Footer />
    </LoginContext.Provider>
    </LoginUserDetails.Provider>
    </LocalTimeState.Provider>
    </div>
    );
}

export default App;
