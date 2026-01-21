import { Shield, Users, Edit } from 'lucide-react';
import { adminRoles } from '../data/mockData';

const Roles = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Admin Roles & Permissions</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Roles</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Role Management</h3>
          <button className="btn btn-primary">
            <Shield size={18} />
            Create Role
          </button>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th>Users</th>
                  <th>Permissions</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminRoles.map(role => (
                  <tr key={role.id}>
                    <td style={{ fontWeight: 600 }}>
                      <Shield size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      {role.name}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={16} />
                        {role.users}
                      </div>
                    </td>
                    <td>{role.permissions}</td>
                    <td>
                      <span className="status-badge success">{role.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-outline" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                        <Edit size={14} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Permission Matrix</h3>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Super Admin</th>
                  <th>Product Manager</th>
                  <th>Order Manager</th>
                  <th>Support Staff</th>
                </tr>
              </thead>
              <tbody>
                {['Dashboard', 'Products', 'Orders', 'Customers', 'Payments', 'Reports', 'Settings'].map((module, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{module}</td>
                    <td><span className="status-badge success">Full</span></td>
                    <td><span className="status-badge info">{module === 'Products' ? 'Full' : 'View'}</span></td>
                    <td><span className="status-badge info">{module === 'Orders' ? 'Full' : 'View'}</span></td>
                    <td><span className="status-badge warning">View</span></td>
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

export default Roles;
