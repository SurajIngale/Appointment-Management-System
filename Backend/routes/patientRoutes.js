import express from "express";
import patientControllers from "../controller/patientControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/addPatient', patientControllers.addPatient);
router.get('/getPatient/:id',auth, patientControllers.getPatientById);
router.get('/getAllPatients', auth, patientControllers.getAllPatients);
router.post('/authenticatePatient', patientControllers.authenticatePatient);

export default router;


