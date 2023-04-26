import { Router } from 'express';
import AdminController from '../controller/admin';

const router = Router();
router.post('/login', AdminController.adminLogin);

export default router;
