import React, { useState } from "react";
import axios from "axios";

const DoctorRegisterForm = () => {
  const [doctorName, setDoctorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorPhonenumber, setDoctorPhonenumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDoctor = {
        doctorName,
        email,
        password,
        doctorPhonenumber,
        specialization,
      };
      const response = await axios.post(
        "http://localhost:5000/api/doctors/addDoctor",
        newDoctor
      );
      console.log("New doctor registered:", response.data);
      setSuccessMessage("Registration successful!");

    } catch (error) {
      console.error("Doctor registration failed:", error.message);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid bg-black vh-100">
      <h2>Register as a Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="doctorName" className="form-label">
            Doctor Name
          </label>
          <input
            type="text"
            className="form-control"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
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
          <label htmlFor="doctorPhonenumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="doctorPhonenumber"
            value={doctorPhonenumber}
            onChange={(e) => setDoctorPhonenumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="specialization" className="form-label">
            Specialization
          </label>
          <input
            type="text"
            className="form-control"
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default DoctorRegisterForm;
