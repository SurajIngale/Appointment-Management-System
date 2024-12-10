import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentModal from '../components/AppointmentModal';
import DoctorProfileModal from '../components/DoctorProfileModal';

const PatientHomePage = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const patientId = localStorage.getItem('PatientId');
      if (!token || !patientId) {
        throw new Error("No authentication token or patient ID found");
      }
      const response = await axios.get(`http://localhost:5000/api/appointments/appointmentsByPatient?patientId=${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (error) {
      console.log('Error in fetching appointments:', error.message);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error("No authentication token found");
      }
      await axios.delete(`http://localhost:5000/api/appointments/appointment/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAppointments();
      alert('Appointment deleted successfully');
    } catch (error) {
      console.log('Error in deleting appointment:', error.message);
      alert('Failed to delete appointment');
    }
  };

  const handleShowDoctorInfo = async (doctorId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.get(`http://localhost:5000/api/doctors/getDoctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedDoctor(response.data);
      console.log(response.data);
      setShowDoctorModal(true);
    } catch (error) {
      console.log('Error in fetching doctor information:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <button className='btn btn-dark my-2' onClick={() => setShowAppointmentModal(true)}>Add Appointment</button>
      <table className="table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Doctor Name</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td>{index + 1}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleShowDoctorInfo(appointment.doctorId._id)}
                >
                  {appointment.doctorId.doctorName}
                </button>
              </td>
              <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
              <td>{appointment.status}</td>
              <td>
                <button 
                  className='btn btn-danger btn-sm' 
                  onClick={() => handleDeleteAppointment(appointment._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AppointmentModal show={showAppointmentModal} onHide={() => setShowAppointmentModal(false)} fetchAppointments={fetchAppointments} />
      <DoctorProfileModal show={showDoctorModal} onHide={() => setShowDoctorModal(false)} doctor={selectedDoctor} />
    </div>
  );
};

export default PatientHomePage;
