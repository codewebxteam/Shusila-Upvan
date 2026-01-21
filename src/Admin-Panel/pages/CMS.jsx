import { Image, FileText, Edit } from 'lucide-react';
const CMS = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Content Management</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Content</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Homepage Banners</h3>
          <button className="btn btn-primary">
            <Image size={18} />
            Add Banner
          </button>
        </div>
        <div className="card-body">
          <div className="grid grid-3">
            {[1, 2, 3].map(i => (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ background: 'var(--light)', height: '150px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Image size={48} color="var(--text-light)" />
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>Banner {i}</h4>
                <button className="btn btn-outline" style={{ width: '100%' }}>
                  <Edit size={16} />
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Static Pages</h3>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Last Updated</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {['About Us', 'Contact', 'FAQ', 'Terms & Conditions', 'Privacy Policy', 'Shipping Policy', 'Return Policy'].map((page, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>
                      <FileText size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      {page}
                    </td>
                    <td>2024-01-{10 + i}</td>
                    <td>
                      <span className="status-badge success">Published</span>
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
    </div>
  );
};

export default CMS;
