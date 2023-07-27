import { Router } from 'express';
import UserController from '../controller/user';
import * as Validations from '../middlewares/validation/user';

const router = Router();

router.post('/signup', Validations.userSignUp, UserController.userSignUp);

router.post('/login', UserController.userLogin);

router.put('/verify-account/:verificationToken', UserController.verifyUserAccount);
export default router;
