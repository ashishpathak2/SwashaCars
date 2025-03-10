"use client"; // Only needed for Next.js App Router

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

const Preloader = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 2000); // Start fade out after 2s
    setTimeout(onFinish, 2700); // Hide preloader completely after 2.7s
  }, [onFinish]);

  return (
    <div
      className={clsx(
        "fixed inset-0 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 ease-in-out",
        fadeOut && "opacity-0 pointer-events-none"
      )}
    >
      {/* Logo Animation */}
      <div className="animate-bounce">
        <Image src="/Brand-logo.jpeg" alt="Brand Logo" width={100} height={100} />
      </div>

      {/* Brand Name Animation */}
      <h1 className="text-6xl font-bold tracking-wider mt-4 ">
        Swasha <span className="text-primary">Cars</span>
      </h1>
    </div>
  );
};

export default Preloader;
