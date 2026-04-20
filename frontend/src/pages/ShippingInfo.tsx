import { Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react';

const zones = [
  { zone: 'Nairobi CBD & Surroundings', time: 'Same Day (order before 2PM)', fee: 'Free above KSh 5,000 / KSh 300 below' },
  { zone: 'Nairobi Suburbs (Westlands, Kilimani, Karen, etc.)', time: 'Same Day / Next Day', fee: 'Free above KSh 5,000 / KSh 300 below' },
  { zone: 'Nairobi Outskirts (Thika, Kiambu, Machakos)', time: '1–2 Business Days', fee: 'KSh 400–600' },
  { zone: 'Major Towns (Mombasa, Kisumu, Nakuru, Eldoret)', time: '1–3 Business Days', fee: 'KSh 500–800' },
  { zone: 'Rest of Kenya', time: '2–4 Business Days', fee: 'KSh 600–1,000' },
];

export default function ShippingInfo() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Shipping Information</h1>
          <p className="text-gray-400">Fast, reliable delivery across Kenya.</p>
        </div>

        {/* Key info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 rounded-xl p-5 text-center">
            <Truck className="w-8 h-8 text-white mx-auto mb-3" />
            <p className="text-white font-semibold">Free Delivery</p>
            <p className="text-gray-400 text-sm mt-1">On orders over KSh 5,000</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 text-center">
            <Clock className="w-8 h-8 text-white mx-auto mb-3" />
            <p className="text-white font-semibold">Same Day</p>
            <p className="text-gray-400 text-sm mt-1">In Nairobi (order before 2PM)</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 text-center">
            <MapPin className="w-8 h-8 text-white mx-auto mb-3" />
            <p className="text-white font-semibold">Nationwide</p>
            <p className="text-gray-400 text-sm mt-1">We ship to all 47 counties</p>
          </div>
        </div>

        {/* Delivery zones table */}
        <div className="bg-white/5 rounded-xl overflow-hidden mb-10">
          <div className="p-5 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Delivery Zones & Fees</h2>
          </div>
          <div className="divide-y divide-white/10">
            {zones.map((z) => (
              <div key={z.zone} className="p-5">
                <p className="text-white font-medium mb-1">{z.zone}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="flex items-center gap-1 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" /> {z.time}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-sm">
                    <Truck className="w-4 h-4" /> {z.fee}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white/5 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-5">How Delivery Works</h2>
          <div className="space-y-4">
            {[
              { icon: Package, text: 'Place your order and complete payment.' },
              { icon: CheckCircle, text: 'We confirm your order via WhatsApp within 1 hour.' },
              { icon: Truck, text: 'Your order is packed and dispatched same day (Nairobi) or next business day (other regions).' },
              { icon: MapPin, text: 'You receive your order at your delivery address. For Nairobi, our rider will call you before arrival.' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-300 text-sm pt-1">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3 text-gray-400 text-sm">
          <p>• Delivery times are estimates and may vary during peak seasons or public holidays.</p>
          <p>• For bulky orders or special delivery requirements, contact us on WhatsApp.</p>
          <p>• We are not responsible for delays caused by incorrect delivery addresses. Please double-check your address at checkout.</p>
          <p>• International shipping is not currently available.</p>
        </div>
      </div>
    </div>
  );
}
