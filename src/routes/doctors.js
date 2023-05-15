import { Router } from 'express';
import Doctorcontroller from '../controller/doctor';

const router = Router();

router.post('/new', Doctorcontroller.addDoctor);

export default router;
