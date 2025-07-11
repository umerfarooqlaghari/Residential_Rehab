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
              For over 25 years, Presidential Real Estate Holdings has been a cornerstone 
              of South Florida's real estate market. Since 1996, we have successfully 
              acquired hundreds of homes along South Florida's prestigious east coast, 
              building a reputation for excellence and reliability.
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
                  <span className="text-2xl font-bold">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Properties Acquired</span>
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
                To provide property owners with fast, fair, and reliable real estate 
                solutions while building a portfolio of premium properties that 
                contribute to South Florida's growth and development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
