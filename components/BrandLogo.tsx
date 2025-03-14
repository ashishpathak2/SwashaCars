"use client"; // If used in a client component; remove if in a server component
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface BrandLogoProps {
  isFooter?: boolean;
  isScrolled?: boolean;
}

const BrandLogo = ({ isFooter = false, isScrolled = false }: BrandLogoProps) => {
  return (
    <Link
      href="/"
      className={clsx(
        "flex items-center transition-all duration-300 ease-in-out ",
        isFooter ? "gap-2 mb-2" : "gap-4"
      )}
      aria-label="Swasha Cars - Home"
    >
      {/* Logo Container */}
      <div
        className={clsx(
          "rounded-[3px] overflow-hidden flex justify-center items-center bg-white transition-all duration-300 ease-in-out",
          isFooter
            ? "w-10 h-10"
            : isScrolled
            ? "w-9 h-9"
            : "w-12 h-12"
        )}
      >
        <Image
          src="/Brand-logo.jpg"
          alt="Swasha Cars Logo - Premium Car Services"
          width={100}
          height={100}
          priority={!isFooter} // Priority for header, not footer
          sizes="(max-width: 768px) 40px, 56px"
          className="object-contain"
          loading={isFooter ? "lazy" : "eager"} // Lazy load in footer
        />
      </div>

      {/* Brand Name */}
      <div className="flex items-center transition-all duration-300 ease-in-out">
        <span
          className={clsx(
            "font-bold tracking-wider text-white transition-all duration-300 ease-in-out",
            isFooter ? "text-2xl" : isScrolled ? "text-3xl" : "text-4xl"
          )}
        >
          Swasha
        </span>
        <span
          className={clsx(
            "text-primary font-bold tracking-wider transition-all duration-300 ease-in-out",
            isFooter ? "text-2xl" : isScrolled ? "text-3xl" : "text-4xl"
          )}
        >
          Cars
        </span>
      </div>
    </Link>
  );
};

export default BrandLogo;