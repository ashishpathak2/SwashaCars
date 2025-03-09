import { Roboto, Big_Shoulders_Stencil_Text } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const Fonts = Big_Shoulders_Stencil_Text({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-big-shoulders-stencil",
});
