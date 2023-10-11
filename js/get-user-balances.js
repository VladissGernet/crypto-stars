const getUserBalances = (serverUserData) => {
  const userBalances = {};
  for (const balanceValue of serverUserData.balances) {
    userBalances[balanceValue.currency] = balanceValue.amount;
  }
  return userBalances;
};

export {getUserBalances};
