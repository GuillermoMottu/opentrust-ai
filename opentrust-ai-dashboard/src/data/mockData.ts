import { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    sender: 'cliente_nuevo@alemania.pay',
    senderName: 'Max Müller',
    date: '2024-01-15T10:30:00',
    risk_score: 68,
    explanation: 'Pago desde wallet nueva + monto inusual. La wallet fue creada hace 3 días en Alemania.',
    recommendation: 'Revisar manualmente',
    status: 'pending',
    type: 'incoming',
    currency: 'USD'
  },
  {
    id: '2',
    amount: 10000,
    sender: 'benefactor_anonimo@donaciones.pay',
    senderName: 'Fundación Ayuda',
    date: '2024-01-14T15:45:00',
    risk_score: 23,
    explanation: 'Patrón similar a donaciones legítimas previas. Wallet con historial limpio de 6 meses.',
    recommendation: 'Aprobar automáticamente',
    status: 'approved',
    type: 'incoming',
    currency: 'USD'
  },
  {
    id: '3',
    amount: 1500,
    sender: 'fraudulento@scam.pay',
    senderName: 'Unknown Sender',
    date: '2024-01-16T08:20:00',
    risk_score: 94,
    explanation: 'Patrón similar a esquema conocido de carding. Múltiples transacciones en corto tiempo.',
    recommendation: 'Bloquear automáticamente',
    status: 'rejected',
    type: 'incoming',
    currency: 'USD'
  },
  {
    id: '4',
    amount: 500,
    sender: 'cliente_habitual@confiable.pay',
    senderName: 'Maria Rodriguez',
    date: '2024-01-13T14:20:00',
    risk_score: 15,
    explanation: 'Remitente confiable con historial de 12+ meses. Monto dentro del promedio.',
    recommendation: 'Aprobar automáticamente',
    status: 'approved',
    type: 'incoming',
    currency: 'USD'
  }
];