import type { ReactNode, Ref } from 'react';
import React from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  gradient?: boolean;
  style?: React.CSSProperties;
  innerRef?: Ref<HTMLDivElement>;
}

/**
 * Reusable Plutus Card component
 */
export const Card = ({ children, className = '', gradient = false, style, innerRef, ...props }: CardProps) => (
    <div
      ref={innerRef}
      role="region"
      className={`rounded-2xl border border-main-white/15 ${gradient ? 'bg-gradient-to-br from-palatinate-blue/10 to-accent-green/10' : 'bg-black/50'} p-6 shadow-lg ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
);

export default Card; 