'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How fast can you close?",
      answer: "We can close in as little as 7 days or on your timeline."
    },
    {
      question: "Do I need to clean or make repairs?",
      answer: "No. We buy houses as-is—no cleaning, no fixing."
    },
    {
      question: "Will I have to pay any fees or commissions?",
      answer: "No. We cover all closing costs and there are zero agent fees."
    },
    {
      question: "How do you determine your offer price?",
      answer: "We look at the condition, location, and recent sales to make a fair cash offer."
    },
    {
      question: "What types of houses do you buy?",
      answer: "We buy houses in any condition—vacant, inherited, damaged, behind on payments, or with bad tenants."
    },
    {
      question: "What if I'm in foreclosure or behind on mortgage payments?",
      answer: "We can work with you and the bank to stop foreclosure and buy your property fast."
    },
    {
      question: "Can I sell if I live out of state?",
      answer: "Yes. We handle everything remotely and can close without you being here."
    },
    {
      question: "Is there any obligation if I get an offer?",
      answer: "No obligation at all. Our offer is free and you decide if it's right for you."
    },
    {
      question: "What if I have tenants?",
      answer: "We'll buy with tenants in place or help resolve any issues."
    },
    {
      question: "How do I get started?",
      answer: "Just fill out the form or call us—our team will take it from there."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help answer your questions and make the process as smooth as possible for you.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-blue-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-blue-600 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-lg mb-6 opacity-90">
              We understand that selling your home is a big decision. Our team is here to provide 
              personalized guidance and support every step of the way.
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
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
