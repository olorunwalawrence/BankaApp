const update = {
  activateOrDeactivateAcct: 'UPDATE accounts SET status = $1 WHERE accountNumber =$2 returning *',
  updateRole: 'UPDATE users SET staff = $1 WHERE userid =$2 returning *',
  updateBal: 'UPDATE accounts SET currentbalance = $1 WHERE accountid =$2 returning *',
};

export default update;
