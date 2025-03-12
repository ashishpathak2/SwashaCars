import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/FAQ";
// import BrandCarousel from "@/components/BrandCarousel";
import { 
  Calendar, 
  CheckCircle,
  Clock,
  Wrench,
  FileText,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const ServiceProcess = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Service Process</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            We make vehicle servicing simple and convenient. Follow these steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Calendar className="h-10 w-10 text-primary" />, title: "1. Schedule Service", description: "Book an appointment online or call us." },
            { icon: <CheckCircle className="h-10 w-10 text-primary" />, title: "2. Vehicle Diagnosis", description: "Our certified technicians will inspect your vehicle." },
            { icon: <Wrench className="h-10 w-10 text-primary" />, title: "3. Service Completion", description: "We’ll complete the required services expertly." },
          ].map((step, index) => (
            <div key={index} className="glass-card rounded-xl p-6 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-foreground/70">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-card rounded-xl p-8 bg-primary/5">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
              <p className="text-foreground/70 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Available 24/7 for emergency services
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-hover-effect px-6 py-3 rounded-full bg-primary text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceHighlights = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Service Excellence You Can Trust</h2>
            <p className="text-foreground/70 mb-8">
              We combine technology with expert craftsmanship for top-notch service.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Wrench className="h-6 w-6 text-primary" />, title: "Expert Technicians", description: "Certified professionals with years of experience" },
                { icon: <FileText className="h-6 w-6 text-primary" />, title: "Comprehensive Documentation", description: "Detailed service records" },
                { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: "Quality Guarantee", description: "12-month warranty on all services" },
                { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "Premium Facilities", description: "State-of-the-art equipment" },
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/services1.avif"
                alt="Premium automotive service"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/services1.avif"
                alt="Technician working"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Complete Automotive Services</h1>
            <p className="text-lg text-foreground/80">
              Discover our range of automotive services designed for top performance.
            </p>
          </div>
        </div>
      </section>

      <ServiceHighlights /> 
      <ServiceProcess />
      <FAQ />
    </div>
  );
}
