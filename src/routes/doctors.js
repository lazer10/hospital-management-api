import { Router } from 'express';
import DoctorController from '../controller/doctor';
import * as Validations from '../middlewares/validation/doctor';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.post('/new', Authorization.isAdmin, Validations.addDoctor, DoctorController.addDoctor);
router.post('/login', DoctorController.doctorLogin);

router.get('/profiles', Authorization.auth, DoctorController.getDoctorProfile);
export default router;
