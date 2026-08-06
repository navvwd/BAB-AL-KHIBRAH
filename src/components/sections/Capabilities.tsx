"use client";

import Link from "next/link";
import { Scissors, Flame, ClipboardCheck, Import, Layers, ArrowRight } from "lucide-react";
import { processingServices } from "@/data/services";

export default function Capabilities() {
  const serviceIcons: Record<string, React.ReactNode> = {
    "bandsaw-cutting": <Scissors className="w-5 h-5 text-[#D65A24]" />,
    "oxy-fuel-cutting": <Flame className="w-5 h-5 text-[#D65A24]" />,
    "cut-to-size-processing": <Scissors className="w-5 h-5 text-[#D65A24]" />,
    "special-sourcing": <Import className="w-5 h-5 text-[#D65A24]" />,
    "inspection-testing": <ClipboardCheck className="w-5 h-5 text-[#D65A24]" />
  };

  return (
    <section className="py-20 bg-graphite border-y border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-border pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D65A24] font-semibold block mb-1">
              Processing Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              In-House Sizing & Sourcing Hub
            </h2>
          </div>
          <Link
            href="/processing"
            className="group inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#D65A24] hover:text-[#B84A1C] transition-colors"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Shortened 5-Services Grid (3-cols desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processingServices.map((service, idx) => (
            <div
              key={service.id}
              className="bg-background border border-border p-6 rounded-sm flex flex-col justify-between hover:border-[#D65A24]/40 transition-all duration-300 group shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="bg-graphite p-3 rounded-sm border border-border group-hover:border-[#D65A24] transition-colors shrink-0">
                    {serviceIcons[service.id] || <Layers className="w-5 h-5 text-[#D65A24]" />}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-steel font-bold bg-graphite border border-border px-2 py-0.5 rounded-sm">
                    SERVICE 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-[#D65A24] transition-colors">
                  {service.name}
                </h3>

                <p className="font-sans text-xs text-steel leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                {/* Capability Badges */}
                <div className="font-mono text-[10px] bg-graphite border border-border/80 p-2.5 rounded-sm space-y-1 text-steel">
                  <div className="flex justify-between">
                    <span>Tolerance:</span>
                    <span className="text-foreground font-semibold">{service.capabilities.tolerance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Capacity:</span>
                    <span className="text-foreground font-semibold">{service.capabilities.maxDimension}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border pt-4 flex items-center justify-between mt-6">
                <Link
                  href={`/processing/${service.id}`}
                  className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground hover:text-[#D65A24] transition-colors flex items-center space-x-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="font-sans text-xs bg-[#1C3B5E] hover:bg-[#152D47] text-white px-3.5 py-2 rounded-sm transition-all font-semibold"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
