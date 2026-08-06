import Link from "next/link";
import { ArrowRight, Scissors, Flame, ClipboardCheck, Import, CheckCircle, ShieldAlert } from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { processingServices, warehouseEquipment } from "@/data/services";

export default function ProcessingPage() {
  const serviceIcons: Record<string, React.ReactNode> = {
    "bandsaw-cutting": <Scissors className="w-6 h-6 text-orange" />,
    "oxy-fuel-cutting": <Flame className="w-6 h-6 text-orange" />,
    "cut-to-size-processing": <Scissors className="w-6 h-6 text-orange" />,
    "special-sourcing": <Import className="w-6 h-6 text-orange" />,
    "inspection-testing": <ClipboardCheck className="w-6 h-6 text-orange" />
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-28 pb-20 grid-bg min-h-screen text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6 font-mono text-[10px] text-steel">
            <Link href="/" className="hover:text-orange transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">PROCESSING SERVICES</span>
          </div>

          {/* Page Header */}
          <div className="mb-16 max-w-3xl space-y-4">
            <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold block">
              Sharjah Yard Capabilities
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-none">
              In-House Steel Sizing & Sourcing
            </h1>
            <p className="font-sans text-sm text-steel leading-relaxed">
              We process raw warehouse stock into net-shape blocks, cylinder rods, and plate profiled shapes. Our mechanical cold-saw cutting preserves the physical properties of high-tensile alloys.
            </p>
          </div>

          {/* Processing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {processingServices.map((service) => (
              <div
                key={service.id}
                className="bg-graphite border border-border p-6 rounded-sm flex flex-col justify-between hover:border-orange/20 transition-all duration-300 group"
              >
                <div className="space-y-6">
                  {/* Service Card Header */}
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center space-x-3.5">
                      <div className="bg-white p-2.5 rounded-sm border border-border">
                        {serviceIcons[service.id]}
                      </div>
                      <h2 className="font-display text-lg font-bold text-foreground group-hover:text-orange transition-colors">
                        {service.name}
                      </h2>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-steel/50">
                      [REF: {service.id.toUpperCase()}]
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs text-steel leading-relaxed">
                    {service.detailedDescription}
                  </p>

                  {/* Capabilities parameters */}
                  <div className="bg-white border border-border p-4 rounded-sm grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-steel block text-[9px] uppercase">Tolerance:</span>
                      <span className="font-medium text-foreground">{service.capabilities.tolerance}</span>
                    </div>
                    <div>
                      <span className="text-steel block text-[9px] uppercase">Max Dimension:</span>
                      <span className="font-medium text-foreground">{service.capabilities.maxDimension}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex items-center justify-between mt-6">
                  <Link
                    href={`/processing/${service.id}`}
                    className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground hover:text-orange transition-colors flex items-center space-x-1.5"
                  >
                    <span>Inspect Capacities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.name)}`}
                    className="font-sans text-xs bg-blue hover:bg-blue/90 text-white px-4 py-2.5 rounded-sm transition-all"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Machinery/Equipment Inventory list */}
          <div className="bg-graphite border border-border p-6 sm:p-8 rounded-sm space-y-6">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-orange" />
              <span>Sharjah Yard Equipment Specifications</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans text-xs">
              {warehouseEquipment.map((eq, idx) => (
                <div key={idx} className="bg-white border border-border p-4 rounded-sm space-y-2">
                  <span className="font-mono text-[9px] text-steel uppercase tracking-widest block border-b border-border pb-1">
                    Equip_{idx + 1}
                  </span>
                  <span className="font-bold text-foreground block">{eq.name}</span>
                  <p className="text-steel leading-relaxed">{eq.purpose}</p>
                </div>
              ))}
            </div>

            <div className="bg-orange/5 border border-orange/15 p-4 rounded-sm flex items-start space-x-3 text-xs text-orange">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong>TECHNICAL NOTE ON CAPACITY LIMITS:</strong>
                <p className="text-steel leading-relaxed text-[11px]">
                  All maximum sizes, cutting tolerances, and lead times listed are guidance estimates based on typical machinery configurations. Final capability thresholds are subject to confirmation with Bab Al Khibrah operations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
