import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import type { Order } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-blue-500/20 text-blue-400',
  processing: 'bg-purple-500/20 text-purple-400',
  shipped: 'bg-indigo-500/20 text-indigo-400',
  delivered: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || data);
        }
      } catch {
        setOrders([
          { _id: '1', orderNumber: 'BF240001', customerName: 'John Doe', phone: '+254712345678', location: 'Westlands', address: '123 Westlands Road', items: [], subtotal: 18500, deliveryFee: 0, totalAmount: 18500, status: 'pending', paymentMethod: 'mpesa', paymentStatus: 'pending', createdAt: '2024-01-15T10:00:00Z' },
          { _id: '2', orderNumber: 'BF240002', customerName: 'Jane Smith', phone: '+254723456789', location: 'Kilimani', address: '456 Kilimani Avenue', items: [], subtotal: 12000, deliveryFee: 300, totalAmount: 12300, status: 'delivered', paymentMethod: 'cod', paymentStatus: 'paid', createdAt: '2024-01-14T15:30:00Z' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // In production, call API to update status
      setOrders(prev =>
        prev.map(o => o._id === orderId ? { ...o, status: newStatus as Order['status'] } : o)
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(o =>
    (o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
     o.customerName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === '' || o.status === statusFilter)
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Orders</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/50"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg pl-10 pr-8 py-3 text-white focus:outline-none focus:border-white/50 appearance-none"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="bg-white/5 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                  <th className="p-4">Order #</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4 text-white font-medium">{order.orderNumber}</td>
                    <td className="p-4 text-white">{order.customerName}</td>
                    <td className="p-4 text-gray-400">{order.phone}</td>
                    <td className="p-4 text-gray-400">{order.location}</td>
                    <td className="p-4 text-white">KSh {order.totalAmount.toLocaleString()}</td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`px-3 py-1 rounded text-xs font-medium border-0 cursor-pointer ${statusColors[order.status]}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No orders found</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
