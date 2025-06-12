import React from 'react';
import { ShoppingCart, Home } from 'lucide-react';
import logo from '../assets/logo2.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';



const Header = ({ cartItemCount, onCartClick, onHomeClick }) => {
  return (
    <header className="bg-white shadow-sm border-b-2 h-20 border-green-100 fixed top-0 left-0 w-full z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
            <img src={logo} alt="Olive Logo" className="h-15 w-20 mr-2" />
            <span className="ml-3 text-sm text-gray-600 hidden sm:block">
              Kitchen Hardware Solutions
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onHomeClick}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <Home className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </button>
            
            <button
              onClick={onCartClick}
              className="relative flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              
              <Link to="/checkout">
                <div className='flex justify-center items-center'>
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Cart</span>
                </div>
              </Link>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;