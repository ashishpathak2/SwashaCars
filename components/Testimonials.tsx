"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Testimonials data with more realistic content
const testimonials = [
  {
    id: 1,
    name: 'Alex Moreno',
    role: 'Business Owner',
    image: '/api/placeholder/200/200', // Placeholder for demo
    text: "The customer service team went above and beyond to help me find exactly what I needed. They were patient, knowledgeable, and genuinely cared about my satisfaction. I couldn't have asked for a better experience.",
    rating: 5
  },
  {
    id: 2,
    name: 'Sophia Chen',
    role: 'Marketing Executive',
    image: '/api/placeholder/200/200',
    text: "I was impressed by how seamless the entire process was. Everything from the initial consultation to the final delivery exceeded my expectations. The attention to detail and personalized service made all the difference.",
    rating: 5
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    role: 'Tech Entrepreneur',
    image: '/api/placeholder/200/200',
    text: "What sets this company apart is their commitment to excellence. They're not just selling a product; they're creating an experience that leaves you feeling valued and appreciated. I've already recommended them to several colleagues.",
    rating: 5
  },
  {
    id: 4,
    name: 'Layla Rodriguez',
    role: 'Financial Advisor',
    image: '/api/placeholder/200/200',
    text: "As someone who values quality and reliability, I was thoroughly impressed with both the product and the service. The team was transparent, professional, and delivered exactly what they promised. I'll definitely be a returning customer.",
    rating: 5
  },
];

const ModernTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Increased autoplay interval from 5000ms to 8000ms
  const autoPlayInterval = 8000;
  
  // Add transition debounce time to prevent rapid clicking
  const transitionDebounceTime = 1000;

  // Navigation handlers with debouncing to prevent rapid transitions
  const nextTestimonial = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((current) => (current + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDebounceTime);
  }, [isTransitioning]);

  const prevTestimonial = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDebounceTime);
  }, [isTransitioning]);

  const goToTestimonial = useCallback((index: React.SetStateAction<number>) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    
    // Reset autoplay timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (autoPlay) {
        autoPlayRef.current = setInterval(nextTestimonial, autoPlayInterval);
      }
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDebounceTime);
  }, [nextTestimonial, autoPlay, isTransitioning]);

  const toggleAutoPlay = useCallback(() => {
    setAutoPlay(prev => !prev);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle autoplay with cleanup - using longer interval
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(nextTestimonial, autoPlayInterval);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, nextTestimonial, autoPlayInterval]);

  // Pause autoplay when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      } else if (autoPlay) {
        autoPlayRef.current = setInterval(nextTestimonial, autoPlayInterval);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [autoPlay, nextTestimonial, autoPlayInterval]);

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 ${i < rating ? 'text-amber-500' : 'text-gray-600'}`} 
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path 
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </div>
  );

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden bg-black"
    >
      {/* Background decoration elements
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 to-transparent opacity-80"/>
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-900/10 blur-3xl"/>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-slate-800/20 blur-3xl"/>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-slate-900 to-transparent opacity-70"/>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-900/60 text-indigo-300 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-indigo-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-lg">
            Don't just take our word for it. See what our valued customers have experienced with our services.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Navigation - Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 z-10"
          >
            <button
              onClick={prevTestimonial}
              disabled={isTransitioning}
              className={`h-14 w-14 rounded-full bg-gray-800 hover:bg-indigo-900/50 shadow-lg hover:shadow-indigo-900/30 flex items-center justify-center transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 group ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 group-hover:text-indigo-300 transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
          </motion.div>
          
          {/* Testimonial Cards */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeInOut",
                  opacity: { duration: 0.9 }
                }}
                className="p-1.5 rounded-2xl bg-gradient-to-br from-indigo-600/30 via-indigo-900/20 to-transparent"
              >
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-gray-800/50 shadow-xl">
                  <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
                    {/* Profile Section */}
                    <div className="flex flex-col items-center md:items-start">
                      <div className="relative">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 opacity-75 blur-sm"></div>
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.7, delay: 0.3 }}
                          className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-indigo-500/30"
                        >
                          <img
                            src={testimonials[activeIndex].image}
                            alt={testimonials[activeIndex].name}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-4 text-center md:text-left"
                      >
                        <h3 className="text-xl font-bold text-gray-100">{testimonials[activeIndex].name}</h3>
                        <p className="text-gray-400">{testimonials[activeIndex].role}</p>
                        <div className="mt-2">
                          <StarRating rating={testimonials[activeIndex].rating} />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Testimonial Content */}
                    <div className="relative">
                      {/* Quote Mark */}
                      <div className="absolute -top-4 -left-2 text-indigo-700/20">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.51.144-.82.243-1.57.7-2.25 1.37-.51.5-.8 1.02-.88 1.54-.08.53.03 1.07.33 1.61.33.55.78.99 1.33 1.32.79.46 1.69.7 2.69.7.87 0 1.5-.24 1.9-.71.4-.48.6-1.07.6-1.77 0-.27-.03-.53-.08-.77H9.56c.04.29.06.54.06.77zm4 0c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.51.144-.82.243-1.57.7-2.25 1.37-.51.5-.8 1.02-.88 1.54-.08.53.03 1.07.33 1.61.33.55.78.99 1.33 1.32.79.46 1.69.7 2.69.7.87 0 1.5-.24 1.9-.71.4-.48.6-1.07.6-1.77 0-.27-.03-.53-.08-.77h-2.08c.04.29.06.54.06.77z" />
                        </svg>
                      </div>
                      
                      <motion.blockquote 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.0, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-300 leading-relaxed italic pl-6"
                      >
                        "{testimonials[activeIndex].text}"
                      </motion.blockquote>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Desktop Navigation - Right */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 z-10"
          >
            <button
              onClick={nextTestimonial}
              disabled={isTransitioning}
              className={`h-14 w-14 rounded-full bg-gray-800 hover:bg-indigo-900/50 shadow-lg hover:shadow-indigo-900/30 flex items-center justify-center transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 group ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 group-hover:text-indigo-300 transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </motion.div>
        </div>
        
        {/* Mobile Navigation and Indicator Dots */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="flex justify-center items-center mt-12 gap-4 lg:hidden"
        >
          <button
            onClick={prevTestimonial}
            disabled={isTransitioning}
            className={`h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg flex items-center justify-center transition-all duration-500 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full transition-all duration-700 ${
                  activeIndex === index ? 'w-10 bg-indigo-500' : 'w-2.5 bg-gray-600'
                }`}
                onClick={() => goToTestimonial(index)}
                disabled={isTransitioning}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            disabled={isTransitioning}
            className={`h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg flex items-center justify-center transition-all duration-500 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
        </motion.div>

        {/* Additional Testimonial Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1.0, delay: 0.7 }}
          className="hidden md:grid grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              className={`cursor-pointer rounded-lg p-3 transition-all duration-700 ${
                activeIndex === index 
                  ? 'bg-indigo-900/30 border border-indigo-500/30 shadow-md shadow-indigo-900/20' 
                  : 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/30'
              } ${isTransitioning ? 'pointer-events-none' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-medium text-gray-200 truncate">{testimonial.name}</h4>
                  <p className="text-xs text-gray-400 truncate">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Auto-play toggle */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={toggleAutoPlay}
            className="flex items-center gap-2 px-5 py-3 text-sm bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-indigo-300 rounded-full transition-all duration-500 group"
          >
            <span className={`w-3 h-3 rounded-full transition-colors duration-700 ${autoPlay ? 'bg-indigo-500' : 'bg-gray-600'}`}></span>
            {autoPlay ? "Auto-playing" : "Paused"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonials;