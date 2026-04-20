import { Target, Users, TrendingUp, Award } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Authenticity First',
    description: 'We guarantee 100% authentic products. Every item is carefully sourced and verified.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built by Kenyans for Kenyans. We understand the local streetwear culture.',
  },
  {
    icon: TrendingUp,
    title: 'Always Evolving',
    description: 'We stay ahead of trends to bring you the latest drops and exclusive releases.',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'Premium products at competitive prices. Quality is never compromised.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-gray-400">Baberia</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Kenya's premier destination for authentic streetwear, sneakers, and urban fashion. 
            We're more than a store – we're a movement.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Baberia Fashion was born from a simple idea: to bring authentic streetwear and
                  premium sneakers to the Kenyan market. What started as a small operation in
                  Nairobi has grown into Kenya's most trusted destination for urban fashion.
                </p>
                <p>
                  We understand the Kenyan youth culture – the love for drip, the passion for
                  sneakers, and the desire to express individuality through fashion. That's why
                  we curate our collection carefully, ensuring every piece resonates with our
                  community.
                </p>
                <p>
                  From Air Force 1s to the latest Yeezy drops, from Essentials hoodies to
                  local Kenyan brands, we've got you covered. We're not just selling clothes
                  and shoes – we're building a culture.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/lifestyle/about-history-01.jpg"
                alt="Baberia Story"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="/images/lifestyle/about-mission-01.jpg"
                alt="Our Mission"
                className="rounded-2xl w-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Our mission is simple: Fashion for Everyone. We believe premium streetwear
                  shouldn't be reserved for the few. Every Kenyan youth deserves access to
                  authentic, quality drip at fair prices.
                </p>
                <p>
                  We bridge the gap between global streetwear culture and the Kenyan market,
                  bringing you the latest drops alongside locally crafted pieces that celebrate
                  our identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Team</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Behind Baberia Fashion is a passionate team of Kenyan creatives, sneakerheads,
                  and fashion lovers. We live and breathe streetwear culture every single day.
                </p>
                <p>
                  From sourcing the freshest pieces to delivering them to your door, every step
                  is handled with care and dedication to quality.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/lifestyle/about-team-01.jpg"
                alt="Our Team"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white/5 rounded-xl p-6 text-center">
                <value.icon className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white mb-2">10K+</p>
              <p className="text-gray-400">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">500+</p>
              <p className="text-gray-400">Products</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">50+</p>
              <p className="text-gray-400">Brands</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">Same Day</p>
              <p className="text-gray-400">Delivery in Nairobi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
