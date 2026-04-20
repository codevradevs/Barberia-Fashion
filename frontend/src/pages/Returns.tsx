import { RefreshCw, AlertCircle, CheckCircle, MessageCircle } from 'lucide-react';

const eligible = [
  'Item received in wrong size',
  'Item received is different from what was ordered',
  'Item is damaged or defective on arrival',
  'Item is unworn, unwashed, with original tags attached',
];

const notEligible = [
  'Items worn, washed, or altered',
  'Items without original tags or packaging',
  'Sale or clearance items (unless defective)',
  'Items returned after 7 days of delivery',
  'Underwear, socks, and swimwear for hygiene reasons',
];

export default function Returns() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Returns & Exchanges</h1>
          <p className="text-gray-400">We want you to love your order. If something's not right, we'll fix it.</p>
        </div>

        {/* Policy summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 rounded-xl p-5 text-center">
            <RefreshCw className="w-8 h-8 text-white mx-auto mb-3" />
            <p className="text-white font-semibold">7-Day Returns</p>
            <p className="text-gray-400 text-sm mt-1">From date of delivery</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 text-center">
            <CheckCircle className="w-8 h-8 text-white mx-auto mb-3" />
            <p className="text-white font-semibold">Free Exchanges</p>
            <p className="text-gray-400 text-sm mt-1">Size swaps at no cost</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 text-center">
            <MessageCircle className="w-8 h-8 text-white mx-auto mb-3" />
            <p className="text-white font-semibold">WhatsApp First</p>
            <p className="text-gray-400 text-sm mt-1">Start your return via chat</p>
          </div>
        </div>

        {/* Eligible / Not eligible */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" /> Eligible for Return
            </h2>
            <ul className="space-y-2">
              {eligible.map((item) => (
                <li key={item} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" /> Not Eligible
            </h2>
            <ul className="space-y-2">
              {notEligible.map((item) => (
                <li key={item} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How to return */}
        <div className="bg-white/5 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-5">How to Start a Return or Exchange</h2>
          <div className="space-y-5">
            {[
              { step: '01', title: 'Contact Us on WhatsApp', desc: 'Message us on +254 712 345 678 within 7 days of receiving your order. Include your order number and photos of the item.' },
              { step: '02', title: 'We Review Your Request', desc: 'Our team will review your request within 24 hours and confirm if it qualifies for a return or exchange.' },
              { step: '03', title: 'Send the Item Back', desc: 'We\'ll arrange a pickup or provide a drop-off location. Items must be in original condition with tags attached.' },
              { step: '04', title: 'Refund or Exchange Processed', desc: 'Once we receive and inspect the item, your exchange is dispatched or refund is processed within 2–3 business days.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <span className="text-3xl font-bold text-white/20 flex-shrink-0 w-10">{s.step}</span>
                <div>
                  <p className="text-white font-medium">{s.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund info */}
        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-3">Refund Methods</h2>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>• <span className="text-white">M-Pesa:</span> Refunded to your M-Pesa number within 2–3 business days.</p>
            <p>• <span className="text-white">Card:</span> Refunded to your original card within 5–7 business days.</p>
            <p>• <span className="text-white">Cash on Delivery:</span> Refunded via M-Pesa.</p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/254712345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5" /> Start a Return on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
