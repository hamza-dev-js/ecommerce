import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { NavbarProps } from '../types';

/**
 * Navigation Bar Component
 * Displays logo, navigation links, and cart icon with item count
 */
const Navbar: React.FC<NavbarProps> = () => {
  const { getCartItemsCount } = useCart();
  const cartItemsCount: number = getCartItemsCount();

  return (
    <nav className="bg-white shadow-lg w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <span>🛍️</span>
            <span>TechStore</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
            >
              🏠 Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
            >
              📦 Products
            </Link>
            <Link 
              to="/cart" 
              className="relative text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 group"
            >
              🛒 Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-bounce">
                  {cartItemsCount}
                </span>
              )}
              {/* Tooltip for better UX */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {cartItemsCount} items in cart
              </div>
            </Link>
            <Link 
              to="/admin" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
            >
              🛠️ Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;