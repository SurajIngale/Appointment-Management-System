import express from "express";
import { 
    addAppointment, 
    getAllAppointments, 
    getAppointmentByPatientId, 
    getAppointmentByDoctorId,
    updateAppointment,
    partialUpdateAppointment,
    deleteAppointment
} from "../controller/appointmentControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/appointment',auth, addAppointment);
router.get('/allAppointments',auth, getAllAppointments);
router.get('/appointmentsByPatient',auth, getAppointmentByPatientId);
router.get('/appointmentsByDoctor',auth, getAppointmentByDoctorId);
router.put('/appointment/:id',auth, updateAppointment);
router.patch('/appointment/:id',auth, partialUpdateAppointment);
router.delete('/appointment/:id',auth, deleteAppointment);

export default router;
