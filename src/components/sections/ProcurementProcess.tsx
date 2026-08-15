"use client";

import { FileSpreadsheet, Search, Scissors, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ProcurementProcess() {
  const { t, isRTL } = useLanguage();

  const steps = [
    {
      num: "01",
      code: "STAGE_01",
      icon: <FileSpreadsheet className="w-5 h-5 text-[#D65A24]" />,
      title: t("step1Name"),
      deliverable: "DWG / PDF / STEP ACCEPTED",
      desc: t("step1Desc")
    },
    {
      num: "02",
      code: "STAGE_02",
      icon: <Search className="w-5 h-5 text-[#D65A24]" />,
      title: t("step2Name"),
      deliverable: "SAJAA STOCK & MILL CHECK",
      desc: t("step2Desc")
    },
    {
      num: "03",
      code: "STAGE_03",
      icon: <Scissors className="w-5 h-5 text-[#D65A24]" />,
      title: t("step3Name"),
      deliverable: "IN-HOUSE SAWING ±1.5mm",
      desc: t("step3Desc")
    },
    {
      num: "04",
      code: "STAGE_04",
      icon: <ShieldCheck className="w-5 h-5 text-[#D65A24]" />,
      title: t("step4Name"),
      deliverable: "PMI & MTC EN 10204 3.1",
      desc: t("step4Desc")
    },
    {
      num: "05",
      code: "STAGE_05",
      icon: <Truck className="w-5 h-5 text-[#D65A24]" />,
      title: t("step5Name"),
      deliverable: "FLATBED FLEET DISPATCH",
      desc: t("step5Desc")
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-graphite border border-border px-3 py-1 rounded-sm">
            <span className="w-2 h-2 bg-[#D65A24] rounded-full"></span>
            <span className="font-mono text-sm sm:text-base uppercase tracking-widest text-[#D65A24] font-black">
              {t("procurementTag")}
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            {t("procurementTitle")}
          </h2>

          <p className="font-sans text-sm text-steel leading-relaxed">
            {t("procurementSubtitle")}
          </p>
        </div>

        {/* Dynamic 5-Stage Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-graphite border border-border rounded-sm p-6 flex flex-col justify-between hover:border-[#D65A24] transition-all duration-300 group shadow-md relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-black text-[#D65A24]">
                    {step.num}
                  </span>
                  <div className="p-2 rounded-sm bg-background border border-border">
                    {step.icon}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-steel font-bold tracking-widest block uppercase">
                    {step.code}
                  </span>
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-[#D65A24] transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="font-sans text-xs text-steel leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="border-t border-border/80 pt-4 mt-6">
                <span className="font-mono text-xs sm:text-sm text-[#D65A24] font-bold tracking-wider block uppercase">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
