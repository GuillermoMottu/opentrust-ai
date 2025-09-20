import React from 'react';
import { X, Check, Clock, AlertTriangle } from 'lucide-react';
import { Transaction } from '../types';
import RiskMeter from './RiskMeter';

interface TransactionDetailProps {
  transaction: Transaction;
  onClose: () => void;
  onAction: (action: 'approve' | 'reject' | 'wait') => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction, onClose, onAction }) => {
  const getRiskLevel = (score: number) => {
    if (score <= 30) return { level: 'low', color: 'risk-low', label: 'Bajo riesgo' };
    if (score <= 70) return { level: 'medium', color: 'risk-medium', label: 'Riesgo medio' };
    return { level: 'high', color: 'risk-high', label: 'Alto riesgo' };
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pendiente', icon: Clock },
      approved: { class: 'status-approved', text: 'Aprobada', icon: Check },
      rejected: { class: 'status-rejected', text: 'Rechazada', icon: X }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
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

  const risk = getRiskLevel(transaction.risk_score);
  const status = getStatusBadge(transaction.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Detalle de transacción</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{transaction.senderName}</h4>
              <p className="text-gray-600">{transaction.sender}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(transaction.amount)}</div>
              <span className={`status-badge px-3 py-1 rounded-full text-sm font-medium ${status.class}`}>
                {status.text}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-gray-900">Nivel de riesgo</h5>
              <RiskMeter score={transaction.risk_score} size="lg" />
            </div>
            <p className={`text-sm font-medium ${risk.color}`}>{risk.label}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-sm font-medium text-gray-500 mb-2">Fecha y hora</h6>
              <p className="text-gray-900">{formatDate(transaction.date)}</p>
            </div>
            <div>
              <h6 className="text-sm font-medium text-gray-500 mb-2">Moneda</h6>
              <p className="text-gray-900">{transaction.currency}</p>
            </div>
            <div>
              <h6 className="text-sm font-medium text-gray-500 mb-2">Tipo</h6>
              <p className="text-gray-900">{transaction.type === 'incoming' ? 'Entrante' : 'Saliente'}</p>
            </div>
            <div>
              <h6 className="text-sm font-medium text-gray-500 mb-2">ID de transacción</h6>
              <p className="text-gray-900 font-mono text-sm">{transaction.id}</p>
            </div>
          </div>

          <div>
            <h6 className="text-sm font-medium text-gray-500 mb-2">Explicación del riesgo</h6>
            <p className="text-gray-900 bg-blue-50 p-4 rounded-xl">{transaction.explanation}</p>
          </div>

          <div>
            <h6 className="text-sm font-medium text-gray-500 mb-2">Recomendación del sistema</h6>
            <p className="text-gray-900 bg-green-50 p-4 rounded-xl font-semibold">{transaction.recommendation}</p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => onAction('approve')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              <Check className="h-5 w-5 mr-2" />
              Aprobar
            </button>
            <button
              onClick={() => onAction('reject')}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              <X className="h-5 w-5 mr-2" />
              Rechazar
            </button>
            <button
              onClick={() => onAction('wait')}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              <Clock className="h-5 w-5 mr-2" />
              Esperar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;