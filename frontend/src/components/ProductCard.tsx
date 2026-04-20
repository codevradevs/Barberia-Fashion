import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || '');
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedSize) {
      addToCart(product, selectedSize, 1);
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Link to={`/product/${product._id}`} className="block relative aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="px-2 py-1 bg-white text-black text-xs font-bold rounded">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <p className="text-gray-400 text-xs uppercase tracking-wider">{product.brand}</p>
          <h3 className="text-white font-medium mt-1 line-clamp-2 group-hover:text-gray-300 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-white font-bold">KSh {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">
              KSh {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Size Selection & Add to Cart */}
        <div className="mt-4 flex items-center gap-2">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="flex-1 bg-black border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50"
          >
            {product.sizes.map((size) => (
              <option key={size.size} value={size.size}>
                {size.size} {size.stock < 5 ? '(Low Stock)' : ''}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
