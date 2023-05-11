import { Router } from 'express';
import admin from './Admin';
import department from './department';
import doctor from './doctor';

const router = Router();

router.use('/admin', admin);
router.use('/departments', department);
router.use('/doctor', doctor);
export default router;
