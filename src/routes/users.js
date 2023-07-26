import { Router } from 'express';
import UserController from '../controller/user';

const router = Router();

router.post('/signup', Validations.userSignUp, UserController.userSignUp);

export default router;
