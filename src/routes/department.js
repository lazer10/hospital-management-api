import { Router } from 'express';
import Departmentcontroller from '../controller/department';
import * as Validations from '../middlewares/validation/department';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.post('/new', Authorization.isAdmin, Validations.addDepartment, Departmentcontroller.addDepartment);
router.get('/', Departmentcontroller.fetchAllDepartments);
router.get('/:id', Departmentcontroller.fetchDepartmentById);

export default router;
