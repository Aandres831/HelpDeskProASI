import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  footer?: React.ReactNode;
  variant?: 'default' | 'comic';
}

export default function Card({ children, className = '', title, footer, variant = 'default' }: CardProps) {
  const baseStyles = "bg-white overflow-hidden";
  const variants = {
    default: "rounded-xl shadow-sm border border-gray-200",
    comic: "rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {title && (
        <div className={`px-6 py-4 border-b ${variant === 'comic' ? 'border-black bg-emerald-50' : 'border-gray-100'}`}>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className={`px-6 py-4 ${variant === 'comic' ? 'bg-emerald-50 border-t-2 border-black' : 'bg-gray-50 border-t border-gray-100'}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
