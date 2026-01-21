import { Eye, Download } from 'lucide-react';
import { recentOrders } from '../data/mockData';

const Orders = () => {
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
          <div className="stat-value">1,543</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">47</div>
          <div className="stat-label">Pending Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">1,234</div>
          <div className="stat-label">Delivered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">23</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>All Orders</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select className="form-select" style={{ width: 'auto' }}>
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <button className="btn btn-outline">
              <Download size={18} />
              Export
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
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600 }}>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>₹{order.amount}</td>
                    <td>{order.payment}</td>
                    <td>
                      <select className="form-select" style={{ width: 'auto', padding: '0.25rem 0.5rem' }}>
                        <option>{order.status}</option>
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
