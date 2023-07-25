import { Router } from 'express';
import UserController from '../controller/user';

const router = Router();


router.put('/verify-account/:verificationLink', UserController.verifyUserAccount);

export default router;
