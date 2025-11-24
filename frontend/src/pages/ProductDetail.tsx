import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ProductDetailProps, Product } from '../types';

/**
 * Product Detail Page Component
 * Displays individual product information with add to cart functionality
 */
const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  /**
   * Fetch product details from API
   */
  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  /**
   * Handle adding product to cart
   */
  const handleAddToCart = (): void => {
    if (!product) return;
    
    const productToAdd: Product = {
      ...product,
      id: product.id
    };

    // Add product multiple times based on selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    
    alert(`Added ${quantity} of ${product.name} to cart!`);
  };

  /**
   * Handle buy now action - add to cart and navigate to cart page
   */
  const handleBuyNow = (): void => {
    handleAddToCart();
    navigate('/cart');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading product...</div>
        </div>
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-2xl text-gray-600 mb-4">Product Not Found</div>
          <Link to="/products" className="text-blue-600 hover:text-blue-800 text-lg">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">🏠 Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-blue-600">📦 Products</Link></li>
            <li>/</li>
            <li className="text-gray-800 truncate max-w-xs">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Product Image Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="w-full h-96 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div 
                className="hidden w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-gray-600"
                style={{ display: 'none' }}
              >
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">📱</div>
                  <div className="text-lg font-medium">{product.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed text-base">
              {product.description}
            </p>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600 block mb-2">
                ${product.price}
              </span>
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold text-base">
                  ✅ In Stock ({product.stock} units)
                </span>
              ) : (
                <span className="text-red-600 font-semibold text-base">
                  ❌ Out of Stock
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition duration-300 text-base ${
                  product.stock === 0
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
              </button>
              
              <button 
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition duration-300 text-base ${
                  product.stock === 0
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                💳 Buy Now
              </button>
            </div>

            {/* Store Features */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Store Features</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2">🚚 Fast shipping within 24 hours</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">↩️ Free returns within 30 days</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔒 1-year warranty</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📞 24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;