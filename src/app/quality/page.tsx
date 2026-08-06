import Link from "next/link";
import { ShieldCheck, FileCheck, ClipboardList, CheckCircle, BadgeAlert } from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";

export default function QualityPage() {
  const steps = [
    {
      title: "Material Verification & Stamp Transfer",
      desc: "All materials entering our yard undergo immediate inspection against invoice specifications and mill heat markings. Prior to bandsaw or oxy-fuel cutting, heat number markings are stamp-transferred onto cut-off blanks to preserve traceability."
    },
    {
      title: "Calibrated Dimensional Audits",
      desc: "Yard dispatch inspectors conduct thorough visual checks and dimensional audits using calibrated digital micrometers and callipers. Diameters, thicknesses, lengths, and cut perpendicularity are checked against drawing specifications."
    },
    {
      title: "Mill Test Certificates (MTC)",
      desc: "We supply original manufacturer Mill Test Certificates conforming to EN 10204 3.1 standards with all deliveries, providing chemical analysis limits, heat numbers, mechanical load limits, and heat-treatment history."
    },
    {
      title: "Third-Party Witness Coordination",
      desc: "For critical infrastructure or offshore oilfield projects, we coordinate local third-party inspection agencies (Lloyd's Register, Bureau Veritas, SGS, TÜV) to witness material audits, stamping, and cutting directly at our yard."
    },
    {
      title: "Non-Destructive Testing (NDT)",
      desc: "Through accredited local UAE laboratories, we arrange certified mechanical and metallurgical witness tests, including Positive Material Identification (PMI), ultrasonic testing (UT), hardness testing, and tensile testing."
    },
    {
      title: "Safe Storage & Dispatch Audits",
      desc: "Steel bars and plates are stored in designated racks organized by grade to prevent cross-contamination. Bundles are loaded securely via overhead gantry cranes, protected with industrial strapping prior to dispatch."
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-28 pb-20 grid-bg min-h-screen text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6 font-mono text-[10px] text-steel">
            <Link href="/" className="hover:text-orange transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">QUALITY ASSURANCE</span>
          </div>

          {/* Page Header */}
          <div className="mb-16 max-w-3xl space-y-4">
            <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold block">
              B2B Traceability Policy
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-none">
              Traceability & Inspection Audits
            </h1>
            <p className="font-sans text-sm text-steel leading-relaxed">
              We ensure our engineering steel, tool steel, and aluminium alloys satisfy rigorous mechanical and chemical standard boundaries. Read our verified quality control and witness audit options below.
            </p>
          </div>

          {/* Quality Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-graphite border border-border p-6 rounded-sm space-y-3 hover:border-orange/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-sm border border-border">
                    <CheckCircle className="w-4 h-4 text-orange" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-steel leading-relaxed pl-9">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer regarding Certifications */}
          <div className="bg-graphite border border-border p-6 rounded-sm max-w-3xl mx-auto space-y-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <BadgeAlert className="w-5 h-5 text-orange" />
              <h3 className="font-display text-base font-bold text-foreground">
                Technical Certification Policy
              </h3>
            </div>
            <p className="font-sans text-xs text-steel leading-relaxed">
              Bab Al Khibrah supplies authentic materials backed by original mill certificates. We do not publish logo stamps of classification societies (LR/BV/TÜV) on our public channels without valid project certification approvals. Third-party inspection fees and lead times are negotiated on a per-order basis.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="/contact?subject=Quality+Inspection+Request"
                className="font-sans text-xs font-bold uppercase tracking-wider bg-blue hover:bg-blue/90 text-white px-6 py-3.5 rounded-sm block w-full sm:w-auto text-center"
              >
                Discuss Quality Requirements
              </Link>
              <Link
                href="/about"
                className="font-sans text-xs font-semibold uppercase tracking-wider border border-border hover:border-steel hover:bg-white text-foreground px-6 py-3.5 rounded-sm block w-full sm:w-auto text-center"
              >
                About Our Infrastructure
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
