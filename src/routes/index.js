import { Router } from 'express';
import admin from './AdminRoutes';

const router = Router();

router.use('/admin', admin);

export default router;
