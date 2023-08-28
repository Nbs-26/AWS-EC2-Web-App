import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
// import 'booststrap/dist/css/bootstrap.min.css'
import Register from './Components/Register/Register';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
const App = () => {
  const PORT=process.env.PORT || 3001
  const backendAPIUrl = `http://localhost:${PORT}/`; // Replace with your actual backend API URL
  return (
    <div className="App">    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />}></Route>
          <Route path='/dashboard' element={<Dashboard backendAPIUrl={backendAPIUrl}/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
