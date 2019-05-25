import { check } from 'express-validator/check';

export default {
  userSignUpDetails: [
    check('firstname')
      .trim().not().isEmpty()
      .withMessage('Please fill the field for firstname')
      .matches(/^[a-zA-Z ]+$/)
      .withMessage('Please fill the field for firstname'),
    check('firstname')
      .custom(value => !/\s/.test(value))
      .withMessage('No spaces are allowed in the firstname'),
    check('lastname')
      .trim().not().isEmpty()
      .withMessage('Please fill the field for lastname')
      .matches(/^[a-zA-Z ]+$/)
      .withMessage('Please fill the field for lastname'),
    check('lastname')
      .custom(value => !/\s/.test(value))
      .withMessage('No spaces are allowed in the lastname'),
    check('email')
      .trim().not()
      .withMessage('Specify your email')
      .isEmpty()
      .withMessage('Specify your email')
      .isEmail()
      .withMessage('Email must be in email format, like example@mail.com'),
    check('email')
      .custom(value => !/\s/.test(value))
      .withMessage('No spaces are allowed in the email'),
    check('password')
      .trim().not().isEmpty()
      .withMessage('You need a password to sign up'),
    check('username')
      .trim().not().isEmpty()
      .matches(/^[a-zA-Z ]+$/)
      .withMessage('please fill the username field and username can not contain number'),
    check('username')
      .custom(value => !/\s/.test(value))
      .withMessage('No spaces are allowed in the username')

  ],

  userLoginDetails: [
    check('email')
      .trim().not().isEmpty()
      .withMessage('Please provide a valid email'),
    check('email')
      .custom(value => !/\s/.test(value))
      .withMessage('No spaces are allowed in the email'),
    check('password')
      .trim().not().isEmpty()
      .withMessage('You need a password to log in')
  ],

  valideAmount: [
    check('amount')
      .trim().not().isEmpty()
      .withMessage('please specify the amount'),
    check('amount')
      .custom(value => !/\s/.test(value))
      .withMessage('No spaces are allowed in the amount')
  ],


};
