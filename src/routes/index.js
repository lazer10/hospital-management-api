import { Router } from 'express';
import admin from './Admin';

const router = Router();

router.use('/admin', admin);

export default router;
