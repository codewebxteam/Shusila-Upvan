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
