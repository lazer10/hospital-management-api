import { Router } from 'express';
import admin from './Admin';
import department from './department';
import doctor from './doctors';
import user from './users';

const router = Router();

router.use('/admin', admin);
router.use('/departments', department);
router.use('/doctors', doctor);
router.use('/users', user);
export default router;
