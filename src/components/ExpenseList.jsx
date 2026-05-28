import { MdOutlineFastfood } from 'react-icons/md';
import { MdMovieFilter } from 'react-icons/md';
import { MdFlight } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

const CATEGORY_ICONS = {
  food: <MdOutlineFastfood />,
  entertainment: <MdMovieFilter />,
  travel: <MdFlight />,
};

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="expense-list">
        <p className="expense-empty">No transactions!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map(expense => (
        <div key={expense.id} className="expense-item">
          <div className="expense-icon">
            {CATEGORY_ICONS[expense.category?.toLowerCase()] || <MdOutlineFastfood />}
          </div>
          <div className="expense-details">
            <div className="expense-title">{expense.title}</div>
            <div className="expense-date">{expense.date}</div>
          </div>
          <div className="expense-amount">₹{parseFloat(expense.price)}</div>
          <div className="expense-actions">
            <button
              className="btn btn-icon btn-icon-red"
              onClick={() => onDelete(expense.id)}
              aria-label="Delete expense"
              type="button"
            >
              <MdDelete />
            </button>
            <button
              className="btn btn-icon btn-icon-orange"
              onClick={() => onEdit(expense)}
              aria-label="Edit expense"
              type="button"
            >
              <MdEdit />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
