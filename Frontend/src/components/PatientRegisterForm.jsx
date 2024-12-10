import React, { useState } from "react";
import axios from "axios";

const PatientRegisterForm = () => {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patientPhonenumber, setPatientPhonenumber] = useState("");
  const [DOB, setDOB] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPatient = {
        patientName,
        email,
        password,
        patientPhonenumber,
        DOB,
        bloodGroup,
      };
      const response = await axios.post(
        "http://localhost:5000/api/patients/addPatient",
        newPatient
      );
      console.log("New patient registered:", response.data);
      setSuccessMessage("Registration successful!"); 
    } catch (error) {
      console.error("Patient registration failed:", error.message);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid bg-black vh-100">
      <h2>Register as a Patient</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patientName" className="form-label">
            Patient Name
          </label>
          <input
            type="text"
            className="form-control"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="patientPhonenumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="patientPhonenumber"
            value={patientPhonenumber}
            onChange={(e) => setPatientPhonenumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="DOB" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="DOB"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bloodGroup" className="form-label">
            Blood Group
          </label>
          <input
            type="text"
            className="form-control"
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default PatientRegisterForm;
