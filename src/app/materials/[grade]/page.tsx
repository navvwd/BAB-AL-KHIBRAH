import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck, FileText, BadgeAlert } from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { materialCatalog } from "@/data/catalog";

export async function generateStaticParams() {
  return materialCatalog.map((g) => ({ grade: g.grade }));
}

interface PageProps {
  params: Promise<{
    grade: string;
  }>;
}

export default async function MaterialGradePage({ params }: PageProps) {
  const resolvedParams = await params;
  const gradeName = decodeURIComponent(resolvedParams.grade);

  // Search database for matching grade
  const grade = materialCatalog.find(
    g => g.grade.toLowerCase() === gradeName.toLowerCase() ||
         g.grade.replace(/\s+/g, "").toLowerCase() === gradeName.replace(/\s+/g, "").toLowerCase()
  );

  if (!grade) {
    notFound();
  }

  // Get related grades in the same material family
  const relatedGrades = materialCatalog
    .filter(g => g.family === grade.family && g.grade !== grade.grade)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-28 pb-20 grid-bg min-h-screen text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6 font-mono text-[10px] text-steel">
            <Link href="/" className="hover:text-orange transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/materials" className="hover:text-orange transition-colors">MATERIALS</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{grade.grade.toUpperCase()}</span>
          </div>

          {/* Go Back link */}
          <Link
            href="/materials"
            className="inline-flex items-center space-x-2 text-xs font-mono text-steel hover:text-orange transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO CATALOGUE</span>
          </Link>

          {/* Material Grade Main Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Title & Overview (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-orange uppercase tracking-wider block">
                  {grade.family} • Standard Stockist
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-none">
                  {grade.grade}
                </h1>
              </div>

              <p className="font-sans text-sm text-steel leading-relaxed">
                {grade.description}
              </p>

              {/* Conditions & Forms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border">
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-border pb-1">
                    Available Supply Forms
                  </span>
                  <ul className="text-xs text-foreground/90 space-y-1.5">
                    {grade.forms.map(form => (
                      <li key={form} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-orange rounded-full shrink-0"></span>
                        <span>{form}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-border pb-1">
                    Supply Conditions
                  </span>
                  <ul className="text-xs text-foreground/90 space-y-1.5">
                    {grade.conditions.map(cond => (
                      <li key={cond} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue rounded-full shrink-0"></span>
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel (1 Col) */}
            <div className="bg-graphite border border-border p-6 rounded-sm flex flex-col justify-between h-fit space-y-6">
              <div>
                <span className="font-mono text-[10px] text-steel uppercase tracking-widest block mb-4 border-b border-border pb-2">
                  Technical Action
                </span>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-steel">Sharjah Stock Status:</span>
                    <span className="text-orange font-bold font-mono">{grade.status}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-steel">Certifications:</span>
                    <span className="text-foreground/95 font-medium">EN 10204 3.1 MTC</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-steel">Origin:</span>
                    <span className="text-foreground/95 font-medium">EU / Asian Mills</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <Link
                  href={`/contact?grade=${encodeURIComponent(grade.grade)}`}
                  className="font-sans text-xs font-bold text-center uppercase tracking-wider bg-blue hover:bg-blue/90 text-white w-full py-3.5 rounded-sm block transition-all shadow-sm"
                >
                  Request Material Quote
                </Link>
                <a
                  href="/BAK_Company_Profile.pdf"
                  download
                  className="font-sans text-xs font-semibold text-center uppercase tracking-wider border border-border hover:border-steel hover:bg-graphite text-foreground w-full py-3.5 rounded-sm block transition-all"
                >
                  Download Datasheet (PDF)
                </a>
              </div>
            </div>

          </div>

          {/* Detailed Technical Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Composition & Mechanical Tables (2 Cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Chemical Composition Table */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-foreground flex items-center space-x-2">
                  <span>Chemical Composition Limits (%)</span>
                </h3>
                <div className="overflow-x-auto bg-graphite border border-border rounded-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-white border-b border-border text-steel font-mono text-[9px] uppercase">
                        <th className="p-3">Chemical Element</th>
                        <th className="p-3 text-right">Min Value (%)</th>
                        <th className="p-3 text-right">Max Value (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {grade.chemicalComposition.map((comp) => (
                        <tr key={comp.element} className="hover:bg-white/80 transition-colors">
                          <td className="p-3 font-medium text-foreground">{comp.element}</td>
                          <td className="p-3 text-right font-mono">{comp.min === 0 ? "—" : `${comp.min}%`}</td>
                          <td className="p-3 text-right font-mono">{comp.max}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mechanical Properties Table */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Mechanical Performance Parameters (Nominal Values)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-graphite border border-border p-4 rounded-sm">
                    <span className="block font-mono text-[9px] text-steel uppercase mb-1">Tensile Strength</span>
                    <span className="font-display text-xl font-bold text-foreground block">
                      {grade.mechanicalProperties.tensileStrengthMin 
                        ? `${grade.mechanicalProperties.tensileStrengthMin}${grade.mechanicalProperties.tensileStrengthMax ? ` - ${grade.mechanicalProperties.tensileStrengthMax}` : "+"} MPa`
                        : "—"}
                    </span>
                    <span className="font-sans text-[10px] text-steel/60 mt-1 block">Yield strength load limits</span>
                  </div>

                  <div className="bg-graphite border border-border p-4 rounded-sm">
                    <span className="block font-mono text-[9px] text-steel uppercase mb-1">Yield Strength (Min)</span>
                    <span className="font-display text-xl font-bold text-foreground block">
                      {grade.mechanicalProperties.yieldStrengthMin ? `${grade.mechanicalProperties.yieldStrengthMin} MPa` : "—"}
                    </span>
                    <span className="font-sans text-[10px] text-steel/60 mt-1 block">Offset yield strength limit</span>
                  </div>

                  <div className="bg-graphite border border-border p-4 rounded-sm">
                    <span className="block font-mono text-[9px] text-steel uppercase mb-1">Elongation / Hardness</span>
                    <span className="font-display text-xl font-bold text-foreground block">
                      {grade.mechanicalProperties.hardnessMax || "—"}
                    </span>
                    <span className="font-sans text-[10px] text-steel/60 mt-1 block">Brinell/HRC thresholds</span>
                  </div>
                </div>
              </div>

              {/* Heat Treatment Overview */}
              <div className="bg-graphite border border-border p-6 rounded-sm space-y-4">
                <h3 className="font-display text-base font-bold text-foreground border-b border-border pb-2">
                  Recommended Heat Treatment Guidelines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs leading-relaxed">
                  {grade.heatTreatment.annealing && (
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-steel uppercase tracking-widest block">Annealing</span>
                      <p className="text-steel">{grade.heatTreatment.annealing}</p>
                    </div>
                  )}
                  {grade.heatTreatment.hardening && (
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-steel uppercase tracking-widest block">Hardening</span>
                      <p className="text-steel">{grade.heatTreatment.hardening}</p>
                    </div>
                  )}
                  {grade.heatTreatment.tempering && (
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-steel uppercase tracking-widest block">Tempering</span>
                      <p className="text-steel">{grade.heatTreatment.tempering}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Machinability & Weldability Notes */}
              <div className="bg-graphite border border-border p-6 rounded-sm space-y-2 text-xs leading-relaxed">
                <span className="font-mono text-[9px] text-steel uppercase tracking-widest block">
                  Machinability & Engineering Notes
                </span>
                <p className="text-steel">
                  {grade.machinability}
                </p>
              </div>

              {/* Cutting & Sourcing Options */}
              <div className="bg-graphite border border-border p-6 rounded-sm space-y-4">
                <h3 className="font-display text-base font-bold text-foreground">
                  Available Saja'a Cutting & Inspection Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="border-l-2 border-orange pl-3.5 space-y-1">
                    <span className="font-bold text-foreground">In-House Bandsaw Sizing</span>
                    <p className="text-steel">Cold sawing available for round bars and blocks avoiding thermal stress zones.</p>
                  </div>
                  <div className="border-l-2 border-orange pl-3.5 space-y-1">
                    <span className="font-bold text-foreground">MTC EN10204 3.1 Traceability</span>
                    <p className="text-steel">Original manufacturer certificates mapped to material heat numbers.</p>
                  </div>
                  <div className="border-l-2 border-orange pl-3.5 space-y-1">
                    <span className="font-bold text-foreground">Third-Party Coordination</span>
                    <p className="text-steel">Witness tests by Lloyd's Register, BV, or SGS arranged locally in Sharjah yards.</p>
                  </div>
                  <div className="border-l-2 border-orange pl-3.5 space-y-1">
                    <span className="font-bold text-foreground">GCC Delivery Services</span>
                    <p className="text-steel">Logistics coordination directly to Sharjah, Dubai, and export hubs.</p>
                  </div>
                </div>
              </div>

              {/* TECHNICAL VERIFICATION DISCLAIMER */}
              <div className="bg-orange/5 border border-orange/15 p-4 rounded-sm flex items-start space-x-3 text-[11px] text-steel">
                <BadgeAlert className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong>Standard Technical Sheet Disclaimer:</strong>
                  <p className="leading-relaxed">
                    The chemical compositions, mechanical properties, and heat-treatment values listed are compiled from standard nominal specification references (EN 10083, ASTM, DIN). Actual material performance limits are subject to the specific Mill Test Certificate (MTC EN 10204 3.1) and verification before cutting or dispatch.
                  </p>
                </div>
              </div>
            </div>

            {/* Equivalent standards & Related grades (1 Col) */}
            <div className="space-y-8">
              {/* International Standards Panel */}
              <div className="bg-graphite border border-border p-5 rounded-sm space-y-4">
                <h3 className="font-display text-sm font-bold text-foreground border-b border-border pb-2">
                  Equivalent Standards
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-steel">AISI (US):</span>
                    <span className="text-foreground">{grade.equivalents.aisi || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-steel">DIN (Germany):</span>
                    <span className="text-foreground">{grade.equivalents.din || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-steel">EN (Europe):</span>
                    <span className="text-foreground">{grade.equivalents.en || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-steel">BS (British):</span>
                    <span className="text-foreground">{grade.equivalents.bs || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel">JIS (Japan):</span>
                    <span className="text-foreground">{grade.equivalents.jis || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Related Grades Panel */}
              {relatedGrades.length > 0 && (
                <div className="bg-graphite border border-border p-5 rounded-sm space-y-4">
                  <h3 className="font-display text-sm font-bold text-foreground border-b border-border pb-2">
                    Related {grade.family} Grades
                  </h3>
                  <div className="space-y-3">
                    {relatedGrades.map((rGrade) => (
                      <Link
                        key={rGrade.grade}
                        href={`/materials/${encodeURIComponent(rGrade.grade)}`}
                        className="flex items-center justify-between p-2.5 rounded-sm bg-white border border-border hover:border-orange transition-all text-xs font-display font-bold group"
                      >
                        <span className="group-hover:text-orange transition-colors">{rGrade.grade}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-steel/50 group-hover:text-orange transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
