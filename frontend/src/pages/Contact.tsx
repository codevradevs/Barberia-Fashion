import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Send } from 'lucide-react';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Baberia Fashion Store', '123 Kimathi Street', 'Nairobi, Kenya'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+254 712 345 678', '+254 723 456 789'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@baberia.co.ke', 'support@baberia.co.ke'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 11:00 AM - 6:00 PM'],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
        <div className="text-center mb-12">
          <div className="relative h-48 rounded-2xl overflow-hidden mb-8">
            <img
              src="/images/lifestyle/contact-team.jpg"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-white mb-2">Get in Touch</h1>
              <p className="text-gray-300">We'd love to hear from you</p>
            </div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question about a product, order, or just want to say hi?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Your Name *</label>
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
                    <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                      placeholder="+254 712 345 678"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    >
                      <option value="">Select subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div key={info.title} className="bg-white/5 rounded-xl p-6">
                <info.icon className="w-8 h-8 text-white mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-400">{detail}</p>
                ))}
              </div>
            ))}

            {/* Quick Contact Buttons */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/254712345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <a
                  href="https://instagram.com/baberia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  DM on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
