
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './DashboardMetrics.css';

const COLORS = { fraud: '#FF4136', legit: '#2ECC40' };

const DashboardMetrics = ({ transactions }) => {
  const fraudCount = transactions.filter(t => t.is_fraud).length;
  const legitCount = transactions.length - fraudCount;

  const pieData = [
    { name: 'Legitimate', value: legitCount },
    { name: 'Fraudulent', value: fraudCount },
  ];

  const barData = transactions
    .filter(t => t.is_fraud)
    .reduce((acc, t) => {
        const hour = new Date(t.timestamp).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, [])
    .map((count, hour) => ({ hour: `${hour}:00`, count }));

  return (
    <div className="metrics-container">
      <h2>Live Metrics</h2>
      <div className="chart">
        <h3>Transaction Status</h3>
        <PieChart width={300} height={250}>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
             <Cell key={`cell-0`} fill={COLORS.legit} />
             <Cell key={`cell-1`} fill={COLORS.fraud} />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
       <div className="chart">
        <h3>Fraud by Hour of Day</h3>
        <BarChart width={350} height={250} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill={COLORS.fraud} />
        </BarChart>
       </div>
    </div>
  );
};

export default DashboardMetrics;