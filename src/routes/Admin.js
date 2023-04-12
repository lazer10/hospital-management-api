import { Router } from 'express';

import AdminController from '../controller/admin';

const router = Router();
router.post('/', AdminController.adminLogin);

export default router;
