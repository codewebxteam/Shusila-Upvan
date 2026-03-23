import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useAuth } from './AuthContext';
import { realtimeDb as db } from '../firebase';
import { ref, onValue } from 'firebase/database';
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
  const [gstPercentage, setGstPercentage] = React.useState(18);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = React.useState(500);
  const [flatDeliveryFee, setFlatDeliveryFee] = React.useState(50);

  useEffect(() => {
    const settingsRef = ref(db, 'settings');
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const gstValue = parseFloat(data.gstPercentage);
        setGstPercentage(isNaN(gstValue) ? 18 : gstValue);
        setFreeDeliveryThreshold(parseFloat(data.freeDeliveryThreshold) || 500);
        setFlatDeliveryFee(parseFloat(data.flatDeliveryFee) || 50);
      }
    });
    return () => unsubscribe();
  }, []);

  // Track whether the cart has been loaded for the current user.
  // We must NOT save to localStorage until after the initial load,
  // otherwise we'd overwrite the saved cart with [] on login.
  const isLoadedRef = useRef(false);

  // When user changes (login / logout), load their saved cart
  useEffect(() => {
    isLoadedRef.current = false; // Reset before loading

    if (user) {
      const key = `susheela_cart_${user.id}`;
      const saved = localStorage.getItem(key);
      dispatch({ type: 'SET_CART', payload: saved ? JSON.parse(saved) : [] });
    } else {
      // Logged out – clear from view but don't touch localStorage
      dispatch({ type: 'SET_CART', payload: [] });
    }

    // Mark as loaded after dispatching
    // Use a microtask so the reducer has processed SET_CART first
    Promise.resolve().then(() => {
      isLoadedRef.current = true;
    });
  }, [user]);

  // Persist cart to localStorage whenever it changes — but ONLY after load
  useEffect(() => {
    if (!isLoadedRef.current) return; // Skip the initial empty state
    if (!user) return;               // Don't save when logged out

    const key = `susheela_cart_${user.id}`;
    localStorage.setItem(key, JSON.stringify(cartItems));
  }, [cartItems, user]);

  const addToCart = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
  }, []);

  const removeFromCart = useCallback((id, category) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, category } });
  }, []);

  const updateQuantity = useCallback((id, category, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, category, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const mushroomItems = useMemo(
    () => cartItems.filter((item) => item.category?.toLowerCase().includes('mushroom')),
    [cartItems]
  );

  const dairyItems = useMemo(
    () => cartItems.filter((item) => item.category?.toLowerCase().includes('dairy')),
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

  const subtotal = useMemo(
    () => mushroomTotal + dairyTotal,
    [mushroomTotal, dairyTotal]
  );

  const tax = useMemo(
    () => Math.round(subtotal * (gstPercentage / 100) * 100) / 100,
    [subtotal, gstPercentage]
  );

  const shippingFee = useMemo(
    () => (subtotal >= freeDeliveryThreshold ? 0 : flatDeliveryFee),
    [subtotal, freeDeliveryThreshold, flatDeliveryFee]
  );

  const grandTotal = useMemo(
    () => subtotal + tax + shippingFee,
    [subtotal, tax, shippingFee]
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
    gstPercentage,
    shippingFee,
    freeDeliveryThreshold,
    flatDeliveryFee,
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