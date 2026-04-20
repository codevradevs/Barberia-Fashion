import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';
import { toast } from 'sonner';

const categories = [
  'sneakers', 'hoodies', 'tshirts', 'longsleeves', 'polos',
  'jeans', 'cargos', 'sweatpants', 'tracksuits', 'jackets',
  'hijabs', 'caps', 'beanies', 'chains', 'watches',
  'sunglasses', 'crossbags', 'backpacks', 'belts', 'durags', 'rings'
];

const brands = [
  'Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma',
  'Converse', 'Vans', 'Asics', 'Reebok', 'Under Armour',
  'Essentials', 'Stussy', 'Supreme', 'Chrome Hearts', 'Denim Tears'
];

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<{ size: string; stock: number }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    brand: '',
    description: '',
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In production, send to API
      const productData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        images,
        sizes,
      };

      console.log('Product data:', productData);
      
      toast.success('Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addSize = () => {
    setSizes(prev => [...prev, { size: '', stock: 0 }]);
  };

  const updateSize = (index: number, field: 'size' | 'stock', value: string | number) => {
    setSizes(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const removeSize = (index: number) => {
    setSizes(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In production, upload to Cloudinary
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/products" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Add Product</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                  placeholder="e.g., Nike Air Force 1 Triple White"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Price (KSh) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                  placeholder="8500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Original Price (KSh)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                  placeholder="9500 (for sale items)"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Brand *</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                >
                  <option value="">Select brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
              placeholder="Product description..."
            />
          </div>

          {/* Images */}
          <div className="bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square">
                  <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-square bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white/50">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-400 text-sm">Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Sizes & Stock */}
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Sizes & Stock</h2>
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20"
              >
                <Plus className="w-4 h-4" />
                Add Size
              </button>
            </div>
            
            <div className="space-y-3">
              {sizes.map((size, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={size.size}
                    onChange={(e) => updateSize(idx, 'size', e.target.value)}
                    placeholder="Size (e.g., 42, M, L)"
                    className="flex-1 bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                  />
                  <input
                    type="number"
                    value={size.stock}
                    onChange={(e) => updateSize(idx, 'stock', Number(e.target.value))}
                    placeholder="Stock"
                    min="0"
                    className="w-32 bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                  />
                  <button
                    type="button"
                    onClick={() => removeSize(idx)}
                    className="p-3 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Product Flags */}
          <div className="bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Product Flags</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="text-white">Featured Product</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isNewArrival"
                  checked={formData.isNewArrival}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="text-white">New Arrival</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isOnSale"
                  checked={formData.isOnSale}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="text-white">On Sale</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
            <Link
              to="/admin/products"
              className="px-8 py-4 bg-white/5 text-white rounded-lg hover:bg-white/10"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
