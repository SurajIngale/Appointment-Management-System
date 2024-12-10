import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DoctorNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('doctorId');
        localStorage.removeItem('doctorName');

        navigate('/doctor/login');
    };

    const doctorName = localStorage.getItem('doctorName');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-0">
      <div className="container-fluid p-0 m-0">
        <Link className="navbar-brand" to="/patienthome">Doctor Dashboard</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <span className="nav-link">Welcome, {doctorName}</span>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger nav-link me-3" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default DoctorNavbar;