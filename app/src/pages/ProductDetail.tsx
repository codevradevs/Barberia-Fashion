import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import { getProductById, products } from '@/data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = getProductById(id || '');

  const relatedProducts = product
    ? products
        .filter(p => p.category === product.category && p._id !== product._id)
        .slice(0, 4)
    : [];

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize, 1);
    }
  };

  const handleWhatsAppOrder = () => {
    if (product && selectedSize) {
      const message = `Hi, I want to order ${product.name} (Size: ${selectedSize}) from Baberia Fashion. Price: KSh ${product.price.toLocaleString()}`;
      window.open(`https://wa.me/254712345678?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen py-20 text-center">
        <p className="text-gray-400 text-lg">Product not found</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 text-white underline"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-white">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-white">Shop</button>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square bg-white/5 rounded-xl overflow-hidden mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === idx ? 'border-white' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-wider">{product.brand}</p>
            <h1 className="text-3xl font-bold text-white mt-2">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-2xl font-bold text-white">KSh {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  KSh {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 mt-6">{product.description}</p>

            {/* Features */}
            {product.features && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-2">Features</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Size Selection */}
            <div className="mt-8">
              <h3 className="text-white font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    disabled={size.stock === 0}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size.size
                        ? 'bg-white text-black border-white'
                        : size.stock === 0
                        ? 'bg-white/5 text-gray-600 border-white/10 cursor-not-allowed'
                        : 'bg-transparent text-white border-white/30 hover:border-white'
                    }`}
                  >
                    {size.size}
                    {size.stock < 5 && size.stock > 0 && (
                      <span className="block text-xs">({size.stock} left)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              
              <button
                onClick={handleWhatsAppOrder}
                disabled={!selectedSize}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-4 mt-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
