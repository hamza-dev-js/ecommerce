import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount } = useCart();

  const cartItemsCount = getCartItemsCount();
  const cartTotal = getCartTotal();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8"> Shopping Cart</h1>
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-transform duration-300">
            <div className="text-8xl mb-6">😔</div>
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Your cart feels lonely
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              You haven't added any products to your cart yet
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
               Browse Amazing Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
             Shopping Cart
          </h1>
          <div className="text-lg text-gray-600">
            <span className="font-semibold text-blue-600">{cartItemsCount}</span> items
          </div>
        </div>
        
        {/* Cart Items */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {cart.items.map((item) => (
            <div key={item.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-300">
              <div className="p-6 flex items-center space-x-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                </div>
                
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-blue-600 font-bold text-2xl mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-xl bg-white shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className={`px-4 py-2 text-lg transition-colors duration-200 ${
                        item.quantity <= 1 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      −
                    </button>
                    <span className="px-6 py-2 text-lg font-semibold min-w-12 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-4 py-2 text-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                  >
                     Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sticky bottom-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Total */}
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-gray-800 mb-2">
                Order Summary
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <span className="text-xl text-gray-600">Total:</span>
                <span className="text-3xl font-bold text-blue-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {cartItemsCount} items • Free shipping
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={clearCart}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                 Clear Cart
              </button>
              
              <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
                <span>💳</span>
                <span>Checkout (${cartTotal.toFixed(2)})</span>
              </button>
            </div>
          </div>
          
          {/* Continue Shopping */}
          <Link
            to="/products"
            className="block text-center mt-6 text-blue-600 hover:text-blue-800 transition-colors duration-300 font-semibold text-lg"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;