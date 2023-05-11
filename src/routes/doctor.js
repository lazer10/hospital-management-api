import { Router } from 'express';
import Doctorcontroller from '../controller/doctor';
import * as Validations from '../middlewares/validation/doctor';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.post('/new', Authorization.isAdmin, Validations.addDoctor, Doctorcontroller.addDoctor);

export default router;
