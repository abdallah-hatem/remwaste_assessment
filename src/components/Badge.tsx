import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'warning' | 'success' | 'info' | 'secondary';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary', 
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold';
  
  const variantClasses = {
    primary: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    success: 'bg-green-100 text-green-800 border border-green-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200',
    secondary: 'bg-gray-100 text-gray-800 border border-gray-200'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge; 