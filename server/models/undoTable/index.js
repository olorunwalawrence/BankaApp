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
  });
}, 4000);

setTimeout(() => {
  dropmodel.droptransactionTable().then(() => {
    print.log('transaction table droped successfully');
    process.exit();
  });
}, 6000);
