import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GiCarWheel } from "react-icons/gi";


export const NewHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded state after a tiny delay to ensure animation runs properly
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15
      }
    }
  };
  
  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };
  
  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(255, 62, 0, 0.5)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <main className="text-white min-h-screen w-full overflow-hidden bg-gradient-to-b from-black to-black">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-5 lg:gap-5 py-3 sm:py-5">
          {/* Left Side */}
          <div className="flex flex-col justify-between h-full">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide leading-tight sm:leading-tight md:leading-tight "
              variants={itemVariants}
            >
              Elevate Your Travel Experience
            </motion.h1>
            <div className="flex w-full h-full gap-4 sm:gap-4 md:gap-5 mt-3 sm:mt-8 md:mt-10 lg:mt-12">
              <motion.div 
                className="relative w-1/2 aspect-[4/5] sm:aspect-[3/4] md:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl shadow-white/25 backdrop-blur-lg"
                variants={itemVariants}
                // whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div variants={imageVariants} className="h-full w-full">
                  <Image
                    src="/hero1.jpg"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    alt="PPF Coating"
                    priority
                  />
                </motion.div>
                <motion.span 
                  className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white rounded-full px-1.5 sm:px-2 py-[2px] sm:py-[4px] text-black font-bold text-[10px] sm:text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-16px)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  Paint protection films
                </motion.span>
              </motion.div>
              <motion.div 
                className="relative w-1/2 aspect-[4/5] sm:aspect-[3/4] md:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl shadow-white/25 backdrop-blur-lg"
                variants={itemVariants}
                // whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div variants={imageVariants} className="h-full w-full">
                  <Image
                    src="/hero2.jpg"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    alt="Expert Repairs"
                    priority
                  />
                </motion.div>
                <motion.span 
                  className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white rounded-full px-1.5 sm:px-2 py-[2px] sm:py-[4px] text-black font-bold text-[10px] sm:text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-16px)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  Detailing and Interior cleaning
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Right Side (Single Image) */}
          <motion.div 
            className="h-full w-full relative mt-4 md:mt-0 aspect-video sm:aspect-auto md:aspect-square lg:aspect-auto rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl shadow-white/25 backdrop-blur-lg"
            variants={itemVariants}
            // whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <motion.div variants={imageVariants} className="h-full w-full">
              <Image
                src="/hero3.jpg"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                alt="Car Service"
                priority
              />
            </motion.div>
            <motion.span 
              className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white rounded-full px-1.5 sm:px-2 py-[2px] sm:py-[4px] text-black font-bold text-[10px] sm:text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-16px)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              Ceramic and Graphene coatings
            </motion.span>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10">
          <motion.p 
            className="text-sm sm:text-base md:text-md lg:text-base font-thin tracking-wide text-center md:text-left w-full md:w-2/3 lg:pr-8"
            variants={itemVariants}
          >
            Drive with confidence! We provide top-quality car servicing, repairs, and maintenance to keep your vehicle running smoothly, efficiently, and safely. With expert care and the latest technology, we ensure reliability and peace of mind on every journey.
          </motion.p>
          <motion.button 
            className="w-full md:w-auto flex items-center justify-center gap-2 text-xl tracking-widest font-semibold px-8 sm:px-12 lg:px-16 py-3 sm:py-4 lg:py-4 rounded-full bg-primary text-black shadow-lg shadow-primary/30 transition-all whitespace-nowrap mt-4 md:mt-0"
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            Book Now
            {/* <GiCarWheel size={30} className="animate-spin" /> */}

          </motion.button>
        </div>
      </motion.div>
      
    </main>
  );
};

export default NewHero;