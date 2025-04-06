import React from 'react';
import '../../styles/rubric.css';

const LoadingSpinner = ({ size = 'normal' }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className={`loading-spinner ${size === 'large' ? 'large' : ''}`} />
    </div>
  );
};

export default LoadingSpinner; 