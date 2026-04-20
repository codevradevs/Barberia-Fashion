import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    address: '',
    notes: '',
    paymentMethod: 'mpesa',
  });

  const deliveryFee = totalPrice > 5000 ? 0 : 300;
  const finalTotal = totalPrice + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In production, send order to API
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     items,
      //     subtotal: totalPrice,
      //     deliveryFee,
      //     totalAmount: finalTotal,
      //   }),
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} id="checkout-form" className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="+254 712 345 678"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email (optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Location/Area *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="e.g., Westlands, Kilimani, CBD"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="Street address, building name, floor, etc."
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-4 p-4 bg-black rounded-lg cursor-pointer border border-white/20">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa"
                    checked={formData.paymentMethod === 'mpesa'}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <MessageCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-white font-medium">M-Pesa</p>
                    <p className="text-gray-400 text-sm">Pay via M-Pesa mobile money</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 bg-black rounded-lg cursor-pointer border border-white/20">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <Truck className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-white font-medium">Cash on Delivery</p>
                    <p className="text-gray-400 text-sm">Pay when you receive your order</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 bg-black rounded-lg cursor-pointer border border-white/20">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <CreditCard className="w-6 h-6 text-purple-500" />
                  <div>
                    <p className="text-white font-medium">Bank Transfer</p>
                    <p className="text-gray-400 text-sm">Pay via bank transfer</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Notes (optional)</h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                placeholder="Any special instructions for your order..."
              />
            </div>
          </form>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {item.name} (Size: {item.size}) x {item.quantity}
                    </span>
                    <span className="text-white">KSh {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">KSh {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-white">
                    {deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-white">KSh {finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>

            {/* WhatsApp Order Option */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">Or order via WhatsApp</p>
              <a
                href={`https://wa.me/254712345678?text=${encodeURIComponent(
                  `Hi, I want to place an order:\n\n${items.map(i => `${i.name} (Size: ${i.size}) x ${i.quantity} - KSh ${(i.price * i.quantity).toLocaleString()}`).join('\n')}\n\nTotal: KSh ${finalTotal.toLocaleString()}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
