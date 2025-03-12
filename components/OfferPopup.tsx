"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  ctaText: "Book Now & Save 20%",
  offerImage: "/offerImage.jpg",
  displayDuration: 8000, // Time before popup appears (in ms)
};

function OfferPopup() {
  // Lazy state initialization to trigger modal after mount
  const [open, setOpen] = useState(() => {
    let timeout = setTimeout(() => {
      setOpen(true);
    }, offerData.displayDuration);
    return false; // Ensures initial state is closed
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-zinc-900 text-white/80">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Image */}
            <div className="relative h-full min-h-60 md:min-h-full">
              <Image
                src={offerData.offerImage}
                alt={`${offerData.festivalName} Offer`}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Right side - Content */}
            <div className="p-6 flex flex-col bg-zinc-900">
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl font-bold text-white">
                  {offerData.title}
                </DialogTitle>
                <DialogDescription className="mt-2 text-white/70">
                  {offerData.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 flex-grow mt-4">
                {/* Pricing Table */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  {Object.entries(offerData.offerPrice).map(([carType, price]) => (
                    <div key={carType} className="border border-zinc-700 rounded p-2 bg-zinc-800">
                      <h3 className="font-medium text-sm text-white/90">
                        {carType.charAt(0).toUpperCase() + carType.slice(1)}
                      </h3>
                      <p className="font-bold text-lg text-white">₹{price}</p>
                    </div>
                  ))}
                </div>

                {/* Services Included */}
                <div>
                  <h3 className="font-medium mb-2 text-white/90">Services Included:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {offerData.servicesIncluded.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-green-400">✓</span>
                        <span className="text-sm text-white/80">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Validity */}
                <div className="bg-zinc-800 p-2 rounded-md text-center text-sm">
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

              <div className="mt-4 flex gap-2">
                {/* Custom Close Button using Tailwind */}
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2 px-4 border border-zinc-700 rounded-md text-white/70 text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  Remind Later
                </button>

                {/* Custom CTA Button using Primary color */}
                <button className="flex-1 py-2 px-4 bg-primary rounded-md text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  {offerData.ctaText}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OfferPopup;
