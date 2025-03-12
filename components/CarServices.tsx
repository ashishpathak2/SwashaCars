"use client";
import React, { useEffect, useState, useRef } from "react";
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
  Stamp,
} from "lucide-react";
import { RiCarWashingFill } from "react-icons/ri";
import { roboto } from "@/components/Fonts";

const services = [
  {
    id: 1,
    name: "Ceramic and Graphene Coatings",
    description:
      "Durable coatings for superior shine, hydrophobic protection, and UV resistance.",
    image: "/Ceramic.jpg",
    features: ["Ceramic Coating", "Graphene Coating", "Car Paint Protection", "Hydrophobic Coating"],
    category: "detailing",
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 2,
    name: "Paint Protection Films",
    description:
      "Invisible scratch-resistant film with self-healing and UV protection.",
    image: "/PPF.jpg",
    features: ["Car Scratch Protection", "Self-Healing Film"],
    category: "detailing",
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 3,
    name: "Body Shop (Denting & Painting)",
    description:
      "Expert dent repair and painting for a factory-finish look.",
    image: "/Denting.jpg",
    features: ["Car Body Repair", "Scratch Removal", "Automotive Painting"],
    category: "maintenance",
    icon: <PaintBucket className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 4,
    name: "Detailing and Interior Cleaning",
    description:
      "Deep interior and exterior cleaning for a pristine car finish.",
    image: "/Detailing.jpg",
    features: ["Car Detailing", "Interior Cleaning", "Paint Correction", "Odor Removal"],
    category: "detailing",
    icon: <RiCarWashingFill className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 5,
    name: "Wrap Jobs",
    description:
      "Custom car wraps for a stylish look and paint protection.",
    image: "/Wrap.jpg",
    features: ["Vehicle Wrapping", "Custom Wraps", "Paint Protection"],
    category: "detailing",
    icon: <Stamp className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 6,
    name: "Insurance Claims",
    description:
      "Hassle-free car insurance claim assistance and repairs.",
    image: "/Insurance.jpg",
    features: ["Insurance Assistance", "Policy Review", "Coverage Documentation", "Claim Processing"],
    category: "documentation",
    icon: <Shield className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 7,
    name: "Interior Modifications",
    description:
      "Upgrade your car's interior with custom modifications including leather seats, ambient lighting, infotainment systems, and premium accessories for ultimate comfort and style.",
    image: "/Interior-mods.jpg",
    features: ["Interior Modifications", "Car Customization", "Luxury Car Interior", "Ambient Lighting"],
    category: "detailing",
    icon: <Car className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 8,
    name: "Other Services",
    description:
      "Specialized services for tuning, detailing, upgrades, and more.",
    image: "/Other-services.jpg",
    features: ["Car Upgrades", "Auto Detailing", "Custom Tuning", "Interior Mods"],
    category: "maintenance",
    icon: <Wrench className="w-5 h-5" aria-hidden="true" />,
  },
];

const categories = [
  { id: "all", label: "All Services", icon: <Filter className="w-4 h-4" aria-hidden="true" /> },
  { id: "maintenance", label: "Maintenance", icon: <Settings className="w-4 h-4" aria-hidden="true" /> },
  { id: "documentation", label: "Documentation", icon: <FileText className="w-4 h-4" aria-hidden="true" /> },
  { id: "detailing", label: "Detailing", icon: <Sparkles className="w-4 h-4" aria-hidden="true" /> },
];

const CarServices = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1 * (index % 4) + 0.4, ease: "easeOut" },
    }),
  };

  const filteredServices =
    selectedCategory === "all" ? services : services.filter((service) => service.category === selectedCategory);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-12 md:py-20 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="responsive-container min-h-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.header
          className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-indigo-400 bg-clip-text text-transparent"
          >
            Comprehensive Car Services
          </h2>
          <p className="text-slate-300 mb-6 text-base">
            Explore our professional automotive services tailored to enhance your vehicle’s performance and appearance.
          </p>

          <motion.nav
            className="flex flex-wrap justify-center gap-2"
            variants={categoryVariants}
            role="navigation"
            aria-label="Service Categories"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center bg-white/10 backdrop-blur-sm text-white hover:bg-white/20  ${
                  selectedCategory === category.id ? "bg-indigo-500/20 text-indigo-300" : ""
                }`}
                aria-current={selectedCategory === category.id ? "true" : undefined}
              >
                <span className="mr-1.5 opacity-70">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </motion.nav>
        </motion.header>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          role="list"
          aria-label="Car Services List"
        >
          {filteredServices.map((service, index) => (
            <motion.article
              key={service.id}
              className="group relative rounded-xl overflow-hidden transition-all duration-500 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 flex flex-col h-full shadow-xl shadow-black/5"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              role="listitem"
            >
              <div className="h-36 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <Image
                  src={service.image}
                  alt={`${service.name} - Swasha Cars Service`}
                  width={200}
                  height={200}
                  className="transition-transform object-cover w-full duration-700 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                <motion.div
                  className="absolute top-3 left-3 bg-black/50 backdrop-blur-md p-1.5 rounded-full z-20"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <div className="text-teal-400">{service.icon}</div>
                </motion.div>
              </div>

              <div className={`${roboto.className} p-3 flex flex-col flex-grow`}>
                <h3 className="font-bold text-base text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-300 mb-2 line-clamp-2">{service.description}</p>

                <ul className="flex flex-wrap gap-1 mb-2" aria-label={`Features of ${service.name}`}>
                  {service.features.slice(0, 3).map((feature, i) => (
                    <motion.li
                      key={i}
                      className={`text-xs px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                        hoveredCard === service.id ? "bg-blue-500/20 text-blue-300" : "bg-white/10 text-slate-300"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                      +{service.features.length - 3}
                    </li>
                  )}
                </ul>

                <div className="mt-auto pt-1">
                  <Link
                    href={`/services/${service.id}`}
                    className="w-full py-2 rounded-full bg-gradient-to-r from-blue-500/80 to-teal-500/80 hover:from-blue-500 hover:to-teal-500 text-white text-xs font-medium flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 "
                    aria-label={`Explore ${service.name} service details`}
                  >
                    Explore Service
                    <ChevronRight className="ml-1 w-3 h-3 animate-pulse" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.article>
          ))}
        </div>
      </div>

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