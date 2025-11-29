export const calculateBalances = (expenses = [], members = []) => {
  const balances = {};

  members.forEach((member) => {
    balances[member.id] = {
      id: member.id,
      name: member.name,
      paid: 0,
      share: 0,
      balance: 0,
    };
  });

  expenses.forEach((expense) => {
    const amount = parseFloat(expense.amount) || 0;
    const sharedMembers = expense.sharedMembers || [];

    if (balances[expense.payer]) {
      balances[expense.payer].paid += amount;
    }

    const sharePerPerson =
      sharedMembers.length > 0 ? amount / sharedMembers.length : 0;

    sharedMembers.forEach((memberId) => {
      if (balances[memberId]) {
        balances[memberId].share += sharePerPerson;
      }
    });
  });

  Object.keys(balances).forEach((memberId) => {
    balances[memberId].balance =
      balances[memberId].paid - balances[memberId].share;
  });

  return balances;
};

export const getSortedBalances = (balances) => {
  return Object.values(balances).sort((a, b) => b.balance - a.balance);
};

export const getDebtors = (balances) => {
  return Object.values(balances).filter((b) => b.balance < -0.01);
};

export const getCreditors = (balances) => {
  return Object.values(balances).filter((b) => b.balance > 0.01);
};

export const formatCurrency = (amount) => {
  return `₹${Math.abs(amount).toFixed(2)}`;
};
