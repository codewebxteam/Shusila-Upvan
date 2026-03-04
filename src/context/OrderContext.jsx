import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const placeOrder = (orderData) => {
        const now = new Date();
        const newOrder = {
            id: `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            date: now.toISOString(),
            status: 'Placed',
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
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const getOrderById = (id) => orders.find(o => o.id === id);

    return (
        <OrderContext.Provider value={{ orders, placeOrder, getOrderById }}>
            {children}
        </OrderContext.Provider>
    );
};
