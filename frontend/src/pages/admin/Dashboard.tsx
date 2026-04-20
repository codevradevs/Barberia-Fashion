import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, TrendingUp, LogOut, Plus, List } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // fallback to mock if server not running
        setStats({ totalProducts: 156, totalOrders: 243, pendingOrders: 12, totalRevenue: 1845000 });
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500' },
    { name: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'bg-green-500' },
    { name: 'Pending Orders', value: stats.pendingOrders, icon: Users, color: 'bg-yellow-500' },
    { name: 'Total Revenue', value: `KSh ${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const quickActions = [
    { name: 'Add Product', icon: Plus, path: '/admin/products/add', color: 'bg-white text-black' },
    { name: 'View Products', icon: Package, path: '/admin/products', color: 'bg-white/10 text-white' },
    { name: 'View Orders', icon: List, path: '/admin/orders', color: 'bg-white/10 text-white' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {admin?.name}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <div key={stat.name} className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.name}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.path}
              className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity ${action.color}`}
            >
              <action.icon className="w-5 h-5" />
              {action.name}
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Orders</h2>
            <Link to="/admin/orders" className="text-gray-400 hover:text-white text-sm">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                  <th className="pb-3">Order #</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { id: 'BF240001', customer: 'John Doe', amount: 18500, status: 'pending', date: '2024-01-15' },
                  { id: 'BF240002', customer: 'Jane Smith', amount: 12000, status: 'delivered', date: '2024-01-14' },
                  { id: 'BF240003', customer: 'Mike Johnson', amount: 25000, status: 'processing', date: '2024-01-14' },
                  { id: 'BF240004', customer: 'Sarah Williams', amount: 8500, status: 'shipped', date: '2024-01-13' },
                ].map((order) => (
                  <tr key={order.id} className="border-b border-white/5">
                    <td className="py-4 text-white">{order.id}</td>
                    <td className="py-4 text-gray-300">{order.customer}</td>
                    <td className="py-4 text-white">KSh {order.amount.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
