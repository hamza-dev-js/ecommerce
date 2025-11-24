import React from 'react';
import { Link } from 'react-router-dom';
import { HomeProps } from '../types';

/**
 * Home Page Component
 * Landing page with hero section, features, and category navigation
 */
const Home: React.FC<HomeProps> = () => {
  /**
   * Feature items data for the features section
   */
  const features = [
    {
      icon: '🚚',
      title: 'Fast & Free Shipping',
      description: 'Free shipping on all orders over $100 within 24 hours',
      bgColor: 'bg-blue-100'
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: 'Encrypted and secure payment systems to protect your information',
      bgColor: 'bg-green-100'
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      description: 'Free returns within 30 days of purchase with no fees',
      bgColor: 'bg-purple-100'
    }
  ];

  /**
   * Category items for the categories section
   */
  const categories = [
    { name: 'Phones', icon: '📱' },
    { name: 'Laptops', icon: '💻' },
    { name: 'Headphones', icon: '🎧' },
    { name: 'Accessories', icon: '⌚' }
  ];

  return (
    <div className="flex-1 w-full">
      {/* Hero Section with Call-to-Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white w-full py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to TechStore
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover the latest electronics at the best prices with fast delivery
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 shadow-lg transform hover:-translate-y-1"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Store?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-300">
                <div className={`${feature.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Product Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to="/products"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;