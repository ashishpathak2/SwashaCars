"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  SiHyundai,
  SiMercedes,
  SiBmw,
  SiAudi,
  SiFord,
  SiChevrolet,
  SiNissan,
  SiToyota,
  SiHonda,
  SiTata,
  SiMahindra,
  SiSuzuki,
  SiJeep,
  SiVolvo,
  SiLandrover
} from "react-icons/si";

const BrandCarousel = () => {
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 0.03; // Slightly slower for smoother animation

  // Memoize brand data to prevent unnecessary re-renders
  const brands = useMemo(() => [
    { name: "Toyota", id: "toyota", icon: <SiToyota size={50} /> },
    { name: "Honda", id: "honda", icon: <SiHonda size={50} /> },
    { name: "BMW", id: "bmw", icon: <SiBmw size={50} /> },
    { name: "Mercedes", id: "mercedes", icon: <SiMercedes size={50} /> },
    { name: "Audi", id: "audi", icon: <SiAudi size={50} /> },
    { name: "Ford", id: "ford", icon: <SiFord size={50} /> },
    { name: "Chevrolet", id: "chevrolet", icon: <SiChevrolet size={50} /> },
    { name: "Nissan", id: "nissan", icon: <SiNissan size={50} /> },
    { name: "Hyundai", id: "hyundai", icon: <SiHyundai size={50} /> },
    { name: "Tata", id: "tata", icon: <SiTata size={50} /> },
    { name: "Mahindra", id: "mahindra", icon: <SiMahindra size={50} /> },
    { name: "Suzuki", id: "suzuki", icon: <SiSuzuki size={50} /> },
    { name: "Jeep", id: "jeep", icon: <SiJeep size={50} /> },
    { name: "Volvo", id: "volvo", icon: <SiVolvo size={50} /> },
    { name: "Land Rover", id: "landrover", icon: <SiLandrover size={50} /> },
  ], []);

  // Check for mobile devices on component mount
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Intersection Observer to trigger entrance animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Handle animation frame for smoother scrolling
  useEffect(() => {
    if (isHovered || isPaused) return;

    let animationId: number;
    let lastTimestamp = 0;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      
      // Ensure consistent animation speed regardless of frame rate
      if (delta > 0) {
        setOffset((prevOffset) => {
          const newOffset = prevOffset - (scrollSpeed * delta / 16);
          return newOffset <= -100 ? 0 : newOffset;
        });
        lastTimestamp = timestamp;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isPaused, scrollSpeed]);

  // Pause animation when page is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Function to handle brand click
  const handleBrandClick = (id: string) => {
    setSelectedBrand(prev => prev === id ? null : id);
  };

  return (
    <section 
      ref={carouselRef}
      className={`py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-black overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`container mx-auto px-4 text-center mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-indigo-400 bg-clip-text text-transparent">
          Our Trusted Brands
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
          Partnering with leading automotive brands to deliver cutting-edge solutions for your driving experience.
        </p>
      </div>

      <div className={`relative w-full overflow-hidden transition-transform duration-1000 delay-500 ${isVisible ? 'scale-100' : 'scale-95'}`}>
        {/* Improved gradient overlays with animation */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none animate-pulse"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none animate-pulse"></div>

        {/* Carousel container */}
        <div
          className="flex items-center py-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div
            className="flex space-x-8 md:space-x-12 transition-transform ease-linear will-change-transform"
            style={{ 
              transform: `translateX(${offset}%)`,
              transitionDuration: isHovered ? '500ms' : '0ms'
            }}
          >
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                onClick={() => handleBrandClick(brand.id)}
                className={`
                  w-24 h-16 md:w-36 md:h-24 
                  flex-shrink-0 flex items-center justify-center 
                  bg-gradient-to-br from-gray-800 to-gray-900 
                  rounded-3xl shadow-lg hover:shadow-2xl 
                  transition-all duration-300 transform 
                  hover:scale-105 p-3 md:p-5 
                  border border-gray-700 hover:border-indigo-500 
                  group cursor-pointer
                  ${selectedBrand === brand.id ? 'border-indigo-500 scale-105 shadow-lg shadow-indigo-900/20' : ''}
                  ${isVisible ? 'animate-fadeIn' : 'opacity-0'}
                `}
                style={{
                  animationDelay: `${(index % brands.length) * 100}ms`,
                  animationFillMode: 'forwards'
                }}
                aria-label={brand.name}
              >
                <span className={`
                  text-gray-400 group-hover:text-indigo-400 transition-all duration-300 text-3xl md:text-4xl
                  ${selectedBrand === brand.id ? 'text-indigo-400 animate-pulse' : ''}
                `}>
                  {brand.icon}
                </span>
                <span className="sr-only">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Interactive pause/play indicator with animation */}
      <div className={`flex justify-center mt-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button 
          onClick={() => setIsHovered(!isHovered)} 
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors duration-300 group"
          aria-label={isHovered ? "Play carousel" : "Pause carousel"}
        >
          <span className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${isHovered ? 'bg-indigo-500 animate-ping' : 'bg-gray-500'}
            group-hover:animate-pulse
          `}></span>
          <span className="relative overflow-hidden">
            <span className={`
              inline-block transition-transform duration-300
              ${isHovered ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}
            `}>
              Hover to pause
            </span>
            <span className={`
              absolute top-0 left-0 transition-transform duration-300
              ${isHovered ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'}
            `}>
              Click to play
            </span>
          </span>
        </button>
      </div>
      
      
    </section>
  );
};

export default BrandCarousel;