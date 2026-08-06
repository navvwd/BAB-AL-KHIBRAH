"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Scissors, 
  Clock, 
  Truck, 
  Headphones, 
  ArrowRight,
  Download,
  CheckCircle2,
  FileCheck,
  Globe,
  MapPin,
  Building2,
  Shield,
  Zap,
  Users,
  Award,
  ChevronRight
} from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, isRTL } = useLanguage();

  const stats = [
    { value: "2015", label: "Est. in Sharjah" },
    { value: "3,600", label: "Sq. ft Yard" },
    { value: "5T", label: "Overhead Crane" },
    { value: "GCC", label: "Regional Supply" },
  ];

  const products = [
    "Medium Carbon Steels (C45 / EN8 / CK45)",
    "Hard Chrome Plated Rods (C45E / CK45)",
    "High Tensile Steels (EN19 / EN24 / 4140 / 4340)",
    "Tool & Die Steels (1.2379 / D2 / 1.2311 / 1.2312 / P20)",
    "Aerospace Aluminium (7075 T6 / 2024)",
    "Stainless Steel (316L / 304L)",
  ];

  const customers = [
    "Tool & Die Makers",
    "Hydraulic Equipment Repair Workshops",
    "Machine Spare Parts Manufacturers",
    "Steel Fabricators",
    "Automotive Industries",
    "Marine Industries",
  ];

  const corePillars = [
    {
      title: t("cutToSizeTitle"),
      icon: <Scissors className="w-5 h-5 text-[#D65A24]" />,
      desc: t("cutToSizeDesc"),
    },
    {
      title: t("sameDayPickupTitle"),
      icon: <Clock className="w-5 h-5 text-[#D65A24]" />,
      desc: t("sameDayPickupDesc"),
    },
    {
      title: t("deliveryPointTitle"),
      icon: <Truck className="w-5 h-5 text-[#D65A24]" />,
      desc: t("deliveryPointDesc"),
    },
    {
      title: t("customerServiceTitle"),
      icon: <Headphones className="w-5 h-5 text-[#D65A24]" />,
      desc: t("customerServiceDesc"),
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen text-foreground">

        {/* ─── HERO BAND ─── */}
        <section className="relative pt-32 pb-20 overflow-hidden grid-bg">
          {/* Accent stripe */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D65A24]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-8 font-mono text-[10px] text-steel flex items-center space-x-2">
              <Link href="/" className="hover:text-[#D65A24] transition-colors">{t("home")}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{t("about")}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

              {/* Left — Copy */}
              <div className="lg:col-span-6 space-y-7">
                <div className="inline-flex items-center gap-2 border border-[#D65A24]/30 bg-[#D65A24]/5 rounded-sm px-3.5 py-1.5">
                  <span className="w-2 h-2 bg-[#D65A24] rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D65A24] font-bold">
                    {t("whoWeAreTitle")}
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.06] text-foreground">
                  Bab Al&nbsp;Khibrah<br />
                  <span className="text-[#1C3B5E]">Trading LLC</span>
                </h1>

                <div className="space-y-4 font-sans text-sm text-steel leading-relaxed">
                  <p>{t("whoWeAreP1")}</p>
                  <p>{t("whoWeAreP2")}</p>
                  <p className="font-semibold text-foreground">{t("whoWeAreP3")}</p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider bg-[#1C3B5E] hover:bg-[#152D47] text-white px-7 py-3.5 rounded-sm transition-all shadow-md"
                  >
                    <span>{t("requestQuote")}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                  </Link>

                  <a
                    href="/api/brochure"
                    className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider border border-[#D65A24] text-[#D65A24] hover:bg-[#D65A24] hover:text-white px-7 py-3.5 rounded-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t("downloadBrochure")}</span>
                  </a>
                </div>
              </div>

              {/* Right — Photo + stat strip */}
              <div className="lg:col-span-6 space-y-5">
                <div className="relative w-full h-[420px] rounded-sm overflow-hidden border border-border shadow-2xl">
                  <Image
                    src="/hero/IMG_8121.jpg"
                    alt="Bab Al Khibrah Sharjah Steel Yard"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] text-white/80 uppercase tracking-wider">
                    Al Saja'a Industrial Area — Sharjah, UAE
                  </div>
                </div>

                {/* Stat Strip */}
                <div className="grid grid-cols-4 gap-3">
                  {stats.map((s, i) => (
                    <div key={i} className="bg-graphite border border-border rounded-sm p-4 text-center">
                      <div className="font-display text-xl font-black text-[#D65A24]">{s.value}</div>
                      <div className="font-mono text-[9px] text-steel uppercase tracking-wider mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── PRODUCTS & SERVICES ─── */}
        <section className="py-20 bg-graphite border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Label column */}
              <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32">
                <div className="inline-flex items-center gap-2 border border-border bg-background rounded-sm px-3 py-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#D65A24]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#D65A24] font-bold">
                    {t("prodServicesTitle")}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-black text-foreground leading-tight">
                  {t("prodServicesTitle")}
                </h2>
                <p className="font-sans text-xs text-steel leading-relaxed">
                  {t("prodServicesP2")}
                </p>
                <div className="bg-[#1C3B5E]/10 border border-[#1C3B5E]/20 p-4 rounded-sm">
                  <p className="font-sans text-xs text-[#1C3B5E] font-semibold">
                    All materials available with EN 10204 3.1 Mill Test Certificates for full traceability.
                  </p>
                </div>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((p, i) => (
                    <div key={i} className="bg-background border border-border rounded-sm p-5 flex items-start gap-3 hover:border-[#D65A24]/40 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                      <span className="font-sans text-xs text-foreground leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
                {/* Also note */}
                <div className="mt-4 bg-background border border-border rounded-sm p-4 flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[#D65A24] shrink-0" />
                  <p className="font-sans text-xs text-steel leading-relaxed">
                    <strong className="text-foreground">{t("specialReqTitle")}:</strong>{" "}
                    {t("specialReqP1")}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── CORE SERVICE PILLARS ─── */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="font-mono text-[9px] text-[#D65A24] uppercase tracking-widest font-bold">
                {t("tagline")}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
                How We Serve You
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {corePillars.map((item, idx) => (
                <div key={idx} className="group bg-graphite border border-border rounded-sm p-7 space-y-4 hover:border-[#D65A24]/50 hover:shadow-lg transition-all duration-300">
                  <div className="p-3 bg-background border border-border rounded-sm w-fit group-hover:border-[#D65A24]/30 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-steel leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHO WE SUPPLY + INSPECTION ─── */}
        <section className="py-20 bg-graphite border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Where Do We Supply */}
              <div className="lg:col-span-7 bg-background border border-border rounded-sm p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-graphite border border-border rounded-sm">
                    <Users className="w-5 h-5 text-[#D65A24]" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {t("whereSupplyTitle")}
                  </h2>
                </div>
                <p className="font-sans text-xs text-steel leading-relaxed">
                  {t("whereSupplyDesc")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {customers.map((c, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-graphite border border-border rounded-sm px-4 py-3">
                      <ChevronRight className="w-3.5 h-3.5 text-[#D65A24] shrink-0" />
                      <span className="font-sans text-xs text-foreground">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right stack: Inspection + Commitment */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-background border border-border rounded-sm p-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-graphite border border-border rounded-sm">
                      <FileCheck className="w-5 h-5 text-[#D65A24]" />
                    </div>
                    <h2 className="font-display text-base font-bold text-foreground">
                      {t("inspectionTitle")}
                    </h2>
                  </div>
                  <p className="font-sans text-xs text-steel leading-relaxed">
                    {t("inspectionDesc")}
                  </p>
                </div>

                <div className="bg-background border border-border rounded-sm p-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-graphite border border-border rounded-sm">
                      <Shield className="w-5 h-5 text-[#D65A24]" />
                    </div>
                    <h2 className="font-display text-base font-bold text-foreground">
                      Our Commitment
                    </h2>
                  </div>
                  <p className="font-sans text-xs text-steel leading-relaxed">
                    {t("specialReqP3")}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── CLOSING CTA BAND ─── */}
        <section className="relative py-20 bg-[#0F2439] overflow-hidden">
          {/* Decorative grid */}
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute left-0 top-0 w-1 h-full bg-[#D65A24]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D65A24]" />
                  <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest">
                    Al Saja'a Industrial Area, Sharjah, UAE
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight">
                  {t("thankYouMsg")}
                </h2>
                <p className="font-sans text-sm text-white/60 leading-relaxed max-w-2xl">
                  {t("specialReqP2")}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="group w-full inline-flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-wider bg-[#D65A24] hover:bg-[#b8481b] text-white px-7 py-4 rounded-sm transition-all shadow-lg"
                >
                  <span>{t("requestQuote")}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                </Link>

                <a
                  href="/api/brochure"
                  className="w-full inline-flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-wider border border-white/20 hover:border-white/50 text-white/80 hover:text-white px-7 py-4 rounded-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{t("downloadBrochure")}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
