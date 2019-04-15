import express from 'express';
import userControllers from '../controllers/userControllers';
import accountControllers from '../controllers/createAccount';
import validator from '../validations/fieldsValidators';
import acctValidator from '../validations/accountValidation';
import verifyuser from '../jwtAuth/auth';

const router = express.Router();
const { createAccount } = accountControllers;
const { createUser, userLogin  } = userControllers;
const { userValidation, loginValidation } = validator;
const { acctValidation } = acctValidator;

router.post('/auth/signup', userValidation,createUser);
router.post('/auth/login', loginValidation, userLogin);
router.post('/accounts', acctValidation, verifyuser, createAccount);

export default router;