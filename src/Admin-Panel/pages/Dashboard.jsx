import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardStats, recentOrders, salesData } from '../data/mockData';

const Dashboard = () => {
const stats = [
{ label: 'Total Sales', value: `₹${dashboardStats.totalSales.toLocaleString()}`, icon: DollarSign, color: 'primary', change: '+12.5%', positive: true },
{ label: 'Total Orders', value: dashboardStats.totalOrders, icon: ShoppingBag, color: 'success', change: '+8.2%', positive: true },
{ label: 'Total Customers', value: dashboardStats.totalCustomers, icon: Users, color: 'info', change: '+15.3%', positive: true },
{ label: 'Pending Orders', value: dashboardStats.pendingOrders, icon: AlertCircle, color: 'warning', change: '-3.1%', positive: false }
];

return (
<div className="page-content">
<div className="page-header">
<h1>Dashboard Overview</h1>
<div className="breadcrumb">
  <span>Home</span> / <span>Dashboard</span>
</div>
</div>

<div className="stats-grid">
{stats.map((stat, index) => (
  <div key={index} className="stat-card">
    <div className="stat-header">
      <div>
        <div className="stat-value">{stat.value}</div>
        <div className="stat-label">{stat.label}</div>
      </div>
      <div className={`stat-icon ${stat.color}`}>
        <stat.icon size={24} />
      </div>
    </div>
    <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
      {stat.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
      <span>{stat.change} from last month</span>
    </div>
  </div>
))}
</div>

<div className="grid grid-2">
<div className="card">
  <div className="card-header">
    <h3>Sales Overview</h3>
  </div>
  <div className="card-body">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

<div className="card">
  <div className="card-header">
    <h3>Orders Overview</h3>
  </div>
  <div className="card-body">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="orders" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
</div>

<div className="card">
<div className="card-header">
  <h3>Recent Orders</h3>
  <button className="btn btn-primary">View All</button>
</div>
<div className="card-body">
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Amount</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {recentOrders.map(order => (
          <tr key={order.id}>
            <td style={{ fontWeight: 600 }}>{order.id}</td>
            <td>{order.customer}</td>
            <td>₹{order.amount}</td>
            <td>{order.payment}</td>
            <td>
              <span className={`status-badge ${
                order.status === 'Delivered' ? 'success' :
                order.status === 'Shipped' ? 'info' :
                order.status === 'Pending' ? 'warning' : 'info'
              }`}>
                {order.status}
              </span>
            </td>
            <td>{order.date}</td>
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
export default Dashboard;