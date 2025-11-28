export const calculateBalances = (expenses, members, payments = []) => {
  const balances = {};

  members.forEach((member) => {
    balances[member.id] = 0;
  });

  expenses.forEach((expense) => {
    const shareAmount = expense.amount / expense.sharedMembers.length;
    balances[expense.payer] += expense.amount;
    expense.sharedMembers.forEach((id) => {
      balances[id] -= shareAmount;
    });
  });

  payments.forEach((payment) => {
    balances[payment.from] += payment.amount;
    balances[payment.to] -= payment.amount;
  });

  return balances;
};

export const calculateSettlements = (balances) => {
  const settlements = [];
  const debtors = [];
  const creditors = [];

  Object.entries(balances).forEach(([id, balance]) => {
    if (balance < -0.01) {
      debtors.push({ memberId: id, amount: Math.abs(balance) });
    } else if (balance > 0.01) {
      creditors.push({ memberId: id, amount: balance });
    }
  });

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  let i = 0,
    j = 0;

  while (i < debtors.length && j < creditors.length) {
    const transferAmount = Math.min(debtors[i].amount, creditors[j].amount);

    if (transferAmount > 0.01) {
      settlements.push({
        from: debtors[i].memberId,
        to: creditors[j].memberId,
        amount: Math.round(transferAmount * 100) / 100,
      });
    }

    debtors[i].amount -= transferAmount;
    creditors[j].amount -= transferAmount;

    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }

  return settlements;
};

export const getMemberSummary = (expenses, memberId, payments = []) => {
  let totalPaid = 0;
  let totalOwed = 0;

  expenses.forEach((expense) => {
    if (expense.payer === memberId) {
      totalPaid += expense.amount;
    }
    if (expense.sharedMembers.includes(memberId)) {
      totalOwed += expense.amount / expense.sharedMembers.length;
    }
  });

  payments.forEach((payment) => {
    if (payment.from === memberId) totalPaid += payment.amount;
    if (payment.to === memberId) totalOwed += payment.amount;
  });

  const netBalance = totalPaid - totalOwed;

  return {
    totalPaid: Math.round(totalPaid * 100) / 100,
    totalOwed: Math.round(totalOwed * 100) / 100,
    netBalance: Math.round(netBalance * 100) / 100,
  };
};
