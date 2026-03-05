import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;

    case 'ADD_TO_CART': {
      const existing = state.find(
        (item) =>
          item.id === action.payload.id &&
          item.category === action.payload.category
      );

      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id &&
            item.category === action.payload.category
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }

      return [...state, { ...action.payload }];
    }

    case 'REMOVE_FROM_CART':
      return state.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.category === action.payload.category
          )
      );

    case 'UPDATE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id &&
          item.category === action.payload.category
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
  const { user } = useAuth();
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Load cart when user changes
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`shusila_cart_${user.id}`);
      dispatch({ type: 'SET_CART', payload: saved ? JSON.parse(saved) : [] });
    } else {
      dispatch({ type: 'SET_CART', payload: [] });
    }
  }, [user]);

  // Persist cart
  useEffect(() => {
    if (user) {
      localStorage.setItem(`shusila_cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
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
    () => cartItems.filter((item) => item.category?.toLowerCase() === 'mushroom'),
    [cartItems]
  );

  const dairyItems = useMemo(
    () => cartItems.filter((item) => item.category?.toLowerCase() === 'dairy'),
    [cartItems]
  );

  const mushroomTotal = useMemo(
    () =>
      mushroomItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [mushroomItems]
  );

  const dairyTotal = useMemo(
    () =>
      dairyItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [dairyItems]
  );

  const subtotal = useMemo(
    () => mushroomTotal + dairyTotal,
    [mushroomTotal, dairyTotal]
  );

  const tax = useMemo(
    () => Math.round(subtotal * 0.18 * 100) / 100,
    [subtotal]
  );

  const grandTotal = useMemo(
    () => subtotal + tax,
    [subtotal, tax]
  );

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

  return (
    <CartContext.Provider value={value}>
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

export default CartContext;