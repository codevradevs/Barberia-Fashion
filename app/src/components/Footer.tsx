import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, MessageCircle } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'Sneakers', path: '/shop/sneakers' },
    { name: 'Hoodies', path: '/shop/hoodies' },
    { name: 'T-Shirts', path: '/shop/tshirts' },
    { name: 'Accessories', path: '/shop/accessories' },
    { name: 'New Arrivals', path: '/shop?new=true' },
  ],
  support: [
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Shipping Info', path: '/shipping' },
    { name: 'Returns', path: '/returns' },
    { name: 'Size Guide', path: '/size-guide' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com' },
  { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/254712345678' },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white">
              BABERIA
            </Link>
            <p className="mt-4 text-gray-400 text-sm max-w-sm">
              Kenya's premier destination for authentic streetwear, sneakers, and urban fashion. 
              Premium drip for the modern Kenyan youth.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Baberia Fashion. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-gray-500 text-sm">Made in Kenya</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-500 text-sm">Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
