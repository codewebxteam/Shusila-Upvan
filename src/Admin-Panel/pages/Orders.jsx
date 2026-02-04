import { useEffect, useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { db } from '../../firebase';
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snap = await getDocs(collection(db, 'orders'));
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(list);
      } catch (err) {
        console.error('Orders fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = statusFilter === 'All'
    ? orders
    : orders.filter(o => o.status === statusFilter);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length
  };

  if (loading) return <div className="page-content">Loading orders...</div>;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Order Management</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Orders</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.delivered}</div>
          <div className="stat-label">Delivered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.cancelled}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>All Orders</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select
              className="form-select"
              style={{ width: 'auto' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <button className="btn btn-outline">
              <Download size={18} /> Export
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600 }}>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>₹{order.amount}</td>
                    <td>{order.payment}</td>
                    <td>
                      <select
                        className="form-select"
                        style={{ width: 'auto', padding: '0.25rem 0.5rem' }}
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <button className="icon-btn">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
