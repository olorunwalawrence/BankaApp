export default {
    userSignUpDetails: [
        check('fullName')
            .trim().not().isEmpty()
            .withMessage('Enter your full name please')
            .matches(/^[a-zA-Z ]+$/)
            .withMessage('Names should be letters only'),
        check('userName')
            .trim().not().isEmpty()
            .withMessage('Please fill the field for username')
            .matches(/^[a-zA-Z ]+$/)
            .withMessage('username should be letters only'),
        check('email')
            .trim().not().isEmpty()
            .withMessage('Specify your email')
            .isEmail()
            .withMessage('Email must be in email format, like example@mail.com'),
        check('password')
            .trim().not().isEmpty()
            .withMessage('You need a password to sign up')
    ]
};
