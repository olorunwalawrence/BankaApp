/* eslint-disable require-jsdoc */
import verifyAdmin from '../helpers/isAdmin';
import db from '../models/index';
import updateAccount from '../queries/update';

const { activateOrDeactivateAcct } = updateAccount;


export default class AdminFunctionality {
  static ActivatOrDeactivateAccct(req, res) {
    const { isAdmin } = req.decoded;
    const { acctStatus } = req.body;
    const { accountNumber } = req.params;

    if (acctStatus !== 'active' && acctStatus !== 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'only active or dormant is allowed in the account status'
      });
    }

    try {
      if (!verifyAdmin(isAdmin)) {
        return res.status(400).json({
          status: 400,
          error: 'only an admin is allowd to perform this task'
        });
      }

      const acctValue = [
        acctStatus,
        accountNumber
      ];

      db.query(activateOrDeactivateAcct, acctValue).then(() => res.status(200).json({
        status: 200,
        data: {
          accountNumber,
          acctStatus
        }
      }));
    } catch (error) {
      res.status(401).json({
        status: 401,
        error
      });
    }
  }
}
