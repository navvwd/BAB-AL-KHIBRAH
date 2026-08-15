"use client";

import { Compass, Settings, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyUs() {
  const { t } = useLanguage();

  const strengths = [
    {
      icon: <ShieldCheck className="w-4 h-4 text-orange" />,
      title: t("mtcTitle"),
      desc: t("mtcDesc")
    },
    {
      icon: <Compass className="w-4 h-4 text-orange" />,
      title: t("sourcingTitle"),
      desc: t("sourcingDesc")
    },
    {
      icon: <Settings className="w-4 h-4 text-orange" />,
      title: t("bandsawTitle"),
      desc: t("bandsawDesc")
    },
    {
      icon: <Truck className="w-4 h-4 text-orange" />,
      title: t("gantryTitle"),
      desc: t("gantryDesc")
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Factual Statement (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-sm sm:text-base uppercase tracking-widest text-orange font-bold block">
              {t("whyUsTag")}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground leading-tight">
              {t("whyUsTitle1")} <br />
              {t("whyUsTitle2")} <br />
              {t("whyUsTitle3")}
            </h2>
            <p className="font-sans text-sm text-steel leading-relaxed">
              {t("whyUsDesc")}
            </p>
          </div>

          {/* Right Column: Card Grid Proof Points (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {strengths.map((item, idx) => (
              <div key={idx} className="surface-card p-6 rounded-[1.75rem] flex items-start space-x-4 floating-surface">
                <div className="bg-graphite p-3 rounded-2xl border border-border shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-sm font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-steel leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
