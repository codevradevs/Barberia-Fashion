import { useState } from 'react';

const tabs = ['Sneakers', 'Clothing', 'Accessories'];

const sneakerSizes = [
  { eu: '36', uk: '3.5', us: '4', cm: '22.5' },
  { eu: '37', uk: '4', us: '5', cm: '23' },
  { eu: '38', uk: '5', us: '6', cm: '24' },
  { eu: '39', uk: '6', us: '7', cm: '24.5' },
  { eu: '40', uk: '6.5', us: '7.5', cm: '25' },
  { eu: '41', uk: '7', us: '8', cm: '25.5' },
  { eu: '42', uk: '8', us: '9', cm: '26.5' },
  { eu: '43', uk: '9', us: '10', cm: '27' },
  { eu: '44', uk: '9.5', us: '10.5', cm: '27.5' },
  { eu: '45', uk: '10.5', us: '11.5', cm: '28.5' },
  { eu: '46', uk: '11', us: '12', cm: '29' },
];

const clothingSizes = [
  { size: 'XS', chest: '81–86', waist: '66–71', hips: '86–91' },
  { size: 'S', chest: '86–91', waist: '71–76', hips: '91–96' },
  { size: 'M', chest: '96–101', waist: '81–86', hips: '101–106' },
  { size: 'L', chest: '106–111', waist: '91–96', hips: '111–116' },
  { size: 'XL', chest: '116–121', waist: '101–106', hips: '121–126' },
  { size: '2XL', chest: '126–131', waist: '111–116', hips: '131–136' },
];

const jeansSizes = [
  { waist: '28"', hip: '36"', inseam: '30"' },
  { waist: '30"', hip: '38"', inseam: '30"' },
  { waist: '32"', hip: '40"', inseam: '32"' },
  { waist: '34"', hip: '42"', inseam: '32"' },
  { waist: '36"', hip: '44"', inseam: '32"' },
  { waist: '38"', hip: '46"', inseam: '34"' },
];

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState('Sneakers');

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Size Guide</h1>
          <p className="text-gray-400">Find your perfect fit. All measurements are in centimetres unless stated.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sneakers */}
        {activeTab === 'Sneakers' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-white/10">
                <h2 className="text-white font-bold">Sneaker Size Chart</h2>
                <p className="text-gray-400 text-sm mt-1">Sizes apply to both men's and women's sneakers.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="p-4 text-left">EU</th>
                      <th className="p-4 text-left">UK</th>
                      <th className="p-4 text-left">US</th>
                      <th className="p-4 text-left">Foot Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {sneakerSizes.map((s) => (
                      <tr key={s.eu} className="hover:bg-white/5">
                        <td className="p-4 text-white font-medium">{s.eu}</td>
                        <td className="p-4 text-gray-300">{s.uk}</td>
                        <td className="p-4 text-gray-300">{s.us}</td>
                        <td className="p-4 text-gray-300">{s.cm} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3">How to Measure Your Foot</h3>
              <ol className="space-y-2 text-gray-400 text-sm list-decimal list-inside">
                <li>Place your foot on a piece of paper and trace around it.</li>
                <li>Measure the longest distance from heel to toe.</li>
                <li>Match your measurement to the chart above.</li>
                <li>If between sizes, we recommend sizing up.</li>
              </ol>
            </div>
          </div>
        )}

        {/* Clothing */}
        {activeTab === 'Clothing' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-white/10">
                <h2 className="text-white font-bold">Tops, Hoodies & Jackets</h2>
                <p className="text-gray-400 text-sm mt-1">Measurements in centimetres.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="p-4 text-left">Size</th>
                      <th className="p-4 text-left">Chest (cm)</th>
                      <th className="p-4 text-left">Waist (cm)</th>
                      <th className="p-4 text-left">Hips (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {clothingSizes.map((s) => (
                      <tr key={s.size} className="hover:bg-white/5">
                        <td className="p-4 text-white font-medium">{s.size}</td>
                        <td className="p-4 text-gray-300">{s.chest}</td>
                        <td className="p-4 text-gray-300">{s.waist}</td>
                        <td className="p-4 text-gray-300">{s.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-white/10">
                <h2 className="text-white font-bold">Jeans & Cargo Pants</h2>
                <p className="text-gray-400 text-sm mt-1">Waist measurements in inches.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="p-4 text-left">Waist</th>
                      <th className="p-4 text-left">Hip</th>
                      <th className="p-4 text-left">Inseam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {jeansSizes.map((s) => (
                      <tr key={s.waist} className="hover:bg-white/5">
                        <td className="p-4 text-white font-medium">{s.waist}</td>
                        <td className="p-4 text-gray-300">{s.hip}</td>
                        <td className="p-4 text-gray-300">{s.inseam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3">Fit Guide</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p><span className="text-white">Oversized fit:</span> Size up 1–2 sizes from your regular size.</p>
                <p><span className="text-white">Regular fit:</span> Choose your standard size.</p>
                <p><span className="text-white">Slim fit:</span> Size up if between sizes.</p>
              </div>
            </div>
          </div>
        )}

        {/* Accessories */}
        {activeTab === 'Accessories' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-white font-bold mb-4">Caps & Beanies</h2>
              <p className="text-gray-400 text-sm mb-4">Most caps and beanies are one-size-fits-all with adjustable straps or stretch fabric.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="p-4 text-left">Size</th>
                      <th className="p-4 text-left">Head Circumference (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[{ s: 'S/M', c: '54–57' }, { s: 'L/XL', c: '58–61' }, { s: 'One Size', c: '54–61 (adjustable)' }].map((r) => (
                      <tr key={r.s} className="hover:bg-white/5">
                        <td className="p-4 text-white font-medium">{r.s}</td>
                        <td className="p-4 text-gray-300">{r.c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-white font-bold mb-4">Rings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="p-4 text-left">Ring Size</th>
                      <th className="p-4 text-left">Diameter (mm)</th>
                      <th className="p-4 text-left">Circumference (mm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { s: '5', d: '15.7', c: '49.3' },
                      { s: '6', d: '16.5', c: '51.9' },
                      { s: '7', d: '17.3', c: '54.4' },
                      { s: '8', d: '18.2', c: '57.2' },
                      { s: '9', d: '19.0', c: '59.7' },
                      { s: '10', d: '19.8', c: '62.1' },
                    ].map((r) => (
                      <tr key={r.s} className="hover:bg-white/5">
                        <td className="p-4 text-white font-medium">{r.s}</td>
                        <td className="p-4 text-gray-300">{r.d} mm</td>
                        <td className="p-4 text-gray-300">{r.c} mm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2">Belts</h3>
              <p className="text-gray-400 text-sm">Belt size = waist measurement + 5cm. Example: 85cm waist → order 90cm belt.</p>
            </div>
          </div>
        )}

        <div className="mt-10 p-5 bg-white/5 rounded-xl text-center">
          <p className="text-gray-400 text-sm">Not sure about your size? <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer" className="text-white underline">Chat with us on WhatsApp</a> and we'll help you find the perfect fit.</p>
        </div>
      </div>
    </div>
  );
}
