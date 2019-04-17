/* eslint-disable require-jsdoc */

export default class Validator {
  /**
       *
       * @param {*} req
       * @param {*} res
       * @param {*} next
       * @param {*} json
       * @param {*} error
       */

  // VALIDATE MEAL FORM FIELD
  static userValidation(req, res, next) {
    const {
      firstname, lastname, email, type, isAdmin, password
    } = req.body;
    try {
      const regex = /^[a-zA-Z\s]*$/;
      if (firstname.trim() === '') {
        return res.status(400).json({ 
          status:400,
          error: 'firstname field cannot be empty' });
      }
      if (!regex.test(firstname)) {
        return res
          .status(400)
          .json({ 
            status:400,
            error: 'firstname can only be letters' });
      }
      if (lastname.trim() === '') {
        return res.status(400).json({ 
          status:400,
          error: 'lastname cannot be empty' });
      }
      if (!regex.test(lastname)) {
        return res
          .status(400)
          .json({ 
            status:400,
            error: 'lastname can only be letters' });
      }

      if (email.trim() === '') {
        return res
          .status(400)
          .json({
            status:400,
            error: 'email cannot be empty' });
      }
      if (type.trim() === '') {
        return res
          .status(400)
          .json({ 
            status:400,
            error: 'type cannot be empty' });
      }
      if (password.trim() === '') {
        return res
          .status(400)
          .json({ 
            status:400,
            error: 'password cannot be empty' });
      }
      if (!regex.test(type)) {
        return res
          .status(400)
          .json({
            status:400,
             error: 'type can only be letters' });
      }

     
      if (isAdmin.trim() === '') {
        return res
          .status(400)
          .json({ 
            status:400,
            error: 'isAdmin cannot be empty' });
      }

      if (!regex.test(isAdmin)) {
        return res
          .status(400)
          .json({ 
            status:400,
            error: 'isAdmin can only be letters' });
      }
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide these specified fields { firstname, lastname, email, password,type,isAdmin }'
      });
    }
  }

  static loginValidation(req, res, next) {
    const {
       email,password
    } = req.body;
    try {
      if (password.trim() === '') {
        return res.status(400).json({ 
          status:400,
          error: 'password field cannot be empty' });
      }

      if (email.trim() === '') {
        return res
          .status(400)
          .json({ 
            status:400,
            error: 'email cannot be empty' });
      }
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide these specified fields {  email, password }'
      });
    }
  }

  static acctStatusValidation(req, res, next) {
    const {
      acctStatus
    } = req.body;
    try {
      if (acctStatus.trim() === '') {
        return res.status(400).json({ 
          status:400,
          error: ' acct status field cannot be empty' });
      }

   
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'please provide the specified fields { acctStatus}'
      });
    }
  }
}
