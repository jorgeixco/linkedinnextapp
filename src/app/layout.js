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
  title: "Certificaciones IXComercio",
  description: "Plataforma para gestión y emisión de certificados profesionales de IXComercio. Valida tu formación y comparte tus logros profesionales.",
  keywords: ["certificaciones", "IXComercio", "formación profesional", "certificados", "validación", "LinkedIn"],
  authors: [{ name: "IXComercio" }],
  creator: "IXComercio",
  publisher: "IXComercio",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "100x100", type: "image/png" },
    ],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
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