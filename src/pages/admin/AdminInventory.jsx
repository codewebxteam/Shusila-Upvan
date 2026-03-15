import React, { useState, useEffect, useMemo } from 'react';
import { PackageSearch, AlertTriangle, TrendingDown, BoxSelect, PackageCheck, X, Plus, Upload } from 'lucide-react';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue, update, push, set } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminInventory = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newStock, setNewStock] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '', price: '', discount: '', description: '', image: null, stock: '', category: 'Dairy Product', specification: '', highlights: ''
    });
    const [syncError, setSyncError] = useState(null);

    const handleUpdateClick = (item) => {
        setSelectedItem(item);
        setNewStock(item.stock.toString());
        setIsUpdateModalOpen(true);
    };

    const handleStockUpdate = (e) => {
        e.preventDefault();
        const stockNum = parseInt(newStock, 10);
        if (isNaN(stockNum) || stockNum < 0) return;

        let status = 'Active';
        if (stockNum === 0) status = 'Out of Stock';
        else if (stockNum < 10) status = 'Low Stock';

        update(ref(db, `products/${selectedItem.firebaseId}`), {
            stock: stockNum,
            status: status
        });
        setIsUpdateModalOpen(false);
        setSelectedItem(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProduct(prev => ({ ...prev, image: file }));
        }
    };

    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        
        if (!newProduct.name || !newProduct.price || !newProduct.stock) {
            alert('Please fill in required fields (Name, Price, Quantity)');
            return;
        }

        let status = 'Active';
        const stockNum = parseInt(newProduct.stock, 10);
        if (stockNum === 0) status = 'Out of Stock';
        else if (stockNum < 10) status = 'Low Stock';

        let icon = '📦';
        if (newProduct.category === 'Mushroom Product') icon = '🍄';
        else if (newProduct.category === 'Dairy Product') icon = '🥛';

        let imageUrl = '';
        if (newProduct.image) {
            try {
                const storage = getStorage();
                const imageRef = sRef(storage, `products/${Date.now()}_${newProduct.name.replace(/\s+/g, '_')}`);
                const snapshot = await uploadBytes(imageRef, newProduct.image);
                imageUrl = await getDownloadURL(snapshot.ref);
            } catch (err) {
                console.error("Storage upload failed:", err);
            }
        }

        const productData = {
            name: newProduct.name,
            category: newProduct.category,
            price: parseFloat(newProduct.price),
            stock: stockNum,
            status: status,
            icon: icon,
            img: imageUrl,
            description: newProduct.description,
            specification: newProduct.specification,
            highlights: newProduct.highlights,
            discount: newProduct.discount || 0,
            createdAt: new Date().toISOString()
        };

        try {
            await push(ref(db, 'products'), productData);
            alert("✅ Product Added Successfully to Database!");
            setIsAddModalOpen(false);
            setNewProduct({
                name: '', price: '', discount: '', description: '', image: null, stock: '', category: 'Dairy Product', specification: '', highlights: ''
            });
        } catch (err) {
            console.error("Add product failed:", err);
            alert("❌ Failed to add product: " + err.message + "\n\nThis is usually due to Firebase Database Rules blocking write access on '/products'.");
        }
    };

    useEffect(() => {
        const productsRef = ref(db, 'products');
        const unsubscribe = onValue(productsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const productList = Object.keys(data).map(key => ({
                ...data[key],
                firebaseId: key
            }));
            setProducts(productList);
            setIsLoading(false);
        }, (error) => {
            console.error("Products sync error:", error);
            setIsLoading(false);
            setSyncError(error);
        });
        return () => unsubscribe();
    }, []);

    const stats = useMemo(() => {
        const lowStockItems = products.filter(p => p.stock > 0 && p.stock < 10);
        const outOfStockItems = products.filter(p => !p.stock || p.stock === 0);
        const inventoryValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);

        return {
            totalProducts: products.length,
            lowStock: lowStockItems,
            outOfStock: outOfStockItems,
            inventoryValue
        };
    }, [products]);

    return (
        <div className="max-w-7xl mx-auto w-full animate-fade-in pb-12">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Inventory</h1>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <span className="hover:text-indigo-600 cursor-pointer transition-colors">Home</span>
                        <span>/</span>
                        <span className="text-indigo-600">Inventory</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 px-5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-indigo-500/30 shrink-0"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    Restock / Add New Item
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Products */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Total Products</p>
                        <h3 className="text-2xl font-black text-slate-800">{stats.totalProducts}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        <PackageCheck size={24} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Low Stock Items */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Low Stock Items</p>
                        <h3 className="text-2xl font-black text-amber-500">{stats.lowStock.length}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                        <TrendingDown size={24} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Out of Stock */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Out of Stock</p>
                        <h3 className="text-2xl font-black text-red-500">{stats.outOfStock.length}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <AlertTriangle size={24} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Inventory Value */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Inventory Value</p>
                        <h3 className="text-2xl font-black text-emerald-600">₹{(stats.inventoryValue / 100000).toFixed(2)}L</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                        <BoxSelect size={24} strokeWidth={2.5} />
                    </div>
                </div>
            </div>

            {/* Products Inventory Table */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <PackageSearch className="text-indigo-500" size={24} />
                    <h2 className="text-lg font-bold text-slate-800">All Products</h2>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Product</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Category</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 text-center">Current Stock</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 text-center">Status</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td colSpan="5" className="py-10 text-center text-slate-400 font-black uppercase tracking-widest text-xs">Syncing inventory...</td></tr>
                            ) : products.length === 0 ? (
                                <tr><td colSpan="5" className="py-10 text-center text-slate-400 font-black uppercase tracking-widest text-xs">No products in inventory</td></tr>
                            ) : products.map((item) => (
                                <tr key={item.firebaseId} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shadow-sm border border-slate-200/60">
                                                {item.icon || '📦'}
                                            </div>
                                            <span className="font-bold text-slate-700 text-sm">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-semibold text-slate-600">{item.category}</span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black ${
                                            item.stock === 0 ? 'bg-red-100 text-red-600' : 
                                            item.stock < 10 ? 'bg-amber-100 text-amber-600' : 
                                            'bg-emerald-100 text-emerald-600'
                                        }`}>
                                            {item.stock}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                                            item.stock === 0 ? 'text-red-600 bg-red-50' : 
                                            item.stock < 10 ? 'text-amber-600 bg-amber-50' : 
                                            'text-emerald-600 bg-emerald-50'
                                        }`}>
                                            {item.stock === 0 ? 'Out of Stock' : item.stock < 10 ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button 
                                            onClick={() => handleUpdateClick(item)}
                                            className="inline-flex items-center justify-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20"
                                        >
                                            <PackageSearch size={14} strokeWidth={3} />
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Update Stock Modal Overlay */}
            {isUpdateModalOpen && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsUpdateModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-fade-in">
                        <div className="border-b border-slate-100 p-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-slate-800">Update Stock</h2>
                                <p className="text-sm font-medium text-slate-500 mt-1">{selectedItem.name}</p>
                            </div>
                            <button
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        <form onSubmit={handleStockUpdate} className="p-6">
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-700 mb-2">New Stock Quantity <span className="text-rose-500">*</span></label>
                                <input
                                    type="number"
                                    value={newStock}
                                    onChange={(e) => setNewStock(e.target.value)}
                                    min="0"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:font-medium"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsUpdateModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30"
                                >
                                    Update Stock
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add New Product Modal Overlay */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsAddModalOpen(false)}></div>

                    <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-fade-in custom-scrollbar">
                        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex items-center justify-between z-20">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800">Add New Product</h2>
                                <p className="text-sm font-medium text-slate-500 mt-1">Fill in the details to restock or list a new item.</p>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={24} strokeWidth={2.5} />
                            </button>
                        </div>

                        <form onSubmit={handleAddProductSubmit} className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Left Column: Image Upload */}
                                <div className="lg:col-span-1 space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Product Image</label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative overflow-hidden">
                                            {newProduct.image ? (
                                                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
                                                    <span className="text-4xl mb-2">📸</span>
                                                    <span className="text-sm font-semibold text-slate-600 px-4 text-center truncate w-full">
                                                        {newProduct.image.name}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center text-slate-400 group-hover:text-indigo-500 transition-colors">
                                                    <Upload size={32} className="mb-3" />
                                                    <span className="text-sm font-semibold">Click to upload image</span>
                                                    <span className="text-xs font-medium mt-1">SVG, PNG, JPG or GIF</span>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Highlights (Comma separated)</label>
                                        <textarea
                                            name="highlights"
                                            value={newProduct.highlights}
                                            onChange={handleInputChange}
                                            rows="4"
                                            placeholder="e.g. Organic, Freshly Picked, Rich in Calcium"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none custom-scrollbar"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Right Column: Details */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Row 1 */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Product Name <span className="text-rose-500">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newProduct.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Fresh Cow Milk"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:font-medium"
                                            required
                                        />
                                    </div>

                                    {/* Row 2: Category & Quantity */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Category <span className="text-rose-500">*</span></label>
                                            <select
                                                name="category"
                                                value={newProduct.category}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all appearance-none"
                                            >
                                                <option value="Dairy Product">Dairy Product</option>
                                                <option value="Mushroom Product">Mushroom Product</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Quantity (Stock) <span className="text-rose-500">*</span></label>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={newProduct.stock}
                                                onChange={handleInputChange}
                                                min="0"
                                                placeholder="e.g. 100"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:font-medium"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Pricing */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Price (₹) <span className="text-rose-500">*</span></label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={newProduct.price}
                                                onChange={handleInputChange}
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:font-medium"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Discount (%)</label>
                                            <input
                                                type="number"
                                                name="discount"
                                                value={newProduct.discount}
                                                onChange={handleInputChange}
                                                min="0"
                                                max="100"
                                                placeholder="0"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 4: Description */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={newProduct.description}
                                            onChange={handleInputChange}
                                            rows="3"
                                            placeholder="Enter complete product description..."
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none custom-scrollbar"
                                        ></textarea>
                                    </div>

                                    {/* Row 5: Specification */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Specifications</label>
                                        <textarea
                                            name="specification"
                                            value={newProduct.specification}
                                            onChange={handleInputChange}
                                            rows="3"
                                            placeholder="Brand: Susheela Upvan\nWeight: 500g\nStorage: Keep Refrigerated"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none custom-scrollbar"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30"
                                >
                                    Publish Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            ` }} />

            {/* ERROR DIAGNOSTICS MODAL */}
            {syncError && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md animate-fade-in" onClick={() => setSyncError(null)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-lg relative z-10 shadow-2xl p-6 border-2 border-rose-200 animate-fade-in">
                        <div className="flex items-center gap-4 mb-4 text-red-600">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                                <AlertTriangle size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 leading-tight">Database Access Blocked</h2>
                                <p className="text-xs font-bold text-slate-500">{syncError.message}</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 font-medium mb-6">
                            Your Firebase Realtime Database is rejecting reads. This is caused by locking Rules in your online Firebase Console account.
                        </p>
                        
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6">
                            <p className="text-xs font-black text-slate-700 mb-2">Step-by-Step Fix Instructions:</p>
                            <ol className="text-xs font-bold text-slate-600 list-decimal pl-4 space-y-3">
                                <li>Open your <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-black">Firebase Console</a> website</li>
                                <li>Click <span className="text-slate-900 font-extrabold">Realtime Database</span> on top of left sidebar</li>
                                <li>Go to the <span className="text-slate-900 font-extrabold">Rules</span> tab at the top-center</li>
                                <li>Replace everything with this code accurately:
                                    <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg mt-1 font-mono text-[10px] select-all shadow-inner">
{`{
  "rules": {
    ".read": true,
    ".write": true
  }
}`}
                                    </pre>
                                </li>
                                <li>Click the blue <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-black">Publish</span> button at top right!</li>
                            </ol>
                        </div>
                        
                        <button onClick={() => setSyncError(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-98">
                            Close and Retry Connection
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminInventory;
