import { MapPin, Clock, MessageCircle } from 'lucide-react';

const openings = [
  {
    title: 'Social Media Manager',
    type: 'Full-time',
    location: 'Nairobi, Kenya',
    desc: 'Manage our Instagram, TikTok, and WhatsApp channels. Create content, run campaigns, and grow our online community.',
    requirements: ['2+ years social media experience', 'Strong photography/videography skills', 'Deep understanding of streetwear culture', 'Based in Nairobi'],
  },
  {
    title: 'Delivery Rider',
    type: 'Full-time / Part-time',
    location: 'Nairobi, Kenya',
    desc: 'Handle same-day deliveries across Nairobi. Must be reliable, professional, and customer-friendly.',
    requirements: ['Valid motorcycle license', 'Own motorcycle preferred', 'Smartphone with WhatsApp', 'Knowledge of Nairobi routes'],
  },
  {
    title: 'Store Assistant',
    type: 'Full-time',
    location: 'Nairobi, Kenya',
    desc: 'Assist customers in-store, manage inventory, and ensure the store looks premium at all times.',
    requirements: ['Passion for fashion and streetwear', 'Good communication skills', 'Honest and reliable', 'Previous retail experience is a plus'],
  },
  {
    title: 'Brand Ambassador',
    type: 'Freelance / Commission',
    location: 'Nairobi & Major Towns',
    desc: 'Represent Baberia Fashion at events, campuses, and on social media. Earn commission on every sale you drive.',
    requirements: ['Active social media presence', 'Passion for streetwear', 'Self-motivated', 'Any location in Kenya'],
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Join the Baberia Team</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're building Kenya's most loved streetwear brand. If you're passionate about fashion, culture, and hustle — we want you.
          </p>
        </div>

        {/* Why work with us */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { title: 'Culture First', desc: 'We live and breathe streetwear. Work with people who actually care about the culture.' },
            { title: 'Growth Opportunity', desc: 'We\'re growing fast. Early team members grow with the brand.' },
            { title: 'Flexible Work', desc: 'We value results over rigid schedules. Work smart, not just hard.' },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Open positions */}
        <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
        <div className="space-y-6 mb-12">
          {openings.map((job) => (
            <div key={job.title} className="bg-white/5 rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-white text-lg font-bold">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="flex items-center gap-1 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/254712345678?text=${encodeURIComponent(`Hi, I'm interested in the ${job.title} position at Baberia Fashion.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
                >
                  Apply Now
                </a>
              </div>
              <p className="text-gray-400 text-sm mb-4">{job.desc}</p>
              <div>
                <p className="text-white text-sm font-medium mb-2">Requirements:</p>
                <ul className="space-y-1">
                  {job.requirements.map((r) => (
                    <li key={r} className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full flex-shrink-0" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* General application */}
        <div className="bg-white/5 rounded-xl p-6 text-center">
          <h2 className="text-white font-bold text-xl mb-2">Don't see your role?</h2>
          <p className="text-gray-400 text-sm mb-5">We're always looking for talented people. Send us your CV and tell us how you can add value to Baberia Fashion.</p>
          <a
            href="https://wa.me/254712345678?text=Hi%2C%20I'd%20like%20to%20apply%20to%20work%20at%20Baberia%20Fashion."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5" /> Send General Application
          </a>
        </div>
      </div>
    </div>
  );
}
