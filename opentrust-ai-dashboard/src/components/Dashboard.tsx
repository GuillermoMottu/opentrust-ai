import React, { useState } from 'react';
import { Bell, ShieldCheck } from 'lucide-react';
import { Transaction } from '../types';
import StatsCards from './StatsCards';
import TransactionList from './TransactionList';
import TransactionDetail from './TransactionDetail';

interface DashboardProps {
  transactions: Transaction[];
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, onLogout }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseDetail = () => {
    setSelectedTransaction(null);
  };

  const handleAction = (action: 'approve' | 'reject' | 'wait') => {
    console.log(`Action: ${action} on transaction:`, selectedTransaction);
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">OpenTrust AI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                JS
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de vuelta, Juan</h2>
          <p className="text-gray-600">Aquí está el resumen de tu actividad reciente</p>
        </div>

        <StatsCards transactions={transactions} />
        <TransactionList 
          transactions={transactions} 
          onSelectTransaction={handleSelectTransaction}
        />

        {selectedTransaction && (
          <TransactionDetail
            transaction={selectedTransaction}
            onClose={handleCloseDetail}
            onAction={handleAction}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;