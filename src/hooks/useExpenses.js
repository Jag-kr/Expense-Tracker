import { useState, useEffect } from 'react';

const DEFAULT_BALANCE = 5000;
const STORAGE_KEY_EXPENSES = 'expenses';
const STORAGE_KEY_BALANCE = 'walletBalance';

export function useExpenses() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_EXPENSES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [walletBalance, setWalletBalance] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BALANCE);
      return stored ? parseFloat(stored) : DEFAULT_BALANCE;
    } catch {
      return DEFAULT_BALANCE;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BALANCE, walletBalance.toString());
  }, [walletBalance]);

  const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.price || 0), 0);

  const addIncome = (amount) => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      setWalletBalance(prev => prev + num);
      return true;
    }
    return false;
  };

  const addExpense = (expense) => {
    const amount = parseFloat(expense.price);
    if (amount > walletBalance) {
      return { success: false, reason: 'insufficient' };
    }
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      price: amount,
    };
    setExpenses(prev => [newExpense, ...prev]);
    setWalletBalance(prev => prev - amount);
    return { success: true };
  };

  const editExpense = (id, updatedExpense) => {
    const oldExpense = expenses.find(e => e.id === id);
    if (!oldExpense) return { success: false };
    const oldAmount = parseFloat(oldExpense.price);
    const newAmount = parseFloat(updatedExpense.price);
    const diff = newAmount - oldAmount;
    if (diff > walletBalance) {
      return { success: false, reason: 'insufficient' };
    }
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...updatedExpense, price: newAmount } : e));
    setWalletBalance(prev => prev - diff);
    return { success: true };
  };

  const deleteExpense = (id) => {
    const expense = expenses.find(e => e.id === id);
    if (!expense) return;
    setExpenses(prev => prev.filter(e => e.id !== id));
    setWalletBalance(prev => prev + parseFloat(expense.price));
  };

  const getCategoryTotals = () => {
    const totals = { food: 0, entertainment: 0, travel: 0 };
    expenses.forEach(e => {
      const cat = e.category?.toLowerCase();
      if (cat in totals) totals[cat] += parseFloat(e.price || 0);
    });
    return totals;
  };

  return {
    expenses,
    walletBalance,
    totalExpenses,
    addIncome,
    addExpense,
    editExpense,
    deleteExpense,
    getCategoryTotals,
  };
}
