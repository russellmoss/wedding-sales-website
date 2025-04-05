import React from 'react';

function ContentPage({ title, children, className = '' }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-gilda text-darkBrown">{title}</h1>
      </div>
      
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
}

export default ContentPage; 