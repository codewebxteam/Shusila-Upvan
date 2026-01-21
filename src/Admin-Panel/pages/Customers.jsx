import { Mail, Phone, Ban } from 'lucide-react';
import { customers } from '../data/mockData';

const Customers = () => {
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
          <div className="stat-value">892</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">45</div>
          <div className="stat-label">New This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">234</div>
          <div className="stat-label">VIP Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹2.4L</div>
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
                    <td>₹{customer.spent.toLocaleString()}</td>
                    <td>{customer.joined}</td>
                    <td>
                      <span className={`status-badge ${customer.status === 'VIP' ? 'warning' : 'success'}`}>
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
                        <button className="icon-btn" title="Block">
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
