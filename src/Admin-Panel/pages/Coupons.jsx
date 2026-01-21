import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { coupons } from '../data/mockData';

const Coupons = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Coupons & Offers</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Coupons</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>All Coupons</h3>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Create Coupon
          </button>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Coupon Code</th>
                  <th>Discount</th>
                  <th>Type</th>
                  <th>Valid Until</th>
                  <th>Uses</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(coupon => (
                  <tr key={coupon.id}>
                    <td style={{ fontWeight: 600, fontFamily: 'monospace' }}>{coupon.code}</td>
                    <td>{coupon.discount}</td>
                    <td>{coupon.type}</td>
                    <td>{coupon.validity}</td>
                    <td>{coupon.uses}</td>
                    <td>
                      <span className={`status-badge ${coupon.status === 'Active' ? 'success' : 'danger'}`}>
                        {coupon.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="icon-btn">
                          <Edit size={16} />
                        </button>
                        <button className="icon-btn">
                          <Trash2 size={16} />
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Coupon</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Coupon Code</label>
                <input type="text" className="form-input" placeholder="e.g., SUMMER50" />
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Discount Type</label>
                  <select className="form-select">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Discount Value</label>
                  <input type="number" className="form-input" placeholder="0" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Valid Until</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Max Uses</label>
                <input type="number" className="form-input" placeholder="Unlimited" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary">Create Coupon</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;
