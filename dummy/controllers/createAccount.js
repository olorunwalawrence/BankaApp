/* eslint-disable require-jsdoc */
import shortid from 'shortid';
import accountDb from '../db/AccountDb';

export default class Account {
  static createAccount(req, res) {
    const {
      firstname, email, lastname, id
    } = req.decoded;

    const userId = id;
    const accountNumber = Math.floor(Math.random() * 10000000000);
    const date = new Date();

    const {
      type, status, openingBalance
    } = req.body;
    
    if (!type || !status || !openingBalance) {
      return res.status(400).send({
        success: 'false',
        message: 'field required'
      });
    }
    const acctExist = accountDb.filter(
      acct => acct.email === email.toLowerCase()
    );
    if (!acctExist.length < 1) {
      return res.status(409).json({
        message: 'account  already exist'
      });
    }
    const data = {
      id: shortid.generate(),
      userId,
      firstname,
      accountNumber,
      lastname,
      email,
      date,
      type,
      status,
      openingBalance: Number(openingBalance).toFixed(2)
    };
    accountDb.push(data);
    return res.status(201).json({
      status: 201,
      message: 'Account created successfully',
      datas: {
        date,
        accountNumber,
        firstname,
        lastname,
        email,
        type,
        openingBalance
      }
    });
  }
}
