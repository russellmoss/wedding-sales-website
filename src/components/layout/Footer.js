import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-darkBrown text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Milea Estate. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/weddings/contact" className="text-sm hover:text-primary-300">
              Contact
            </Link>
            <Link to="/weddings/policies" className="text-sm hover:text-primary-300">
              Policies
            </Link>
            <a
              href="https://www.mileaestate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-primary-300"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 