import  { useEffect } from 'react';
import axios from 'axios';
import './TransactionFeed.css';


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
// --- Transaction Simulator ---
const generateRandomTransaction = () => {
    // Let's make potential fraud much rarer in the simulation to see normal traffic
    const isPotentialFraud = Math.random() < 0.02; // Now only a 2% chance

    const normalBaseAmount = Math.random() * 4000 + 500; // Normal amounts between 600 and 4100

    let transaction;

    if (isPotentialFraud) {
        // Create a transaction with clear fraudulent characteristics
        transaction = {
            amount: normalBaseAmount * 15, // Unusually large amount
            avg_user_amount: normalBaseAmount, // The user's normal average is low, creating a huge deviation
            txn_count_24h: 25, // High frequency of transactions
            time_since_last_txn: Math.random() * 60, //0-60 seconds ago
        };
    } else {
        // Create a truly normal-looking transaction
        transaction = {
            amount: normalBaseAmount * (Math.random() * 0.1 + 0.95),
            avg_user_amount: normalBaseAmount, // User's average is close to the current amount (small deviation)
            txn_count_24h: Math.floor(Math.random() * 2) + 1, // Realistic low frequency (1, 2, or 3)
            time_since_last_txn: Math.random() * 72000 + 3600, // 1-20 hours ago in seconds
        };
  }
  
      // Round the amount to 2 decimal places
    transaction.amount = Math.round(transaction.amount * 100) / 100;

    // Common details for both types of transactions
    return {
        ...transaction, // Spreads the amount, avg_user_amount, etc.
        transaction_id: `TXN${Math.floor(Math.random() * 1000000)}`,
        timestamp: new Date().toISOString(),
        phone_number: `2547${Math.floor(Math.random() * 100000000)}`,
        location: "Nairobi",
        merchant_id: `MERCH_${Math.floor(Math.random() * 1000)}`,
        transaction_type: "payment",
    };
};

const TransactionFeed = ({ transactions, addTransaction }) => {

  useEffect(() => {
    const interval = setInterval(async () => {
      const newTxnData = generateRandomTransaction();

      try {
        // Send the new transaction to our backend for prediction
        const response = await axios.post(`${API_URL}/predict`, newTxnData);
        
        // Combine the original data with the prediction result
        const result = { ...newTxnData, ...response.data };
        addTransaction(result);

      } catch (error) {
        console.error("Error calling prediction API:", error);
        // Add transaction with an error state if API fails
        addTransaction({ ...newTxnData, is_fraud: null, error: true });
      }
    }, 3000); // Generate a new transaction every 3 seconds

    return () => clearInterval(interval);
  }, [addTransaction]);

  return (
    <div className="feed-container">
      <h2>Live Transaction Feed</h2>
      <div className="transaction-list">
        {transactions.map((txn) => (
          <div key={txn.transaction_id} className={`transaction-item ${txn.is_fraud ? 'fraud' : ''} ${txn.error ? 'error' : ''}`}>
            <div className="status-icon">{txn.is_fraud ? '🚨' : '✅'}</div>
            <div className="details">
              <span><strong>ID:</strong> {txn.transaction_id}</span>
              <span><strong>Amount:</strong> KES {Math.round(txn.amount)}</span>
              <span><strong>Time:</strong> {new Date(txn.timestamp).toLocaleTimeString()}</span>
            </div>
            {txn.is_fraud && <div className="fraud-alert">FRAUD DETECTED</div>}
            {txn.error && <div className="error-alert">API ERROR</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionFeed;