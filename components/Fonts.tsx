import { Roboto, Big_Shoulders_Stencil_Text, Red_Hat_Display } from "next/font/google";

// Roboto Font
export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"], // Minimal subset for efficiency
  display: "swap", // Ensures text is visible during font load
  variable: "--font-roboto",
  preload: true, // Preloads font for faster rendering
});

// Big Shoulders Stencil Text Font
export const bigShouldersStencil = Big_Shoulders_Stencil_Text({
  weight: ["400", "700"],
  subsets: ["latin"], // Minimal subset for efficiency
  display: "swap", // Ensures text is visible during font load
  variable: "--font-big-shoulders-stencil",
  preload: true, // Preloads font for faster rendering
});

// Red Hat Display Font
export const Fonts = Red_Hat_Display({
  weight: ["400", "700"],
  subsets: ["latin"], // Minimal subset for efficiency
  display: "swap", // Ensures text is visible during font load
  variable: "--font-red-hat-display",
  preload: true, // Preloads font for faster rendering
});