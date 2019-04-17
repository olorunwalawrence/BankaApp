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
    const status = 'active';

    const {
      type, openingBalance
    } = req.body;
    
    if (!type  || !openingBalance) {
      return res.status(400).send({
        status: 400,
        error: 'field required'
      });
    }
    const acctExist = accountDb.filter(
      acct => acct.email === email.toLowerCase()
    );
    if (!acctExist.length < 1) {
      return res.status(409).json({
        status:409,
        error: 'account  already exist'
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
      datas: {
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
