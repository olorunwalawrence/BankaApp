import express from 'express';
import userControllers from '../controllers/userControllers';
import validator from '../validations/fieldsValidators';

const router = express.Router();

const { createUser } = userControllers;
const { userValidation } = validator;

router.post('/auth/signup', userValidation,createUser);

export default router;