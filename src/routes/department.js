import { Router } from 'express';
import DepartmentController from '../controller/department';
import * as Validations from '../middlewares/validation/department';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.post('/new', Authorization.isAdmin, Validations.addDepartment, DepartmentController.addDepartment);

router.get('/', DepartmentController.fetchAllDepartments);
router.get('/:id', DepartmentController.fetchDepartmentById);

router.put('/:id/update', Authorization.isAdmin, Validations.updateDepartment, DepartmentController.updateDepartmentById);

export default router;
