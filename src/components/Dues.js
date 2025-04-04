import React, { useContext, useState } from 'react';
import { db } from '../firebase'; // Import Firestore instance
import { UserContext } from '../contexts/UserContext'; // Import UserContext
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions

const Dues = () => {
  const { user } = useContext(UserContext); // Get the logged-in user's data
  const [loading, setLoading] = useState(false);

  const checkPaymentStatus = async () => {
    if (!user) {
      alert('You must be logged in to check your payment status.');
      return;
    }

    setLoading(true);
    try {
      // Query the Firestore collection to find the document by email
      const q = query(collection(db, 'users'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Get the first matching document
        const paymentStatus = userDoc.data().PaymentStatus; // Assuming 'PaymentStatus' is the field name
        alert(`Payment Status: ${paymentStatus}`); // Show the payment status in a popup
      } else {
        alert('No payment record found for this user.');
      }
    } catch (error) {
      console.error('Error fetching payment status:', error);
      alert('Failed to fetch payment status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Dues & Payments</h2>
      <p>Click the button below to check your payment status.</p>
      <button onClick={checkPaymentStatus} disabled={loading}>
        {loading ? 'Checking...' : 'Check Payment Status'}
      </button>
    </div>
  );
};

export default Dues;