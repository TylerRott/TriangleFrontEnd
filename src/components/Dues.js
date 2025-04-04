import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dues = () => {
  const [dues, setDues] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call the backend API to fetch dues information
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dues`)
      .then(response => {
        setDues(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Unable to retrieve dues information.');
      });
  }, []);

  return (
    <div className="container">
      <h2>Dues & Payments</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {dues ? (
        <div>
          <p>Amount Due: ${dues.amountDue}</p>
          <p>Status: {dues.status}</p>
          <button onClick={() => alert("Payment functionality to be implemented.")}>Pay Dues</button>
        </div>
      ) : (
        <p>Loading dues information...</p>
      )}
    </div>
  );
};

export default Dues;