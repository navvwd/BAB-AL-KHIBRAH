import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, ShieldAlert, HelpCircle } from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { processingServices } from "@/data/services";

interface PageProps {
  params: Promise<{
    service: string;
  }>;
}

export default async function ProcessingServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const serviceId = decodeURIComponent(resolvedParams.service);

  const service = processingServices.find(s => s.id === serviceId);

  if (!service) {
    notFound();
  }

  // Get other services for cross-linking
  const otherServices = processingServices.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-28 pb-20 grid-bg min-h-screen text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6 font-mono text-[10px] text-steel">
            <Link href="/" className="hover:text-orange transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/processing" className="hover:text-orange transition-colors">PROCESSING</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{service.name.toUpperCase()}</span>
          </div>

          {/* Go Back Link */}
          <Link
            href="/processing"
            className="inline-flex items-center space-x-2 text-xs font-mono text-steel hover:text-orange transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO SERVICES</span>
          </Link>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content (2 Cols) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Title & Description */}
              <div className="space-y-4">
                <span className="font-mono text-xs text-orange uppercase tracking-wider block">
                  Yard Capability Sheet
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-none">
                  {service.name}
                </h1>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {service.detailedDescription}
                </p>
              </div>

              {/* Machinery Capacity Box */}
              <div className="bg-graphite border border-border p-6 rounded-sm space-y-4">
                <h3 className="font-display text-base font-bold text-foreground border-b border-border pb-2">
                  Machine Specifications & Limitations
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-white border border-border p-3 rounded-sm">
                    <span className="text-steel block text-[9px] uppercase">Max Sizing Capacity:</span>
                    <span className="font-medium text-foreground">{service.capabilities.maxDimension}</span>
                  </div>
                  <div className="bg-white border border-border p-3 rounded-sm">
                    <span className="text-steel block text-[9px] uppercase">Processing Tolerance:</span>
                    <span className="font-medium text-foreground">{service.capabilities.tolerance}</span>
                  </div>
                  <div className="col-span-1 sm:col-span-2 bg-white border border-border p-3 rounded-sm">
                    <span className="text-steel block text-[9px] uppercase">Est. Preparation Time:</span>
                    <span className="font-medium text-foreground">{service.capabilities.leadTime}</span>
                  </div>
                </div>

                {/* Technical warning flag */}
                <div className="bg-orange/5 border border-orange/15 p-3 rounded-sm flex items-start space-x-2 text-[10px] text-orange">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Client confirmation check:</strong> Cutting capacities, size limits, and tolerances are nominative values. Final limits must be verified against actual stock parameters prior to execution.
                  </span>
                </div>
              </div>

              {/* Process Steps & Quality Checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                {/* Process Steps */}
                <div className="space-y-4">
                  <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-border pb-2">
                    Method Statement / Process Steps
                  </span>
                  <ol className="text-xs text-steel space-y-3 font-sans">
                    {service.processSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <span className="font-mono text-orange font-bold">0{idx + 1}.</span>
                        <span className="text-foreground/90">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Quality Checks */}
                <div className="space-y-4">
                  <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-border pb-2">
                    Quality Checks & Controls
                  </span>
                  <ul className="text-xs text-steel space-y-3 font-sans">
                    {service.qualityChecks.map((check, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <CheckCircle className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suitable Grades & Forms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-graphite border border-border p-6 rounded-sm text-xs leading-relaxed">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-steel uppercase tracking-widest block border-b border-border pb-1">
                    Suitable Steel Grades
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.supportedMaterials.map(mat => (
                      <span
                        key={mat}
                        className="bg-white border border-border px-2 py-0.5 rounded-sm font-mono text-[10px]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-steel uppercase tracking-widest block border-b border-border pb-1">
                    Suitable Sizing Forms
                  </span>
                  <span className="text-steel block pt-1">
                    {service.supportedForms.join(", ")}
                  </span>
                </div>
              </div>

              {/* Machinery Utilized */}
              <div className="space-y-3 font-sans text-xs">
                <span className="font-mono text-[9px] text-steel uppercase tracking-widest block">
                  Yard Machinery Utilized
                </span>
                <div className="flex flex-wrap gap-2 text-steel">
                  {service.machineryUsed.map((m, idx) => (
                    <span
                      key={idx}
                      className="bg-orange/5 border border-orange/15 px-3 py-1 rounded-sm text-orange font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQs Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4 text-xs font-sans">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-graphite border border-border p-4 rounded-sm space-y-1.5">
                      <span className="font-bold text-foreground flex items-center space-x-1.5">
                        <HelpCircle className="w-4 h-4 text-orange shrink-0" />
                        <span>{faq.question}</span>
                      </span>
                      <p className="text-steel pl-5 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (1 Col) */}
            <div className="space-y-8">
              {/* Request Quote Card */}
              <div className="bg-graphite border border-border p-6 rounded-sm space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-steel uppercase tracking-widest block mb-1">
                    Procurement Direct
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Submit RFQ Spec
                  </h3>
                  <p className="font-sans text-xs text-steel mt-2 leading-relaxed">
                    Submit drawing details or quantity requests. Our sales coordinators calculate tolerances and confirm warehouse dispatch dates.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.name)}`}
                    className="font-sans text-xs font-bold text-center uppercase tracking-wider bg-blue hover:bg-blue/90 text-white w-full py-3.5 rounded-sm block transition-all shadow-sm"
                  >
                    Request Service Quote
                  </Link>
                  <Link
                    href="/contact"
                    className="font-sans text-xs font-semibold text-center uppercase tracking-wider border border-border hover:border-steel hover:bg-graphite text-foreground w-full py-3.5 rounded-sm block transition-all"
                  >
                    Go to RFQ Desk
                  </Link>
                </div>
              </div>

              {/* Other Services link panel */}
              <div className="bg-graphite border border-border p-5 rounded-sm space-y-4">
                <h3 className="font-display text-sm font-bold text-foreground border-b border-border pb-2">
                  Other Processing Options
                </h3>
                <div className="space-y-3">
                  {otherServices.map((oService) => (
                    <Link
                      key={oService.id}
                      href={`/processing/${oService.id}`}
                      className="flex items-center justify-between p-2.5 rounded-sm bg-white border border-border hover:border-orange transition-all text-xs font-display font-bold group"
                    >
                      <span className="group-hover:text-orange transition-colors">{oService.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-steel/50 group-hover:text-orange transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
