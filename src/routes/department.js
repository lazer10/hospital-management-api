import { Router } from 'express';

import Departmentcontroller from '../controller/department';

const router = Router();
router.post('/create', Departmentcontroller.addDepartment);

export default router;
