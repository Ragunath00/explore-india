
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Map, Home, Info, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-india-blue">
                Explore<span className="text-india-orange">India</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50 transition-colors">
              Home
            </Link>
            <Link to="/destinations" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50 transition-colors">
              Destinations
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50 transition-colors">
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50 transition-colors">
              Contact
            </Link>
            <Button className="ml-4 bg-india-orange hover:bg-orange-600 text-white">
              Plan Your Trip
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-india-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-india-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 px-2 pt-2 pb-3 sm:px-3">
            <Link 
              to="/" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link 
              to="/destinations" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Map size={18} className="mr-2" />
              Destinations
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={18} className="mr-2" />
              About
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search size={18} className="mr-2" />
              Contact
            </Link>
            <Button className="mt-2 w-full bg-india-orange hover:bg-orange-600 text-white">
              Plan Your Trip
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
