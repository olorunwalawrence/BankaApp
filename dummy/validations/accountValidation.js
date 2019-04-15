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
        type, status, openingBalance
    } = req.body;
    try {
      const regex = /^[a-zA-Z\s]*$/;
      if (status.trim() === '') {
        return res.status(400).json({ message: ' status field cannot be empty' });
      }
      if (!regex.test(status)) {
        return res
          .status(400)
          .json({ message: 'status can only be letters' });
      }
      if (openingBalance.trim() === '') {
        return res.status(400).json({ message: 'opening balance cannot be empty' });
      }
     
      if (type.trim() === '') {
        return res
          .status(400)
          .json({ message: 'type cannot be empty' });
      }
      if (!regex.test(type)) {
        return res
          .status(400)
          .json({ message: 'type can only be letters' });
      }


      if (status.trim() === '') {
        return res
          .status(400)
          .json({ message: 'isAdmin cannot be empty' });
      }
      if (!regex.test(status)) {
        return res
          .status(400)
          .json({ message: 'isAdmin can only be letters' });
      }
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'JSON object should contain {  type, status, openingBalance }'
      });
    }
  }

  
}
