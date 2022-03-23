import React from 'react';
import './css/App.css';
import Header from './commonPages/header';
import Footer from './commonPages/footer';
import MainBoard from './mainBoard';
import Register from "./userDomain/Register";
import {Routes, Route} from "react-router-dom";


function App() {


  return (
    <div className="App">
    <Header />

      <Routes>
        <Route path="/" element={<MainBoard />} />
        <Route path="/register" element={<Register />} />
      </Routes>


    <Footer />
    </div>
    );
}

export default App;
