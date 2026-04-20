import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  const deliveryFee = totalPrice > 5000 ? 0 : 300;
  const finalTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <ShoppingBag className="w-20 h-20 text-gray-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart ({totalItems} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-4 bg-white/5 rounded-xl p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-white font-medium">{item.name}</h3>
                  <p className="text-gray-400 text-sm">Size: {item.size}</p>
                  <p className="text-white font-bold mt-1">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center bg-black rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-white/5 rounded-xl p-6 h-fit">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-3 text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">KSh {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-white">
                  {deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-gray-500">
                  Free delivery on orders over KSh 5,000
                </p>
              )}
            </div>
            
            <div className="border-t border-white/10 my-4 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-white">KSh {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => navigate('/shop')}
              className="w-full mt-3 text-gray-400 hover:text-white text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
