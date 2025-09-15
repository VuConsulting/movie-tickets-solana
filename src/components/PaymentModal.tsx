import React, { useState } from 'react';
import { MovieTicket } from '../types/MovieTicket';
import './PaymentModal.css';

interface PaymentModalProps {
  movie: MovieTicket;
  onClose: () => void;
  onPayment: (method: string) => void;
  loading: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  movie, 
  onClose, 
  onPayment, 
  loading 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const paymentMethods = [
    {
      id: 'solana',
      name: 'Pay with SOL',
      type: 'solana',
      icon: '🟣',
      description: 'Pay directly with Solana (SOL)'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      type: 'card',
      icon: '💳',
      description: 'Pay with traditional payment methods'
    }
  ];

  const handlePayment = () => {
    if (selectedMethod) {
      onPayment(selectedMethod);
    }
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-header">
          <h2>Purchase Ticket</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="movie-summary">
          <img src={movie.image} alt={movie.title} className="movie-poster-small" />
          <div className="movie-details">
            <h3>{movie.title}</h3>
            <p><strong>Theater:</strong> {movie.theater}</p>
            <p><strong>Showtime:</strong> {new Date(movie.showtime).toLocaleString()}</p>
            <p><strong>Seat:</strong> {movie.seat}</p>
            <p className="total-price"><strong>Total: {movie.price} SOL</strong></p>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className={`payment-method ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="method-icon">{method.icon}</div>
              <div className="method-info">
                <h4>{method.name}</h4>
                <p>{method.description}</p>
              </div>
              <div className="method-radio">
                <input 
                  type="radio" 
                  name="payment" 
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="payment-actions">
          <button 
            className="cancel-button" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="pay-button"
            onClick={handlePayment}
            disabled={!selectedMethod || loading}
          >
            {loading ? 'Processing...' : `Pay ${movie.price} SOL`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
