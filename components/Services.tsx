"use client";
import React, { useEffect, useRef } from "react";

const services = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    title: "Mechanical Repairs",
    description:
      "Complete diagnostics and repairs for all vehicle systems including engine, transmission, brakes, and suspension.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 4.5a7.5 7.5 0 0 0-7.5 7.5c0 7.5 7.5 10.5 7.5 10.5s7.5-3 7.5-10.5a7.5 7.5 0 0 0-7.5-7.5Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    title: "Routine Maintenance",
    description:
      "Regular service packages including oil changes, filter replacements, and comprehensive vehicle inspections.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="12" x="2" y="6" rx="2"></rect>
        <path d="M12 12h.01"></path>
        <path d="M17 12h.01"></path>
        <path d="M7 12h.01"></path>
      </svg>
    ),
    title: "Electronic Systems",
    description:
      "Diagnostics and repair of electrical components, computer systems, and modern vehicle electronics.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: "Documentation Services",
    description:
      "Comprehensive assistance with vehicle registration, title transfers, insurance paperwork, and legal documentation.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
      </svg>
    ),
    title: "Detailing & Cleaning",
    description:
      "Professional interior and exterior detailing, paint protection, ceramic coating, and appearance restoration.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
        <line x1="12" x2="12.01" y1="18" y2="18"></line>
      </svg>
    ),
    title: "Digital Diagnostics",
    description:
      "Advanced computer diagnostics to identify and resolve complex vehicle issues with precision.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
      </svg>
    ),
    title: "Financing Solutions",
    description:
      "Flexible financing options for service repairs, maintenance packages, and extended warranties.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1a2 2 0 0 0-2-2v-4a2 2 0 0 0 2-2v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1Z"></path>
        <path d="M22 8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v1a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-1a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1Z"></path>
      </svg>
    ),
    title: "Parts & Accessories",
    description:
      "Quality OEM and aftermarket parts, performance upgrades, and custom accessories for all vehicle makes and models.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" x2="12" y1="8" y2="12"></line>
        <line x1="12" x2="12.01" y1="16" y2="16"></line>
      </svg>
    ),
    title: "Emergency Services",
    description:
      "Roadside assistance, towing, jump-starts, and emergency repairs to get you back on the road quickly.",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = [titleRef.current, ...serviceRefs.current];

      elements.forEach((el) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;

        if (isVisible) {
          el.classList.add("show");
        }
      });
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div
        ref={titleRef}
        className="responsive-container max-w-2xl mx-auto text-center mb-16 animate-on-scroll"
      >
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          Our Services
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Comprehensive Automotive Services
        </h2>
        <p className="text-foreground/70">
          We offer a complete range of automotive services to meet all your
          vehicle needs. From routine maintenance to major repairs and
          everything in between.
        </p>
      </div>

      <div className="responsive-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {serviceRefs.current[index] = el}}              
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-foreground/70">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-foreground/70 mb-6">
                Our team of certified technicians is ready to create a tailored
                service experience that meets your specific requirements.
                Whether you need specialized repairs or custom maintenance
                plans, we're here to help.
              </p>
              <a
                href="/contact"
                className="btn-hover-effect inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Schedule a Consultation
              </a>
            </div>
            <div className="hidden md:block p-6">
              <img
                src="https://img.freepik.com/premium-vector/dealer-manager-consulting-car-showroom-client-potential-buyer-automobile-rent-leasing-buying-man-customer-choosing-transport-friendly-salesman-offering-services_575670-1002.jpg"
                alt="Customer consultation"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
