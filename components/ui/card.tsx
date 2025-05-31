import type { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  gradient?: boolean;
}

/**
 * Reusable Plutus Card component
 */
export const Card = ({ children, className = '', gradient = false, ...props }: CardProps) => (
  <div
    role="region"
    className={`rounded-2xl border border-main-white/20 bg-main-white/5 p-6 shadow-lg ${gradient ? 'bg-gradient-to-br from-palatinate-blue/10 to-accent-green/10' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card; 