import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const DoctorHomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const doctorId = localStorage.getItem('doctorId');
      if (!token || !doctorId) {
        throw new Error("No authentication token or doctor ID found");
      }
      const response = await axios.get(`http://localhost:5000/api/appointments/appointmentsByDoctor?doctorId=${doctorId}`, {
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
      setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
    } catch (error) {
      console.log('Error in deleting appointment:', error.message);
    }
  };

  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error("No authentication token found");
      }
      await axios.patch(`http://localhost:5000/api/appointments/appointment/${selectedAppointment._id}`, 
        { status: newStatus }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setAppointments(appointments.map(appointment => 
        appointment._id === selectedAppointment._id ? { ...appointment, status: newStatus } : appointment
      ));
      setShowModal(false);
      setSelectedAppointment(null);
      setNewStatus('');
    } catch (error) {
      console.log('Error in updating appointment status:', error.message);
    }
  };

  const openStatusModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Appointments</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Patient Name</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td>{index + 1}</td>
              <td>{appointment.patientId.patientName}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
              <td>{appointment.status}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => openStatusModal(appointment)}
                >
                  Change Status
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteAppointment(appointment._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Appointment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Status</label>
            <select 
              className="form-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorHomePage;
