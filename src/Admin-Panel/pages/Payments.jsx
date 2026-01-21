import { Download } from 'lucide-react';
import { payments } from '../data/mockData';

const Payments = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Payment Management</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Payments</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">₹2.45L</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹1.89L</div>
          <div className="stat-label">Online Payments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹56K</div>
          <div className="stat-label">COD Payments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹12K</div>
          <div className="stat-label">Pending Refunds</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Payment History</h3>
          <button className="btn btn-outline">
            <Download size={18} />
            Export Report
          </button>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id}>
                    <td style={{ fontWeight: 600 }}>{payment.id}</td>
                    <td>{payment.order}</td>
                    <td>{payment.customer}</td>
                    <td>₹{payment.amount}</td>
                    <td>
                      <span className="status-badge info">{payment.method}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${payment.status === 'Success' ? 'success' : 'warning'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>{payment.date}</td>
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

export default Payments;
