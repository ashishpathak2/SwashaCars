import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import { Fonts } from "@/components/Fonts";


export const metadata: Metadata = {
  title: "Swasha Cars",
  description: "Every car service destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Fonts.className}  antialiased scroll-smooth`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
