import React, { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export const useGroups = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroups must be used within a GroupProvider");
  }
  return context;
};

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  const addGroup = (group) => {
    const newGroup = {
      id: Date.now().toString(),
      name: group.name,
      description: group.description || "",
      members: group.members || [],
      expenses: [],
      totalExpenses: 0,
      createdAt: new Date().toISOString(),
    };
    setGroups((prev) => [newGroup, ...prev]);
    return newGroup;
  };

  const updateGroup = (groupId, updates) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, ...updates } : group
      )
    );
  };

  const deleteGroup = (groupId) => {
    setGroups((prev) => prev.filter((group) => group.id !== groupId));
  };

  const getGroup = (groupId) => {
    return groups.find((group) => group.id === groupId);
  };

  const addExpenseToGroup = (groupId, expense) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          const newExpense = {
            id: Date.now().toString(),
            ...expense,
            createdAt: new Date().toISOString(),
          };
          return {
            ...group,
            expenses: [newExpense, ...group.expenses],
            totalExpenses: group.totalExpenses + parseFloat(expense.amount),
          };
        }
        return group;
      })
    );
  };

  const addMember = (groupId, memberName) => {
    if (!memberName.trim()) return null;

    const newMember = {
      id: Date.now().toString(),
      name: memberName.trim(),
      addedAt: new Date().toISOString(),
    };

    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: [...group.members, newMember],
          };
        }
        return group;
      })
    );

    return newMember;
  };

  const updateMember = (groupId, memberId, newName) => {
    if (!newName.trim()) return false;

    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.map((member) =>
              member.id === memberId
                ? { ...member, name: newName.trim() }
                : member
            ),
          };
        }
        return group;
      })
    );

    return true;
  };

  const deleteMember = (groupId, memberId) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter((member) => member.id !== memberId),
          };
        }
        return group;
      })
    );

    return true;
  };

  const value = {
    groups,
    addGroup,
    updateGroup,
    deleteGroup,
    getGroup,
    addExpenseToGroup,
    addMember,
    updateMember,
    deleteMember,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};
