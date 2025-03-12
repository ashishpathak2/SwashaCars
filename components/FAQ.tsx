"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQs: FAQItem[] = [
  {
    question: "What types of vehicles do you service?",
    answer:
      "We service all makes and models, including domestic, import, luxury, and commercial vehicles. Our technicians are certified to work on various vehicle types and brands, ensuring top-quality car care.",
  },
  {
    question: "Do you provide a warranty on your services?",
    answer:
      "Yes, we offer a comprehensive warranty on all our repair and maintenance services. Our standard warranty covers parts and labor for 12 months or 12,000 miles, whichever comes first, giving you peace of mind.",
  },
  {
    question: "How often should I service my vehicle?",
    answer:
      "We recommend following your vehicle manufacturer's recommended service intervals, typically every 5,000 to 7,500 miles for oil changes and basic maintenance. This can vary based on driving conditions and vehicle type—consult our experts for personalized advice.",
  },
  {
    question: "Can you help with vehicle documentation and registration?",
    answer:
      "Absolutely! Our documentation services include assistance with vehicle registration, title transfers, insurance paperwork, and other vehicle-related documentation needs to simplify the process for you.",
  },
  {
    question: "Do I need an appointment for services?",
    answer:
      "While we accept walk-ins for minor services, we recommend scheduling an appointment to ensure prompt service and minimize wait times, especially for major repairs or maintenance like denting or ceramic coating.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, cash, direct bank transfers, and offer financing options for larger service needs. We also work with most insurance companies for covered repairs, making payments seamless.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white" aria-labelledby="faq-heading">
      <div className="responsive-container">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Got Questions?
            </span>
            <h2
              id="faq-heading"
              className="text-3xl font-bold mb-6 flex items-center justify-center"
            >
              <HelpCircle className="mr-2 h-8 w-8 text-primary" aria-hidden="true" />
              Frequently Asked Questions
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Find answers to common questions about our car services. For further assistance,{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact our support team
              </Link>
              .
            </p>
          </header>

          <div className="space-y-4" role="region" aria-label="FAQ List">
            {FAQs.map((faq, index) => (
              <article key={index} className="glass-card rounded-xl overflow-hidden transition-all duration-300">
                <h3>
                  <button
                    className="w-full p-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-xl font-bold">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-primary" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary" aria-hidden="true" />
                    )}
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  role="region"
                  aria-hidden={openIndex !== index}
                >
                  <div className="p-6 pt-0 text-foreground/80">{faq.answer}</div>
                </div>
              </article>
            ))}
          </div>

          <footer className="mt-12 text-center">
            <div className="glass-card rounded-xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
              <p className="text-foreground/70 mb-6">
                Our team is ready to assist you with any inquiries about our car repair and maintenance services.
              </p>
              <Link
                href="/contact"
                className="btn-hover-effect inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Contact Swasha Cars Support"
              >
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                Contact Support
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default FAQ;