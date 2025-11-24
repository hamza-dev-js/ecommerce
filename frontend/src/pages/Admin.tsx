import React, { useState } from 'react';
import AddProductForm from '../components/AddProductForm';
import ProductList from '../components/ProductList';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your products and inventory</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-6 py-2 rounded-md font-medium transition duration-300 ${
                activeTab === 'add'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Add Product
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-2 rounded-md font-medium transition duration-300 ${
                activeTab === 'manage'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Manage Products
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg">
          {activeTab === 'add' ? (
            <div className="p-6">
              <AddProductForm />
            </div>
          ) : (
            <div className="p-6">
              <ProductList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;