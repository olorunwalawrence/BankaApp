import express from 'express';
import userControllers from '../controllers/userControllers';
import validator from '../validations/fieldsValidators';

const router = express.Router();

const { createUser, userLogin  } = userControllers;
const { userValidation, loginValidation } = validator;

router.post('/auth/signup', userValidation,createUser);
router.post('/auth/login', loginValidation, userLogin);

export default router;