import React from 'react';
import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div 
      key={location.pathname}
      className="page-transition"
      style={{
        animation: 'fadeIn 0.3s ease-in-out',
        minHeight: '100%'
      }}
    >
      {children}
    </div>
  );
}

export default PageTransition; 