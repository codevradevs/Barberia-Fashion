import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, ArrowLeft } from 'lucide-react';
import type { Product } from '@/types';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('/api/products?limit=100', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || data);
        }
      } catch {
        // fallback mock
        setProducts([
          { _id: '1', name: 'Nike Air Force 1 Triple White', price: 8500, category: 'sneakers', brand: 'Nike', images: ['/images/sneakers/kicks-airforce1-triple-white-01.jpg'], sizes: [{ size: '42', stock: 10 }], description: 'Classic AF1' },
          { _id: '2', name: 'Air Jordan 1 Bred Retro', price: 18500, category: 'sneakers', brand: 'Jordan', images: ['/images/sneakers/kicks-jordan1-bred-retro-04.jpg'], sizes: [{ size: '42', stock: 5 }], description: 'Iconic Jordan' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      // In production, call API to delete
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-white">Products</h1>
            </div>
            <Link
              to="/admin/products/add"
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/50"
          />
        </div>

        {/* Products Table */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="bg-white/5 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-4 text-white">{product.name}</td>
                    <td className="p-4 text-gray-400">{product.brand}</td>
                    <td className="p-4 text-gray-400 capitalize">{product.category}</td>
                    <td className="p-4 text-white">KSh {product.price.toLocaleString()}</td>
                    <td className="p-4 text-gray-400">
                      {product.sizes.reduce((sum, s) => sum + s.stock, 0)}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-white/5 rounded-lg text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No products found</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
