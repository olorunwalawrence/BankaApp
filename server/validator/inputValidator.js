/* eslint-disable require-jsdoc */
import fieldValidator from '../utils/emptyField';

class Validator {
  constructor() {
    this.signupValidator = this.signupValidator.bind(this);
    this.loginValidator = this.loginValidator.bind(this);
    this.accountValidator = this.accountValidator.bind(this);
    this.staffValidator = this.staffValidator.bind(this);
  }

  signupValidator(req, res, next) {
    const emptyFields = fieldValidator.call(this.signupValidator, 'signup', req.body);
    if (emptyFields.status === 400) {
      return res
        .status(400)
        .json({
          status: 400,
          error: emptyFields.error
        });
    }
    next();
  }


  loginValidator(req, res, next) {
    const emptyFields = fieldValidator.call(this.loginValidator, 'login', req.body);
    if (emptyFields.status === 400) {
      return res
        .status(400)
        .json({
          status: 400,
          error: emptyFields.error
        });
    }
    next();
  }

  accountValidator(req, res, next) {
    const emptyFields = fieldValidator.call(this.accountValidator, 'account', req.body);
    if (emptyFields.status === 400) {
      return res
        .status(400)
        .json({
          status: 400,
          error: emptyFields.error
        });
    }
    next();
  }

  staffValidator(req, res, next) {
    const emptyFields = fieldValidator.call(this.staffValidator, 'staff', req.body);
    if (emptyFields.status === 400) {
      return res
        .status(400)
        .json({
          status: 400,
          error: emptyFields.error
        });
    }
    next();
  }
}

export default new Validator();
