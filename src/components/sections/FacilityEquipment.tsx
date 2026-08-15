"use client";

import Image from "next/image";
import { AlertCircle, Hammer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FacilityEquipment() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-graphite border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="font-mono text-sm sm:text-base uppercase tracking-widest text-orange font-bold block">
            {t("facilityTag")}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            {t("facilityTitle")}
          </h2>
          <p className="font-sans text-sm text-steel">
            {t("facilityDesc")}
          </p>
        </div>

        {/* Strong Visual Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: One Strong Visual Composition (7 Cols) */}
          <div className="lg:col-span-7 relative min-h-[400px] rounded-sm overflow-hidden border border-border bg-background shadow-sm">
            <Image
              src="/IMG_20260801_174755.jpg.jpeg"
              alt="Bab Al Khibrah Sharjah warehouse steel stock racks"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            {/* Fine grid marking tag overlay */}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border px-2 py-0.5 rounded-sm font-mono text-[9px] text-steel">
              [CAM_LOCK_STOCK_BAY_01]
            </div>
          </div>

          {/* Right Column: Technical Sidebar Specs (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-border p-6 rounded-sm flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Hammer className="w-5 h-5 text-orange" />
                <h3 className="font-display text-base font-bold text-foreground">
                  {t("machineryHeader")}
                </h3>
              </div>

              <div className="space-y-4 font-sans text-xs">
                {/* 5-Ton Cranes */}
                <div className="space-y-1">
                  <span className="font-bold text-foreground block">{t("craneTitle")}</span>
                  <p className="text-steel leading-relaxed">
                    {t("craneDesc")}
                  </p>
                </div>

                {/* Saws */}
                <div className="space-y-1">
                  <span className="font-bold text-foreground block">{t("sawingCuttersTitle")}</span>
                  <p className="text-steel leading-relaxed">
                    {t("sawingCuttersDesc")}
                  </p>
                </div>

                {/* Pickup fleet */}
                <div className="space-y-1">
                  <span className="font-bold text-foreground block">{t("fleetTitle")}</span>
                  <p className="text-steel leading-relaxed">
                    {t("fleetDesc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Client confirmation warning notice */}
            <div className="flex items-start space-x-2.5 bg-orange/5 border border-orange/15 p-3.5 rounded-sm text-[10.5px] text-orange">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                {t("capacityCheck")}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
