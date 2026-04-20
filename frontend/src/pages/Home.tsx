import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Truck, Shield, MessageCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { featuredProducts, newArrivals } from '@/data/products';

const features = [
  { icon: Zap, title: 'Fast Delivery', description: 'Same-day delivery in Nairobi' },
  { icon: Shield, title: 'Authentic Products', description: '100% genuine guaranteed' },
  { icon: Truck, title: 'Free Shipping', description: 'On orders over KSh 5,000' },
  { icon: MessageCircle, title: 'WhatsApp Support', description: 'Quick response guaranteed' },
];

const categories = [
  { name: 'Sneakers', image: '/images/sneakers/kicks-airforce1-triple-white-01.jpg', path: '/shop/sneakers' },
  { name: 'Hoodies', image: '/images/clothes/clothes-hoodie-essentials-fog-cream-01.jpg', path: '/shop/hoodies' },
  { name: 'T-Shirts', image: '/images/clothes/clothes-tshirt-nad-graphic-mandela-01.jpg', path: '/shop/tshirts' },
  { name: 'Accessories', image: '/images/accessories/accessories-cap-new-era-59fifty-fitted-01.jpg', path: '/shop/accessories' },
];

const howItWorks = [
  { step: '01', title: 'Browse Products', description: 'Explore our curated collection of sneakers, clothing and accessories.', image: '/images/lifestyle/howitworks-step1.jpg' },
  { step: '02', title: 'Add to Cart', description: 'Select your size, add to cart or order directly via WhatsApp.', image: '/images/lifestyle/howitworks-step2.jpg' },
  { step: '03', title: 'Fast Delivery', description: 'Same-day delivery in Nairobi. Nationwide shipping available.', image: '/images/lifestyle/howitworks-step3.jpg' },
];

const testimonials = [
  { name: 'Brian M.', location: 'Westlands, Nairobi', quote: 'Got my Jordan 4s in less than 3 hours. The quality is unmatched. Baberia is the real deal.', image: '/images/lifestyle/testimonials-01.jpg' },
  { name: 'Amina K.', location: 'Kilimani, Nairobi', quote: 'Ordered a full fit — hoodie, cargos and cap. Everything was exactly as pictured. Will definitely order again!', image: '/images/lifestyle/testimonials-02.jpg' },
];

const lifestyleItems = [
  { title: 'Kicks', description: 'Step into the freshest sneakers in Nairobi.', image: '/images/lifestyle/lifestyle-kicks-01.jpg', path: '/shop/sneakers' },
  { title: 'Clothing', description: 'Streetwear built for the Kenyan urban lifestyle.', image: '/images/lifestyle/lifestyle-clothes-01.jpg', path: '/shop/clothing' },
  { title: 'Accessories', description: 'Complete your fit with the right accessories.', image: '/images/lifestyle/lifestyle-accessories-01.jpg', path: '/shop/accessories' },
];

export default function Home() {
  const featured = featuredProducts.slice(0, 8);
  const arrivals = newArrivals.slice(0, 8);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/lifestyle/landing-hero-01.jpg"
            alt="Baberia Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
              Kenya's Premier Streetwear Destination
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Premium Drip for the <span className="text-gray-400">Modern Youth</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Authentic sneakers, streetwear, and accessories. Curated for the Kenyan urban lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/shop/sneakers"
                className="inline-flex items-center px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                View Sneakers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Bar ── */}
      <section className="py-12 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-start space-x-4">
                <f.icon className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <Link to="/shop" className="text-gray-400 hover:text-white flex items-center">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">New Arrivals</h2>
            <Link to="/shop?new=true" className="text-gray-400 hover:text-white flex items-center">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {arrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Lifestyle Section ── */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Shop the Lifestyle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lifestyleItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="group relative h-80 rounded-xl overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                  <span className="inline-flex items-center text-white text-sm mt-3 font-medium">
                    Shop Now <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">How It Works</h2>
          <p className="text-gray-400 text-center mb-12">Order your drip in 3 simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative h-56 rounded-xl overflow-hidden mb-6">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <span className="absolute top-4 left-4 text-5xl font-bold text-white/20">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden h-64">
            <img
              src="/images/lifestyle/promo-banner-01.jpg"
              alt="Promo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Limited Time — 20% Off New Kicks
              </h2>
              <p className="text-gray-300 mb-6">Use code BABERIA20 at checkout</p>
              <Link
                to="/shop/sneakers"
                className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Shop Kicks <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">What Our Customers Say</h2>
          <p className="text-gray-400 text-center mb-12">Real people. Real drip. Real reviews.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/5 rounded-xl p-6 flex gap-6 items-start">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-gray-300 italic mb-4">"{t.quote}"</p>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/images/lifestyle/promo-banner-02.jpg"
              alt="Join Baberia"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative py-20 px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Join the Baberia Family
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Get exclusive access to new drops, special offers, and behind-the-scenes content.
                Follow us on Instagram and WhatsApp for the latest updates.
              </p>
              <a
                href="https://wa.me/254712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
