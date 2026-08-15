"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const materials = [
    { name: t("product1Name"), href: "/materials" },
    { name: t("product2Name"), href: "/materials" },
    { name: t("product5Name"), href: "/materials" },
    { name: t("product3Name"), href: "/materials" },
    { name: t("product7Name"), href: "/materials" },
    { name: t("product8Name"), href: "/materials" }
  ];

  const quickLinks = [
    { name: t("about"), href: "/about" },
    { name: t("product"), href: "/materials" },
    { name: t("contact"), href: "/contact" }
  ];

  return (
    <footer className="bg-background pt-16 pb-8 relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="surface-card border border-border p-8 sm:p-10 rounded-[2rem] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Company Brief Column (Spans 2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 border border-steel/30 rotate-45"></div>
                  <div className="w-1.5 h-1.5 bg-[#D65A24] rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-base font-bold tracking-wider leading-none text-foreground">
                    {t("footerAboutTitle")}
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-steel font-semibold mt-0.5">
                    Trading L.L.C • Steel Specialist
                  </span>
                </div>
              </div>
              <p className="font-sans text-sm text-steel leading-relaxed max-w-sm">
                {t("footerAboutDesc")}
              </p>
              <div className="space-y-3 font-sans text-sm text-foreground/90">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#D65A24] shrink-0 mt-0.5" />
                  <a
                    href="https://maps.app.goo.gl/e6r8qU6VLgimDKrr5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D65A24] transition-colors"
                  >
                    {t("yardLocationAddress")}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#D65A24] shrink-0" />
                  <span>{t("workDays")}: {t("workHours")}</span>
                </div>
              </div>
            </div>

            {/* Our Products Column */}
            <div className="space-y-4">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground block border-b border-border pb-2">
                {t("ourProducts")}
              </span>
              <ul className="space-y-2.5 font-sans text-xs">
                {materials.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-steel hover:text-[#D65A24] transition-colors block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links & Direct Contacts */}
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground block border-b border-border pb-2">
                  {t("quickLinks")}
                </span>
                <ul className="space-y-2.5 font-sans text-xs">
                  {quickLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="text-steel hover:text-[#D65A24] transition-colors block py-0.5"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 font-sans text-sm border-t border-border pt-4">
                <span className="font-display text-[10px] uppercase tracking-widest text-steel block">
                  {t("salesCoordinates")}
                </span>
                <div className="space-y-1.5 text-xs text-steel">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-[#D65A24]" />
                    <span><a href="tel:+971505751347" className="hover:text-[#D65A24] transition-colors">+971 50 575 1347</a> | <a href="tel:+9710564467949" className="hover:text-[#D65A24] transition-colors">+971 056 446 7949</a></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-[#D65A24]" />
                    <span><a href="mailto:kaleel@babalkhibrah.com" className="hover:text-[#D65A24] transition-colors">kaleel@babalkhibrah.com</a> | <a href="mailto:sales@babalkhibrah.com" className="hover:text-[#D65A24] transition-colors">sales@babalkhibrah.com</a></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Lower footer */}
        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between font-sans text-xs text-steel space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} {t("allRightsReserved")}
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/materials" className="hover:text-foreground transition-colors">
              {t("product")}
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
