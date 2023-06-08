import { Router } from 'express';
import DoctorController from '../controller/doctor';
import * as Validations from '../middlewares/validation/doctor';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.post('/new', Authorization.isAdmin, Validations.addDoctor, DoctorController.addDoctor);
router.post('/login', Validations.fetchDoctor, DoctorController.doctorLogin);

router.get('/', Authorization.isDoctor, DoctorController.fetchAllDoctors);
export default router;
