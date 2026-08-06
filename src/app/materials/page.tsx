"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { materialCatalog } from "@/data/catalog";
import { useLanguage } from "@/context/LanguageContext";

export default function MaterialsCatalog() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center font-sans text-steel">
        Loading Materials Catalogue...
      </div>
    }>
      <MaterialsCatalogInner />
    </Suspense>
  );
}

function MaterialsCatalogInner() {
  const { t, isRTL } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-28 pb-20 grid-bg min-h-screen text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6 font-mono text-[10px] text-steel flex items-center space-x-2">
            <Link href="/" className="hover:text-[#D65A24] transition-colors">{t("home")}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{t("product")}</span>
          </div>

          {/* Section Header */}
          <div className="mb-12 max-w-3xl space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-none">
              {t("productsPageTitle")}
            </h1>
            <p className="font-sans text-sm text-steel leading-relaxed">
              {t("productsPageSubtitle")}
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materialCatalog.map((grade) => (
              <div
                key={grade.grade}
                className="bg-graphite border border-border rounded-sm p-6 flex flex-col justify-between hover:border-[#D65A24]/40 transition-all duration-300 group shadow-md"
              >
                <div>
                  {/* Official Product Image Display */}
                  <div className="relative w-full h-48 rounded-sm overflow-hidden mb-5 border border-border bg-background">
                    <Image
                      src={grade.image}
                      alt={`${grade.grade} - ${grade.family}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-border">
                      <span className="font-mono text-[9px] text-[#D65A24] font-bold tracking-wider uppercase">
                        {grade.family}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-steel font-bold block">
                      {grade.family}
                    </span>
                    <h2 className="font-display text-xl font-bold text-foreground group-hover:text-[#D65A24] transition-colors">
                      {grade.grade}
                    </h2>
                    <p className="font-sans text-xs text-steel leading-relaxed line-clamp-3">
                      {grade.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-border/80 pt-4 mb-6">
                    <div className="flex items-center space-x-2 font-mono text-[10px] text-steel">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                      <span>{t("inStockYard")}</span>
                    </div>
                    <div className="flex items-center space-x-2 font-mono text-[10px] text-steel">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D65A24] shrink-0" />
                      <span>{t("guaranteedMTC")}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href="/contact"
                    className="w-full font-sans text-xs font-bold uppercase tracking-wider bg-[#1C3B5E] hover:bg-[#152D47] text-white py-3 rounded-sm flex items-center justify-center space-x-2 transition-colors shadow-sm"
                  >
                    <span>{t("requestQuoteForGrade")}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
