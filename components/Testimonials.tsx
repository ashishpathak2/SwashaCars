"use client"
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alex Moreno',
    role: 'Business Owner',
    text: "The customer service team went above and beyond to help me find exactly what I needed. They were patient, knowledgeable, and genuinely cared about my satisfaction.",
    rating: 5
  },
  {
    id: 2,
    name: 'Sophia Chen',
    role: 'Marketing Executive',
    text: "I was impressed by how seamless the entire process was. Everything from the initial consultation to the final delivery exceeded my expectations.",
    rating: 5
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    role: 'Tech Entrepreneur',
    text: "What sets this company apart is their commitment to excellence. They're not just selling a product; they're creating an experience that leaves you feeling valued.",
    rating: 5
  }
];

function ModernTestimonials () {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((current) => (current + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen  text-white flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12"> 
          <h2 className="text-3xl md:text-4xl font-bold mb-4  bg-gradient-to-r from-gray-100 to-indigo-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-gray-400">
            Real feedback from our valued customers
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile */}
            <div className="flex flex-col items-center text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {testimonials[activeIndex].name.charAt(0)}
                  </span>
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-lg">{testimonials[activeIndex].name}</h3>
              <p className="text-sm text-gray-400">{testimonials[activeIndex].role}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-gray-600">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed pl-6">
                  {testimonials[activeIndex].text}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
              disabled={isTransitioning}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsTransitioning(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'w-8 bg-blue-500' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
              disabled={isTransitioning}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
      </div>
     
    </div>
  );
}

export default ModernTestimonials ;