import Modal from 'react-modal';
import { useState, useEffect } from 'react';

Modal.setAppElement('#root');

const CATEGORIES = ['food', 'entertainment', 'travel'];

const emptyForm = { title: '', price: '', category: '', date: '' };

export default function AddExpenseModal({ isOpen, onClose, onSubmit, editData }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || '',
        price: editData.price?.toString() || '',
        category: editData.category || '',
        date: editData.date || '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category || !form.date) return;
    onSubmit(form);
    setForm(emptyForm);
  };

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      closeTimeoutMS={250}
      contentLabel={editData ? 'Edit Expense' : 'Add Expenses'}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2 className="modal-title">{editData ? 'Edit Expense' : 'Add Expenses'}</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="title"
            className="form-input"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            className="form-input"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-row">
          <select
            name="category"
            className="form-input"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            className="form-input"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="modal-actions">
          <button type="submit" className="btn btn-orange">
            {editData ? 'Update Expense' : 'Add Expense'}
          </button>
          <button type="button" className="btn btn-cancel" onClick={handleClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}
