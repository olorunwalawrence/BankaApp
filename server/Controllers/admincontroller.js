/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
import { verifyStaff, verifyAdmin } from '../helpers/isAdmin';
import db from '../models/index';
import updateAccount from '../queries/update';
import Delete from '../queries/delete';
import find from '../queries/find';
import create from '../queries/insert';

const { activateOrDeactivateAcct, updateRole, updateBal } = updateAccount;

const { findByAccountNumber, findbyId } = find;
const { adminSignup, creditAccount } = create;
const { deleteAccount } = Delete;
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
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  static deleteAccounts(req, res) {
    const { accountNumber } = req.params;
    const { isAdmin, isStaff } = req.decoded;
    const admin = verifyAdmin(isAdmin);
    const staff = verifyStaff(isStaff);
    try {
      if (admin || staff) {
        db.query(deleteAccount, [accountNumber]).then((accts) => {
          if (accts.rows.length < 1) {
            return res.status(404).json({
              status: 404,
              error: 'No account found'
            });
          }
          return res.status(200).json({
            status: 200,
            message: 'the selected account  is deleted succesfully',
          });
        }).catch(err => res.status(400).json({
          status: 500,
          error: err.message
        }));
      }
      // return res.status(400).json({
      //   status: 400,
      //   error: 'only an admin or staff is allowed to perform this task'
      // });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message
      });
    }
  }

  static async creaditAccount(req, res) {
    const { isStaff, userid } = req.decoded;
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const staff = verifyStaff(isStaff);

    if (typeof amount !== 'number' || amount < 1) {
      return res.status(400).json({
        status: 400,
        error: 'please enter valid number or amount greater zero'
      });
    }
    if (!verifyStaff(staff)) {
      return res.status(400).json({
        status: 400,
        error: 'only a staff can perform this operation'
      });
    }
    const acctValue = [accountNumber];

    const accountFound = await db.query(findByAccountNumber, acctValue);
    const user = accountFound.rows[0];
    if (user.status === 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'this account is dormant'
      });
    }
    if (user) {
      const balance = parseFloat(user.currentbalance) + parseFloat(amount);
      const { accountid } = user;
      const { type } = user;
      const cashierid = userid;
      const transactionValues = [
        cashierid,
        amount,
        balance,
        accountNumber,
        accountid,
        type
      ];

      const transaction = await db.query(creditAccount, transactionValues);
      const data = transaction.rows[0];
      const updatedBalance = await db.query(updateBal, [balance, user.accountid]);
      const { transactionid } = updatedBalance;
      return res.status(201).json({
        status: 201,
        data: {
          transactionid,
          amount,
          balance: updatedBalance.balance,
          cashierid,
          transactionType: user.type
        }
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'No acount found'
    });
  }


  static async debitAccount(req, res) {
    const { isStaff, userid } = req.decoded;
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const staff = verifyStaff(isStaff);
    if (typeof amount !== 'number' || amount < 1) {
      return res.status(400).json({
        status: 400,
        error: 'please enter valid number or amount greater zero'
      });
    }
    if (!verifyStaff(staff)) {
      return res.status(400).json({
        status: 400,
        error: 'only a staff can perform this operation'
      });
    }
    const acctValue = [accountNumber];

    const accountFound = await db.query(findByAccountNumber, acctValue);

    const user = accountFound.rows[0];
    if (user.status === 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'this account is dormant'
      });
    }
    if (user) {
      if (user.currentbalance < amount) {
        return res.status(400).json({
          status: 400,
          error: 'Insufficient funds'
        });
      }
      const balance = parseFloat(user.currentbalance) - parseFloat(amount);
      const { accountid } = user;
      const { type } = user;
      const cashierid = userid;
      const transactionValues = [
        cashierid,
        amount,
        balance,
        accountNumber,
        accountid,
        type
      ];

      const transaction = await db.query(creditAccount, transactionValues);
      const data = transaction.rows[0];
      const updatedBalance = await db.query(updateBal, [balance, user.accountid]);
      const { transactionid } = updatedBalance;
      return res.status(201).json({
        status: 201,
        data: {
          transactionid,
          amount,
          balance: updatedBalance.balance,
          cashierid,
          transactionType: data.type
        }
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'No acount found'
    });
  }

  static createAdminAccount() {
    const adminDetails = {
      firstname: 'Olorunwa',
      lastname: 'Lawrence',
      email: process.env.EMAIL,
      username: 'OlorunwaLaw',
      isAdmin: verifyAdmin('true'),
      password: bcrypt.hashSync(process.env.PASSCODE, 10)
    };
    const {
      firstname, lastname, username, email, password, isAdmin
    } = adminDetails;
    const userValues = [firstname, lastname, username, email, password, isAdmin];
    return db.query(adminSignup, userValues).then().catch(err => console.log(err));
  }

  static adminUpdateUserRole(req, res) {
    try {
      const { isAdmin } = req.decoded;
      const { id } = req.params;

      if (!verifyAdmin(isAdmin)) {
        return res.status(400).json({
          status: 400,
          error: 'only an admin is allowd to perform this task'
        });
      }
      const staff = true;
      const values = [staff, id];
      const userValue = [
        id
      ];
      db.query(findbyId, userValue).then((data) => {
        const user = data.rows[0];
        if (user) {
          db.query(updateRole, values);
          return res.status(200).json({
            status: 200,
            data: {
              message: 'user account is successfully updated'
            }
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'User not found'
        });
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}
