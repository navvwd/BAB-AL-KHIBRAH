import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollToTop from "@/components/ui/ScrollToTop";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bab Al Khibrah | B2B Engineering Steel & Alloy Stockist Sharjah UAE & KSA",
  description: "Established in 2015, Bab Al Khibrah Trading LLC supplies and processes medium carbon, high-tensile, tool, and stainless steels, and aluminium alloys across the UAE, Saudi Arabia, and GCC.",
  keywords: ["engineering steel supplier sharjah", "alloy steel supplier uae", "EN19 steel supplier", "D2 tool steel uae", "cut to size steel uae", "موزع صلب الشارقة"],
  authors: [{ name: "Bab Al Khibrah Trading LLC" }],
  openGraph: {
    title: "Bab Al Khibrah | B2B Engineering Steel & Alloy Stockist Sharjah UAE & KSA",
    description: "Established in 2015, Bab Al Khibrah Trading LLC supplies and processes medium carbon, high-tensile, tool, and stainless steels, and aluminium alloys across the UAE, Saudi Arabia, and GCC.",
    url: "http://babalkhibrah.com",
    siteName: "Bab Al Khibrah Trading LLC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LanguageProvider>
          {children}
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
