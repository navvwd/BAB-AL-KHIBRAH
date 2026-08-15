"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Wrench, Settings, Cog, Ship, Car, Building2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function IndustryMatrix() {
  const { t, language, isRTL } = useLanguage();
  const [activeId, setActiveId] = useState("hydraulic");

  const industries = [
    {
      id: "hydraulic",
      name: language === "ar" ? "إصلاح الهيدروليك والبساتم" : "Hydraulic Repair",
      icon: <Wrench className="w-4 h-4 text-[#D65A24]" />,
      desc: language === "ar" 
        ? "قضبان كروم مقسّاة ومجلخة بدقة هندسية عالية ومصممة لتحمل الضغط العالي لبساتم الهيدروليك."
        : "Precision cylindrical rods & chrome bars engineered for extreme pressure hydraulic pistons.",
      alloys: language === "ar"
        ? ["قضبان الكروم المقسى C45E / CK45", "فولاذ كربوني متوسط C45"]
        : ["Hard Chrome Rods C45E / CK45", "Medium Carbon Steel C45"],
      apps: language === "ar"
        ? ["محاور بساتم الهيدروليك", "قضبان الرفع الهيدروليكي", "أذرع الرفع والكبس"]
        : ["Piston guide shafts", "Hydraulic cylinder rods", "Tipping arms"]
    },
    {
      id: "machining",
      name: language === "ar" ? "ورش الخراطة وماكينات CNC" : "CNC Machine Shops",
      icon: <Settings className="w-4 h-4 text-[#D65A24]" />,
      desc: language === "ar"
        ? "قضبان وألواح صلب ممتازة الخراطة مقصوصة مقدماً لتقليل العادم وتسهيل التغذية المباشرة."
        : "Free-machining round bars and plates pre-sliced to size to minimize CNC scrap.",
      alloys: language === "ar"
        ? ["فولاذ كربوني EN8 / C45", "صلب سبائكي عالي الشد EN19 / 4140", "ألمنيوم 7075-T6"]
        : ["Medium Carbon Steel EN8 / C45", "Alloy Steel EN19 / 4140", "Aluminium 7075-T6"],
      apps: language === "ar"
        ? ["محاور المغازل والماكينات الدقيقة", "أقراص التروس والخوابير", "جيج تجميع الأدوات"]
        : ["Precision spindles & shafts", "Gear blanks & keyways", "Tooling reference jigs"]
    },
    {
      id: "tooling",
      name: language === "ar" ? "صناعة القوالب والأدوات" : "Tool & Die Making",
      icon: <Cog className="w-4 h-4 text-[#D65A24]" />,
      desc: language === "ar"
        ? "صلب أدوات عالي الانضغاط مع ثبات فائق للحواف ومقاومة ممتازة للإجهاد الحراري."
        : "High compression tool steels with extreme edge retention and heat resistance.",
      alloys: language === "ar"
        ? ["صلب أدوات بارد D2 / 1.2379", "صلب قوالب البلاستيك P20 / 1.2311"]
        : ["D2 / 1.2379 Cold Work Steel", "P20 / 1.2311 Plastic Mould Steel"],
      apps: language === "ar"
        ? ["قوالب التثقيب والتصنيع البارد", "قوالب حقن البلاستيك", "شفرات قص الصاج والحديد"]
        : ["Blanking & punching dies", "Plastic injection molds", "Slitting shear blades"]
    },
    {
      id: "marine",
      name: language === "ar" ? "الأحواض والملاحة البحرية" : "Marine Docks",
      icon: <Ship className="w-4 h-4 text-[#D65A24]" />,
      desc: language === "ar"
        ? "سبائك استانلس ستيل مقاومة للتآكل والصدأ مخصصة للبيئات البحرية والمنصات."
        : "Corrosion-resistant stainless alloys for marine salt-air and offshore fluid lines.",
      alloys: language === "ar"
        ? ["فولاذ مقاوم للصدأ SS 316L", "فولاذ مقاوم للصدأ SS 304L"]
        : ["Stainless Steel SS 316L", "Stainless Steel SS 304L"],
      apps: language === "ar"
        ? ["محاور الرفاسات البحرية", "أعمدة مضخات السوائل", "توصيلات المنصات البحرية"]
        : ["Propeller shafts", "Pump valve stems", "Marine fittings"]
    },
    {
      id: "automotive",
      name: language === "ar" ? "المعدات والنقل الثقيل" : "Heavy Transport",
      icon: <Car className="w-4 h-4 text-[#D65A24]" />,
      desc: language === "ar"
        ? "سبائك صلب عالية الشد تتحمل الصدمات التكرارية والالتواء العالي في المحاور."
        : "High-tensile alloy steels withstand cyclic shock loads and high torsional stress.",
      alloys: language === "ar"
        ? ["سبائك نيجل كروم EN24 / 4340", "سبائك كروم مولي EN19 / 4140"]
        : ["EN24 / 4340 Ni-Cr-Mo Alloy", "EN19 / 4140 Cr-Mo Alloy"],
      apps: language === "ar"
        ? ["محاور نقل الحركة والشاحنات", "تروس الدفرنس", "بناوز ونوابض التعليق"]
        : ["Axle drive shafts", "Transmission pinions", "Suspension pins"]
    },
    {
      id: "fabricators",
      name: language === "ar" ? "المصانع والأنشاءات المعدنية" : "Steel Fabricators",
      icon: <Building2 className="w-4 h-4 text-[#D65A24]" />,
      desc: language === "ar"
        ? "تقطيع ألواح حرارياً وحسب المقاس لتجهيز قواعد الماكينات والرافعات الثقيلة."
        : "Heavy plate profile cutting and custom cut-to-size blanks for heavy machinery bases.",
      alloys: language === "ar"
        ? ["ألواح الفولاذ الكربوني EN8", "بلوكات صلب مخرطة C45"]
        : ["EN8 Heavy Carbon Plates", "C45 Machined Bolster Blocks"],
      apps: language === "ar"
        ? ["ألواح قواعد الماكينات", "أقراص الفلنجات المقصوصة", "بناوز أذرع الونش"]
        : ["Machine base plates", "Flange blanks", "Crane boom pins"]
    }
  ];

  const activeIndustry = industries.find(i => i.id === activeId) || industries[0];

  return (
    <section className="bg-background py-16 border-b border-border grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="inline-flex items-center space-x-2 bg-graphite border border-border px-3 py-1 rounded-sm">
            <span className="w-1.5 h-1.5 bg-[#D65A24] rounded-full"></span>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#D65A24] font-black">
              {t("matrixTag")}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            {t("matrixTitle")}
          </h2>
          <p className="font-sans text-xs text-steel leading-relaxed">
            {t("matrixSubtitle")}
          </p>
        </div>

        {/* Sector Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {industries.map((ind) => {
            const isActive = ind.id === activeId;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className={`p-3 rounded-sm border text-left font-sans text-xs font-bold transition-all flex items-center space-x-2.5 cursor-pointer ${
                  isActive
                    ? "bg-[#1C3B5E] text-white border-[#1C3B5E] shadow-sm"
                    : "bg-graphite text-foreground border-border hover:border-steel hover:bg-background"
                }`}
              >
                <div className={`p-1.5 rounded-sm ${isActive ? "bg-white/10" : "bg-background"}`}>
                  {ind.icon}
                </div>
                <span className="line-clamp-1">{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Detail Surface Card */}
        <div className="surface-card border border-border p-6 sm:p-8 rounded-sm shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#D65A24]/10 border border-[#D65A24]/20 rounded-sm">
                {activeIndustry.icon}
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {activeIndustry.name}
              </h3>
            </div>
            <p className="font-sans text-xs text-steel leading-relaxed">
              {activeIndustry.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-4">
              <div className="space-y-2">
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#D65A24] font-bold block">
                  {t("targetAlloysLabel")}
                </span>
                <ul className="space-y-1 font-sans text-xs text-foreground">
                  {activeIndustry.alloys.map((alloy, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                      <span>{alloy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-steel font-bold block">
                  {t("typicalAppsLabel")}
                </span>
                <ul className="space-y-1 font-sans text-xs text-steel">
                  {activeIndustry.apps.map((app, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-[#D65A24] rounded-full shrink-0"></span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center space-y-3 bg-graphite border border-border p-6 rounded-sm">
            <span className="font-mono text-[9px] uppercase tracking-widest text-steel font-bold">
              {t("guaranteedMTC")}
            </span>
            <h4 className="font-display text-lg font-bold text-foreground">
              {activeIndustry.name} Specs & Availability
            </h4>
            <p className="font-sans text-xs text-steel leading-relaxed">
              All round bars, blocks, and plates cut-to-size at our Sharjah facility. Full 3.1 MTC trace tracking available for every batch.
            </p>
            <Link
              href={`/contact?family=${encodeURIComponent(activeIndustry.name)}`}
              className="font-sans text-xs font-bold uppercase tracking-wider bg-[#1C3B5E] hover:bg-[#152D47] text-white py-3 px-4 rounded-sm transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>{t("requestQuote")}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
