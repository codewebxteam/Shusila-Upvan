// src/pages/MyOrders.jsx
import React, { useState, useEffect } from 'react';
import { 
  Package, Truck, CheckCircle, Clock, XCircle, 
  Eye, Download, Filter, Search, RefreshCw, 
  MapPin, Phone, DollarSign, Calendar, User,
  Star, BarChart, Printer, Repeat,
  ArrowUpRight, ArrowDownRight, Percent, Loader,
  AlertCircle, ShoppingBag, FileText, ShoppingCart
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock user data (replace with your actual auth logic)
  const user = {
    uid: 'user123',
    displayName: 'John Doe',
    email: 'john@example.com'
  };

  // Fetch user's orders from localStorage or mock data
  useEffect(() => {
    const fetchOrders = () => {
      setLoading(true);
      setError(null);

      try {
        // Try to get orders from localStorage
        const localOrders = localStorage.getItem(`orders_${user?.uid}`);
        
        if (localOrders) {
          setOrders(JSON.parse(localOrders));
        } else {
          // Load mock data if no orders in localStorage
          const mockOrders = getMockOrders();
          setOrders(mockOrders);
          localStorage.setItem(`orders_${user?.uid}`, JSON.stringify(mockOrders));
        }
        
        setLoading(false);
        setRefreshing(false);
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Error loading orders');
        
        // Fallback to mock data
        const mockOrders = getMockOrders();
        setOrders(mockOrders);
        
        setLoading(false);
        setRefreshing(false);
      }
    };

    fetchOrders();
  }, []);

  // Generate mock orders for demo
  const getMockOrders = () => {
    const statuses = ['delivered', 'shipped', 'processing', 'pending', 'cancelled'];
    const products = [
      { name: 'Wireless Bluetooth Headphones', price: 2999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
      { name: 'Smart Watch Series 5', price: 8999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
      { name: 'Premium Backpack', price: 2499, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62' },
      { name: 'USB-C Fast Charger', price: 1299, image: 'https://images.unsplash.com/photo-1594736797933-d0141cba6db4' },
      { name: 'Laptop Stand', price: 1999, image: 'https://images.unsplash.com/photo-1586950012036-b957f2c7cbf3' },
    ];

    return Array.from({ length: 8 }, (_, i) => {
      const numItems = Math.floor(Math.random() * 3) + 1;
      const items = Array.from({ length: numItems }, () => {
        const product = products[Math.floor(Math.random() * products.length)];
        return {
          ...product,
          quantity: Math.floor(Math.random() * 2) + 1,
          productId: `PROD${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        };
      });

      const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const orderDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      
      let tracking = null;
      if (status === 'delivered' || status === 'shipped') {
        tracking = {
          ordered: orderDate.toISOString(),
          processing: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000).toISOString(),
          shipped: status === 'delivered' ? new Date(orderDate.getTime() + 48 * 60 * 60 * 1000).toISOString() : null,
          delivered: status === 'delivered' ? new Date(orderDate.getTime() + 72 * 60 * 60 * 1000).toISOString() : null
        };
      }

      return {
        id: `order${i + 1}`,
        orderId: `ORD-${Date.now().toString().slice(-8)}${i}`,
        userId: user?.uid,
        status: status,
        customerName: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        shippingAddress: '123 Main Street, Mumbai, Maharashtra 400001',
        items: items,
        totalAmount: totalAmount,
        paymentStatus: status === 'cancelled' ? 'refunded' : 'paid',
        orderDate: orderDate.toISOString(),
        createdAt: orderDate.toISOString(),
        deliveryDate: status === 'delivered' ? new Date(orderDate.getTime() + 72 * 60 * 60 * 1000).toISOString() : null,
        tracking: tracking
      };
    }).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  };

  // Manual refresh function
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockOrders = getMockOrders();
      setOrders(mockOrders);
      localStorage.setItem(`orders_${user?.uid}`, JSON.stringify(mockOrders));
      toast.success('Orders refreshed successfully!');
    } catch (error) {
      console.error('Refresh error:', error);
      toast.error('Failed to refresh orders');
    } finally {
      setRefreshing(false);
    }
  };

  // Helper functions
  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return <CheckCircle className="text-green-500" size={20} />;
      case 'shipped': return <Truck className="text-blue-500" size={20} />;
      case 'processing': return <Clock className="text-amber-500" size={20} />;
      case 'cancelled': return <XCircle className="text-red-500" size={20} />;
      case 'pending': return <Clock className="text-purple-500" size={20} />;
      case 'returned': return <RefreshCw className="text-gray-500" size={20} />;
      default: return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-amber-100 text-amber-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-purple-100 text-purple-800';
      case 'returned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (paymentStatus) => {
    switch(paymentStatus?.toLowerCase()) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-amber-600 bg-amber-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'refunded': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Filter orders based on search and filter
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status?.toLowerCase() === filter;
    
    if (!search.trim()) return matchesFilter;
    
    const searchLower = search.toLowerCase();
    return matchesFilter && (
      order.orderId?.toLowerCase().includes(searchLower) ||
      order.customerName?.toLowerCase().includes(searchLower) ||
      order.email?.toLowerCase().includes(searchLower) ||
      order.phone?.includes(search) ||
      (order.items && order.items.some(item => 
        item.name?.toLowerCase().includes(searchLower)
      ))
    );
  });

  // Calculate stats
  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status?.toLowerCase() === 'delivered').length,
    processing: orders.filter(o => o.status?.toLowerCase() === 'processing').length,
    shipped: orders.filter(o => o.status?.toLowerCase() === 'shipped').length,
    cancelled: orders.filter(o => o.status?.toLowerCase() === 'cancelled').length,
    pending: orders.filter(o => o.status?.toLowerCase() === 'pending').length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    averageOrderValue: orders.length > 0 
      ? Math.round(orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0) / orders.length)
      : 0
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Format price function
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  // Get progress steps for order tracking
  const getProgressSteps = (order) => {
    const steps = [
      { 
        label: 'Order Placed', 
        icon: '📝', 
        completed: true,
        date: order.orderDate || order.createdAt,
        status: 'completed'
      },
      { 
        label: 'Processing', 
        icon: '⚙️', 
        completed: ['processing', 'shipped', 'delivered'].includes(order.status?.toLowerCase()),
        date: order.tracking?.processing,
        status: ['processing', 'shipped', 'delivered'].includes(order.status?.toLowerCase()) ? 'completed' : 'pending'
      },
      { 
        label: 'Shipped', 
        icon: '🚚', 
        completed: ['shipped', 'delivered'].includes(order.status?.toLowerCase()),
        date: order.tracking?.shipped,
        status: ['shipped', 'delivered'].includes(order.status?.toLowerCase()) ? 'completed' : 'pending'
      },
      { 
        label: 'Delivered', 
        icon: '✅', 
        completed: order.status?.toLowerCase() === 'delivered',
        date: order.tracking?.delivered,
        status: order.status?.toLowerCase() === 'delivered' ? 'completed' : 'pending'
      }
    ];
    return steps;
  };

  // Handle order actions
  const handleOrderAction = async (orderId, action) => {
    try {
      switch(action) {
        case 'cancel':
          // Update order status locally
          setOrders(prev => prev.map(order => 
            order.id === orderId 
              ? { ...order, status: 'cancelled', paymentStatus: 'refunded' }
              : order
          ));
          toast.success(`Order ${orderId} cancelled successfully`);
          break;
          
        case 'repeat':
          // Add items to cart logic here
          const order = orders.find(o => o.id === orderId);
          if (order?.items) {
            localStorage.setItem('repeat_order', JSON.stringify(order.items));
            toast.success('Items added to cart for reorder');
          }
          break;
          
        case 'downloadInvoice':
          toast.success(`Invoice for ${orderId} downloaded`);
          break;
          
        case 'return':
          toast.success(`Return requested for order ${orderId}`);
          break;
      }
    } catch (error) {
      console.error('Order action error:', error);
      toast.error('Action failed. Please try again.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-green-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // If user not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-md text-center p-8 bg-white rounded-xl shadow-lg">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h3>
          <p className="text-gray-600 mb-6">Please login to view your orders</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Error state
  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-md text-center p-8 bg-white rounded-xl shadow-lg">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Orders</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
          >
            <RefreshCw className="inline mr-2" size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white">
                  <Package size={28} />
                </div>
                <span>My Orders</span>
                {refreshing && (
                  <Loader className="animate-spin ml-2 text-green-500" size={20} />
                )}
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition"
              >
                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              
              {orders.length > 0 && (
                <button
                  onClick={() => window.location.href = '/products'}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition"
                >
                  <ShoppingBag className="inline mr-2" size={18} />
                  Shop More
                </button>
              )}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Package className="text-green-500" size={24} />
              </div>
              <div className="mt-2 flex items-center text-green-600 text-sm">
                <ArrowUpRight size={16} />
                <span>{stats.delivered} delivered</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
                </div>
                <DollarSign className="text-blue-500" size={24} />
              </div>
              <div className="mt-2 text-blue-600 text-sm">
                Avg: {formatPrice(stats.averageOrderValue)}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.processing + stats.shipped + stats.pending}
                  </p>
                </div>
                <Clock className="text-amber-500" size={24} />
              </div>
              <div className="mt-2 text-amber-600 text-sm">
                {stats.processing} processing
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total > 0 ? Math.round((stats.delivered / stats.total) * 100) : 0}%
                  </p>
                </div>
                <Percent className="text-purple-500" size={24} />
              </div>
              <div className="mt-2 text-purple-600 text-sm">
                {stats.delivered}/{stats.total} successful
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && orders.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-amber-500" size={20} />
            <div className="flex-1">
              <p className="text-amber-800">{error}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="text-amber-700 hover:text-amber-900 font-medium text-sm"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by Order ID, product name, or customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['all', 'delivered', 'shipped', 'processing', 'pending', 'cancelled'].map((status) => {
                const count = orders.filter(o => 
                  status === 'all' || o.status?.toLowerCase() === status
                ).length;
                
                return (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === status 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'}`}
                  >
                    {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${filter === status ? 'bg-white/20' : 'bg-gray-200'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-24 w-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="text-gray-400" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <button
                onClick={() => window.location.href = '/products'}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition inline-flex items-center"
              >
                <ShoppingBag className="mr-2" size={18} />
                Start Shopping
              </button>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearch('');
                  setFilter('all');
                }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-5">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className="font-mono font-bold text-gray-900 text-lg">
                          {order.orderId || `ORD-${order.id.slice(0, 8).toUpperCase()}`}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1.5">{order.status?.toUpperCase()}</span>
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          Placed on: {formatDate(order.orderDate || order.createdAt)}
                        </span>
                        {order.deliveryDate && (
                          <span className="flex items-center gap-1 mt-1">
                            <Truck size={14} />
                            Delivery: {formatDate(order.deliveryDate)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {formatPrice(order.totalAmount)}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentColor(order.paymentStatus)}`}>
                        {order.paymentStatus?.toUpperCase() || 'PAYMENT PENDING'}
                      </span>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  {order.items && order.items.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Items ({order.items.length}):</p>
                      <div className="flex flex-wrap gap-2">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="h-10 w-10 object-cover rounded"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                              />
                            )}
                            <div className={!item.image ? 'block' : 'hidden'}>
                              <Package size={20} className="text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity} × {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 flex items-center">
                            <span className="text-sm text-gray-600">
                              +{order.items.length - 3} more items
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions and Progress */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    {/* Progress Steps */}
                    {order.status !== 'cancelled' && order.status !== 'returned' && (
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          {getProgressSteps(order).map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs mb-1 ${
                                step.completed 
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow' 
                                  : 'bg-gray-200 text-gray-400'
                              }`}>
                                {step.completed ? '✓' : index + 1}
                              </div>
                              <span className="text-xs text-gray-600">{step.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition text-sm font-medium"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                      
                      {order.status === 'delivered' && (
                        <button
                          onClick={() => handleOrderAction(order.id, 'repeat')}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                          title="Reorder"
                        >
                          <Repeat size={16} />
                          Reorder
                        </button>
                      )}
                      
                      {order.status === 'processing' && (
                        <button
                          onClick={() => handleOrderAction(order.id, 'cancel')}
                          className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                        >
                          <XCircle size={16} />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Info */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 text-center text-gray-600 text-sm">
            Showing {filteredOrders.length} of {orders.length} orders
            {(search || filter !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilter('all');
                }}
                className="ml-2 text-green-600 hover:text-green-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <FileText className="text-green-500" size={24} />
                      Order Details
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-gray-600">
                        {selectedOrder.orderId || `ORD-${selectedOrder.id.slice(0, 8).toUpperCase()}`}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition"
                  >
                    ✕
                  </button>
                </div>

                {/* Order Timeline */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Order Progress</h4>
                  <div className="relative">
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
                    <div className="grid grid-cols-4 relative">
                      {getProgressSteps(selectedOrder).map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-2 z-10 ${
                            step.completed 
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                              : 'bg-white border-2 border-gray-300 text-gray-400'
                          }`}>
                            {step.completed ? '✓' : index + 1}
                          </div>
                          <div className="text-center">
                            <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {step.label}
                            </p>
                            {step.date && (
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(step.date)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Shipping Details */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="text-green-500" size={18} />
                      Shipping Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Customer Name</p>
                        <p className="font-medium">{selectedOrder.customerName || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{selectedOrder.email || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{selectedOrder.phone || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Shipping Address</p>
                        <p className="font-medium mt-1">{selectedOrder.shippingAddress || 'Address not provided'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <DollarSign className="text-green-600" size={18} />
                      Order Summary
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date</span>
                        <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Date</span>
                        <span className="font-medium">{formatDate(selectedOrder.deliveryDate) || 'Not scheduled'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status</span>
                        <span className={`font-medium ${getPaymentColor(selectedOrder.paymentStatus)} px-2 py-1 rounded`}>
                          {selectedOrder.paymentStatus?.toUpperCase()}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">Total Amount</span>
                          <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(selectedOrder.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items Details */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Order Items ({selectedOrder.items?.length || 0})</h4>
                  <div className="space-y-3">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                        <div className="flex items-center gap-4">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="h-20 w-20 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="h-20 w-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="text-gray-400" size={24} />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Quantity: {item.quantity} • Price: {formatPrice(item.price)} each
                            </p>
                            {item.productId && (
                              <p className="text-xs text-gray-500 mt-1">Product ID: {item.productId}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            {formatPrice((item.price || 0) * (item.quantity || 1))}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      handleOrderAction(selectedOrder.id, 'downloadInvoice');
                      setSelectedOrder(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3.5 rounded-xl font-medium hover:shadow-lg transition"
                  >
                    <Download size={18} />
                    Download Invoice
                  </button>
                  
                  {selectedOrder.status === 'delivered' && (
                    <button
                      onClick={() => {
                        handleOrderAction(selectedOrder.id, 'repeat');
                        setSelectedOrder(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 rounded-xl font-medium hover:shadow-lg transition"
                    >
                      <Repeat size={18} />
                      Reorder All Items
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-200 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;