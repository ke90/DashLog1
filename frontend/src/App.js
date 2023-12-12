import './App.css';
import { Button } from 'react-bootstrap';
import Logout from './components/Login/Logout'; 
import ProfilView from './components/Login/ProfilView'; 
import NavBar from './components/NavBar'; 
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import checkTokenUser from './utils/validators';
import { useDispatch } from 'react-redux';
import LogTable from './components/Logger/LogTable';


function App() {




  return (
    <div className="App m-5">
        <h3>DashLog</h3>
        <hr></hr>
        <LogTable />
    </div>
  );
}

export default App;
