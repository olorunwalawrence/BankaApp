import { Pool } from 'pg';
import dotenv from 'dotenv';
import connect from '../config/config';

dotenv.config();

const { production, development } = connect;

const pool = new Pool(development);

pool.connect().then(() => {
  console.log('connected!')
}).catch((err) => {
  console.log(err.message);
});


export default pool;
