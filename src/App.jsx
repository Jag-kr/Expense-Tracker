import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useExpenses } from './hooks/useExpenses';
import AddIncomeModal from './components/AddIncomeModal';
import AddExpenseModal from './components/AddExpenseModal';
import ExpenseList from './components/ExpenseList';
import ExpensePieChart from './components/ExpensePieChart';
import TopExpenses from './components/TopExpenses';

export default function App() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    expenses,
    walletBalance,
    totalExpenses,
    addIncome,
    addExpense,
    editExpense,
    deleteExpense,
    getCategoryTotals,
  } = useExpenses();

  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const categoryTotals = getCategoryTotals();

  const handleAddIncome = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      enqueueSnackbar('Please enter a valid amount.', { variant: 'warning' });
      return false;
    }
    addIncome(num);
    enqueueSnackbar(`₹${num} added to wallet!`, { variant: 'success' });
    return true;
  };

  const handleAddExpense = (form) => {
    const result = addExpense(form);
    if (!result.success) {
      enqueueSnackbar('Insufficient wallet balance!', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Expense added successfully!', { variant: 'success' });
    setExpenseModalOpen(false);
  };

  const handleEditExpense = (form) => {
    const result = editExpense(editingExpense.id, form);
    if (!result.success) {
      enqueueSnackbar('Insufficient wallet balance!', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Expense updated successfully!', { variant: 'success' });
    setEditingExpense(null);
    setExpenseModalOpen(false);
  };

  const handleDeleteExpense = (id) => {
    deleteExpense(id);
    enqueueSnackbar('Expense deleted.', { variant: 'info' });
  };

  const handleOpenEdit = (expense) => {
    setEditingExpense(expense);
    setExpenseModalOpen(true);
  };

  const handleCloseExpenseModal = () => {
    setExpenseModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="app">
      <h1 className="app-title">Expense Tracker</h1>

      {/* Top Panel: Wallet + Expenses + Pie Chart */}
      <section className="top-panel">
        <div className="balance-cards">
          {/* Wallet Balance Card */}
          <div className="balance-card">
            <p className="balance-label">
              Wallet Balance:{' '}
              <span className="balance-amount">₹{walletBalance}</span>
            </p>
            <button
              type="button"
              id="add-income-btn"
              className="btn btn-green"
              onClick={() => setIncomeModalOpen(true)}
            >
              + Add Income
            </button>
          </div>

          {/* Expenses Card */}
          <div className="balance-card">
            <p className="balance-label">
              Expenses:{' '}
              <span className="expenses-amount">₹{totalExpenses}</span>
            </p>
            <button
              type="button"
              id="add-expense-btn"
              className="btn btn-red"
              onClick={() => setExpenseModalOpen(true)}
            >
              + Add Expense
            </button>
          </div>
        </div>

        {/* Pie Chart */}
        <ExpensePieChart categoryTotals={categoryTotals} />
      </section>

      {/* Bottom Section: Recent Transactions + Top Expenses */}
      <div className="bottom-section">
        <div className="expense-list-wrapper">
          <h2 className="section-title">Recent Transactions</h2>
          <ExpenseList
            expenses={expenses}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteExpense}
          />
        </div>

        <div className="top-expenses-wrapper">
          <h2 className="section-title">Top Expenses</h2>
          <TopExpenses categoryTotals={categoryTotals} />
        </div>
      </div>

      {/* Modals */}
      <AddIncomeModal
        isOpen={incomeModalOpen}
        onClose={() => setIncomeModalOpen(false)}
        onAddIncome={handleAddIncome}
      />

      <AddExpenseModal
        isOpen={expenseModalOpen}
        onClose={handleCloseExpenseModal}
        onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
        editData={editingExpense}
      />
    </div>
  );
}
