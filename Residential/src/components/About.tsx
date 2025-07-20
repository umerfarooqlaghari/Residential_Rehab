'use client';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">About Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building trust through decades of successful real estate investments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-blue-900">
              Our Story Since 1996
            </h3>
            
            <p className="text-lg text-gray-700 leading-relaxed">
For nearly three decades, Residential Rehab Inc has proudly served the homeowners of South Florida with care, integrity, and dedication. Since 1996, we've helped hundreds of families transition through life&apos;s changes offering solutions that are fast, fair, and respectful of what home truly means.

Rooted in the heart of South Florida&apos;s east coast, our deep local knowledge and reliable track record have made us a trusted partner for those looking to sell with peace of mind — and for those looking to invest in the future of our thriving communities.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Our deep understanding of the local market, combined with our proven track 
              record, makes us the trusted choice for property owners looking to sell 
              quickly and investors seeking premium opportunities.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Why Choose Us?</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Decades of proven experience in South Florida
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Hundreds of successful property acquisitions
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fast, reliable, and transparent transactions
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Deep local market knowledge and connections
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-lg">
              <h4 className="text-2xl font-bold mb-4">Our Track Record</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Years in Business</span>
                  <span className="text-2xl font-bold">30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Home Owners Helped</span>
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Market Focus</span>
                  <span className="text-lg font-semibold">South FL East Coast</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Founded</span>
                  <span className="text-2xl font-bold">1996</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Our Mission</h4>
              <p className="text-gray-700">
To support homeowners with fast, fair, and trustworthy real estate solutions whether you're navigating change, seeking peace of mind, or ready for a fresh start. At the same time, we are committed to strengthening South Florida communities by investing in quality properties that foster long-term growth and value.


              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
