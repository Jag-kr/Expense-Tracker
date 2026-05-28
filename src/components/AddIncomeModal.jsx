import Modal from 'react-modal';
import { useState } from 'react';

Modal.setAppElement('#root');

export default function AddIncomeModal({ isOpen, onClose, onAddIncome }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onAddIncome(amount);
    if (success) {
      setAmount('');
      onClose();
    }
  };

  const handleClose = () => {
    setAmount('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      closeTimeoutMS={250}
      contentLabel="Add Balance"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <h2 className="modal-title">Add Balance</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <input
          type="number"
          className="form-input"
          placeholder="Income Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min="1"
          required
        />
        <div className="modal-actions">
          <button type="submit" className="btn btn-orange">Add Balance</button>
          <button type="button" className="btn btn-cancel" onClick={handleClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}
