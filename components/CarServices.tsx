"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
  ShieldCheck,
  Stamp
} from "lucide-react";
import { RiCarWashingFill } from "react-icons/ri";
import { roboto } from "@/components/Fonts";

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
    icon: <ShieldCheck className="w-5 h-5" />
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
      "Upgrade your car's interior with custom modifications including leather seats, ambient lighting, infotainment systems, and premium accessories for ultimate comfort and style",
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
];

const CarServices = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredServices, setFilteredServices] = useState(services);
  const [visibleCount, setVisibleCount] = useState(8);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Effect for animation detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('services');
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          setIsInView(true);
        }
      }
    };

    // Initialize on component mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setFilteredServices(
      activeCategory === "all"
        ? services
        : services.filter((service) => service.category === activeCategory)
    );
    setVisibleCount(8);
  }, [activeCategory]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredServices.length));
  };

  const categories = [
    { id: "all", label: "All Services", icon: <Filter className="w-4 h-4" /> },
    { id: "maintenance", label: "Maintenance", icon: <Settings className="w-4 h-4" /> },
    { id: "documentation", label: "Documentation", icon: <FileText className="w-4 h-4" /> },
    { id: "detailing", label: "Detailing", icon: <Sparkles className="w-4 h-4" /> },
  ];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.3, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.1 * (index % 4) + 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="services" className="py-12 md:py-20 relative overflow-hidden">
      <div className="responsive-container min-h-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section with title and description */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-indigo-400 bg-clip-text text-transparent">
            Comprehensive Car Services
          </h2>
          <p className="text-slate-300 mb-6 text-base">
            Browse our extensive range of professional automotive services designed to meet all your vehicle needs.
          </p>
          
          {/* Category filter buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2"
            variants={categoryVariants}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
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
          </motion.div>
        </motion.div>

        {/* Grid layout for service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredServices.slice(0, visibleCount).map((service, index) => (
            <motion.div 
              key={service.id}
              className="group relative rounded-xl overflow-hidden transition-all duration-500 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 flex flex-col h-full shadow-xl shadow-black/5"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.3 }
              }}
            >
              {/* Image container */}
              <div className="h-36 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <Image 
                  src={service.image} 
                  alt={service.name} 
                  width={200}
                  height={200}
                  className="transition-transform object-cover w-full duration-700 ease-in-out group-hover:scale-110"
                />
                {/* Icon overlay */}
                <motion.div 
                  className="absolute top-3 left-3 bg-black/50 backdrop-blur-md p-1.5 rounded-full z-20"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <div className="text-teal-400">
                    {service.icon}
                  </div>
                </motion.div>
              </div>
              
              {/* Card content */}
              <div className={`${roboto.className} p-3 flex flex-col flex-grow `}>
                <h3 className="font-bold text-base text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-300 mb-2 line-clamp-2 ">
                  {service.description}
                </p>
                
                {/* Features list */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <motion.span 
                      key={i} 
                      className={`text-xs px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                        hoveredCard === service.id 
                          ? "bg-blue-500/20 text-blue-300" 
                          : "bg-white/10 text-slate-300"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {feature}
                    </motion.span>
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
            </motion.div>
          ))}
        </div>
        
        {/* Load More button, shown if there are more services to display */}
        {visibleCount < filteredServices.length && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.button 
              onClick={loadMore}
              className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 border border-white/20 hover:border-white/30 flex items-center justify-center mx-auto text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Services
              <ChevronRight className="ml-1 w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      ></motion.div>
    </section>
  );
};

export default CarServices;