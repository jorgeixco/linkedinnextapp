import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../index.css"; // Import the global CSS from the original app
import { ConditionalNavbar } from "../components/ConditionalNavbar";
import { Footer } from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LinkedIn App Next",
  description: "Migrated LinkedIn App to Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}