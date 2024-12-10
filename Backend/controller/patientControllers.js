import Patient from "../models/patientModels.js";
import jwt from 'jsonwebtoken';

async function addPatient(req, res) {
    try {
        const newPatient = new Patient(req.body);
        const result = await newPatient.save();
        res.status(200).send({ message: "Register Successful", task: result });
    } catch (error) {
        res.status(500).send({ message: "Error adding patient", error: error.message });
    }
}

async function getPatient(req, res) {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send({ message: "Error fetching patient", error: error.message });
    }
}

async function getAllPatients(req, res) {
    try {
        console.log('Authenticated user:', req.user); // Debug statement
        const patients = await Patient.find();
        res.status(200).send(patients);
    } catch (error) {
        console.error('Error fetching patients:', error); // Debug statement
        res.status(500).send({ message: "Error fetching patients", error: error.message });
    }
}

async function getPatientById(req, res) {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send({ message: "Error fetching patient", error: error.message });
    }
}

async function authenticatePatient(req, res) {
    try {
        const { email, password } = req.body;
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }

        const isMatch = await patient.passwordCompare(password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password" });
        }

        // Use a consistent secret key
        const token = jwt.sign({_id: patient._id}, process.env.JWT_SECRET || 'suraj', {expiresIn:'1h'});
        res.status(200).send({ message: "Authentication successful", accessedToken: token, patientName: patient.patientName, patientId: patient._id });
    } catch (error) {
        res.status(500).send({ message: "Error during authentication", error: error.message });
    }
}

// const authenticatePatient = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const patient = await Patient.findOne({ email });
//       if (!patient) {
//         console.log('Patient not found');
//         return res.status(404).json({ message: 'Patient not found' });
//       }
  
//       const isMatch = await bcrypt.compare(password, patient.password);
//       if (!isMatch) {
//         console.log('Invalid credentials');
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       const token = jwt.sign({_id: patient._id}, process.env.JWT_SECRET || 'suraj', {expiresIn:'1h'});
//       console.log('Login successful', { token, patientName: patient.patientName });
  
//       res.json({
//         token,
//         patientName: patient.patientName,
//       });
//     } catch (error) {
//       console.log('Server error', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };


export default { addPatient, getPatient, getAllPatients, getPatientById, authenticatePatient };
