
import  { useState} from 'react';
import './App.css';
import TransactionFeed from './components/TransactionFeed';
import DashboardMetrics from './components/DashboardMetrics';

function App() {
  // We will manage the list of all transactions here
  const [transactions, setTransactions] = useState([]);

  // This function will be called by our simulator to add new transactions
  const addTransaction = (newTransaction) => {
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚨 Fraud Detection Dashboard</h1>
      </header>
      <main className="App-main">
        <DashboardMetrics transactions={transactions} />
        <TransactionFeed transactions={transactions} addTransaction={addTransaction} />
      </main>
    </div>
  );
}

export default App;