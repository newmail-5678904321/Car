import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-400 ease-out';
    
    const variants = {
      primary: 'bg-white text-black hover:bg-neutral-200 border border-transparent',
      secondary: 'bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] border border-neutral-800 hover:border-neutral-700',
      outline: 'bg-transparent text-white border border-neutral-700 hover:border-white',
      ghost: 'bg-transparent text-neutral-400 hover:text-white',
    };

    const sizes = {
      sm: 'px-4 py-2.5',
      md: 'px-6 py-4',
      lg: 'px-8 py-5',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...(props as any)}
      >
        <span className="flex items-center gap-3">
          {children}
          {icon && <span className="opacity-70">{icon}</span>}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
