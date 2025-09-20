import React from 'react';
import { CreditCard, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Transaction } from '../types';

interface StatsCardsProps {
  transactions: Transaction[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ transactions }) => {
  const stats = {
    total: transactions.length,
    pending: transactions.filter(t => t.status === 'pending').length,
    approved: transactions.filter(t => t.status === 'approved').length,
    highRisk: transactions.filter(t => t.risk_score > 70).length
  };

  const cards = [
    {
      title: 'Total transacciones',
      value: stats.total,
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Pendientes',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Aprobadas',
      value: stats.approved,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Alto riesgo',
      value: stats.highRisk,
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
              <card.icon className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
          </div>
          <p className="text-sm text-gray-600">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;