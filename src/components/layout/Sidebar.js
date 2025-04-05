import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ isOpen, closeSidebar }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    weddings: true,
    sales: true
  });

  const weddingPages = [
    { path: '/weddings/venue-overview', title: 'Venue Overview' },
    { path: '/weddings/clubhouse', title: 'The Clubhouse' },
    { path: '/weddings/farmhouse', title: 'The Farmhouse' },
    { path: '/weddings/food-and-wine', title: 'Food and Wine' },
    { path: '/weddings/drink-packages', title: 'Drink Packages' },
    { path: '/weddings/accommodations', title: 'Accommodations' },
    { path: '/weddings/associated-events', title: 'Associated Events' },
    { path: '/weddings/preferred-vendors', title: 'Preferred Vendors' },
    { path: '/weddings/faq', title: 'FAQ' }
  ];

  const salesPages = [
    { path: '/sales/overview', title: 'Sales Overview' },
    { path: '/sales/inquiry-response', title: 'Inquiry Response' },
    { path: '/sales/qualification', title: 'Qualification' },
    { path: '/sales/venue-tour', title: 'Venue Tour' },
    { path: '/sales/proposal', title: 'Proposal' },
    { path: '/sales/followup', title: 'Follow-Up' },
    { path: '/sales/closing', title: 'Closing' },
    { path: '/sales/post-booking', title: 'Post-Booking' },
    { path: '/sales/crm-tips', title: 'CRM Tips' }
  ];

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100';
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 md:translate-x-0 md:static md:w-64 md:shrink-0 md:h-auto`}
      >
        <div className="h-16 flex items-center justify-between px-4 bg-darkBrown text-white md:hidden">
          <span className="font-gilda">Milea Estate</span>
          <button
            onClick={closeSidebar}
            className="h-6 w-6 flex items-center justify-center focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto h-full py-4">
          <div className="px-4 mb-4">
            <Link
              to="/welcome"
              className={`block px-4 py-2 rounded-md ${isActive('/welcome')}`}
              onClick={closeSidebar}
            >
              Home
            </Link>
          </div>
          
          {/* Weddings Section */}
          <div className="px-4 mb-2">
            <div
              className="flex items-center justify-between px-4 py-2 text-sm font-medium cursor-pointer"
              onClick={() => toggleSection('weddings')}
            >
              <span>Weddings</span>
              <svg
                className={`h-5 w-5 transform ${expandedSections.weddings ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {expandedSections.weddings && (
              <div className="mt-1 space-y-1">
                {weddingPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className={`block pl-8 pr-4 py-2 text-sm rounded-md ${isActive(page.path)}`}
                    onClick={closeSidebar}
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Sales Section */}
          <div className="px-4 mb-2">
            <div
              className="flex items-center justify-between px-4 py-2 text-sm font-medium cursor-pointer"
              onClick={() => toggleSection('sales')}
            >
              <span>Sales</span>
              <svg
                className={`h-5 w-5 transform ${expandedSections.sales ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {expandedSections.sales && (
              <div className="mt-1 space-y-1">
                {salesPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className={`block pl-8 pr-4 py-2 text-sm rounded-md ${isActive(page.path)}`}
                    onClick={closeSidebar}
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Quizzes Link */}
          <div className="px-4 mb-4">
            <Link
              to="/quizzes"
              className={`block px-4 py-2 rounded-md ${isActive('/quizzes')}`}
              onClick={closeSidebar}
            >
              Quizzes
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar; 