import { Pool } from 'pg';
import dotenv from 'dotenv';
import connect from '../config/config';

dotenv.config();

const { production } = connect;

const pool = new Pool(production);

pool.connect().then(() => {
}).catch((err) => {
 
  console.log(err.message);
});


export default pool;
