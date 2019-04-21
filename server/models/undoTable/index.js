import dropmodel from './deleteTable';

const print = console;
setTimeout(() => {
  dropmodel.dropUserTable().then(() => {
    print.log('user table droped successfully');
    
  });
}, 2000);
setTimeout(() => {
    dropmodel.dropAccountTable().then(() => {
      print.log('account table droped successfully');
      process.exit();
    });
  }, 4000);

