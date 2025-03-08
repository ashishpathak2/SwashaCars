// "use client"
// import React, { useEffect, useRef } from 'react';

// const cars = [
//   {
//     id: 1,
//     name: '2021 Mercedes-Benz E-Class',
//     price: '$47,900',
//     image: 'https://images.unsplash.com/photo-1617814076668-8dfc6fe3b324?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     mileage: '25,600 km',
//     transmission: 'Automatic',
//     fuelType: 'Gasoline',
//     year: '2021',
//     features: ['Leather Seats', 'Navigation', 'Bluetooth', 'Sunroof']
//   },
//   {
//     id: 2,
//     name: '2020 BMW 5 Series',
//     price: '$45,500',
//     image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     mileage: '32,400 km',
//     transmission: 'Automatic',
//     fuelType: 'Hybrid',
//     year: '2020',
//     features: ['Heated Seats', 'Parking Sensors', 'Bluetooth', 'Keyless Entry']
//   },
//   {
//     id: 3,
//     name: '2022 Audi A6',
//     price: '$52,800',
//     image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     mileage: '18,200 km',
//     transmission: 'Automatic',
//     fuelType: 'Gasoline',
//     year: '2022',
//     features: ['Panoramic Roof', 'Premium Sound', 'Heated Seats', 'Lane Assist']
//   },
//   {
//     id: 4,
//     name: '2019 Tesla Model 3',
//     price: '$39,900',
//     image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     mileage: '42,500 km',
//     transmission: 'Automatic',
//     fuelType: 'Electric',
//     year: '2019',
//     features: ['Autopilot', 'Heated Seats', 'Premium Sound', 'Glass Roof']
//   },
// ];

// const FeaturedCars = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const titleRef = useRef<HTMLDivElement>(null);
//   const carRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const elements = [titleRef.current, ...carRefs.current];
      
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
//       id="vehicles" 
//       ref={sectionRef}
//       className="section-padding relative overflow-hidden"
//     >
//       <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-50 to-transparent -z-10"></div>
//       <div className="responsive-container">
//         <div 
//           ref={titleRef} 
//           className="max-w-2xl mx-auto text-center mb-16 animate-on-scroll"
//         >
//           <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
//             Premium Selection
//           </span>
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Featured Vehicles
//           </h2>
//           <p className="text-foreground/70 mb-8">
//             Explore our handpicked selection of premium pre-owned vehicles. Each car in our collection has undergone rigorous quality checks to ensure exceptional condition and performance.
//           </p>
//           <div className="flex flex-wrap justify-center gap-2">
//             {['All', 'Sedan', 'SUV', 'Luxury', 'Electric'].map((category, index) => (
//               <button
//                 key={index}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                   index === 0
//                     ? 'bg-primary text-white shadow-md shadow-primary/20'
//                     : 'bg-white border border-slate-200 text-foreground/80 hover:border-primary/30'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {cars.map((car, index) => (
//             <div
//               key={car.id}
//               ref={(el) => {carRefs.current[index] = el}}
//               className="car-card glass-card rounded-2xl overflow-hidden animate-on-scroll"
//               style={{ transitionDelay: `${index * 100}ms` }}
//             >
//               <div className="h-48 overflow-hidden">
//                 <img
//                   src={car.image}
//                   alt={car.name}
//                   className="car-image w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-bold text-lg leading-tight">{car.name}</h3>
//                   <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
//                     {car.price}
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2 mb-4">
//                   <div className="text-xs text-foreground/70">
//                     <span className="block text-foreground font-medium">Mileage</span>
//                     {car.mileage}
//                   </div>
//                   <div className="text-xs text-foreground/70">
//                     <span className="block text-foreground font-medium">Transmission</span>
//                     {car.transmission}
//                   </div>
//                   <div className="text-xs text-foreground/70">
//                     <span className="block text-foreground font-medium">Fuel Type</span>
//                     {car.fuelType}
//                   </div>
//                   <div className="text-xs text-foreground/70">
//                     <span className="block text-foreground font-medium">Year</span>
//                     {car.year}
//                   </div>
//                 </div>
//                 <div className="flex flex-wrap gap-1 mb-4">
//                   {car.features.map((feature, i) => (
//                     <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-full">
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
//                 <button className="w-full btn-hover-effect py-2 rounded-full bg-white border border-primary/40 text-primary text-sm font-medium hover:bg-primary/5 transition-all">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="mt-12 text-center">
//           <a
//             href="#"
//             className="btn-hover-effect inline-flex items-center px-8 py-3 rounded-full bg-primary text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
//           >
//             View All Vehicles
//             <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M5 12h14"></path>
//               <path d="M12 5l7 7-7 7"></path>
//             </svg>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedCars;
