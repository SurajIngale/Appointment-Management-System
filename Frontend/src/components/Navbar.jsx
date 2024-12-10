import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/custom.css"

const Navbar = () => {
  const [loginType, setLoginType] = useState('');

  const handleLoginType = (type) => {
    setLoginType(type);
  };

  return (
   <div className='app'>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2 ">
      <div className="container-fluid px-3">
        <Link className="navbar-brand fs-4" to="/">Appointment Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle fs-5 me-3" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Login
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><Link className="dropdown-item" to="/patient/login" onClick={() => handleLoginType('patient')}>Patient Login</Link></li>
                <li><Link className="dropdown-item" to="/doctor/login" onClick={() => handleLoginType('doctor')}>Doctor Login</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown me-5">
              <a className="nav-link dropdown-toggle fs-5" href="#" id="navbarDropdownMenuLink2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Register
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                <li><Link className="dropdown-item" to="/patient/register" onClick={() => handleLoginType('patient')}>Patient Register</Link></li>
                <li><Link className="dropdown-item" to="/doctor/register" onClick={() => handleLoginType('doctor')}>Doctor Register</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   </div>
  );
};

export default Navbar;
