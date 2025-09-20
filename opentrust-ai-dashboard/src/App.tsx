import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { mockTransactions } from './data/mockData';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard transactions={mockTransactions} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;