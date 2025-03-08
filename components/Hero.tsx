"use client";

// import React, { useEffect, useRef } from "react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { ChevronDown, BarChart2, Clock, Award } from "lucide-react";

// const Hero = () => {
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const subtitleRef = useRef<HTMLParagraphElement>(null);
//   const ctaRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const elements = [
//       { ref: titleRef, delay: 0 },
//       { ref: subtitleRef, delay: 200 },
//       { ref: ctaRef, delay: 400 },
//       { ref: imageRef, delay: 600 },
//     ];

//     elements.forEach(({ ref, delay }) => {
//       if (ref.current) {
//         setTimeout(() => {
//           ref.current?.classList.add("opacity-100", "translate-y-0");
//         }, delay);
//       }
//     });
//   }, []);

//   return (
//     <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 -z-10"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10"></div>

//       <div className="responsive-container grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
//         <div className="flex flex-col max-w-xl">
//           <h1
//             ref={titleRef}
//             className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-shadow opacity-0 -translate-y-8 transition-all duration-700 ease-out"
//           >
//             Premium Automotive Services For Your Journey
//           </h1>

//           <p
//             ref={subtitleRef}
//             className="mt-6 text-lg text-foreground/80 opacity-0 -translate-y-8 transition-all duration-700 delay-100 ease-out"
//           >
//             Discover our comprehensive range of automotive services, from maintenance and repairs to documentation and detailing. Our expert team is committed to keeping your vehicle in perfect condition.
//           </p>

//           <div
//             ref={ctaRef}
//             className="mt-8 flex flex-wrap gap-4 opacity-0 -translate-y-8 transition-all duration-700 delay-200 ease-out"
//           >
//             <Link
//               href="/services"
//               className="btn-hover-effect px-8 py-3 rounded-full bg-primary text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
//             >
//               Explore Services
//             </Link>
//             <Link
//               href="/contact"
//               className="btn-hover-effect px-8 py-3 rounded-full bg-white/90 text-foreground font-medium shadow-md hover:shadow-lg transition-all border border-slate-200"
//             >
//               Contact Us
//             </Link>
//           </div>

//           <div className="mt-12 grid grid-cols-3 gap-4">
//             {[
//               { number: "15+", label: "Years Experience", icon: <Clock className="h-6 w-6 text-primary mb-2" /> },
//               { number: "50+", label: "Expert Staff", icon: <Award className="h-6 w-6 text-primary mb-2" /> },
//               { number: "10K+", label: "Happy Customers", icon: <BarChart2 className="h-6 w-6 text-primary mb-2" /> },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className={cn(
//                   "glass-card rounded-2xl p-4 opacity-0 transition-all duration-700 ease-out transform translate-y-8"
//                 )}
//                 style={{ transitionDelay: `${600 + index * 100}ms` }}
//               >
//                 {stat.icon}
//                 <p className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</p>
//                 <p className="text-sm text-foreground/70">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div ref={imageRef} className="lg:h-[540px] opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out relative">
//           <div className="overflow-hidden rounded-2xl h-full shadow-2xl relative">
//             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//             <img
//               src="https://static.mywebsites360.com/bcd5b1dee7324a5a9fc9477fda6d7316/i/e7a2173ce0da426ab0884bc6c656da65/1/4SoifmQp45JMgBnHqdenx/Benefits%20of%20Car%20Detailing%20-%20Hero%20.jpg"
//               alt="Professional automotive service"
//               className="w-full h-full object-cover object-center"
//             />
//           </div>

//           <div className="hidden lg:block absolute z-10 -bottom-6 -left-6 h-40 w-60 rounded-2xl overflow-hidden shadow-xl animate-float">
//             <img
//               src="https://www.oneeducation.org.uk/wp-content/uploads/2020/03/car.png"
//               alt="Car maintenance service"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div
//             className="absolute -top-10 -right-10 hidden lg:flex flex-col items-center justify-center bg-white rounded-full h-28 w-28 shadow-xl animate-float"
//             style={{ animationDelay: "0.5s" }}
//           >
//             <span className="text-3xl font-bold text-primary">24/7</span>
//             <span className="text-xs text-center text-foreground/70">
//               Service
//               <br />
//               Support
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-60 hidden md:block">
//         <ChevronDown className="w-6 h-6" />
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from 'react'
import { NewHero } from './NewHero'

const Hero = () => {
  return (
    <>
    <NewHero/>
    </>
  )
}

export default Hero