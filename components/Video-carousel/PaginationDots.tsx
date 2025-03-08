import React from "react";
import { cn } from "@/lib/utils";

interface PaginationDotsProps {
  videosLength: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({
  videosLength,
  activeIndex,
  onDotClick,
}) => (
  <div
    className={cn(
      "absolute left-1/2 transform -translate-x-1/2 flex space-x-2 z-30",
      "bottom-20 md:bottom-6"
    )}
  >
    {Array.from({ length: videosLength }).map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={cn(
          "rounded-full transition-all duration-300",
          "w-2 h-2 md:w-2.5 md:h-2.5",
          index === activeIndex
            ? "bg-white w-6 md:w-8"
            : "bg-gray-500 hover:bg-gray-400"
        )}
        aria-label={`Go to video ${index + 1}`}
      />
    ))}
  </div>
);

export default PaginationDots;