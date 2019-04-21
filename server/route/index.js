import express from 'express';
import user from '../Controllers/userController';
import account from '../Controllers/accountController';
import findExisting from '../middleware/existingUser';
import verifyUser from '../middleware/jwtAuth';
import validator from '../validator/inputValidator';
import adminController from '../Controllers/admincontroller';

const router = express.Router();
const { createUser, userLogin } = user;
const { createAccount } = account;

const { exitingUsername, existingEmail  } = findExisting;
const { signupValidator, loginValidator, accountValidator } = validator;
const { ActivatOrDeactivateAccct } = adminController;

router.post('/auth/signup', signupValidator, existingEmail, exitingUsername, createUser);
router.post('/auth/login', loginValidator, userLogin);
router.post('/accounts', accountValidator , verifyUser, createAccount);
router.patch('/account/:accountNumber', verifyUser, ActivatOrDeactivateAccct);

export default router;

