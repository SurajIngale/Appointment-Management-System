import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AppointmentModal = ({ show, onHide, fetchAppointments }) => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.get('http://localhost:5000/api/doctors/getAllDoctors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('jwtToken');
    const patientId = localStorage.getItem('PatientId');

    if (!selectedDoctor || !appointmentDate || !appointmentTime || !token || !patientId) {
      alert('Please complete all fields');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/appointments/appointment',
        {
          patientId,
          doctorId: selectedDoctor,
          appointmentDate: new Date(`${appointmentDate}T${appointmentTime}`),
          status: 'Pending',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAppointments();
      onHide();
    } catch (error) {
      console.error('Error adding appointment:', error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} className=''>
      <Modal.Header closeButton>
        <Modal.Title>Add Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4 me-3 p-2" controlId="formDoctor">
            <Form.Label>Doctor</Form.Label>
            <Form.Select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.doctorName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 me-4" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 me-4eeeeeeeeee" controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Appointment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentModal;
