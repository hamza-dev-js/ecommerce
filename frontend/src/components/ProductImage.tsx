// components/ProductImage.tsx
import React, { useState, useEffect } from 'react';

type ImageStatus = 'loading' | 'loaded' | 'error';
type DisplayType = 'grid' | 'detail' | 'card';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  type?: DisplayType;
  fallbackColors?: { [key: string]: string };
}

const defaultColors = {
  'Phones': 'bg-blue-200',
  'Laptops': 'bg-green-200', 
  'Electronics': 'bg-purple-200',
  'Headphones': 'bg-red-200',
  'Cameras': 'bg-yellow-200',
  'Games': 'bg-indigo-200',
  'Tablets': 'bg-pink-200',
  'Accessories': 'bg-gray-200',
  'Monitors': 'bg-teal-200',
  'Storage': 'bg-orange-200',
  'Printers': 'bg-cyan-200',
  'Networking': 'bg-lime-200'
};

const ProductImage: React.FC<ProductImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  type = "grid",
  fallbackColors = defaultColors
}) => {
  const [imageStatus, setImageStatus] = useState<ImageStatus>('loading');

  useEffect(() => {
    if (!src || src.includes('placeholder')) {
      setImageStatus('error');
      return;
    }

    const img = new Image();
    img.src = src;
    
    img.onload = () => setImageStatus('loaded');
    img.onerror = () => setImageStatus('error');
  }, [src]);

  const getFallbackColor = () => {
    const category = Object.keys(fallbackColors).find(cat => 
      alt?.includes(cat) || alt?.toLowerCase().includes(cat.toLowerCase())
    ) || 'Electronics';
    
    return fallbackColors[category];
  };

  const getFallbackEmoji = () => {
    const emojis: { [key: string]: string } = {
      'Phones': '📱',
      'Laptops': '💻',
      'Electronics': '🔌',
      'Headphones': '🎧',
      'Cameras': '📷',
      'Games': '🎮',
      'Tablets': '📟',
      'Accessories': '⌚',
      'Monitors': '🖥️',
      'Storage': '💾',
      'Printers': '🖨️',
      'Networking': '🌐'
    };
    
    const category = Object.keys(emojis).find(cat => 
      alt?.includes(cat) || alt?.toLowerCase().includes(cat.toLowerCase())
    ) || 'Electronics';
    
    return emojis[category];
  };

  // Error state
  if (imageStatus === 'error') {
    return (
      <div className={`flex items-center justify-center ${getFallbackColor()} ${className}`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-3">{getFallbackEmoji()}</div>
          <div className="text-sm text-gray-700 font-medium line-clamp-2">{alt}</div>
          <div className="text-xs text-gray-500 mt-1">Image not available</div>
        </div>
      </div>
    );
  }

  // Loading state
  if (imageStatus === 'loading') {
    return (
      <div className={`flex items-center justify-center bg-gray-100 animate-pulse ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-xs text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  // Success state
  const objectFit = type === 'detail' ? 'object-contain' : 'object-cover';
  const background = type === 'detail' ? 'bg-white' : 'bg-gray-50';

  return (
    <div className={`w-full h-full ${background} flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${objectFit} transition-transform duration-300 hover:scale-105`}
        loading="lazy"
        onError={() => setImageStatus('error')}
      />
    </div>
  );
};

// Export utility function for backward compatibility
export const getProductImage = (imageUrl: string, productName: string): JSX.Element => {
  return <ProductImage src={imageUrl} alt={productName} className="w-full h-48" />;
};

export default ProductImage;