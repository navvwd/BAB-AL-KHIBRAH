import Link from "next/link";
import { Shield, FileCheck, Search, Scale, BadgeAlert } from "lucide-react";

export default function QualitySection() {
  const QAItems = [
    {
      icon: <FileCheck className="w-5 h-5 text-orange" />,
      title: "Mill Test Certificates (MTC)",
      desc: "All materials supplied are backed by original Mill Test Certificates conforming to EN 10204 3.1 standards. Certificates are delivered alongside dispatch paperwork."
    },
    {
      icon: <Search className="w-5 h-5 text-orange" />,
      title: "Heat Number Traceability",
      desc: "Heat numbers are stamped or paint-marked onto every stock item and transferred to cut-off pieces before delivery to guarantee material heat traceability."
    },
    {
      icon: <Scale className="w-5 h-5 text-orange" />,
      title: "Dimensional Verification",
      desc: "Yard inspectors measure cut lengths, diameters, and thickness profiles using calibrated digital callipers and micrometers to check tolerance limits before loading."
    },
    {
      icon: <Shield className="w-5 h-5 text-orange" />,
      title: "Third-Party Witness Audits",
      desc: "We coordinate with leading international inspection bodies (Lloyd's Register, Bureau Veritas, SGS, TÜV) to witness material cutting, stamping, and testing."
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-orange font-semibold">
              Quality Assurance Desk
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
              Traceability & Documentation
            </h2>
            <p className="font-sans text-sm text-steel leading-relaxed">
              In heavy engineering, alloy verification is critical. Bab Al Khibrah ensures that every round bar, plate, and block we deliver satisfies international standards and project-specific documentation rules.
            </p>
            
            {/* Disclaimer regarding logos */}
            <div className="bg-graphite border border-border p-4 rounded-sm flex items-start space-x-3 text-[11px] text-steel">
              <BadgeAlert className="w-4 h-4 text-orange shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Documentation standard:</strong> We supply verified mill certificates. Classification society stamps (LR/BV/TÜV) are subject to coordination at the time of inquiry.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact?subject=Quality+Verification"
                className="font-sans text-xs font-bold uppercase tracking-wider bg-blue hover:bg-blue/90 text-white px-6 py-3.5 rounded-sm transition-all inline-block shadow-sm"
              >
                Discuss Quality Requirements
              </Link>
            </div>
          </div>

          {/* Right Column Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {QAItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-graphite border border-border p-5 rounded-sm space-y-3 hover:border-orange/20 transition-all duration-300"
              >
                <div className="bg-background p-2 rounded-sm border border-border w-fit">
                  {item.icon}
                </div>
                <h3 className="font-display text-sm font-bold text-foreground">
                  {item.title
                }</h3>
                <p className="font-sans text-[11px] text-steel leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
