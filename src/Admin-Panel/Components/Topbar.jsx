import { Search, Bell, Mail, User } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search products, orders, customers" />
        </div>
      </div>
      <div className="topbar-right">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge">5</span>
        </button>
        <button className="icon-btn">
          <Mail size={20} />
          <span className="badge">12</span>
        </button>
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div> 
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Admin User</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Super Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Topbar;