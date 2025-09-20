import React from 'react';
import { RiskLevel } from '../types';

interface RiskMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const RiskMeter: React.FC<RiskMeterProps> = ({ score, size = 'md' }) => {
  const getRiskLevel = (score: number): RiskLevel => {
    if (score <= 30) return { level: 'low', color: 'risk-low', border: 'border-risk-low', label: 'Bajo riesgo' };
    if (score <= 70) return { level: 'medium', color: 'risk-medium', border: 'border-risk-medium', label: 'Riesgo medio' };
    return { level: 'high', color: 'risk-high', border: 'border-risk-high', label: 'Alto riesgo' };
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8 text-xs';
      case 'lg': return 'w-16 h-16 text-lg';
      default: return 'w-12 h-12 text-sm';
    }
  };

  const risk = getRiskLevel(score);
  const circumference = 2 * Math.PI * 18;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

  return (
    <div className="flex items-center space-x-2">
      <div className={`risk-meter ${getSizeClasses()}`}>
        <svg className="w-full h-full" viewBox="0 0 48 48">
          <circle className="text-gray-200" strokeWidth="4" stroke="currentColor" fill="transparent" r="18" cx="24" cy="24"/>
          <circle 
            className={`${risk.color} risk-meter-circle`} 
            strokeWidth="4" 
            strokeDasharray={strokeDasharray}
            strokeLinecap="round" 
            stroke="currentColor" 
            fill="transparent" 
            r="18" 
            cx="24" 
            cy="24"
          />
        </svg>
      </div>
      <div className={`font-medium ${risk.color}`}>
        {score}/100
      </div>
    </div>
  );
};

export default RiskMeter;