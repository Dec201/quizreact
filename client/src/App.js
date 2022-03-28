import React, {useState} from 'react';
import './css/App.css';
import Home from "./Home";
import Header from './commonPages/header';
import Footer from './commonPages/footer';
import MainBoard from './mainBoard';
import Register from "./userDomain/Register";
import NotFound from './commonPages/NotFound';
import QuestionSubmission from "./questionPages/questionSubmission";
import ProtectedRoute from './helper/ProtectedRoute';
import {Routes, Route} from "react-router-dom";
import {LoginContext, LoginUserDetails, LocalTimeState} from "./helper/Context";

// auth routes / change questions every 24hr?
// responsive layout - media queries? < 500px?
// flicker issue

// questions from db instead of array page
// fix questionpage - store score/date/user 

// stats page , chart.js?


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
      
        <Route element={<ProtectedRoute />}>
        <Route path="/mainboard" element={<MainBoard />} />
        <Route path="/questionSubmission" element={<QuestionSubmission />} />
        </Route>

      </Routes>
    <Footer />
    </LoginContext.Provider>
    </LoginUserDetails.Provider>
    </LocalTimeState.Provider>
    </div>
    );
}

export default App;
