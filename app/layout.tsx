import type { Metadata } from "next";
import "./globals.css";
import { Fonts } from "@/components/Fonts";
import CustomLayout from "@/components/CustomLayout"; // Import the client Layout

export const metadata: Metadata = {
  title: "Swasha Cars - Premium Car Services & Auto Care",
  description: "Your one-stop destination for car servicing, maintenance, and premium auto care. Experience top-quality car repairs and detailing.",
  keywords: ["car services", "auto repair", "vehicle maintenance", "car detailing", "premium auto care"],
  authors: [{ name: "Swasha Cars", url: "https://swashacars.in" }],
  creator: "Swasha Cars",
  publisher: "Swasha Cars",
  openGraph: {
    title: "Swasha Cars - Premium Auto Care",
    description: "High-quality car servicing, repairs, and maintenance. Trusted by thousands of customers.",
    url: "https://swashacars.in",
    siteName: "Swasha Cars",
    images: [
      {
        url: "https://swashacars.in/images/og-image.jpg", // Use a single, high-quality image
        width: 1200,
        height: 630,
        alt: "Swasha Cars - Premium Auto Care",
      },
    ],
    locale: "en_US", // Optional: Specify language/region
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swasha Cars - Best Car Services",
    description: "Reliable car services, maintenance, and detailing. Book your service today!",
    images: ["https://swashacars.in/images/og-image.jpg"], // Reuse OG image or use a specific one
    creator: "@SwashaCars", // Your Twitter handle (replace if different)
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://swashacars.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${Fonts.className} bg-black antialiased scroll-smooth`}>
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
