'use client';

export default function Services() {
  const service = {
    title: "Property Acquisitions",
    description: "We purchase residential and commercial properties directly from owners, offering fast closings and competitive prices.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    features: ["Quick cash offers", "No repairs needed", "Fast 7-14 day closings", "No realtor fees"]
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          we buy houses for cash fast           </p>
        </div>

        {/* Main Service Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white p-12 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-8">
              <div className="text-blue-600 mb-6 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold text-blue-900 mb-6">{service.title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">{service.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {service.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center text-gray-700 bg-blue-50 p-4 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Sell Your Property?</h3>
          <p className="text-xl mb-6 opacity-90">
            Get a fair cash offer for your property today. No repairs, no fees, no hassle.
            We make selling your home fast and stress-free.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Get Your Cash Offer Now
          </button>
        </div>
      </div>
    </section>
  );
}
