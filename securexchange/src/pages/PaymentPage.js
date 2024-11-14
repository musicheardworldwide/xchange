import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = {
      fileId: id,
      cardNumber,
      expiryDate,
      cvv
    };

    axios.post('/api/payment', paymentData)
      .then(response => {
        console.log('Payment successful:', response.data);
        navigate(`/download/${id}`);
      })
      .catch(error => console.error('Error processing payment:', error));
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
        <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default PaymentPage;
