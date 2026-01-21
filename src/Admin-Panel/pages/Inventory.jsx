import { AlertTriangle, Package } from 'lucide-react';
import { products } from '../data/mockData';

const Inventory = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Inventory Management</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Inventory</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">1,234</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">45</div>
          <div className="stat-label">Low Stock Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Out of Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹12.5L</div>
          <div className="stat-label">Inventory Value</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>
            <AlertTriangle size={20} style={{ color: 'var(--warning)' }} />
            Low Stock Alerts
          </h3>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Min. Required</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(p => p.stock < 20).map(product => (
                  <tr key={product.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '2rem' }}>{product.image}</span>
                        <span style={{ fontWeight: 600 }}>{product.name}</span>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>
                      <span className={`status-badge ${product.stock === 0 ? 'danger' : 'warning'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>20</td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                        <Package size={14} />
                        Restock
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

export default Inventory;
