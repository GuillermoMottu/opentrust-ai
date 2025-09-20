import React from 'react';
import { Download, Upload } from 'lucide-react';
import { Transaction } from '../types';
import RiskMeter from './RiskMeter';

interface TransactionListProps {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onSelectTransaction }) => {
  const getRiskLevel = (score: number) => {
    if (score <= 30) return 'border-risk-low';
    if (score <= 70) return 'border-risk-medium';
    return 'border-risk-high';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pendiente' },
      approved: { class: 'status-approved', text: 'Aprobada' },
      rejected: { class: 'status-rejected', text: 'Rechazada' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Transacciones recientes</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => {
          const status = getStatusBadge(transaction.status);
          const riskLevel = getRiskLevel(transaction.risk_score);
          
          return (
            <div
              key={transaction.id}
              className={`transaction-card ${riskLevel} p-6 hover:bg-gray-50 cursor-pointer animate-fade-in`}
              onClick={() => onSelectTransaction(transaction)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    {transaction.type === 'incoming' ? (
                      <Download className="h-6 w-6 text-blue-600" />
                    ) : (
                      <Upload className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{transaction.senderName}</h4>
                    <p className="text-sm text-gray-600">{transaction.sender}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-gray-900">{formatCurrency(transaction.amount)}</div>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`status-badge px-3 py-1 rounded-full text-xs font-medium ${status.class}`}>
                      {status.text}
                    </span>
                    <RiskMeter score={transaction.risk_score} size="sm" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>{formatDate(transaction.date)}</span>
                <span className="font-medium">
                  {transaction.risk_score <= 30 ? 'Bajo riesgo' : transaction.risk_score <= 70 ? 'Riesgo medio' : 'Alto riesgo'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;