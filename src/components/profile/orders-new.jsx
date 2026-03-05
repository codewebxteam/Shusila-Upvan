import React, { useState, useEffect } from 'react';
import { Package, ChevronRight, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 font-semibold">Please login to view your orders</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin text-emerald-600" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-slate-300 mb-4" />
        <p className="text-slate-500 font-semibold">No orders yet. Start shopping!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-8">Order History.</h3>
      
      <div className="space-y-4">
        {orders.map((order) => {
          const orderDate = order.createdAt?.toDate?.() || new Date(order.createdAt);
          const formattedDate = orderDate.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
          
          return (
            <div key={order.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-slate-50 rounded-4xl border border-transparent hover:border-emerald-100 transition-all">
              <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 leading-none mb-1">{order.id}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formattedDate}</p>
                </div>
              </div>

              <div className="text-left md:text-center mb-4 md:mb-0 px-0 md:px-8 w-full md:w-auto">
                <p className="text-xs font-black text-slate-900 mb-1">
                  {Array.isArray(order.items) 
                    ? order.items.map(item => `${item.name} - ${item.quantity}${item.unit}`).join(', ')
                    : order.items}
                </p>
                <p className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mt-2 ${
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' :
                  order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {order.status}
                </p>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0">
                <span className="text-lg font-black text-slate-900">
                  ₹{Array.isArray(order.items) 
                    ? order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
                    : order.total}
                </span>
                <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 hover:text-emerald-600 shadow-sm border border-slate-100">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
