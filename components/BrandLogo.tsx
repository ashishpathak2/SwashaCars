import Image from "next/image";
import Link from "next/link";
import clsx from "clsx"; // Optional, for cleaner class handling

interface BrandLogoProps {
  isFooter?: boolean;
}

const BrandLogo = ({ isFooter = false }: BrandLogoProps) => {
  return (
    <Link
      href="/"
      className={clsx("flex items-center ", isFooter ? "gap-2 mb-2" : "gap-4")}
      aria-label="Swasha Garage Logo"
    >
      {/* Logo Container */}
      <div
        className={clsx(
          "rounded-[3px] overflow-hidden flex justify-center items-center bg-white",
          isFooter ? "w-10 h-10" : "w-12 h-12"
        )}
      >
        <Image
          src="/Brand-logo.jpeg"
          alt="Swasha Garage Logo"
          width={100}
          height={100}
          priority={!isFooter} 
          sizes="(max-width: 768px) 40px, 56px"
          className="object-contain"
        />
      </div>

      {/* Brand Name */}
      <div className="flex items-center">
        <span className={clsx("font-bold tracking-wider text-white", isFooter ? "text-2xl" : "text-4xl")}>
          Swasha
        </span>
        <span className={clsx("text-primary font-bold tracking-wider", isFooter ? "text-2xl" : "text-4xl")}>
          Cars
        </span>
      </div>
    </Link>
  );
};

export default BrandLogo;
