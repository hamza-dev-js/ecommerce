/**
 * Core TypeScript interfaces and types for the E-commerce application
 * This ensures type safety across all components and contexts
 */

// Product related interfaces
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    stock: number;
  }
  
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
  }
  
  // Cart action types for useReducer
  export type CartAction =
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };
  
  // Cart context interface
  export interface CartContextType {
    cart: CartState;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemsCount: () => number;
  }
  
  // Component props interfaces
  export interface ProductImageProps {
    src: string;
    alt: string;
    className?: string;
    type?: 'grid' | 'detail';
  }
  
  export interface NavbarProps {}
  
  export interface CartProps {}
  
  export interface HomeProps {}
  
  export interface ProductDetailProps {}
  
  export interface ProductsProps {}

  export interface AdminProps {}