<<<<<<< HEAD
import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.find(
        (item) => item.id === action.payload.id && item.category === action.payload.category
      );
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id && item.category === action.payload.category
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, { ...action.payload }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(
        (item) => !(item.id === action.payload.id && item.category === action.payload.category)
      );
    case 'UPDATE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id && item.category === action.payload.category
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id, category) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, category } });
  };

  const updateQuantity = (id, category, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, category, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const mushroomItems = useMemo(
    () => cartItems.filter((item) => item.category === 'mushroom'),
    [cartItems]
  );

  const dairyItems = useMemo(
    () => cartItems.filter((item) => item.category === 'dairy'),
    [cartItems]
  );

  const mushroomTotal = useMemo(
    () => mushroomItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [mushroomItems]
  );

  const dairyTotal = useMemo(
    () => dairyItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [dairyItems]
  );

  const subtotal = useMemo(() => mushroomTotal + dairyTotal, [mushroomTotal, dairyTotal]);
  const tax = useMemo(() => Math.round(subtotal * 0.18 * 100) / 100, [subtotal]);
  const grandTotal = useMemo(() => subtotal + tax, [subtotal, tax]);

  const value = {
    cartItems,
    cartCount,
    mushroomItems,
    dairyItems,
    mushroomTotal,
    dairyTotal,
    subtotal,
    tax,
    grandTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
=======
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('shusila_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('shusila_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
>>>>>>> 2baa1c9b936eb7fa150bf9fe73a4446832942f96
