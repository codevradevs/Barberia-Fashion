export default function Terms() {
  const updated = 'January 1, 2025';

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: {updated}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-400 text-sm leading-relaxed">

          <section>
            <h2 className="text-white text-lg font-bold mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Baberia Fashion website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">2. Products & Pricing</h2>
            <p>All prices are listed in Kenyan Shillings (KSh) and are subject to change without notice. We reserve the right to modify or discontinue any product at any time. We make every effort to display accurate product images and descriptions, but we do not guarantee that product colours or details will be exactly as shown on your screen.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">3. Orders & Payment</h2>
            <p>By placing an order, you confirm that all information provided is accurate and complete. We reserve the right to refuse or cancel any order at our discretion. Payment must be completed before orders are dispatched. For Cash on Delivery orders, payment is due upon receipt of goods.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">4. Delivery</h2>
            <p>Delivery times are estimates and not guaranteed. Baberia Fashion is not liable for delays caused by third-party couriers, incorrect delivery addresses, or circumstances beyond our control. Risk of loss and title for items pass to you upon delivery.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">5. Returns & Refunds</h2>
            <p>Returns are accepted within 7 days of delivery for eligible items as described in our Returns Policy. Refunds are processed within 2–5 business days after we receive and inspect the returned item. We reserve the right to refuse returns that do not meet our return conditions.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">6. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and graphics, is the property of Baberia Fashion and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">7. User Conduct</h2>
            <p>You agree not to use our website for any unlawful purpose, to transmit harmful or offensive content, to attempt to gain unauthorised access to our systems, or to interfere with the proper functioning of our services.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Baberia Fashion shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or products. Our total liability shall not exceed the amount paid for the specific order in question.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">9. Privacy</h2>
            <p>Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">10. Changes to Terms</h2>
            <p>We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">11. Governing Law</h2>
            <p>These Terms are governed by the laws of Kenya. Any disputes shall be resolved in the courts of Nairobi, Kenya.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-3">12. Contact</h2>
            <p>For questions about these Terms, contact us at <a href="mailto:info@baberia.co.ke" className="text-white underline">info@baberia.co.ke</a> or via WhatsApp at +254 712 345 678.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
