// components/Hero.jsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HeroContent } from "./HeroContent";

export function Hero ( ) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for top-to-bottom effect
  const containerVariants = {
    hidden: { opacity: 0, y: -50 }, // Start above the viewport
    visible: {
      opacity: 1,
      y: 0, // Move to natural position
      transition: {
        duration: 0.8, // Smooth duration for the whole container
        ease: "easeOut", // Easing for a natural feel
        staggerChildren: 0.15, // Stagger child animations
        delayChildren: 0.2, // Delay before children start
      },
    },
  };


  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <HeroContent />
    </motion.div>
  );
};

export default Hero;