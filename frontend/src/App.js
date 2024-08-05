import "./App.css"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ChartDashboard from "./components/charting/ChartDashboard";
import BuilderDashboard from "./components/strategyBuilder/BuilderDashboard";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Backtest from "./components/backtest/Backtest.js"

import * as React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AuthState from "./context/authentication/AuthState.js";


function App() {

  

  const homePage = 
  <div className="container">
    <Navbar/>
      <Home/>
    <Footer/>
  </div>

  const registrationPage = 
  <div className="container">
    <Navbar/>
      <Register/>
    <Footer/>
  </div>

  const loginPage = 
  <div className="container">
    <Navbar/>
      <Login/>
    <Footer/>
  </div>

  const backTestPage = 
  <div className="container">
    <Navbar/>
      <Backtest/>
    <Footer/>
  </div>

  return ( 
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={homePage}/> 
          <Route path='/chart' element=<ChartDashboard/>/>
          <Route path='/register' element={registrationPage}/>
          <Route path='/login' element={loginPage}/>
          <Route path='/backtest' element={backTestPage}/>
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
