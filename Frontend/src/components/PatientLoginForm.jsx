 import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const response = await axios.post(
        "http://localhost:5000/api/patients/authenticatePatient",
        loginData
      );
      console.log("Patient login successful:", response.data);

      localStorage.setItem('jwtToken', response.data.accessedToken)
      localStorage.setItem('patientName', response.data.patientName)
      localStorage.setItem('PatientId', response.data.patientId)

      navigate("/patienthome");
    } catch (error) {
      console.error("Patient login failed:", error.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container-fluid p-4 bg-black vh-100">
      <h2 className="fw-normal mb-3 pb-3">Patient Login</h2>
      <form onSubmit={handleSubmit} className="w-23rem">
        <div className="form-outline mb-4">
          <label htmlFor="email" className="form-label ">
            Email address
          </label>
          <input
            type="email"
            className="form-control  form-control  "
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-outline mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-info btn- btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default PatientLoginForm;
