import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Navbar.css'; // Import your custom CSS
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    navigate('/login')
  };


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light NavMetricCheck">
      <a className="navbar-brand" href="#">Metric Check</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      {/* <li className='nav-item active'>
        <img className='navImage' src='https://cdn.vectorstock.com/i/preview-1x/44/73/hexagon-trend-logo-vector-22374473.webp'/>
      </li> */}
      <li className="nav-item active">
        <a className="nav-link" href="/dashboard">DASHBOARD</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/send-email">SEND EMAIL</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/login">LOGOUT</a>
      </li>
    </ul>
  </div>
</nav>
</>
  );

  
};

export default Navbar;
