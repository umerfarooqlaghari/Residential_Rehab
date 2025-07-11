'use client';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight text-center">
            Residential Rehab Inc
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Trusted expertise in South Florida property investment since 1996. 
            We acquire, manage, and hold premium real estate assets along the east coast.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started Today
            </button>
            
            <button
              onClick={() => {
                const element = document.getElementById('about');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Learn More
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-700">Years of Experience</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700">Properties Acquired</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-700">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
