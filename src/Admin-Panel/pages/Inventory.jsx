import { useEffect, useState } from "react";
import { AlertTriangle, Package } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    inventoryValue: 0,
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const list = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        let totalProducts = list.length;
        let lowStock = 0;
        let outOfStock = 0;
        let inventoryValue = 0;

        list.forEach(p => {
          inventoryValue += (p.price || 0) * (p.stock || 0);

          if (p.stock === 0) outOfStock++;
          else if (p.stock < 20) lowStock++;
        });

        setProducts(list);
        setStats({
          totalProducts,
          lowStock,
          outOfStock,
          inventoryValue,
        });
      } catch (error) {
        console.error("Inventory fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <div className="page-content">Loading inventory...</div>;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Inventory Management</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Inventory</span>
        </div>
      </div>

      {/* 🔹 STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalProducts}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.lowStock}</div>
          <div className="stat-label">Low Stock Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.outOfStock}</div>
          <div className="stat-label">Out of Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            ₹{stats.inventoryValue.toLocaleString()}
          </div>
          <div className="stat-label">Inventory Value</div>
        </div>
      </div>

      {/* 🔹 LOW STOCK TABLE */}
      <div className="card">
        <div className="card-header">
          <h3>
            <AlertTriangle size={20} style={{ color: "var(--warning)" }} />
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
                  <th>Stock</th>
                  <th>Min</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.filter(p => p.stock < 20).length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No low stock items 🎉
                    </td>
                  </tr>
                ) : (
                  products
                    .filter(p => p.stock < 20)
                    .map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>{p.name}</td>
                        <td>{p.category}</td>
                        <td>
                          <span
                            className={`status-badge ${
                              p.stock === 0 ? "danger" : "warning"
                            }`}
                          >
                            {p.stock}
                          </span>
                        </td>
                        <td>20</td>
                        <td>
                          <button className="btn btn-primary" style={{ fontSize: "0.75rem" }}>
                            <Package size={14} /> Restock
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
