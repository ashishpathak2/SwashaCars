// "use client"
// import React, { useEffect, useRef } from 'react';

// const About = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const elements = [imageRef.current, contentRef.current];
      
//       elements.forEach(el => {
//         if (!el) return;
        
//         const rect = el.getBoundingClientRect();
//         const isVisible = rect.top < window.innerHeight * 0.85;
        
//         if (isVisible) {
//           el.classList.add('show');
//         }
//       });
//     };

//     // Initial check
//     handleScroll();
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <section 
//       id="about" 
//       ref={sectionRef}
//       className="section-padding relative overflow-hidden bg-slate-50"
//     >
//       <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-slate-50 -z-10"></div>
//       <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white to-slate-50 -z-10"></div>
      
//       <div className="responsive-container">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div 
//             ref={imageRef}
//             className="relative animate-on-scroll"
//           >
//             <div className="rounded-2xl overflow-hidden shadow-xl">
//               <img
//                 src="https://images.unsplash.com/photo-1560253414-f65d1f5a1a37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                 alt="Showroom"
//                 className="w-full h-full object-cover"
//               />
//             </div>
            
//             <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-2xl max-w-xs shadow-lg hidden lg:block">
//               <div className="flex items-center gap-4 mb-3">
//                 <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                   </svg>
//                 </div>
//                 <div>
//                   <h4 className="font-bold">24/7 Support</h4>
//                   <p className="text-sm text-foreground/70">We're always here to help</p>
//                 </div>
//               </div>
//               <p className="text-sm text-foreground/70">
//                 Our dedicated customer service team is available around the clock to answer any questions or address concerns.
//               </p>
//             </div>
            
//             <div className="absolute -top-8 -left-8 glass-card p-4 rounded-full hidden lg:flex items-center justify-center w-24 h-24 shadow-lg animate-float">
//               <div className="text-center">
//                 <div className="font-bold text-2xl text-primary">15+</div>
//                 <div className="text-xs text-foreground/70">Years of<br/>Excellence</div>
//               </div>
//             </div>
//           </div>
          
//           <div 
//             ref={contentRef}
//             className="animate-on-scroll"
//           >
//             <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
//               Our Story
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               Setting the Standard in Pre-Owned Excellence
//             </h2>
//             <p className="text-foreground/70 mb-6">
//               Founded in 2008, PreOwnedRide has established itself as a leading destination for premium pre-owned vehicles. Our journey began with a simple mission: to transform the way people buy used cars by focusing on quality, transparency, and exceptional customer experience.
//             </p>
//             <p className="text-foreground/70 mb-8">
//               Today, we continue to uphold these values across our showrooms. Each vehicle in our collection undergoes a rigorous 150-point inspection process, ensuring that only the finest pre-owned cars make it to our showroom floor.
//             </p>
            
//             <div className="grid sm:grid-cols-2 gap-6 mb-8">
//               {[
//                 {
//                   title: 'Expert Inspection',
//                   description: 'Every vehicle undergoes a comprehensive 150-point inspection.'
//                 },
//                 {
//                   title: 'Quality Guarantee',
//                   description: 'All our vehicles come with a 24-month warranty for peace of mind.'
//                 },
//                 {
//                   title: 'Price Transparency',
//                   description: 'Clear pricing with no hidden fees or last-minute surprises.'
//                 },
//                 {
//                   title: 'Financing Options',
//                   description: 'Flexible financing solutions tailored to your needs.'
//                 }
//               ].map((item, index) => (
//                 <div key={index} className="flex items-start gap-3">
//                   <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <polyline points="20 6 9 17 4 12"></polyline>
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-medium">{item.title}</h4>
//                     <p className="text-sm text-foreground/70">{item.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <a
//               href="#contact"
//               className="btn-hover-effect inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
//             >
//               Learn More About Us
//               <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M5 12h14"></path>
//                 <path d="M12 5l7 7-7 7"></path>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;
