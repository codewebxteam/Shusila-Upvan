import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { db } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Dairy Product',
    brand: '',
    price: '',
    stock: '',
    description: '',
    status: 'Active'
  });

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, 'products'));
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(list);
      } catch (err) {
        console.error('Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Add product
  const handleAddProduct = async () => {
    try {
      await addDoc(collection(db, 'products'), {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        createdAt: new Date()
      });

      setShowModal(false);
      setFormData({
        name: '',
        category: 'Dairy Product',
        brand: '',
        price: '',
        stock: '',
        description: '',
        status: 'Active'
      });

      const snap = await getDocs(collection(db, 'products'));
      setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    } catch (err) {
      console.error('Add product error:', err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) return <div className="page-content">Loading products...</div>;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Product Management</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Products</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h3>All Products</h3>
            <select
              className="form-select"
              style={{ width: 'auto' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All</option>
              <option>Dairy Product</option>
              <option>Mushroom Product</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Add Product
          </button>
        </div>

        <div className="card-body">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td style={{ fontWeight: 600 }}>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`status-badge ${
                        product.status === 'Active' ? 'success' :
                        product.status === 'Low Stock' ? 'warning' : 'danger'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <button className="icon-btn" onClick={() => handleDelete(product.id)}>
                        <Trash2 size={16} />
                      </button>
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
              <h3>Add New Product</h3>
            </div>
            <div className="modal-body">
              <input className="form-input" placeholder="Product Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <select className="form-select" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                <option>Dairy Product</option>
                <option>Mushroom Product</option>
              </select>
              <input className="form-input" placeholder="Brand" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} />
              <input className="form-input" type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
              <input className="form-input" type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
              <textarea className="form-textarea" placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;