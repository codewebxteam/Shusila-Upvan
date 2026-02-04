import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    code: "",
    type: "Percentage",
    discount: "",
    validUntil: "",
    maxUses: "",
    status: "Active",
  });

  // 🔹 Fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const snap = await getDocs(collection(db, "coupons"));
        const list = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCoupons(list);
      } catch (err) {
        console.error("Coupons fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  // 🔹 Add coupon
  const handleAddCoupon = async () => {
    try {
      await addDoc(collection(db, "coupons"), {
        ...formData,
        discount: Number(formData.discount),
        maxUses: formData.maxUses ? Number(formData.maxUses) : null,
        uses: 0,
        createdAt: new Date(),
      });

      setShowModal(false);
      setFormData({
        code: "",
        type: "Percentage",
        discount: "",
        validUntil: "",
        maxUses: "",
        status: "Active",
      });

      const snap = await getDocs(collection(db, "coupons"));
      setCoupons(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Add coupon error:", err);
    }
  };

  // 🔹 Delete coupon
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await deleteDoc(doc(db, "coupons", id));
      setCoupons(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Delete coupon error:", err);
    }
  };

  if (loading) return <div className="page-content">Loading coupons...</div>;

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
            <Plus size={18} /> Create Coupon
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
                {coupons.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No coupons found
                    </td>
                  </tr>
                ) : (
                  coupons.map(coupon => (
                    <tr key={coupon.id}>
                      <td style={{ fontWeight: 600, fontFamily: "monospace" }}>
                        {coupon.code}
                      </td>
                      <td>
                        {coupon.type === "Percentage"
                          ? `${coupon.discount}%`
                          : `₹${coupon.discount}`}
                      </td>
                      <td>{coupon.type}</td>
                      <td>{coupon.validUntil}</td>
                      <td>{coupon.uses || 0}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            coupon.status === "Active" ? "success" : "danger"
                          }`}
                        >
                          {coupon.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="icon-btn"
                          onClick={() => handleDelete(coupon.id)}
                        >
                          <Trash2 size={16} />
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

      {/* 🔹 MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Coupon</h3>
            </div>

            <div className="modal-body">
              <input
                className="form-input"
                placeholder="Coupon Code"
                value={formData.code}
                onChange={e => setFormData({ ...formData, code: e.target.value })}
              />

              <select
                className="form-select"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option>Percentage</option>
                <option>Fixed Amount</option>
              </select>

              <input
                className="form-input"
                type="number"
                placeholder="Discount Value"
                value={formData.discount}
                onChange={e => setFormData({ ...formData, discount: e.target.value })}
              />

              <input
                className="form-input"
                type="date"
                value={formData.validUntil}
                onChange={e => setFormData({ ...formData, validUntil: e.target.value })}
              />

              <input
                className="form-input"
                type="number"
                placeholder="Max Uses (optional)"
                value={formData.maxUses}
                onChange={e => setFormData({ ...formData, maxUses: e.target.value })}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddCoupon}>
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;
