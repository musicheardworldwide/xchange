import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
  const [amount, setAmount] = useState(0);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/create-payment-intent', { amount });
      const { clientSecret } = response.data;
      // Use the clientSecret to initialize the Stripe payment form
      console.log(clientSecret);
    } catch (error) {         console.error('Payment failed:', error);
       }
     };

     return (
       <form onSubmit={handlePayment}>
         <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
         <button type="submit">Pay</button>
       </form>
     );
   }

   export default Payment;
