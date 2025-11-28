export const createExpense = async (expenseData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!expenseData.title || !expenseData.amount || !expenseData.payer) {
    throw new Error(
      "Missing required fields: title, amount, and payer are required"
    );
  }

  if (!expenseData.sharedMembers || expenseData.sharedMembers.length === 0) {
    throw new Error("At least one member must be selected for cost sharing");
  }

  const createdExpense = {
    id: Date.now().toString(),
    title: expenseData.title,
    amount: parseFloat(expenseData.amount),
    payer: expenseData.payer,
    sharedMembers: expenseData.sharedMembers,
    receiptUri: expenseData.receiptUri || null,
    groupId: expenseData.groupId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return createdExpense;
};

export const updateExpense = async (expenseId, updates) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: expenseId,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
};

export const deleteExpense = async (expenseId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
};
