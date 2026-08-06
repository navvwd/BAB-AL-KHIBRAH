"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, MessageCircle, Phone, ArrowRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("product"), href: "/materials" },
    { name: t("contact"), href: "/contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md py-3"
            : "bg-white/80 backdrop-blur-sm border-b border-slate-200/50 py-4 lg:py-5"
        }`}
      >
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Tagline */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 group">
                <Image
                  src="/BAK LOGO_ENGLISH _ARABIC.jpg.jpeg"
                  alt="Bab Al Khibrah Trading LLC Logo"
                  width={240}
                  height={65}
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                  priority
                />
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => {
                  const isActive = mounted && (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative font-sans text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-sm transition-all duration-200 ${
                        isActive
                          ? "text-[#D65A24] font-bold"
                          : "text-slate-700 hover:text-[#D65A24] hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D65A24]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Header Right Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              
              {/* Language Switcher Toggle */}
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center space-x-1.5 font-sans text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2.5 rounded-sm transition-all border border-slate-200 cursor-pointer shadow-xs"
                title={language === "en" ? "Switch to Arabic (Saudi Arabia)" : "Switch to English"}
              >
                <Globe className="w-3.5 h-3.5 text-[#D65A24]" />
                <span>{language === "en" ? "🇸🇦 العربية" : "🇬🇧 English"}</span>
              </button>

              {/* Direct WhatsApp B2B Chat Button */}
              <a
                href="https://wa.me/971505751347?text=Hello%20Bab%20Al%20Khibrah%2C%20I%20would%20like%20to%20inquire%20about%20engineering%20steel%20materials%20%26%20cut-to-size%20stock."
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Sales Desk on WhatsApp"
                className="inline-flex items-center space-x-2 font-sans text-xs font-semibold text-slate-700 hover:text-[#25D366] bg-slate-100 hover:bg-[#25D366]/10 px-3.5 py-2.5 rounded-sm transition-all border border-slate-200"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{t("whatsappDesk")}</span>
              </a>

              {/* Primary RFQ CTA Button */}
              <Link
                href="/contact"
                className="font-sans text-xs font-bold uppercase tracking-wider bg-[#1C3B5E] hover:bg-[#152D47] text-white px-5 py-2.5 rounded-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] flex items-center space-x-1.5"
              >
                <span>{t("requestQuote")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Controls (Lang Switch + Hamburger) */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={toggleLanguage}
                className="font-sans text-[11px] font-bold bg-slate-100 text-slate-800 px-2.5 py-1.5 rounded-sm border border-slate-200"
              >
                {language === "en" ? "🇸🇦 العربية" : "🇬🇧 EN"}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-slate-900 hover:bg-slate-100 focus:outline-none border border-slate-200"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-white border-l border-slate-200 p-6 shadow-2xl flex flex-col justify-between z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Header inside Mobile Drawer */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <Image
                    src="/BAK LOGO_ENGLISH _ARABIC.jpg.jpeg"
                    alt="Bab Al Khibrah Trading LLC Logo"
                    width={180}
                    height={50}
                    className="h-8 w-auto object-contain"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => {
                    const isActive = mounted && (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`font-display text-xl font-bold tracking-wide flex items-center justify-between py-2 border-b border-slate-50 ${
                          isActive ? "text-[#D65A24]" : "text-slate-800 hover:text-[#D65A24]"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Drawer Bottom Quick Contacts & CTA */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <button
                  onClick={toggleLanguage}
                  className="w-full font-sans text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-sm flex items-center justify-center space-x-2 border border-slate-200"
                >
                  <Globe className="w-4 h-4 text-[#D65A24]" />
                  <span>{language === "en" ? "🇸🇦 العربية (Saudi Arabia)" : "🇬🇧 Switch to English"}</span>
                </button>

                <a
                  href="tel:+971505751347"
                  className="flex items-center space-x-3 text-slate-700 hover:text-[#D65A24] text-xs font-sans"
                >
                  <Phone className="w-4 h-4 text-[#D65A24]" />
                  <span>{t("callUs")}: +971 50 575 1347</span>
                </a>

                <a
                  href="https://wa.me/971505751347?text=Hello%20Bab%20Al%20Khibrah%2C%20I%20would%20like%20to%20inquire%20about%20engineering%20steel%20materials%20%26%20cut-to-size%20stock."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-bold text-center uppercase tracking-wider bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 rounded-sm flex items-center justify-center space-x-2 transition-all w-full shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t("whatsappDesk")}</span>
                </a>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-xs font-bold text-center uppercase tracking-wider bg-[#1C3B5E] text-white py-3 rounded-sm transition-all shadow-sm block w-full text-center"
                >
                  {t("requestQuote")}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
