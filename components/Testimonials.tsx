"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Alex Moreno",
    role: "Business Owner",
    text: "The Swasha Cars team went above and beyond to help me find the perfect car service. They were patient, knowledgeable, and truly cared about my satisfaction.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Marketing Executive",
    text: "I was impressed by how seamless the car repair process was at Swasha Cars. From consultation to completion, it exceeded my expectations.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Tech Entrepreneur",
    text: "Swasha Cars stands out with their commitment to excellence in vehicle maintenance. They create an experience that leaves you feeling valued.",
    rating: 5,
  },
];

function ModernTestimonials() {
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

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: "prev" | "next" | number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (typeof action === "number") handleDotClick(action);
      else if (action === "prev") handlePrev();
      else if (action === "next") handleNext();
    }
  };

  return (
    <section className="text-white flex items-center justify-center py-24" aria-labelledby="testimonials-heading">
      <div className="responsive-container mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-indigo-400 bg-clip-text text-transparent"
          >
            What Our Clients Say About Swasha Cars
          </h2>
          <p className="text-gray-400">Real feedback from our valued car service customers</p>
        </header>

        {/* Testimonial Card */}
        <article
          className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
          aria-live="polite"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile */}
            <figure className="flex flex-col items-center text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span
                    className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    aria-hidden="true"
                  >
                    {testimonials[activeIndex].name.charAt(0)}
                  </span>
                </div>
              </div>
              <figcaption>
                <h3 className="mt-4 font-semibold text-lg">{testimonials[activeIndex].name}</h3>
                <p className="text-sm text-gray-400">{testimonials[activeIndex].role}</p>
                <div className="flex gap-1 mt-2" aria-label={`Rating: ${testimonials[activeIndex].rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>
              </figcaption>
            </figure>

            {/* Testimonial Text */}
            <blockquote className="flex-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-gray-600" aria-hidden="true">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed pl-6">{testimonials[activeIndex].text}</p>
              </div>
            </blockquote>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center gap-4 mt-8" aria-label="Testimonial Navigation">
            <button
              onClick={handlePrev}
              onKeyDown={(e) => handleKeyDown(e, "prev")}
              className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              disabled={isTransitioning}
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    activeIndex === index ? "w-8 bg-blue-500" : "bg-gray-600 hover:bg-gray-500"
                  )}
                  aria-label={`Go to testimonial ${index + 1} of ${testimonials.length}`}
                  aria-current={activeIndex === index ? "true" : "false"}
                  disabled={isTransitioning}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              onKeyDown={(e) => handleKeyDown(e, "next")}
              className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              disabled={isTransitioning}
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </article>
      </div>
    </section>
  );
}

export default ModernTestimonials;