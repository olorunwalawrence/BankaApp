import express from 'express';
// import passport from 'passport';
import helpers from '../helpers/authValidator';
import user from '../Controllers/userController';
import account from '../Controllers/accountController';
import findExisting from '../middleware/existingUser';
import verifyUser from '../middleware/jwtAuth';
import validator from '../validator/inputValidator';
import adminController from '../Controllers/admincontroller';
import transactions from '../Controllers/transaction';
import validateInputs from '../validator/validator';

// const verifyUser = passport.authenticate('jwt', { session: false });


const router = express.Router();
const { validateInput } = helpers;
const { userSignUpDetails, userLoginDetails, valideAmount } = validateInputs;
const { createUser, userLogin } = user;
const {
 createAccount, viewAspecificAccountDetails,
  adminStaffViewAccount, adminStaffViewAllAccount, adminStaffViewAccountByStatus 
} = account;
const { getAllTransaction, viewAtransaction } = transactions;
const { exitingUsername, existingEmail } = findExisting;
const {
 loginValidator, accountValidator, signupValidator, transactionValidator 
} = validator;
const {
  ActivatOrDeactivateAccct, deleteAccounts, creaditAccount, debitAccount, adminUpdateUserRole
} = adminController;

router.post('/auth/signup', signupValidator, userSignUpDetails, validateInput, existingEmail, exitingUsername, createUser);
router.put('/update/user/:id', verifyUser, adminUpdateUserRole);
router.post('/auth/login', loginValidator, userLoginDetails, userLogin);
router.post('/accounts', accountValidator, verifyUser, createAccount);
router.patch('/account/:accountNumber', verifyUser, ActivatOrDeactivateAccct);
router.delete('/account/:accountNumber', verifyUser, deleteAccounts);
router.post('/transactions/:accountNumber/credit', valideAmount, transactionValidator , verifyUser, creaditAccount);
router.post('/transactions/:accountNumber/debit', valideAmount, transactionValidator, verifyUser, debitAccount);
router.get('/accounts/:accountnumber/transactions', verifyUser, getAllTransaction);
router.get('/transactions/:transactionid', verifyUser, viewAtransaction);
router.get('/accounts/:accountNumber', verifyUser, viewAspecificAccountDetails);
router.get('/user/:email/accounts', verifyUser, adminStaffViewAccount);
router.get('/accounts', verifyUser, adminStaffViewAllAccount);
router.get('/account', verifyUser, adminStaffViewAccountByStatus);
export default router;
