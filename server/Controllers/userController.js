/* eslint-disable require-jsdoc */
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import insert from '../queries/insert'; 
import find from '../queries/find';
// import validator from '../validator/inputValidator';

const { userSignup } = insert;
const { findbyemail } = find;



config();
const secret = process.env.SECRET;

export default class Users {
  // eslint-disable-next-line require-jsdoc
  static createUser(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);

    const {
      firstname,
      lastname,
      email,
      username
    } = req.body;


    const userValues = [
      firstname,
      lastname,
      username,
      email,
      password,
    ];
    return db.query(userSignup, userValues).then((newUser) => {
      const { userid } = newUser.rows[0];
      const token = jwt.sign({ userid,firstname, lastname, email, username  }, secret, { expiresIn: '10h' });

      return res.status(201).json({
        status: 201,
        data: {
          token,
          userid,
          firstname,
          lastname,
          email,
          password
        }
      });
    });
  }

  // user login
  static userLogin(req, res) {
    const { email, password } = req.body;
    const userEmail = [email.trim()];

    db.query(findbyemail, userEmail).then((user) => {
      if (user.rows[0] && bcrypt.compareSync(password.trim(), user.rows[0].password)) {
        const { userid, username } = user.rows[0];

        const token = jwt.sign({ userid, email, username }, secret, { expiresIn: '10h' });
        return res.status(200).json({
          status: 200,
          data: { username, email, token }
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
  }
}
