/* eslint-disable require-jsdoc */

export default class Validators {
  /**
         *
         * @param {*} req
         * @param {*} res
         * @param {*} next
         * @param {*} json
         * @param {*} message
         */

  // VALIDATE MEAL FORM FIELD
  static acctValidation(req, res, next) {
    const {
        type, openingBalance
    } = req.body;
    try {
      const regex = /^[a-zA-Z\s]*$/;
      if (openingBalance.trim() === '') {
        return res.status(400).json({
          status:400,
           error: 'opening balance cannot be empty' });
      }
     
      if (type.trim() === '') {
        return res
          .status(400)
          .json({
            status:400,
            error: 'type cannot be empty' 
             });
      }
      if (!regex.test(type)) {
        return res
          .status(400)
          .json({
            status:400,
            error: 'type can only be letters'
           });
      }


      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'please provide these specifies fields {type,openingBalance }'
      });
    }
  }

  
}

