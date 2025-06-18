import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Property, NewBuilding } from '@shared/schema';

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
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (data: Property | NewBuilding, type: 'property' | 'newBuilding') => {
    const itemId = `${type}-${data.id}`;
    
    if (!isInCart(data.id, type)) {
      setItems(prev => [...prev, {
        id: itemId,
        type,
        data,
        addedAt: new Date()
      }]);
    }
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => items.length;

  const isInCart = (id: number, type: 'property' | 'newBuilding') => {
    const itemId = `${type}-${id}`;
    return items.some(item => item.id === itemId);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalItems,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
}