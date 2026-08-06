"use client";

import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeRFQ() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-24 bg-background relative overflow-hidden crosshair-grid">
      {/* Visual background lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute bottom-10 left-0 right-0 h-px bg-steel/30"></div>
        <div className="absolute right-[20%] top-0 bottom-0 w-px bg-steel/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="surface-card border border-border p-8 sm:p-12 rounded-[2rem] relative overflow-hidden floating-surface">
          {/* Left accent marker block */}
          <div className="absolute top-0 left-0 w-2 h-full bg-orange/90"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-orange font-semibold block">
                {t("rfqTag")}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-foreground leading-tight">
                {t("rfqTitle")}
              </h2>
              <p className="font-sans text-sm text-steel leading-relaxed max-w-2xl">
                {t("rfqSubtitle")}
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs font-mono text-steel">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-blue rounded-full"></span>
                  <span>PDF / DWG / DXF / STEP / XLSX</span>
                </span>
                <span className="hidden sm:inline text-steel/30">|</span>
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                  <span>{t("inStockYard")}</span>
                </span>
              </div>
            </div>

            {/* Right Action Buttons (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col space-y-3.5 w-full">
              <Link
                href="/contact"
                className="font-sans text-xs font-bold uppercase tracking-wider bg-blue hover:bg-blue/90 text-white w-full py-4 rounded-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>{t("submitDetailedRfq")}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              
              <a
                href="tel:+971505751347"
                className="font-sans text-xs font-semibold uppercase tracking-wider bg-white border border-border hover:border-steel hover:bg-graphite text-foreground w-full py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-steel" />
                <span>{t("callOffice")}</span>
              </a>

              <a
                href="mailto:kaleel@babalkhibrah.com"
                className="font-sans text-xs font-semibold uppercase tracking-wider bg-white border border-border hover:border-steel hover:bg-graphite text-foreground w-full py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4 text-steel" />
                <span>{t("emailSalesDesk")}</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
