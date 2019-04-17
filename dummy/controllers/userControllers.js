/* eslint-disable require-jsdoc */
import shortid from 'shortid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import userDb from '../db/userDummyDb';
import veryfyAdmin  from '../helpers/isAdmin';
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
        status:400,
        error: 'User email already exist'
      });
    }

    const data = {
      id: shortid.generate(),
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      type: type.toLowerCase(),
      isAdmin: veryfyAdmin(isAdmin),
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
        email
      }

    });
  }

  static userLogin(req, res) {
    const { password, email } = req.body;

    loginFieldRequiredValidation(email, password, res);

    const isExist = userDb.filter(user => user.email === email);

    let pass = false;

    if (isExist.length >= 1) {
      pass = bcrypt.compareSync(password, isExist[0].password);

    }
  

    if (isExist.length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'user credentials does not exist'
      });
    }


    if (isExist.length < 1) {
      return res.status(400).json({
        status: 404,
        error: 'user with this email does not exit'
      });
    }
    if (!pass) {
      return res.status(401).json({
        status: '404',
        error: 'password is incorrect'
      });
    }
    const id = isExist[0].id;
    const isAdmin = isExist[0].isAdmin;
    const firstname = isExist[0].firstname;
    const lastname = isExist[0].lastname;

    const token = jwt.sign({
      id, isAdmin, email, firstname, lastname
    }, secret, { expiresIn: '10h' });

    return res.status(200).json({
      status: 200,
      data: {
        token,
        id,
        firstname,
        lastname,
        email,
      }
    });


  }
}
