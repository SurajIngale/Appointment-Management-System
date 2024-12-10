import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DoctorProfileModal = ({ show, onHide, doctor }) => {
  if (!doctor) return null; 

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Doctor Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {doctor.doctorName}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorProfileModal;
