import { Router } from 'express';

import Admincontroller from '../controller/admincontroller';

const router = Router();
router.post('/', Admincontroller.loginAdmin);

export default router;
