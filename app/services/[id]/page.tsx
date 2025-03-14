import Image from "next/image";
import Link from "next/link";
import { services } from "@/AppData/TypesOfService";
import { notFound } from "next/navigation";
import { Mail, Phone } from "lucide-react";

export default async function ServicesPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params
  const resolvedParams = await params;
  const service = services.find((s) => s.id === Number(resolvedParams.id));
  if (!service) return notFound(); // Show 404 if service not found
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-800 to-gray-900 text-white pb-16">
      <div className="responsive-container pt-24 pb-20 lg:pt-32">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold mt-4">{service.name}</h1>
            <p className="text-gray-300">{service.description}</p>
            
            <div className="flex items-center text-gray-300 mt-2">
              <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-lg font-medium">{service.price}</span>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Features</h2>
          <div className="flex flex-wrap gap-3">
            {service.features.map((feature, index) => (
              <span 
                key={index}
                className="bg-zinc-800 text-gray-200 px-3 py-1 rounded-md text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        {/* Details Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Service Details</h2>
          <p className="text-gray-300 leading-relaxed">
            {service.details}
          </p>
        </div>
        
        {/* Recent Work Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Recent Work</h2>
          {service.recentWork && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {service.recentWork.map((_, index) => (
                <div key={index} className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Work sample {index + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Contact Section */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Interested in this service?</h2>
          <p className="text-gray-300 mb-6">
            Contact us directly to learn more or schedule an appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contacts"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </Link>
            <Link 
              href="tel:7595954546"
              className="flex items-center justify-center gap-2 bg-transparent border border-white hover:bg-white/10 text-white py-2 px-4 rounded-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}