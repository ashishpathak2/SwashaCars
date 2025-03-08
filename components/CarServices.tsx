"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component for optimized image rendering
import {
  ChevronRight,
  FileText,
  Settings,
  Sparkles,
  Filter,
  Car,
  PaintBucket,
  Shield,
  Wrench,
  ShieldCheck ,
  Stamp
} from "lucide-react"; // Import icons from lucide-react library
import { RiCarWashingFill } from "react-icons/ri";

// Array of service objects containing details for each car service
const services = [
  {
    id: 1,
    name: "Ceramic and Graphene coatings",
    description:
      "Durable coatings for superior shine, hydrophobic protection, and UV resistance.",
    image: "/Ceramic.jpg",
    features: ["Ceramic Coating ", "Graphene Coating ", "Car Paint Protection", "Hydrophobic Coating"],
    category: "detailing",
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 2,
    name: "Paint Protection Films",
    description: 
      "Invisible scratch-resistant film with self-healing and UV protection.",
    image: "/PPF.jpg",
    features: ["Car Scratch Protection ","Self Healing Film"],
    category: "detailing",
    icon: <ShieldCheck  className="w-5 h-5" />
  },
  {
    id: 3,
    name: "Body-Shop (Denting & Painting)",
    description: 
      "Expert dent repair and painting for a factory-finish look.",
    image: "/Denting.jpg",
    features: ["Car Body Repair ", "Scratch Removal", "Scratch Removal ", "Automotive Painting"],
    category: "maintenance",
    icon: <PaintBucket className="w-5 h-5" />
  },
  {
    id: 4,
    name: "Detailing and Interior Cleaning",
    description:
      "Deep interior and exterior cleaning for a pristine car finish.",
    image: "/Detailing.jpg",
    features: ["Car Detailing ", "Interior Cleaning ", "Paint Correction ", "Odor Removal"],
    category: "detailing",
    icon: <RiCarWashingFill className="w-5 h-5" />
  },
  {
    id: 5,
    name: "Wrap Jobs",
    description:
      "Custom car wraps for a stylish look and paint protection.",
    image: "/Wrap.jpg",
    features: ["Vehicle Wrapping ", "Custom Wraps ", "Paint Protection"],
    category: "detailing",
    icon: <Stamp className="w-5 h-5" />
  },
  {
    id: 6,
    name: "Insurance Claims",
    description:
      "Hassle-free car insurance claim assistance and repairs.",
    image: "/Insurance.jpg",
    features: ["Insurance Assistance", "Policy Review", "Coverage Documentation", "Accident Reports", "Claim Processing"],
    category: "documentation",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 7,
    name: "Interior Modifications",
    description:
      "Upgrade your car’s interior with custom modifications including leather seats, ambient lighting, infotainment systems, and premium accessories for ultimate comfort and style",
    image: "/Interior-mods.jpg",
    features: ["Interior Modifications ", "Car Customization ", "Luxury Car Interior ", "Ambient Lighting"],
    category: "detailing",
    icon: <Car className="w-5 h-5" />
  },
  {
    id: 8,
    name: "Other Services",
    description:
      "Specialized services for tuning, detailing, upgrades, and more.",
    image: "/Other-services.jpg",
    features: ["CarUpgrades ", "Auto Detailing ", "Custom Tuning ", "InteriorMods"],
    category: "maintenance",
    icon: <Wrench className="w-5 h-5" />
  },

  // // Commented-out service: Restoration Services
  // {
  //   id: 9,
  //   name: "Restoration Services",
  //   description:
  //     "Bring your vehicle back to its original glory with our professional restoration services.",
  //   image:
  //     "https://images.unsplash.com/photo-1577397010148-a748c6a24223?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   features: ["Vintage Restoration", "Interior Refurbishment", "Paint Restoration", "Trim Reconditioning", "Body Repair"],
  //   category: "detailing",
  //   icon: <PaintBucket className="w-5 h-5" />
  // },
  // // Commented-out service: Dealership Services
  // {
  //   id: 10,
  //   name: "Dealership Services",
  //   description:
  //     "Comprehensive dealership services including vehicle inspection, appraisal, and consultation.",
  //   image:
  //     "https://images.unsplash.com/photo-1588280991458-d759882787cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   features: ["Vehicle Inspection", "Market Valuation", "Transfer Assistance", "Financing Consultation", "Extended Warranty"],
  //   category: "dealership",
  //   icon: <Building2 className="w-5 h-5" />
  // },
  // // Commented-out service: Pre-Purchase Inspection
  // {
  //   id: 11,
  //   name: "Pre-Purchase Inspection",
  //   description:
  //     "Professional inspection and evaluation services before you commit to buying a vehicle.",
  //   image:
  //     "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   features: ["Mechanical Inspection", "History Verification", "Market Value Analysis", "Condition Report", "Negotiation Support"],
  //   category: "dealership",
  //   icon: <Search className="w-5 h-5" />
  // },
  // // Commented-out service: Financial Services
  // {
  //   id: 12,
  //   name: "Financial Services",
  //   description:
  //     "Comprehensive financial solutions for vehicle purchases, leasing, and trade-ins.",
  //   image:
  //     "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   features: ["Financing Options", "Lease Arrangements", "Trade-In Appraisals", "Budget Planning", "Credit Solutions"],
  //   category: "dealership",
  //   icon: <DollarSign className="w-5 h-5" />
  // }
];

// CarServices component to display a list of services with filtering and load more functionality
const CarServices = () => {
  // State to manage the active category filter
  const [activeCategory, setActiveCategory] = useState("all");
  // State to store filtered services based on category
  const [filteredServices, setFilteredServices] = useState(services);
  // State to control the number of visible services
  const [visibleCount, setVisibleCount] = useState(8);
  // State to track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Effect to update filtered services when the active category changes
  useEffect(() => {
    setFilteredServices(
      activeCategory === "all"
        ? services // Show all services if "all" is selected
        : services.filter((service) => service.category === activeCategory) // Filter by category
    );
    setVisibleCount(8); // Reset visible count when category changes
  }, [activeCategory]);

  // Function to load more services, increasing visible count by 4 up to the total length
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredServices.length));
  };

  // Array of category options for filtering services
  const categories = [
    { id: "all", label: "All Services", icon: <Filter className="w-4 h-4" /> },
    { id: "maintenance", label: "Maintenance", icon: <Settings className="w-4 h-4" /> },
    { id: "documentation", label: "Documentation", icon: <FileText className="w-4 h-4" /> },
    { id: "detailing", label: "Detailing", icon: <Sparkles className="w-4 h-4" /> },
    // { id: "dealership", label: "Dealership", icon: <Building2 className="w-4 h-4" /> }, // Commented-out category
  ];

  return (
    // Section container with gradient background and padding
    <section id="services" className="py-12 md:py-20 relative overflow-hidden  bg-gradient-to-b from-black to-slate-900">
      <div className="max-w-7xl min-h-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section with title, description, and category filters */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4  bg-gradient-to-r from-gray-100 to-indigo-400 bg-clip-text text-transparent">
            Comprehensive Car Services
          </h2>
          <p className="text-slate-300 mb-6 text-base">
            Browse our extensive range of professional automotive services designed to meet all your vehicle needs.
          </p>
          
          {/* Category filter buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)} // Update active category on click
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                  category.id === activeCategory
                    ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                }`}
              >
                <span className={`${category.id === activeCategory ? "mr-1.5" : "mr-1.5 opacity-70"}`}>
                  {category.icon}
                </span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid layout for service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredServices.slice(0, visibleCount).map((service) => (
            // Service card with hover effects
            <div 
              key={service.id} 
              className="group relative rounded-xl overflow-hidden transition-all duration-500 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 flex flex-col h-full shadow-xl shadow-black/5"
              onMouseEnter={() => setHoveredCard(service.id)} // Set hovered card ID
              onMouseLeave={() => setHoveredCard(null)} // Clear hovered card ID
            >
              {/* Image container */}
              <div className="h-36 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                {/* Replaced img tag with Next.js Image component */}
                <Image 
                  src={service.image} 
                  alt={service.name} 
                  width={200}
                  height={200}
                  className="transition-transform object-cover w-full duration-700 ease-in-out group-hover:scale-110" // Zoom effect on hover
                />
                {/* Icon overlay */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md p-1.5 rounded-full z-20">
                  <div className="text-teal-400">
                    {service.icon}
                  </div>
                </div>
              </div>
              
              {/* Card content */}
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="font-bold text-base text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-300 mb-2 line-clamp-2">
                  {service.description}
                </p>
                
                {/* Features list */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <span 
                      key={i} 
                      className={`text-xs px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                        hoveredCard === service.id 
                          ? "bg-blue-500/20 text-blue-300" 
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                      +{service.features.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Explore button */}
                <div className="mt-auto pt-1">
                  <Link
                    href={`/services/${service.id}`}
                    className="w-full py-2 rounded-full bg-gradient-to-r from-blue-500/80 to-teal-500/80 hover:from-blue-500 hover:to-teal-500 text-white text-xs font-medium flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30"
                  >
                    Explore Service
                    <ChevronRight className="ml-1 w-3 h-3 animate-pulse" />
                  </Link>
                </div>
              </div>
              
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* Load More button, shown if there are more services to display */}
        {visibleCount < filteredServices.length && (
          <div className="mt-8 text-center">
            <button 
              onClick={loadMore}
              className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 border border-white/20 hover:border-white/30 flex items-center justify-center mx-auto text-sm"
            >
              Load More Services
              <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {/* Background design elements */}
      {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl"></div>
      </div> */}
    </section>
  );
};

export default CarServices;