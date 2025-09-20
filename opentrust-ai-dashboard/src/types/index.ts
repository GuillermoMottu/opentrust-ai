export interface Transaction {
  id: string;
  amount: number;
  sender: string;
  senderName: string;
  date: string;
  risk_score: number;
  explanation: string;
  recommendation: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'incoming' | 'outgoing';
  currency: string;
}

export interface RiskLevel {
  level: 'low' | 'medium' | 'high';
  color: string;
  border: string;
  label: string;
}