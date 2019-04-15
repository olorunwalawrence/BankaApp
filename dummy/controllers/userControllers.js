/* eslint-disable require-jsdoc */
import shortid from 'shortid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import userDb from '../db/userDummyDb';
import UserFieldRequired, { loginFieldRequiredValidation } from '../validations/userValidation';

config();
const secret = process.env.SECRET;

export default class UserControllers {
  static createUser(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const {
      firstname, lastname, email, type, isAdmin
    } = req.body;

    UserFieldRequired(firstname, lastname, email, type, password, isAdmin, res);

    const isExist = userDb.filter(
      Email => Email.email === email.toLowerCase()
    );

    if (!isExist.length < 1) {
      return res.status(409).json({
        message: 'User email already exist'
      });
    }

    const data = {
      id: shortid.generate(),
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      type: type.toLowerCase(),
      isAdmin,
      password
    };
    const { id } = data;
    const token = jwt.sign({
 id, isAdmin, email, firstname, lastname 
}, secret, { expiresIn: '10h' });

    userDb.push(data);
    return res.status(201).json({
      status: 201,
      data: {
        token,
        id,
        firstname,
        lastname,
        email,
        isAdmin,
        type
      }

    });
  }

  static userLogin(req, res) {
    const { password, email } = req.body;
    let Users = {};
    userDb.filter((user) => {
      Users = user;
    });

    loginFieldRequiredValidation(email, password , res)

    if (Users.email !== email) {
      return res.status(400).json({
        status: 404,
        message: 'user with this email does not exit'
      });
    }

    const data = {
      email,
      password
    };

    const { id, isAdmin, firstname, lastname } = Users;
    const token = jwt.sign({ id, isAdmin, email, firstname, lastname }, secret, { expiresIn: '10h' });
    userDb.push(data);
    return res.status(201).json({
      message: `${firstname}  is successfully logged in`,
      data:{
        firstname,
        lastname,
        email
      },
      token

    });
  }
}
