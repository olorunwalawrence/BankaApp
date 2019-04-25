import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import db from '../models/index';
import find from '../queries/find';

const { findbyId } = find;
dotenv.config();
const  secret = process.env.SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey =  secret;

export default(passport) => {
  passport.use(
    new Strategy(opts, async (jwtPayLoad, done) => {
      try {
        const user = await db.query(findbyId, [jwtPayLoad.userid]);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) { console.log(error); }
    })
  );
};
