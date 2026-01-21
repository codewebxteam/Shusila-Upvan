import { Save } from 'lucide-react';
const Settings = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Settings</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Settings</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>General Settings</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Website Name</label>
              <input type="text" className="form-input" defaultValue="E-Shop" />
            </div>
            <div className="form-group">
              <label className="form-label">Support Email</label>
              <input type="email" className="form-input" defaultValue="support@eshop.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Support Phone</label>
              <input type="tel" className="form-input" defaultValue="+91 1234567890" />
            </div>
            <div className="form-group">
              <label className="form-label">Currency</label>
              <select className="form-select">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Payment Gateway</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Razorpay Key</label>
              <input type="text" className="form-input" placeholder="Enter Razorpay Key" />
            </div>
            <div className="form-group">
              <label className="form-label">Razorpay Secret</label>
              <input type="password" className="form-input" placeholder="Enter Secret" />
            </div>
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked />
              <span>Enable COD (Cash on Delivery)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Tax & Shipping</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">GST Rate (%)</label>
              <input type="number" className="form-input" defaultValue="18" />
            </div>
            <div className="form-group">
              <label className="form-label">Shipping Charge</label>
              <input type="number" className="form-input" defaultValue="50" />
            </div>
            <div className="form-group">
              <label className="form-label">Free Shipping Above</label>
              <input type="number" className="form-input" defaultValue="500" />
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Time (Days)</label>
              <input type="number" className="form-input" defaultValue="5-7" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Email Notifications</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked />
              <span>Order Confirmation Email</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked />
              <span>Shipping Update Email</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked />
              <span>Delivery Confirmation Email</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" />
              <span>Promotional Emails</span>
            </label>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button className="btn btn-outline">Reset</button>
        <button className="btn btn-primary">
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
