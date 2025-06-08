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
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white',
    warning: 'bg-yellow-600 text-white',
    success: 'bg-green-600 text-white',
    info: 'bg-cyan-600 text-white',
    secondary: 'bg-gray-600 text-white'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge; 