import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

/**
 * Reusable Plutus Button component
 */
export const Button = ({ children, className = '', ...props }: ButtonProps) => (
  <button
    className={`rounded-pill border border-main-white/15 bg-main-white/5 px-12 py-2.5 font-mono uppercase tracking-wide text-main-white transition-all duration-200 hover:bg-main-white/10 hover:border-main-white/60 focus:outline-none focus:ring-2 focus:ring-palatinate-blue/60 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button; 