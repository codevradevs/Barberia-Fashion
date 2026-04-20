import { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'sneakers', name: 'Sneakers' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'tshirts', name: 'T-Shirts' },
  { id: 'longsleeves', name: 'Long Sleeves' },
  { id: 'polos', name: 'Polos' },
  { id: 'jeans', name: 'Jeans' },
  { id: 'cargos', name: 'Cargo Pants' },
  { id: 'sweatpants', name: 'Sweatpants' },
  { id: 'tracksuits', name: 'Tracksuits' },
  { id: 'jackets', name: 'Jackets' },
  { id: 'accessories', name: 'Accessories' },
];

const sortOptions = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
];

export default function Shop() {
  const { category: urlCategory } = useParams();
  const [searchParams] = useSearchParams();
  const isNewArrival = searchParams.get('new') === 'true';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: urlCategory || 'all',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sort: '-createdAt',
  });

  useEffect(() => {
    setFilters(prev => ({ ...prev, category: urlCategory || 'all' }));
  }, [urlCategory]);

  const allBrands = useMemo(() => {
    const b = new Set(products.map(p => p.brand));
    return Array.from(b).sort();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (isNewArrival) {
      list = list.filter(p => p.isNewArrival);
    } else if (filters.category !== 'all') {
      list = list.filter(
        p => p.category === filters.category || p.subcategory === filters.category
      );
    }

    if (filters.brand) list = list.filter(p => p.brand === filters.brand);
    if (filters.minPrice) list = list.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) list = list.filter(p => p.price <= Number(filters.maxPrice));

    if (filters.sort === 'price') list.sort((a, b) => a.price - b.price);
    else if (filters.sort === '-price') list.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [filters, isNewArrival]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isNewArrival ? 'New Arrivals' : categories.find(c => c.id === filters.category)?.name || 'All Products'}
          </h1>
          <p className="text-gray-400">{filtered.length} products found</p>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-white/30"
              >
              {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-400'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-gray-400'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mb-8 p-6 bg-white/5 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <label className="block text-white font-medium mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-white font-medium mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">All Brands</option>
                  {allBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-white font-medium mb-2">Min Price</label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="KSh 0"
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Max Price</label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="KSh 100,000"
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
