"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

// Offer Data
const offerData = {
  festivalName: "Holi & Ramadan",
  festiveMonth: "March",
  title: "Ramadan & Holi Special Car Service Offer!",
  description:
    "Celebrate the festival with sparkling clean cars. Get premium services at special festive prices.",
  offerPrice: {
    hatchback: 1999,
    sedan: 2499,
    suv: 2999,
  },
  validityPeriod: {
    start: "March 1, 2025",
    end: "March 31, 2025",
  },
  servicesIncluded: [
    "Complete Exterior & Interior Detailing",
    "Engine Check-up & Tune-up",
    "Free AC Service",
    "Complimentary Car Perfume",
    "50% Off on Wheel Alignment",
  ],
  ctaText: "Schedule Now",
  offerImage: "/offerImage.jpg",
  displayDuration: 8000, // Time before popup appears (in ms)
};

function OfferPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
    }, offerData.displayDuration);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-3xl md:max-w-4xl p-0 overflow-hidden bg-zinc-900 text-white/80 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Image */}
            <div className="relative w-full h-48 sm:h-60 md:h-full min-h-[12rem]">
              <Image
                src={offerData.offerImage}
                alt={`${offerData.festivalName} Offer`}
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Right side - Content */}
            <div className="p-4 sm:p-6 flex flex-col bg-zinc-900">
              <DialogHeader className="text-left">
                <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                  {offerData.title}
                </DialogTitle>
                <DialogDescription className="mt-1 sm:mt-2 text-sm sm:text-base text-white/70">
                  {offerData.description}
                </DialogDescription>
              </DialogHeader>

              <div className="flex-grow mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                {/* Pricing Table */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  {Object.entries(offerData.offerPrice).map(([carType, price]) => (
                    <div
                      key={carType}
                      className="border border-zinc-700 rounded-lg p-2 bg-zinc-800"
                    >
                      <h3 className="font-medium text-xs sm:text-sm text-white/90 capitalize">
                        {carType}
                      </h3>
                      <p className="font-bold text-sm sm:text-lg text-white">₹{price}</p>
                    </div>
                  ))}
                </div>

                {/* Services Included */}
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1 sm:mb-2 text-white/90">
                    Services Included:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
                    {offerData.servicesIncluded.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-1 sm:mr-2 text-green-400 flex-shrink-0">✓</span>
                        <span className="text-white/80">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Validity */}
                <div className="bg-zinc-800 p-2 rounded-md text-center text-xs sm:text-sm">
                  <p className="text-white/70">
                    Valid from{" "}
                    <span className="font-medium text-white/90">
                      {offerData.validityPeriod.start}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-white/90">
                      {offerData.validityPeriod.end}
                    </span>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full py-2 px-4 border border-zinc-700 rounded-md text-white/70 text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  Remind Later
                </button>
                <Link href={"/contacts"} onClick={() => setOpen(false)} className="w-full text-center py-2 px-4 bg-primary rounded-md text-white text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity">
                  {offerData.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OfferPopup;