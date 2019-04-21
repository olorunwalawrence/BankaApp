import index from './index';
import accountTable from './account';


const print = console;

const signupTable = () => {
  const userTable = `
        CREATE TABLE IF NOT EXISTS users (

        userid SERIAL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
        
        )`;   
  return index.query(userTable);
};

setTimeout(() =>{
  signupTable().then(() => {
    print.log('user table created successfully');
  });
}, 1000)

setTimeout(() => {
  accountTable().then(() => {
    print.log('account table created succesfully');
    process.exit();
  }).catch((err) => {
    print.log(err.message);
  });
}, 3000);


