// app/sitemap/page.tsx
import Link from "next/link";
import { BusinessDetails } from "@/AppData/BusinessDetails";
import { ChevronRight } from "lucide-react";
import { services, categories } from "@/AppData/TypesOfService";

const Page = () => {
  // Main navigation pages
  const mainPages = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contacts", path: "/contacts" },
  ];

  // Group services by category (excluding "all" for specific grouping)
  const groupedServices = categories
    .filter((cat) => cat.id !== "all") // Exclude "All Services" category
    .map((category) => ({
      ...category,
      services: services.filter((service) => service.category === category.id),
    }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-800 to-gray-900 text-gray-100 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Sitemap
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
            Explore all the pages, services, and social links of Swasha Cars in one place.
          </p>
        </div>

        {/* Sitemap Content */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10">
          {/* Main & Social Links Row - Stack on mobile, side by side on tablet+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Main Pages */}
            <section className="bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 h-full">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
                <span className="inline-block w-1 h-6 bg-primary mr-3 rounded-md"></span>
                Main Pages
              </h2>
              <ul className="space-y-3 sm:space-y-4">
                {mainPages.map((page) => (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="text-primary hover:text-primary/80 transition-colors text-base sm:text-lg flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Social Links */}
            <section className="bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 h-full">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
                <span className="inline-block w-1 h-6 bg-primary mr-3 rounded-md"></span>
                Connect With Us
              </h2>
              <ul className="space-y-3 sm:space-y-4">
                {Object.entries(BusinessDetails.socials).map(([name, { icon, url }]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors text-base sm:text-lg flex items-center gap-2 group"
                      aria-label={`Follow us on ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                    >
                      {icon && <span className="text-white/80 group-hover:text-primary transition-colors">{icon}</span>}
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Services */}
          <section className="bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
              <span className="inline-block w-1 h-6 bg-primary mr-3 rounded-md"></span>
              Our Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {groupedServices.map((category) => (
                <div key={category.id} className="bg-black/30 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-200 mb-3 flex items-center gap-2 pb-2 border-b border-gray-700/50">
                    {category.icon}
                    {category.label}
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {category.services.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={`/services/${service.id}`}
                          className="text-primary hover:text-primary/80 transition-colors text-sm sm:text-base flex items-center gap-2 group"
                        >
                          {service.icon && <span className="text-white/80 group-hover:text-primary transition-colors">{service.icon}</span>}
                          <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 mt-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 text-center flex items-center justify-center">
              <span className="inline-block w-1 h-6 bg-primary mr-3 rounded-md"></span>
              Contact Information
            </h2>
            <div className="text-center text-gray-300 space-y-2">
              <p className="text-sm sm:text-base">
                {BusinessDetails.contacts.address}, {BusinessDetails.contacts.city},{" "}
                {BusinessDetails.contacts.state} {BusinessDetails.contacts.pincode}
              </p>
              <p className="text-sm sm:text-base">
                Phone:{" "}
                <a
                  href={`tel:${BusinessDetails.contacts.phone}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {BusinessDetails.contacts.phone}
                </a>
              </p>
              <p className="text-sm sm:text-base">
                Email:{" "}
                <a
                  href={`mailto:${BusinessDetails.contacts.email}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {BusinessDetails.contacts.email}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Page;