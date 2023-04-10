import { Router } from 'express';

import Admin from '../controller/admin';

const router = Router();
router.post('/', Admin.Adminlogin);

export default router;
