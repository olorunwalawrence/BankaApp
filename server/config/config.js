import dotenv from 'dotenv';

dotenv.config();

const config = {
  production: {
    connectionString: process.env.DATABASE_URL
  },
  development: {
    connectionString: process.env.DATABASE_URL,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
  },
  test: {
    connectionString: process.env.DATABASE_URL
  }
};

export default config;
