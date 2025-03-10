import type { Metadata } from "next";
import "./globals.css";
import { Fonts } from "@/components/Fonts";
import CustomLayout from "@/components/CustomLayout"; // Import the client Layout

export const metadata: Metadata = {
  title: "Swasha Cars",
  description: "Every car service destination",
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
