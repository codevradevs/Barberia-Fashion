export default function Privacy() {
  const updated = 'January 1, 2025';

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: {updated}</p>
        </div>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">

          <section>
            <h2 className="text-white text-lg font-bold mb-3">1. Information We Collect</h2>
            <p className="mb-3">When you use Baberia Fashion, we may collect the following information:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><span className="text-white">Personal Information:</span> Name, phone number, email address, and delivery address when you place an order.</li>
              <li><span className="text-white">Payment Information:</span> M-Pesa transaction references or card payment details (processed securely — we do not store full card numbers).</li>
              <li><span className="text-white">Usage Data:</span> Pages visited, products viewed, and browser/device information for improving our services.</li>
              <li><span className="text-white">Communications:</span> Messages sent to us via WhatsApp, email, or our contact form.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">2. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To process and fulfil your orders.</li>
              <li>To communicate with you about your order status via WhatsApp or SMS.</li>
              <li>To send you promotional offers and new arrivals (only if you opt in).</li>
              <li>To improve our website and customer experience.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">3. Information Sharing</h2>
            <p className="mb-3">We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><span className="text-white">Delivery Partners:</span> Your name, phone, and address are shared with our delivery riders to fulfil your order.</li>
              <li><span className="text-white">Payment Processors:</span> M-Pesa (Safaricom) and card payment processors to complete transactions.</li>
              <li><span className="text-white">Legal Requirements:</span> When required by law or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">4. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">5. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Order information is retained for a minimum of 3 years for accounting and legal purposes.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">6. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information (subject to legal requirements).</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us via WhatsApp or email.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">7. Cookies</h2>
            <p>Our website uses cookies to improve your browsing experience, remember your cart, and analyse site traffic. You can disable cookies in your browser settings, but this may affect some website functionality.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">8. WhatsApp Communications</h2>
            <p>When you send us a WhatsApp message or when we send you order confirmations via WhatsApp, your messages are subject to WhatsApp's own privacy policy. We use WhatsApp solely for order communication and customer support.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">10. Contact Us</h2>
            <p>For privacy-related questions or requests, contact us at:</p>
            <div className="mt-3 space-y-1">
              <p>📧 <a href="mailto:info@baberia.co.ke" className="text-white underline">info@baberia.co.ke</a></p>
              <p>📱 <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer" className="text-white underline">+254 712 345 678 (WhatsApp)</a></p>
              <p>📍 123 Kimathi Street, Nairobi, Kenya</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
