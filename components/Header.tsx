import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Apollo<span className="text-secondary">247</span></span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/specialties" className="text-primary hover:text-secondary text-sm font-medium">
              Find Doctors
            </Link>
            <Link href="/pharmacy" className="text-gray-700 hover:text-secondary text-sm font-medium">
              Pharmacy
            </Link>
            <Link href="/lab-tests" className="text-gray-700 hover:text-secondary text-sm font-medium">
              Lab Tests
            </Link>
            <Link href="/health-records" className="text-gray-700 hover:text-secondary text-sm font-medium">
              Health Records
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-white text-primary border border-primary rounded-full px-4 py-1.5 text-sm font-medium hover:bg-primary hover:text-white transition-colors">
              Login / Signup
            </button>
            <button className="bg-secondary text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-opacity-90 transition-colors">
              Consult Now
            </button>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;