import { Router } from 'express';
import admin from './Admin';
import department from './department';
import doctor from './doctors';

const router = Router();

router.use('/admin', admin);
router.use('/departments', department);
router.use('/doctors', doctor);
export default router;
