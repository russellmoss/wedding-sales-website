import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Header({ onMenuClick }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'text-primary-300' : 'text-white hover:text-primary-300';
  };

  return (
    <header className="bg-darkBrown text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section with menu button and logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-md hover:bg-primary-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link to="/welcome" className="ml-4 md:ml-0">
              <h1 className="text-xl font-gilda">Milea Estate</h1>
            </Link>
          </div>

          {/* Center section with navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/welcome" className={`${isActive('/welcome')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              Home
            </Link>
            <Link to="/weddings" className={`${isActive('/weddings')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              Weddings
            </Link>
            <Link to="/sales" className={`${isActive('/sales')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              Sales
            </Link>
            <Link to="/quizzes" className={`${isActive('/quizzes')} px-3 py-2 text-sm font-medium transition-colors duration-200`}>
              Quizzes
            </Link>
          </nav>

          {/* Right section with user menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span className="hidden md:block">{currentUser?.email}</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* User dropdown menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 