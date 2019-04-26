/* eslint-disable require-jsdoc */
import { config } from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import insert from '../queries/insert';
import find from '../queries/find';

const { userSignup } = insert;
const { findbyemail } = find;


config();
const secret = process.env.SECRET;

export default class Users {
  // eslint-disable-next-line require-jsdoc
  static createUser(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const isAdmin = false;
    const staff = false;
    const {
      firstname,
      lastname,
      email,
      username,
    } = req.body;


    const userValues = [
      firstname,
      lastname,
      username,
      email,
      password,
      isAdmin,
      staff
    ];
    return db.query(userSignup, userValues).then((newUser) => {
      const { userid } = newUser.rows[0];

      const token = jwt.sign({
        userid, firstname, lastname, email, username, isAdmin, staff
      }, secret, { expiresIn: '10h' });

      return res.status(201).json({
        status: 201,
        data: {
          token: `Bearer ${token}`,
          userid,
          firstname,
          lastname,
          email,
          isAdmin
        },
        message: `${username} account has been successfully created `
      });
    });
  }


  // user login
  static userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const userEmail = [email.trim()];

      db.query(findbyemail, userEmail).then((user) => {
        if (user.rows[0] && bcrypt.compareSync(password.trim(), user.rows[0].password)) {
          const {
            userid, username, firstname, lastname, isadmin, staff
          } = user.rows[0];
          const isAdmin = isadmin === 'true';
          const isStaff = staff === 'true';
          const token = jwt.sign({
            userid, firstname, lastname, email, username, isAdmin, isStaff
          }, secret, { expiresIn: '10h' });
          return res.status(200).json({
            status: 200,
            data: {
              token: `Bearer ${token}`,
              firstname,
              lastname,
              username,
              email,
              isAdmin
            },
            message: `${username} is successfully logged in `
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'Login credentials is incorrect. '
        });
      }).catch((err) => {
        res.status(500).json({
          status: 500,
          error: `their is an internal/server error ${err.message}`
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }

  }
}
