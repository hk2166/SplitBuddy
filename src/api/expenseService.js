/**
 * Expense API Service
 * 
 * This is a stub implementation that simulates API calls.
 * Replace with actual API endpoints when backend is ready.
 */

/**
 * Create a new expense
 * @param {Object} expenseData - The expense data
 * @param {string} expenseData.title - Expense title/description
 * @param {number} expenseData.amount - Expense amount
 * @param {string} expenseData.payer - ID or name of the person who paid
 * @param {Array<string>} expenseData.sharedMembers - Array of member IDs/names sharing the cost
 * @param {string} [expenseData.receiptUri] - Optional URI of the receipt image
 * @param {string} expenseData.groupId - ID of the group this expense belongs to
 * @returns {Promise<Object>} The created expense object
 */
export const createExpense = async (expenseData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate required fields
    if (!expenseData.title || !expenseData.amount || !expenseData.payer) {
        throw new Error('Missing required fields: title, amount, and payer are required');
    }

    if (!expenseData.sharedMembers || expenseData.sharedMembers.length === 0) {
        throw new Error('At least one member must be selected for cost sharing');
    }

    // Simulate successful API response
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

    // In a real implementation, this would make an HTTP request:
    // const response = await fetch('/api/expenses', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(expenseData)
    // });
    // return response.json();

    return createdExpense;
};

/**
 * Update an existing expense
 * @param {string} expenseId - The expense ID
 * @param {Object} updates - The fields to update
 * @returns {Promise<Object>} The updated expense object
 */
export const updateExpense = async (expenseId, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        id: expenseId,
        ...updates,
        updatedAt: new Date().toISOString(),
    };
};

/**
 * Delete an expense
 * @param {string} expenseId - The expense ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteExpense = async (expenseId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
};
