import express from 'express';
import user from '../Controllers/userController';
import account from '../Controllers/accountController';
import findExisting from '../middleware/existingUser';
import verifyUser from '../middleware/jwtAuth';
import validator from '../validator/inputValidator';
import adminController from '../Controllers/admincontroller';
import transactions from '../Controllers/transaction';

const router = express.Router();
const { createUser, userLogin } = user;
const { createAccount } = account;
const { viewHistory, viewAtransaction } = transactions;
const { exitingUsername, existingEmail  } = findExisting;
const { signupValidator, loginValidator, accountValidator } = validator;
const { ActivatOrDeactivateAccct, deleteAccount, creaditAccount } = adminController;

router.post('/auth/signup', signupValidator, existingEmail, exitingUsername, createUser);
router.post('/auth/login', loginValidator, userLogin);
router.post('/accounts', accountValidator , verifyUser, createAccount);
router.patch('/account/:accountNumber', verifyUser, ActivatOrDeactivateAccct);
router.delete('/account/:accountNumber', verifyUser, deleteAccount);
// router.post('/transactions/:accountNumber/credit', creaditAccount);
router.get('/accounts/:accountNumber/transactions', viewHistory);
router.get('/transactions/:transactionid', viewHistory);
export default router;
