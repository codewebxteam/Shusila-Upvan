import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, push, set, onValue, off } from 'firebase/database';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]); // Start fresh
    const { user } = useAuth();

    // One-time Reset (for the user's request)
    useEffect(() => {
        const hasReset = localStorage.getItem('orders_reset_v1');
        if (!hasReset) {
            localStorage.removeItem('local_orders');
            // If admin permissions allowed, we could clear Firebase here
            // ref(db, 'orders').set(null); 
            localStorage.setItem('orders_reset_v1', 'true');
            setOrders([]);
        }
    }, []);

    // Persist to localStorage whenever orders change
    useEffect(() => {
        if (orders.length > 0) {
            localStorage.setItem('local_orders', JSON.stringify(orders));
        }
    }, [orders]);

    useEffect(() => {
        // Even if user is not logged in, we might have local orders
        // If user is logged in, we try to sync with Firebase
        if (!user) return;

        const ordersRef = ref(db, 'orders');
        const handleData = (snapshot) => {
            try {
                const data = snapshot.val();
                if (data) {
                    const firebaseOrders = Object.keys(data)
                        .map(key => ({ ...data[key], firebaseId: key }))
                        .filter(order => order.email === user.email);

                    // Merge Firebase orders with local orders, avoiding duplicates
                    setOrders(prev => {
                        const merged = [...firebaseOrders];
                        const firebaseIds = new Set(firebaseOrders.map(o => o.id));

                        prev.forEach(localOrder => {
                            if (!firebaseIds.has(localOrder.id)) {
                                merged.push(localOrder);
                            }
                        });

                        return merged.sort((a, b) => new Date(b.date) - new Date(a.date));
                    });
                }
            } catch (error) {
                console.error("Error syncing orders:", error);
            }
        };

        onValue(ordersRef, handleData);
        return () => off(ordersRef, 'value', handleData);
    }, [user]);

    const placeOrder = async (orderData) => {
        const now = new Date();
        const ordersRef = ref(db, 'orders');
        const newOrderRef = push(ordersRef);

        const newOrder = {
            id: `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            date: now.toISOString(),
            status: 'Placed',
            customer: user?.displayName || user?.name || orderData.fullName,
            email: user?.email || orderData.email,
            mobile: orderData.mobile,
            items: orderData.items,
            subtotal: orderData.subtotal,
            tax: orderData.tax,
            grandTotal: orderData.grandTotal,
            address: {
                fullName: orderData.fullName,
                mobile: orderData.mobile,
                street: orderData.street,
                locality: orderData.locality,
                city: orderData.city,
                state: orderData.state,
                pincode: orderData.pincode,
            },
            timeline: [
                { status: 'Placed', date: now.toISOString(), completed: true, desc: 'Your order has been placed successfully.' },
                { status: 'Confirmed', date: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), completed: false, desc: 'We are confirming your order.' },
                { status: 'Shipped', date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), completed: false, desc: 'Your order is on the way.' },
                { status: 'Delivered', date: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(), completed: false, desc: 'Order delivered.' },
            ]
        };

        // Optimistic update
        setOrders(prev => [newOrder, ...prev]);

        try {
            await set(newOrderRef, newOrder);
        } catch (error) {
            console.error("Firebase order save failed, but saved locally:", error);
        }

        return { ...newOrder, firebaseId: newOrderRef.key };
    };

    const getOrderById = (id) => orders.find(o => o.id === id || o.firebaseId === id);

    return (
        <OrderContext.Provider value={{ orders, placeOrder, getOrderById }}>
            {children}
        </OrderContext.Provider>
    );
};
