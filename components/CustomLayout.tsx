"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader ? (
        <Preloader onFinish={() => setShowPreloader(false)} />
      ) : (
        <div
          className="antialiased scroll-smooth flex flex-col min-h-screen"
          aria-live="polite"
          aria-busy={showPreloader}
        >
          <header>
            <Navbar />
          </header>
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}