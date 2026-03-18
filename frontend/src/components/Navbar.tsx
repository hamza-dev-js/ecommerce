import React, { useState } from 'react'; // Added useState
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import { NavbarProps } from '../types';

const Navbar: React.FC<NavbarProps> = () => {
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth(); 
  const cartItemsCount: number = getCartItemsCount();
  
  // State to control mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link to="/" className="text-xl font-bold text-gray-800 flex items-center space-x-2 shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span>TechStore</span>
          </Link>

          {/* Hamburger Button - visible only on mobile */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Links - hidden on mobile, visible from md screens and above */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center space-x-1">
              <span>Home</span>
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center space-x-1">
              <span>Products</span>
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center space-x-1">
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Admin</Link>
            )}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-500">Hi, {user.username}</span>
                <button onClick={logout} className="text-red-500 text-sm font-medium">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">Login</Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - displayed only when the button is clicked */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100 pb-4 shadow-inner`}>
        <div className="px-2 pt-2 space-y-1">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-50">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-50">Products</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-50">Cart ({cartItemsCount})</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-50">Admin Panel</Link>
          )}
          <div className="border-t border-gray-100 mt-2 pt-2">
            {user ? (
              <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-3 py-2 text-base font-medium text-red-600">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-blue-600">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;