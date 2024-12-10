
import express from "express";
import doctorControllers from "../controller/doctorControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/addDoctor', doctorControllers.addDoctor);
router.get('/getDoctor/:id', doctorControllers.getDoctor);
router.get('/getAllDoctors', doctorControllers.getAllDoctors);
router.post('/authenticateDoctor', doctorControllers.authenticateDoctor);

export default router;
