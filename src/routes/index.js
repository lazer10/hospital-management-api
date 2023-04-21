import { Router } from 'express';
import admin from './Admin';
import department from './department';

const router = Router();

router.use('/admin', admin);
router.use('/departments', department);
export default router;
