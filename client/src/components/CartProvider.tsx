import { createContext, useContext, useState, ReactNode } from "react";
import { type Property, type NewBuilding } from "@shared/schema";

interface CartItem {
  id: string;
  type: 'property' | 'newBuilding';
  data: Property | NewBuilding;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Property | NewBuilding, type: 'property' | 'newBuilding') => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  isInCart: (id: number, type: 'property' | 'newBuilding') => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Property | NewBuilding, type: 'property' | 'newBuilding') => {
    const cartItem: CartItem = {
      id: `${type}-${item.id}`,
      type,
      data: item,
      addedAt: new Date()
    };

    setItems(prev => {
      // Check if item already exists
      const exists = prev.some(cartItem => cartItem.id === `${type}-${item.id}`);
      if (exists) return prev;
      
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.length;
  };

  const isInCart = (id: number, type: 'property' | 'newBuilding') => {
    return items.some(item => item.id === `${type}-${id}`);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}