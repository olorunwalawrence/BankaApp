import express from 'express';
import userControllers from '../controllers/userControllers';
import accountControllers from '../controllers/createAccount';
import validator from '../validations/fieldsValidators';
import acctValidator from '../validations/accountValidation';
import adminController from '../controllers/AdminControllers';
import verifyuser from '../jwtAuth/auth';

const router = express.Router();
const { createAccount } = accountControllers;
const { createUser, userLogin  } = userControllers;
const { userValidation, loginValidation, acctStatusValidation } = validator;
const { acctValidation } = acctValidator;
const { 
    ActivatOrDeactivateAccct, deleteAccount,creaditAccount
    } = adminController;
router.post('/auth/signup', userValidation,createUser);
router.post('/auth/login', loginValidation, userLogin);
router.post('/accounts', acctValidation, verifyuser, createAccount);
router.patch('/account/:accountNumber',acctStatusValidation, verifyuser, ActivatOrDeactivateAccct);
router.delete('/account/:accountNumber', verifyuser, deleteAccount);
router.post('/transactions/:accountNumber/credit', verifyuser, creaditAccount);
export default router;