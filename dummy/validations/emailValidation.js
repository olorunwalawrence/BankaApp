import { check } from 'express-validator/check';

export default {
  validEmail: [
    check('email')
      .trim().not().isEmpty()
      .withMessage('Specify your email')
      .isEmail()
      .withMessage('Email must be in email format, like example@mail.com')
  ]
};