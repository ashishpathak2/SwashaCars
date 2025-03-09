"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    {
      label: "Services",
      path: "/services",
      hasDropdown: true,
      dropdownItems: [
        { label: "Maintenance & Repairs", path: "/services#maintenance" },
        { label: "Documentation", path: "/services#documentation" },
        { label: "Detailing", path: "/services#detailing" },
        { label: "Dealership Services", path: "/services#dealership" },
      ],
    },
    { label: "Contact Us", path: "/contacts" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out text-white py-5",
        isScrolled ? " bg-black/90 shadow-md" : "bg-black"
      )}
    >
      <div className="responsive-container">
        <div className="flex items-center justify-between">
          {/* Logo on the Left */}
          <Link href="/" className="flex items-center gap-2" aria-label="Swasha Garage Logo">
            <Image src="/brand logo.jpg" alt="Brand Logo" width={40} height={40} className="rounded-[3px]" />
            <span className="font-bold text-3xl text-white">Swasha</span>
            <span className="text-primary font-bold text-3xl">Cars</span>
          </Link>

          {/* Right Navigation (Services + Contact Us) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div className="group inline-block">
                    <span
                      className={cn(
                        "text-base font-semibold text-gray-300 hover:text-white transition-colors flex items-center cursor-pointer tracking-wide",
                        isActive(item.path) && "text-white"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:-rotate-180" />
                    </span>
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-2 w-56 rounded-b-sm shadow-lg bg-black/90 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                      )}
                    >
                      <div className="py-1">
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <Link
                            key={index}
                            href={dropdownItem.path}
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "text-base font-semibold text-gray-300 hover:text-white transition-colors tracking-wide",
                      isActive(item.path) && "text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-white rounded-md focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn("md:hidden transition-all duration-300", isMobileMenuOpen ? "mt-4" : "hidden")}>
          <div className="flex flex-col gap-2 py-4 bg-gray-900/95 rounded-lg shadow-lg">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.hasDropdown ? (
                  <>
                    <button className="flex items-center justify-between w-full text-base font-semibold text-white px-4 py-2 tracking-wide">
                      <span>{item.label}</span>
                    </button>
                    <div className="overflow-hidden transition-all">
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <Link
                          key={index}
                          href={dropdownItem.path}
                          className="block pl-6 pr-4 py-2 text-sm text-gray-300 hover:text-white"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className="block text-base font-semibold text-white px-4 py-2 hover:text-primary tracking-wide"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
