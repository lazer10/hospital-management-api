import { Router } from 'express';
import AdminController from '../controller/admin';
import * as validations from '../middlewares/validation/login';

const router = Router();
router.post('/login', validations.loginAdmin, AdminController.adminLogin);

export default router;
