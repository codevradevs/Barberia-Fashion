import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Payments',
    items: [
      {
        q: 'How do I place an order?',
        a: 'Browse our shop, select your size, add to cart, and proceed to checkout. You can pay via M-Pesa, Cash on Delivery, or Card. After payment, you\'ll be prompted to send an order confirmation on WhatsApp.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept M-Pesa (STK push), Cash on Delivery (orders up to KSh 50,000), and Card payments (Visa/Mastercard).',
      },
      {
        q: 'Can I order via WhatsApp?',
        a: 'Yes! After placing your order through the website, a WhatsApp message with your full order details is sent to us for confirmation. You can also reach us directly on +254 712 345 678.',
      },
      {
        q: 'How long does it take to confirm my order?',
        a: 'We confirm all orders within 1 hour during business hours (9AM – 8PM). WhatsApp orders are confirmed even faster.',
      },
    ],
  },
  {
    category: 'Delivery & Shipping',
    items: [
      {
        q: 'Do you deliver in Nairobi?',
        a: 'Yes! We offer same-day delivery within Nairobi for orders placed before 2PM. Delivery fee is KSh 300 for orders under KSh 5,000. Free delivery on orders above KSh 5,000.',
      },
      {
        q: 'Do you ship outside Nairobi?',
        a: 'Yes, we ship nationwide via courier. Delivery takes 1–3 business days depending on your location. Shipping costs vary by county.',
      },
      {
        q: 'How do I track my order?',
        a: 'Once your order is shipped, we\'ll send you a tracking number via WhatsApp or SMS. You can also contact us directly for updates.',
      },
    ],
  },
  {
    category: 'Products & Authenticity',
    items: [
      {
        q: 'Are your products authentic?',
        a: 'We stock a mix of 100% authentic originals and high-quality replicas. Each product listing clearly indicates whether it is an original or a premium quality replica.',
      },
      {
        q: 'How do I know my size?',
        a: 'Check our Size Guide page for detailed sizing charts for sneakers, clothing, and accessories. When in doubt, message us on WhatsApp and we\'ll help you pick the right size.',
      },
      {
        q: 'What if the product I want is out of stock?',
        a: 'Contact us on WhatsApp and we\'ll let you know when it\'s back in stock or help you find a similar alternative.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      {
        q: 'Can I return a product?',
        a: 'Yes. We accept returns within 7 days of delivery for items in original, unworn condition with tags attached. See our Returns page for full details.',
      },
      {
        q: 'Can I exchange for a different size?',
        a: 'Absolutely. Size exchanges are free within 7 days. Contact us on WhatsApp with your order number and the size you need.',
      },
      {
        q: 'What if I receive a wrong or damaged item?',
        a: 'We\'re sorry! Contact us immediately on WhatsApp with photos of the item. We\'ll arrange a replacement or full refund at no cost to you.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-medium pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQs() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400">Everything you need to know about Baberia Fashion.</p>
        </div>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-lg font-bold text-white mb-4 pb-2 border-b border-white/10">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white/5 rounded-xl text-center">
          <p className="text-white font-semibold mb-2">Still have questions?</p>
          <p className="text-gray-400 text-sm mb-4">We're always happy to help. Reach us on WhatsApp for the fastest response.</p>
          <a
            href="https://wa.me/254712345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
