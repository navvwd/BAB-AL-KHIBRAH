"use client";

import Link from "next/link";
import Image from "next/image";
import { Download, ArrowRight, CheckCircle, Truck, Scissors, FlaskConical, Globe, Phone } from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  return (
    <>
      <Header />
      {/* Page Hero */}
      <main className="flex-1 bg-background pt-28 pb-0 min-h-screen text-foreground">

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="bg-background border-b border-border pb-16 pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-3 font-mono text-[10px] text-steel">
              <Link href="/" className="hover:text-[#D65A24] transition-colors">{t("home").toUpperCase()}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{t("about").toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="font-mono text-xs text-[#D65A24] uppercase tracking-widest font-bold block">
                  {isAr ? "متخصص في صلب الهندسة والصناعة — الإمارات والشرق الأوسط" : "Engineering Steel Specialist — UAE & Middle East"}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-tight">
                  {t("whoWeAreTitle")}
                </h1>
                <p className="font-sans text-base text-steel leading-relaxed">
                  {t("whoWeAreP1")}
                </p>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {t("whoWeAreP2")}
                </p>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {t("whoWeAreP3")}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider bg-[#1C3B5E] hover:bg-[#152D47] text-white px-7 py-3.5 rounded-sm transition-all"
                  >
                    <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                    {t("requestQuote")}
                  </Link>
                  <a
                    href="/bbk-brchr.pdf"
                    download="Bab-Al-Khibrah-Brochure.pdf"
                    className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider border border-[#D65A24] text-[#D65A24] hover:bg-[#D65A24] hover:text-white px-7 py-3.5 rounded-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    {t("downloadBrochure")}
                  </a>
                </div>
              </div>

              {/* Company Photo */}
              <div className="relative h-80 lg:h-[420px] rounded-sm overflow-hidden border border-border">
                <Image
                  src="/IMG_20260801_174755.jpg.jpeg"
                  alt="Bab Al Khibrah Sharjah warehouse"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="font-mono text-[10px] text-white/70 uppercase tracking-widest">
                    {isAr ? "مستودع الشارقة · تأسست 2015" : "Sharjah Yard · Est. 2015"}
                  </p>
                  <p className="font-sans text-sm text-white font-semibold">
                    {isAr ? "منشأة صناعية بمساحة 3,600 قدم مربع" : "3,600 sq.ft Industrial Facility"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRODUCTS & SERVICES ─────────────────────────────── */}
        <section className="py-16 bg-graphite border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="font-mono text-xs text-[#D65A24] uppercase tracking-widest font-bold block mb-2">
                {t("prodServicesTitle")}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground mb-4">
                {isAr ? "ما نوفر ونقدمه" : "What We Stock & Offer"}
              </h2>
              <p className="font-sans text-sm text-steel leading-relaxed">
                {t("prodServicesP1")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                isAr ? "فولاذ كربوني متوسط (C45 / EN8 / CK45)" : "Medium carbon steels (C45 / EN8 / CK45)",
                isAr ? "قضبان الكروم المقسى للهيدروليك (C45E / CK45)" : "Hard chrome plated cylindrical rods (C45E / CK45)",
                isAr ? "سبائك صلب عالية الشد (EN19 / EN24 / 4140 / 4340)" : "High tensile steels (EN19 / EN24 / 4140 / 4340 — Q+T or Annealed)",
                isAr ? "صلب الأدوات والقوالب (1.2379 / D2 / 1.2311 / 1.2312 / P20)" : "Tool steels (1.2379 / D2 / 1.2311 / 1.2312 / P20)",
                isAr ? "ألمنيوم الطيران والصناعة (7075 T6 / 2024)" : "Aluminium (7075 T6 / 2024)",
                isAr ? "فولاذ مقاوم للصدأ (316L / 304L)" : "Stainless steel (316L / 304L)",
              ].map((product, i) => (
                <div key={i} className="bg-background border border-border p-4 rounded-sm flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#D65A24] shrink-0 mt-0.5" />
                  <span className="font-sans text-xs text-steel leading-relaxed">{product}</span>
                </div>
              ))}
            </div>

            <div className="bg-background border border-[#D65A24]/30 p-6 rounded-sm">
              <p className="font-sans text-sm text-foreground font-semibold mb-1">
                {isAr ? "خدمات القص والقطع بالمنشار الميكانيكي" : "In-House Cutting / Sawing Services"}
              </p>
              <p className="font-sans text-xs text-steel leading-relaxed">
                {t("prodServicesP2")}
              </p>
            </div>
          </div>
        </section>

        {/* ─── SPECIAL REQUIREMENTS & COMMITMENT ───────────────── */}
        <section className="py-16 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <span className="font-mono text-xs text-[#D65A24] uppercase tracking-widest font-bold block">
                  {t("specialReqTitle")}
                </span>
                <h2 className="font-display text-2xl font-black text-foreground">
                  {isAr ? "حلول تتجاوز المخزون القياسي" : "Beyond Standard Stock"}
                </h2>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {t("specialReqP1")}
                </p>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {t("specialReqP2")}
                </p>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {t("specialReqP3")}
                </p>
              </div>

              <div className="space-y-6">
                <span className="font-mono text-xs text-[#D65A24] uppercase tracking-widest font-bold block">
                  {t("inspectionTitle")}
                </span>
                <h2 className="font-display text-2xl font-black text-foreground">
                  {isAr ? "فحوصات وااختبارات الطرف الثالث" : "Third Party Testing"}
                </h2>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {t("inspectionDesc")}
                </p>

                <div className="bg-graphite border border-border p-6 rounded-sm space-y-3">
                  <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-border pb-2">
                    {t("whereSupplyTitle")}
                  </span>
                  <ul className="space-y-2">
                    {(isAr
                      ? [
                          "صناع الأدوات والقوالب",
                          "ورش إصلاح المعدات الهندسية والهيدروليكية",
                          "مصنعو قطع غيار الماكينات",
                          "مصانع المنشآت الهيكلية والصلب",
                          "صناعات السيارات والنقل",
                          "الصناعات البحرية والملاحة",
                        ]
                      : [
                          "Tool & Die Makers",
                          "Hydraulic Equipment Repairing Workshops",
                          "Machineries' Spare Parts Manufacturers",
                          "Steel Fabricators",
                          "Automotive Industries",
                          "Marine Industries",
                        ]
                    ).map((industry, i) => (
                      <li key={i} className="flex items-center gap-2 font-sans text-xs text-steel">
                        <ArrowRight className={`w-3 h-3 text-[#D65A24] ${isAr ? "rotate-180" : ""}`} />
                        {industry}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4 SERVICE PILLARS ───────────────────────────────── */}
        <section className="py-16 bg-graphite border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="font-mono text-xs text-[#D65A24] uppercase tracking-widest font-bold block mb-2">
                {isAr ? "التزاماتنا وركائز خدمتنا" : "Our Commitments"}
              </span>
              <h2 className="font-display text-3xl font-black text-foreground">
                {isAr ? "كيف نخدمك ونلبي طلبك" : "How We Serve You"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Scissors className="w-5 h-5 text-[#D65A24]" />,
                  title: t("cutToSizeTitle"),
                  desc: t("cutToSizeDesc"),
                },
                {
                  icon: <CheckCircle className="w-5 h-5 text-[#D65A24]" />,
                  title: t("sameDayPickupTitle"),
                  desc: t("sameDayPickupDesc"),
                },
                {
                  icon: <Truck className="w-5 h-5 text-[#D65A24]" />,
                  title: t("deliveryPointTitle"),
                  desc: t("deliveryPointDesc"),
                },
                {
                  icon: <FlaskConical className="w-5 h-5 text-[#D65A24]" />,
                  title: t("customerServiceTitle"),
                  desc: t("customerServiceDesc"),
                },
              ].map((pillar, i) => (
                <div key={i} className="bg-background border border-border p-6 rounded-sm space-y-4 hover:border-[#D65A24]/30 transition-all">
                  <div className="bg-graphite p-3 rounded-sm border border-border inline-block">
                    {pillar.icon}
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground">{pillar.title}</h3>
                  <p className="font-sans text-xs text-steel leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CLOSING CTA ─────────────────────────────────────── */}
        <section className="py-16 bg-[#1C3B5E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <Globe className="w-10 h-10 text-white/40 mx-auto" />
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight">
              {t("thankYouMsg")}
            </h2>
            <p className="font-sans text-sm text-white/70 max-w-2xl mx-auto leading-relaxed">
              {isAr
                ? "نتطلع لخدمة احتياجاتكم من الصلب الهندسية الخاصة. تواصل مع فريق المبيعات اليوم للحصول على الأسعار وتوفر المخزون وعروض التجهيز حسب الطلب."
                : "We look forward to servicing your special steel needs. Contact our team today for pricing, availability, and custom cut-to-size quotations."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider bg-[#D65A24] hover:bg-[#B84A1C] text-white px-8 py-4 rounded-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                {t("contact")}
              </Link>
              <a
                href="/bbk-brchr.pdf"
                download="Bab-Al-Khibrah-Brochure.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-wider border border-white/20 hover:border-white/50 text-white/80 hover:text-white px-7 py-4 rounded-sm transition-all"
              >
                <Download className="w-4 h-4" />
                {t("downloadBrochure")}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
