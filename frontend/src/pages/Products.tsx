import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/ProductImage';
import { ProductsProps, Product } from '../types';

/**
 * Products Page Component
 * Displays product grid with search and filter functionality
 */
const Products: React.FC<ProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { addToCart } = useCart();

  /**
   * Fetch products from API on component mount
   */
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Filter products based on search term and selected category
   */
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  /**
   * Get unique categories from products
   */
  const categories: string[] = [...new Set(products.map(product => product.category))];

  /**
   * Handle adding product to cart
   */
  const handleAddToCart = (product: Product): void => {
    addToCart(product);
    alert(`Added ${product.name} to cart!`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
          <p className="text-gray-600 text-lg">Discover the latest electronics at the best prices</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by product name, description, or category..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400">⌕</span>
                </div>
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📂 Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${
                selectedCategory === '' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Statistics */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            Showing <span className="font-bold text-blue-600">{filteredProducts.length}</span> of <span className="font-bold text-gray-800">{products.length}</span> products
          </div>
          
          {(searchTerm || selectedCategory) && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300 text-sm"
            >
              ✕ Clear Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full">
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="block flex-grow">
                  <div className="h-48 bg-gray-50 overflow-hidden">
                    <ProductImage 
                      src={product.image} 
                      alt={product.name}
                      type="grid"
                      className="h-full w-full"
                    />
                  </div>
                </Link>
                
                {/* Product Information */}
                <div className="p-4 flex flex-col flex-grow">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 line-clamp-2 transition duration-300">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm flex items-center space-x-1"
                    >
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Stock Status */}
                  <div className="mt-2">
                    {product.stock > 0 ? (
                      <div className="flex items-center space-x-1">
                        <span className="text-green-600 text-sm">●</span>
                        <span className="text-green-600 text-xs">In Stock ({product.stock})</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <span className="text-red-600 text-sm">●</span>
                        <span className="text-red-600 text-xs">Out of Stock</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Results State */
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
            <p className="text-gray-600 mb-6 text-lg">
              {searchTerm || selectedCategory 
                ? 'No products match your search criteria' 
                : 'No products available at the moment'
              }
            </p>
            {(searchTerm || selectedCategory) && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold"
              >
                Show All Products
              </button>
            )}
            <Link 
              to="/"
              className="block mt-4 text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Return to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;