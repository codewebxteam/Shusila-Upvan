import { useEffect, useState } from 'react';
import { Mail, Phone, Ban } from 'lucide-react';
import { db } from '../../firebase';
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const snap = await getDocs(collection(db, 'customers'));
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCustomers(list);
      } catch (err) {
        console.error('Customers fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const blockCustomer = async (id) => {
    if (!window.confirm('Block this customer?')) return;
    try {
      await updateDoc(doc(db, 'customers', id), { status: 'Blocked' });
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: 'Blocked' } : c));
    } catch (err) {
      console.error('Block customer error:', err);
    }
  };

  const stats = {
    total: customers.length,
    newThisMonth: customers.filter(c => {
      const joined = new Date(c.joined);
      const now = new Date();
      return joined.getMonth() === now.getMonth() && joined.getFullYear() === now.getFullYear();
    }).length,
    vip: customers.filter(c => c.status === 'VIP').length,
    avgLtv: customers.length
      ? Math.round(customers.reduce((sum, c) => sum + (c.spent || 0), 0) / customers.length)
      : 0
  };

  if (loading) return <div className="page-content">Loading customers...</div>;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Customer Management</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Customers</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.newThisMonth}</div>
          <div className="stat-label">New This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.vip}</div>
          <div className="stat-label">VIP Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹{stats.avgLtv.toLocaleString()}</div>
          <div className="stat-label">Avg. Lifetime Value</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>All Customers</h3>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total Orders</th>
                  <th>Total Spent</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id}>
                    <td style={{ fontWeight: 600 }}>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.orders}</td>
                    <td>₹{(customer.spent || 0).toLocaleString()}</td>
                    <td>{customer.joined}</td>
                    <td>
                      <span className={`status-badge ${
                        customer.status === 'VIP' ? 'warning' :
                        customer.status === 'Blocked' ? 'danger' : 'success'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="icon-btn" title="Email">
                          <Mail size={16} />
                        </button>
                        <button className="icon-btn" title="Call">
                          <Phone size={16} />
                        </button>
                        <button
                          className="icon-btn"
                          title="Block"
                          onClick={() => blockCustomer(customer.id)}
                        >
                          <Ban size={16} />
                        </button>
                      </div>
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

export default Customers;