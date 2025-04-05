import React from 'react';
import { Link } from 'react-router-dom';

function ContentCard({ 
  title, 
  description, 
  path, 
  icon, 
  category,
  className = '' 
}) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}>
      {icon && (
        <div className="text-primary mb-4 text-3xl">
          {icon}
        </div>
      )}
      
      <h3 className="text-xl font-gilda mb-3 text-darkBrown">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      
      <div className="flex justify-between items-center">
        {category && (
          <span className="text-sm text-gray-500 capitalize">{category}</span>
        )}
        
        <Link to={path} className="button button-primary">
          View Content
        </Link>
      </div>
    </div>
  );
}

export default ContentCard; 