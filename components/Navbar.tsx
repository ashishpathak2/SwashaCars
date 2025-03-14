"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import BrandLogo from "./BrandLogo";
import OfferPopup from "./OfferPopup";
import { services } from "@/AppData/TypesOfService";
import useIsMobile from "@/hooks/UseIsMobile"; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(); 

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  const toggleServicesMenu = () => {
    setIsServicesOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleServicesMenu();
    } else if (e.key === "Escape" && isServicesOpen) {
      setIsServicesOpen(false);
      servicesButtonRef.current?.focus();
    } else if (e.key === "ArrowDown" && isServicesOpen) {
      e.preventDefault();
      const firstItem = servicesMenuRef.current?.querySelector("a");
      firstItem?.focus();
    }
  };

  const handleMenuKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    totalItems: number
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextItem = servicesMenuRef.current?.querySelectorAll("a")[index + 1];
      nextItem?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index === 0) {
        servicesButtonRef.current?.focus();
      } else {
        const prevItem = servicesMenuRef.current?.querySelectorAll("a")[index - 1];
        prevItem?.focus();
      }
    } else if (e.key === "Escape") {
      setIsServicesOpen(false);
      servicesButtonRef.current?.focus();
    }
  };

  const navItems = [
    {
      label: "Services",
      path: "/services",
      hasDropdown: true,
      dropdownItems: services.map((s) => ({
        id: s.id,
        label: s.name,
        path: `/services/${s.id}`,
      })),
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out text-white py-5",
        isScrolled ? "bg-black/90 shadow-md" : "bg-transparent"
      )}
      aria-label="Main Navigation"
    >
      <div className="responsive-container">
        <div className="flex items-center justify-between">
          <BrandLogo isScrolled={isScrolled} />

          {/* Desktop Navigation - Hidden on mobile */}
          <nav
            className={cn("items-center gap-8", isMobile ? "hidden" : "flex")}
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <button
                      ref={servicesButtonRef}
                      className={cn(
                        "text-base font-semibold text-gray-300 hover:text-white transition-colors flex items-center cursor-pointer tracking-wide",
                        isActive(item.path) && "text-white"
                      )}
                      aria-haspopup="true"
                      aria-expanded={isServicesOpen}
                      aria-controls="services-dropdown"
                      onClick={toggleServicesMenu}
                      onKeyDown={handleKeyDown}
                      onMouseDown={(e) => e.preventDefault()}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform duration-300",
                          isServicesOpen ? "-rotate-180" : "group-hover:-rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      ref={servicesMenuRef}
                      id="services-dropdown"
                      className={cn(
                        "absolute top-full left-0 mt-2 w-56 rounded-b-sm shadow-lg bg-black/90 ring-1 transition-all duration-200 z-50",
                        isServicesOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                      )}
                      role="menu"
                      aria-label="Services Submenu"
                    >
                      <div className="py-1">
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <Link
                            key={dropdownItem.id}
                            href={dropdownItem.path}
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                            role="menuitem"
                            tabIndex={isServicesOpen ? 0 : -1}
                            onKeyDown={(e) =>
                              handleMenuKeyDown(e, index, item.dropdownItems!.length)
                            }
                            onMouseDown={(e) => e.preventDefault()}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "text-base font-semibold text-gray-300 hover:text-white transition-colors tracking-wide",
                      isActive(item.path) && "text-white"
                    )}
                    onMouseDown={(e) => e.preventDefault()}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {item.label}
                  </Link>
                )}
                {item.label === "Services" && <OfferPopup />}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button - Shown only on mobile */}
          <button
            onClick={toggleServicesMenu} // Using toggleServicesMenu for mobile menu as well
            className={cn("p-2 text-white rounded-md", isMobile ? "block" : "hidden")}
            aria-label={isServicesOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isServicesOpen}
            aria-controls="mobile-menu"
            onMouseDown={(e) => e.preventDefault()}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isServicesOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Shown only on mobile when open */}
        <nav
          id="mobile-menu"
          className={cn(
            "transition-all duration-300",
            isMobile && isServicesOpen ? "mt-4 block" : "hidden"
          )}
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col gap-2 py-4 bg-gray-900/95 rounded-lg shadow-lg">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.hasDropdown ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full text-base font-semibold text-white px-4 py-2 tracking-wide"
                      aria-haspopup="true"
                      aria-expanded={isServicesOpen}
                      aria-controls={`mobile-dropdown-${item.label.toLowerCase().replace(" ", "-")}`}
                      onClick={toggleServicesMenu}
                      onMouseDown={(e) => e.preventDefault()}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <div
                      id={`mobile-dropdown-${item.label.toLowerCase().replace(" ", "-")}`}
                      className={cn(
                        "transition-all duration-300 pl-4",
                        isServicesOpen ? "block" : "hidden"
                      )}
                      role="menu"
                      aria-label={`${item.label} Submenu`}
                    >
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.id}
                          href={dropdownItem.path}
                          className="block pl-2 pr-4 py-2 text-sm text-gray-300 hover:text-white"
                          role="menuitem"
                          onMouseDown={(e) => e.preventDefault()}
                          style={{ WebkitTapHighlightColor: "transparent" }}
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
                    onMouseDown={(e) => e.preventDefault()}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;