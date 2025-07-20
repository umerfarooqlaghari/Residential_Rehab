'use client';

export default function Situations() {
  return (
    <section id="situations" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Situations We Help Resolve</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide solutions for homeowners facing a variety of challenges. If you relate to any of these, we can help:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-blue-800 font-semibold text-lg">Need to sell fast</div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-blue-800 font-semibold text-lg">Major repairs</div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-blue-800 font-semibold text-lg">Tired landlord</div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-blue-800 font-semibold text-lg">Divorce</div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-blue-800 font-semibold text-lg">Inheritance</div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-blue-800 font-semibold text-lg">Vacancy</div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-blue-800 font-semibold text-lg">Problem tenants</div>
        </div>
      </div>
    </section>
  );
}
