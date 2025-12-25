import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { requireAuth } = useAuth();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('dairyCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        updateCartCount(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('dairyCart', JSON.stringify(cartItems));
    updateCartCount(cartItems);
  }, [cartItems]);

  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // ✅ UPDATED: Add to cart WITHOUT ANY TOAST
  const addToCart = (product, quantity = 1) => {
    // Check authentication
    const isAuthenticated = requireAuth('addToCart', () => {
      // This callback runs after user logs in
      setCartItems(prevItems => {
        const uniqueId = `${product.type || 'product'}_${product.name}_${product.price}_${product.id}`;
        
        const existingIndex = prevItems.findIndex(item => 
          item.uniqueId === uniqueId
        );
        
        if (existingIndex >= 0) {
          const updatedItems = [...prevItems];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          const newItem = {
            ...product,
            uniqueId: uniqueId,
            quantity: quantity
          };
          return [...prevItems, newItem];
        }
      });
      // ❌ NO TOAST HERE
    });

    // If already authenticated, add directly
    if (isAuthenticated) {
      setCartItems(prevItems => {
        const uniqueId = `${product.type || 'product'}_${product.name}_${product.price}_${product.id}`;
        
        const existingIndex = prevItems.findIndex(item => 
          item.uniqueId === uniqueId
        );
        
        if (existingIndex >= 0) {
          const updatedItems = [...prevItems];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          const newItem = {
            ...product,
            uniqueId: uniqueId,
            quantity: quantity
          };
          return [...prevItems, newItem];
        }
      });
      // ❌ NO TOAST HERE
    }
  };

  // ✅ UPDATED: Buy Now WITHOUT ANY TOAST
  const buyNow = (product, quantity = 1, onSuccessCallback) => {
    // Check authentication
    const isAuthenticated = requireAuth('buyNow', () => {
      // This callback runs after user logs in
      if (onSuccessCallback) {
        onSuccessCallback(product, quantity);
      }
      // ❌ NO TOAST HERE
    });

    // If already authenticated, proceed directly
    if (isAuthenticated) {
      if (onSuccessCallback) {
        onSuccessCallback(product, quantity);
      }
      // ❌ NO TOAST HERE
    }
  };

  // Check if cart requires authentication
  const requiresAuthForCart = () => {
    return false;
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => 
      item.id !== productId && item.uniqueId !== productId
    ));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.id === productId || item.uniqueId === productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemsByType = (type) => {
    return cartItems.filter(item => item.type === type);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const isCartEmpty = cartItems.length === 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        buyNow,
        requiresAuthForCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemsByType,
        cartTotal,
        isCartEmpty
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};