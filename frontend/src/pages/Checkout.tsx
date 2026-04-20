import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, CreditCard, Truck, Smartphone, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const COD_LIMIT = 50000;
const WHATSAPP_NUMBER = '254712345678';

type PaymentMethod = 'mpesa' | 'cod' | 'card';
type MpesaStatus = 'idle' | 'sending' | 'waiting' | 'success' | 'failed';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mpesaStatus, setMpesaStatus] = useState<MpesaStatus>('idle');
  const [, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    address: '',
    notes: '',
    paymentMethod: 'mpesa' as PaymentMethod,
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
  });

  const deliveryFee = totalPrice > 5000 ? 0 : 300;
  const finalTotal = totalPrice + deliveryFee;
  const codAllowed = finalTotal <= COD_LIMIT;

  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items.length, navigate]);

  if (items.length === 0) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16);
      const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, cardNumber: formatted }));
      return;
    }
    if (name === 'cardExpiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      const formatted = digits.length > 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
      setFormData(prev => ({ ...prev, cardExpiry: formatted }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── Save order to backend ──
  const saveOrder = async (method: string) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        address: formData.address,
        notes: formData.notes,
        paymentMethod: method,
        items: items.map(i => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          size: i.size,
          quantity: i.quantity,
          image: i.image,
        })),
        subtotal: totalPrice,
        deliveryFee,
        totalAmount: finalTotal,
      }),
    });
    if (!res.ok) throw new Error('Failed to save order');
    return res.json();
  };

  // ── WhatsApp confirmation — fires after EVERY successful order ──
  const sendWhatsAppConfirmation = (method: string) => {
    const itemsList = items
      .map(i => `• ${i.name} (Size: ${i.size}) x${i.quantity} — KSh ${(i.price * i.quantity).toLocaleString()}`)
      .join('\n');

    const message =
      `🛍️ *New Order — Baberia Fashion*\n\n` +
      `*Customer:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Location:* ${formData.location}\n` +
      `*Address:* ${formData.address}\n` +
      (formData.email ? `*Email:* ${formData.email}\n` : '') +
      `\n*Items:*\n${itemsList}\n\n` +
      `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee.toLocaleString()}`}\n` +
      `*Total: KSh ${finalTotal.toLocaleString()}*\n\n` +
      `*Payment Method:* ${method}\n` +
      (formData.notes ? `*Notes:* ${formData.notes}\n` : '') +
      `\nPlease confirm this order. Thank you! 🙏`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // ── M-Pesa ──
  const handleMpesa = async () => {
    setMpesaStatus('sending');
    try {
      const order = await saveOrder('mpesa');
      setOrderId(order._id);

      const res = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, amount: finalTotal, orderId: order._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'STK push failed');

      setMpesaStatus('waiting');
      toast.success('Check your phone — M-Pesa prompt sent!');

      // Wait 10s before first poll to give user time to see the prompt
      let attempts = 0;
      setTimeout(() => {
        const poll = setInterval(async () => {
          attempts++;
          try {
            const qRes = await fetch('/api/mpesa/query', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ checkoutRequestId: data.checkoutRequestId }),
            });
            const qData = await qRes.json();
            if (qData.ResultCode === '0' || qData.ResultCode === 0) {
              clearInterval(poll);
              setMpesaStatus('success');
              sendWhatsAppConfirmation('M-Pesa ✅ Paid');
              clearCart();
            } else if (qData.ResultCode !== undefined && qData.ResultCode !== '1032' && qData.ResultCode !== 1032) {
              // 1032 = still pending / user hasn't acted yet — keep polling
              // Any other non-zero code = actual failure
              if (qData.ResultCode !== '1' && qData.ResultCode !== 1) {
                clearInterval(poll);
                setMpesaStatus('failed');
              }
            }
          } catch { /* keep polling */ }
          if (attempts >= 20) { // 10s delay + 20 x 5s = ~110s total
            clearInterval(poll);
            setMpesaStatus('failed');
          }
        }, 5000);
      }, 10000);
    } catch (err: any) {
      setMpesaStatus('failed');
      toast.error(err.message || 'M-Pesa failed. Try again.');
    }
  };

  // ── COD ──
  const handleCOD = async () => {
    setIsSubmitting(true);
    try {
      await saveOrder('cod');
      sendWhatsAppConfirmation('Cash on Delivery');
      clearCart();
      navigate('/');
    } catch {
      toast.error('Failed to place order. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Card ──
  const handleCard = async () => {
    setIsSubmitting(true);
    try {
      const cardDigits = formData.cardNumber.replace(/\s/g, '');
      if (cardDigits.length < 16) throw new Error('Invalid card number');
      if (formData.cardExpiry.length < 5) throw new Error('Invalid expiry date');
      if (formData.cardCvv.length < 3) throw new Error('Invalid CVV');
      if (!formData.cardName) throw new Error('Enter cardholder name');

      await saveOrder('card');
      sendWhatsAppConfirmation('Card Payment ✅ Paid');
      clearCart();
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || 'Card payment failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.paymentMethod === 'mpesa') await handleMpesa();
    else if (formData.paymentMethod === 'cod') await handleCOD();
    else if (formData.paymentMethod === 'card') await handleCard();
  };

  // ── M-Pesa status screens ──
  if (mpesaStatus === 'waiting') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Waiting for Payment</h2>
          <p className="text-gray-400 mb-2">An M-Pesa prompt has been sent to</p>
          <p className="text-white font-bold text-lg mb-6">{formData.phone}</p>
          <p className="text-gray-400 text-sm mb-8">Enter your M-Pesa PIN on your phone to complete payment. This page updates automatically.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setMpesaStatus('idle')} className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              Cancel
            </button>
            <button onClick={handleMpesa} className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Resend Prompt
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mpesaStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Payment Confirmed!</h2>
          <p className="text-gray-400 mb-2">Your order has been placed and payment received.</p>
          <p className="text-gray-400 mb-8">A WhatsApp confirmation has been sent to Baberia Fashion.</p>
          <button onClick={() => navigate('/')} className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (mpesaStatus === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Payment Failed</h2>
          <p className="text-gray-400 mb-8">The M-Pesa payment was not completed. Please try again or choose a different payment method.</p>
          <button onClick={() => setMpesaStatus('idle')} className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/cart')} className="flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Cart
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        {/* WhatsApp notice — always visible */}
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-green-300 text-sm">
            After placing your order, you'll be prompted to send an order confirmation message to Baberia Fashion on WhatsApp (<strong>+{WHATSAPP_NUMBER}</strong>). This applies to all payment methods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} id="checkout-form" className="space-y-6">

            {/* Contact */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="0712 345 678" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email (optional)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="john@example.com" />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Location/Area *</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="e.g., Westlands, Kilimani, CBD" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} required rows={3}
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="Street, building, floor..." />
                </div>
              </div>
            </div>

            {/* Payment Method — 3 options only */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
              <div className="space-y-3">

                {/* M-Pesa */}
                <label className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer border transition-colors ${formData.paymentMethod === 'mpesa' ? 'border-green-500 bg-green-500/10' : 'border-white/20 bg-black hover:border-white/40'}`}>
                  <input type="radio" name="paymentMethod" value="mpesa"
                    checked={formData.paymentMethod === 'mpesa'}
                    onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'mpesa' }))}
                    className="w-5 h-5 accent-green-500" />
                  <Smartphone className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">M-Pesa</p>
                    <p className="text-gray-400 text-sm">STK push sent to your phone instantly</p>
                  </div>
                </label>

                {/* COD */}
                <label className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${!codAllowed ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-white/40'} ${formData.paymentMethod === 'cod' ? 'border-blue-500 bg-blue-500/10' : 'border-white/20 bg-black'}`}>
                  <input type="radio" name="paymentMethod" value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    disabled={!codAllowed}
                    onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                    className="w-5 h-5 accent-blue-500" />
                  <Truck className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Cash on Delivery</p>
                    <p className="text-gray-400 text-sm">
                      {codAllowed
                        ? 'Pay cash when your order arrives'
                        : `Only available for orders up to KSh ${COD_LIMIT.toLocaleString()}`}
                    </p>
                  </div>
                </label>

                {/* Card */}
                <label className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer border transition-colors ${formData.paymentMethod === 'card' ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 bg-black hover:border-white/40'}`}>
                  <input type="radio" name="paymentMethod" value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className="w-5 h-5 accent-purple-500" />
                  <CreditCard className="w-6 h-6 text-purple-500 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Card Payment</p>
                    <p className="text-gray-400 text-sm">Visa / Mastercard</p>
                  </div>
                </label>
              </div>

              {/* Card fields */}
              {formData.paymentMethod === 'card' && (
                <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Card Number *</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 tracking-widest"
                      placeholder="1234 5678 9012 3456" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Expiry *</label>
                      <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange}
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                        placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">CVV *</label>
                      <input type="password" name="cardCvv" value={formData.cardCvv} onChange={handleChange}
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                        placeholder="•••" maxLength={4} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Cardholder Name *</label>
                    <input type="text" name="cardName" value={formData.cardName} onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                      placeholder="JOHN DOE" />
                  </div>
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> Your card details are encrypted and secure
                  </p>
                </div>
              )}

              {/* M-Pesa hint */}
              {formData.paymentMethod === 'mpesa' && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">
                    📱 After placing your order, an M-Pesa prompt will be sent to <strong>{formData.phone || 'your phone'}</strong>. Enter your PIN to complete payment.
                  </p>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Notes (optional)</h2>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
                className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                placeholder="Any special instructions..." />
            </div>
          </form>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.name}</p>
                      <p className="text-gray-400 text-xs">Size: {item.size} × {item.quantity}</p>
                    </div>
                    <span className="text-white text-sm font-medium flex-shrink-0">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </span>
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
                  <span className="text-white">{deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-white">KSh {finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting || mpesaStatus === 'sending'}
              className={`w-full flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-colors disabled:cursor-not-allowed ${
                formData.paymentMethod === 'mpesa'
                  ? 'bg-green-500 hover:bg-green-600 text-white disabled:bg-green-900'
                  : formData.paymentMethod === 'card'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-900'
                  : 'bg-white hover:bg-gray-200 text-black disabled:bg-gray-600'
              }`}
            >
              {isSubmitting || mpesaStatus === 'sending' ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : formData.paymentMethod === 'mpesa' ? (
                <><Smartphone className="w-5 h-5" /> Pay with M-Pesa</>
              ) : formData.paymentMethod === 'card' ? (
                <><CreditCard className="w-5 h-5" /> Pay KSh {finalTotal.toLocaleString()}</>
              ) : (
                <><Truck className="w-5 h-5" /> Place Order — Pay on Delivery</>
              )}
            </button>

            {/* WhatsApp reminder */}
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <p className="text-gray-400 text-xs">
                After payment, you'll be asked to send your order details to Baberia on WhatsApp for confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
