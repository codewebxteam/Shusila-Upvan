export const dashboardStats = {
  totalSales: 245680,
  totalOrders: 1543,
  totalCustomers: 892,
  pendingOrders: 47
};

export const recentOrders = [
  { id: 'ORD-001', customer: 'Rahul Sharma', amount: 2499, status: 'Delivered', date: '2024-01-15', payment: 'UPI' },
  { id: 'ORD-002', customer: 'Priya Singh', amount: 4999, status: 'Shipped', date: '2024-01-15', payment: 'Card' },
  { id: 'ORD-003', customer: 'Amit Kumar', amount: 1299, status: 'Pending', date: '2024-01-14', payment: 'COD' },
  { id: 'ORD-004', customer: 'Sneha Patel', amount: 3499, status: 'Processing', date: '2024-01-14', payment: 'UPI' },
  { id: 'ORD-005', customer: 'Vikram Reddy', amount: 5999, status: 'Delivered', date: '2024-01-13', payment: 'Card' }
];

export const products = [
  { id: 1, name: 'Fresh Milk (1L)', category: 'Dairy Product', price: 60, stock: 150, status: 'Active', image: '🥛' },
  { id: 2, name: 'Paneer (500g)', category: 'Dairy Product', price: 180, stock: 45, status: 'Active', image: '🧈' },
  { id: 3, name: 'Curd (500g)', category: 'Dairy Product', price: 40, stock: 80, status: 'Active', image: '🥣' },
  { id: 4, name: 'Butter (200g)', category: 'Dairy Product', price: 120, stock: 5, status: 'Low Stock', image: '🧈' },
  { id: 5, name: 'Cheese Slice (200g)', category: 'Dairy Product', price: 150, stock: 30, status: 'Active', image: '🧀' },
  { id: 6, name: 'Ghee (500ml)', category: 'Dairy Product', price: 450, stock: 0, status: 'Out of Stock', image: '🫙' },
  { id: 7, name: 'Button Mushroom (250g)', category: 'Mushroom Product', price: 80, stock: 60, status: 'Active', image: '🍄' },
  { id: 8, name: 'Oyster Mushroom (250g)', category: 'Mushroom Product', price: 120, stock: 35, status: 'Active', image: '🍄' },
  { id: 9, name: 'Shiitake Mushroom (200g)', category: 'Mushroom Product', price: 200, stock: 20, status: 'Active', image: '🍄' },
  { id: 10, name: 'Portobello Mushroom (300g)', category: 'Mushroom Product', price: 180, stock: 8, status: 'Low Stock', image: '🍄' },
  { id: 11, name: 'Enoki Mushroom (150g)', category: 'Mushroom Product', price: 150, stock: 25, status: 'Active', image: '🍄' },
  { id: 12, name: 'Dried Mushroom Mix (100g)', category: 'Mushroom Product', price: 250, stock: 0, status: 'Out of Stock', image: '🍄' }
];

export const customers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', orders: 12, spent: 45600, joined: '2023-06-15', status: 'Active' },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', orders: 8, spent: 32400, joined: '2023-08-20', status: 'Active' },
  { id: 3, name: 'Amit Kumar', email: 'amit@example.com', orders: 5, spent: 18900, joined: '2023-10-10', status: 'Active' },
  { id: 4, name: 'Sneha Patel', email: 'sneha@example.com', orders: 15, spent: 67800, joined: '2023-05-05', status: 'VIP' }
];

export const payments = [
  { id: 'PAY-001', order: 'ORD-001', customer: 'Rahul Sharma', amount: 2499, method: 'UPI', status: 'Success', date: '2024-01-15' },
  { id: 'PAY-002', order: 'ORD-002', customer: 'Priya Singh', amount: 4999, method: 'Card', status: 'Success', date: '2024-01-15' },
  { id: 'PAY-003', order: 'ORD-003', customer: 'Amit Kumar', amount: 1299, method: 'COD', status: 'Pending', date: '2024-01-14' }
];

export const coupons = [
  { id: 1, code: 'WELCOME50', discount: '50%', type: 'Percentage', validity: '2024-12-31', uses: 234, status: 'Active' },
  { id: 2, code: 'FLAT200', discount: '₹200', type: 'Fixed', validity: '2024-06-30', uses: 567, status: 'Active' },
  { id: 3, code: 'SUMMER25', discount: '25%', type: 'Percentage', validity: '2024-03-31', uses: 123, status: 'Expired' }
];

export const salesData = [
  { month: 'Jan', sales: 45000, orders: 234 },
  { month: 'Feb', sales: 52000, orders: 267 },
  { month: 'Mar', sales: 48000, orders: 245 },
  { month: 'Apr', sales: 61000, orders: 312 },
  { month: 'May', sales: 55000, orders: 289 },
  { month: 'Jun', sales: 67000, orders: 345 }
];

export const adminRoles = [
  { id: 1, name: 'Super Admin', users: 2, permissions: 'Full Access', status: 'Active' },
  { id: 2, name: 'Product Manager', users: 5, permissions: 'Products, Inventory', status: 'Active' },
  { id: 3, name: 'Order Manager', users: 8, permissions: 'Orders, Customers', status: 'Active' },
  { id: 4, name: 'Support Staff', users: 12, permissions: 'View Only, Support', status: 'Active' }
];
