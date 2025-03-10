import { Roboto, Big_Shoulders_Stencil_Text, Red_Hat_Display } from "next/font/google";

// Roboto Font
export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// Big Shoulders Stencil Text Font
export const bigShouldersStencil = Big_Shoulders_Stencil_Text({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-big-shoulders-stencil",
});

// Red Hat Display Font
export const Fonts = Red_Hat_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-red-hat-display",
});



