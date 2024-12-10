import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const doctorData = { email, password };
      const response = await axios.post('http://localhost:5000/api/doctors/authenticateDoctor', doctorData);
      console.log('Doctor Login successful:', response.data);

      localStorage.setItem('jwtToken', response.data.accessedToken)
      localStorage.setItem('doctorId', response.data.doctorId)
      localStorage.setItem('doctorName', response.data.doctorName)

      navigate('/doctorhome');

    } catch (error) {
      console.error('Doctor login failed:', error.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container-fluid bg-black vh-100 p-5">
      <h2 className='mb-3'>Doctor Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default DoctorLoginForm;
