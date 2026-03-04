import React, { useState } from 'react';
import { Pencil, Trash2, Plus, X, Upload } from 'lucide-react';

const initialProducts = [
    { id: 1, name: 'Fresh Milk (1L)', category: 'Dairy Product', price: 60, stock: 150, status: 'Active', icon: '🥛' },
    { id: 2, name: 'Paneer (500g)', category: 'Dairy Product', price: 180, stock: 45, status: 'Active', icon: '🧈' },
    { id: 3, name: 'Curd (500g)', category: 'Dairy Product', price: 40, stock: 80, status: 'Active', icon: '🥣' },
    { id: 4, name: 'Butter (200g)', category: 'Dairy Product', price: 120, stock: 5, status: 'Low Stock', icon: '🧈' },
    { id: 5, name: 'Cheese Slice (200g)', category: 'Dairy Product', price: 150, stock: 30, status: 'Active', icon: '🧀' },
    { id: 6, name: 'Ghee (500ml)', category: 'Dairy Product', price: 450, stock: 0, status: 'Out of Stock', icon: '🍯' },
    { id: 7, name: 'Button Mushroom (250g)', category: 'Mushroom Product', price: 80, stock: 60, status: 'Active', icon: '🍄' },
];

const AdminProducts = () => {
    const [products, setProducts] = useState(initialProducts);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form state
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        discount: '',
        description: '',
        image: null,
        stock: '',
        weight: '',
        category: 'Dairy Product', // Default
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-emerald-100 text-emerald-700';
            case 'Low Stock':
                return 'bg-amber-100 text-amber-700';
            case 'Out of Stock':
                return 'bg-rose-100 text-rose-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProduct(prev => ({ ...prev, image: file }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!newProduct.name || !newProduct.price || !newProduct.stock) {
            alert('Please fill in required fields (Name, Price, Quantity)');
            return;
        }

        // Generate status based on stock
        let status = 'Active';
        const stockNum = parseInt(newProduct.stock, 10);
        if (stockNum === 0) status = 'Out of Stock';
        else if (stockNum < 10) status = 'Low Stock';

        // Prepare dummy icon based on category rough match
        let icon = '📦';
        if (newProduct.category === 'Mushroom Product') icon = '🍄';
        else if (newProduct.category === 'Dairy Product') icon = '🥛';

        // Add to list
        const productToAdd = {
            id: products.length + 1,
            name: newProduct.weight ? `${newProduct.name} (${newProduct.weight})` : newProduct.name,
            category: newProduct.category,
            price: parseFloat(newProduct.price),
            stock: stockNum,
            status: status,
            icon: icon
        };

        setProducts([productToAdd, ...products]); // Add to top for visibility
        setIsAddModalOpen(false);

        // Reset form
        setNewProduct({
            name: '', price: '', discount: '', description: '', image: null, stock: '', weight: '', category: 'Dairy Product'
        });
    };

    return (
        <div className="w-full animate-fade-in pb-12 relative">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Products Master</h1>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <span className="hover:text-indigo-600 cursor-pointer transition-colors">Home</span>
                        <span>/</span>
                        <span className="text-indigo-600">Products</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 px-5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-indigo-500/30"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    Add New Product
                </button>
            </div>

            {/* List Section */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <tbody className="text-sm font-semibold text-slate-700">
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl shadow-sm border border-slate-100 shrink-0">
                                                {product.icon}
                                            </div>
                                            <span className="text-slate-800 font-bold">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 text-slate-500 whitespace-nowrap">{product.category}</td>
                                    <td className="py-6 px-8 text-slate-600 font-bold">₹{product.price}</td>
                                    <td className="py-6 px-8 text-slate-600">
                                        {product.stock} <span className="text-slate-400 font-medium text-xs">units</span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${getStatusStyle(product.status)} whitespace-nowrap`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        <div className="flex items-center justify-end gap-3 text-slate-400">
                                            <button className="hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg" title="Edit Product">
                                                <Pencil size={18} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                className="hover:text-rose-600 transition-colors p-2 hover:bg-rose-50 rounded-lg"
                                                title="Delete Product"
                                                onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                                            >
                                                <Trash2 size={18} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Product Modal Overlay */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsAddModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-fade-in custom-scrollbar">
                        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex items-center justify-between z-20">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800">Add New Product</h2>
                                <p className="text-sm font-medium text-slate-500 mt-1">Fill in the details to list a new product in your catalog.</p>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={24} strokeWidth={2.5} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
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

                                    {/* Row 2: Category & Weight */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Category <span className="text-rose-500">*</span></label>
                                            <select
                                                name="category"
                                                value={newProduct.category}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:12px_12px] bg-[right_16px_center]"
                                            >
                                                <option value="Dairy Product">Dairy Product</option>
                                                <option value="Mushroom Product">Mushroom Product</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Weight / Volume</label>
                                            <input
                                                type="text"
                                                name="weight"
                                                value={newProduct.weight}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 500g, 1L"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Pricing & Quantity */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Quantity Added <span className="text-rose-500">*</span></label>
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

                                    {/* Row 4: Description */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={newProduct.description}
                                            onChange={handleInputChange}
                                            rows="4"
                                            placeholder="Enter complete product description..."
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

            <style jsx global>{`
                 @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AdminProducts;
