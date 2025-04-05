import React from 'react';

/**
 * A reusable component for displaying highlighted content
 * @param {Object} props
 * @param {string} props.title - The title of the highlights section
 * @param {React.ReactNode} props.children - The content to display in the highlights section
 */
function Highlights({ title, children }) {
  return (
    <div 
      className="p-6 rounded-lg border-2 border-amber-300 shadow-md"
      style={{ backgroundColor: '#FEF3C7' }} // Light brown/amber color
    >
      <h3 className="text-xl font-gilda text-darkBrown mb-4">{title}</h3>
      <div className="text-darkBrown">
        {children}
      </div>
    </div>
  );
}

export default Highlights; 