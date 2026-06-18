import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/lib/cartContext";
import "./globals.css";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import NavbarWrapper, { FooterWrapper } from "@/components/NavbarWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Litsy Global Beauty",
  description: "Premium Asian self-care products, thoughtfully curated for South Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} min-h-screen flex flex-col`}>
        <CartProvider>
         <Toaster
            position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                background: "#1a1a1a",
                color: "#fffaf6",
                fontSize: "12px",
                letterSpacing: "0.05em",
                borderRadius: "0px",
                padding: "12px 24px",
              },
            }}
          />
          <NavbarWrapper />
            <main className="flex-1">
              {children}
            </main>
            <FooterWrapper />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}