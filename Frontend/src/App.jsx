import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientRegisterForm from './components/PatientRegisterForm';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatientLoginForm from './components/PatientLoginForm';
import PatientHomePage from './components/PatientHomePage';
import DoctorLoginForm from './components/DoctorLoginForm';
import DoctorRegisterForm from './components/DoctorRegisterForm';
import PatientNavbar from './components/PatientNavbar';
import DoctorHomePage from './components/DoctorHomePage';
import DoctorNavbar from './components/DoctorNavbar';

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="container-fluid p-0">
          <Routes>
            <Route path="/" element={<><Navbar/> <Home /></>} />
            <Route path="/patient/register" element={<><Navbar/><PatientRegisterForm /></>} />
            <Route path="/patient/login" element={<><Navbar/><PatientLoginForm /></>} />
            
            <Route path="/doctor/login" element={<><Navbar/><DoctorLoginForm /></>} />
            <Route path="/doctor/register" element={<><Navbar/><DoctorRegisterForm /></>} />
            <Route path="/doctorhome" element={<><DoctorNavbar/><DoctorHomePage /></>} />
            <Route path="/patienthome" element={<><PatientNavbar/><PatientHomePage /></>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
