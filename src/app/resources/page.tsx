"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDown, Search, ArrowRight, BookOpen, HelpCircle } from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { equivalentGradesLookup } from "@/data/catalog";

export default function ResourcesPage() {
  const [eqSearch, setEqSearch] = useState("");

  const articles = [
    {
      title: "EN19 vs EN24: High-Tensile Steel Comparison",
      desc: "An in-depth metallurgical analysis comparing load capacities, impact resistance, and nickel-chrome-moly chemical compositions between EN19 and EN24 grades.",
      readTime: "5 min read",
      topic: "Alloy Steel"
    },
    {
      title: "D2 vs P20 Tool Steel: Die Sizing Decisions",
      desc: "Understand differences in hardness profiles (HRC limits), clean polishability, and wear coefficients when choosing between D2 cold-work steel and P20 pre-hardened mold steel.",
      readTime: "4 min read",
      topic: "Tool Steel"
    },
    {
      title: "304L vs 316L Stainless: Chloride Pitting Defense",
      desc: "Why 316L's added molybdenum makes it the industry standard for marine environments and chemical processing over standard 304L austenitic steel.",
      readTime: "6 min read",
      topic: "Stainless Steel"
    },
    {
      title: "Understanding Annealed & Quenched Conditions",
      desc: "A guide to thermal supply conditions. Learn how tempering, annealing, and normalization impact yield strength and final CNC machining tolerances.",
      readTime: "5 min read",
      topic: "Heat Treatment"
    },
    {
      title: "How Cut-to-Size Steel Reduces Machining Waste",
      desc: "Factual evidence demonstrating how buying pre-cut blanks from Bab Al Khibrah minimizes CNC scrap volume and reduces loading and prep times.",
      readTime: "3 min read",
      topic: "CNC Optimization"
    }
  ];

  const faqs = [
    {
      q: "Does all stocked material come with Mill Test Certificates (MTC)?",
      a: "Yes. Every steel round bar, plate, block, or pipe dispatched from our yard is supplied with original manufacturer Mill Test Certificates (MTC) conforming to EN 10204 3.1 standards."
    },
    {
      q: "Can you coordinate third-party witness inspections?",
      a: "Yes. We coordinate with accredited local UAE inspectors (Lloyd's Register, BV, SGS, TÜV) to witness material cutting, stamp transfers, and NDT laboratory testing."
    },
    {
      q: "Do you offer delivery to Abu Dhabi, Al Ain, and other emirates?",
      a: "Yes. We operate our own flatbed logistics pickups to coordinate deliveries across all UAE emirates. Export shipments across the GCC can be arranged via trusted freight partners."
    },
    {
      q: "Can I submit custom drawings for oxy-fuel profile cutting?",
      a: "Yes. Our programming team accepts PDF, DXF, DWG, and STEP file formats to program our profile cutters exactly to drawing profiles."
    }
  ];

  const filteredEquivalents = equivalentGradesLookup.filter(eq => 
    eq.grade.toLowerCase().includes(eqSearch.toLowerCase()) ||
    eq.equivalent.toLowerCase().includes(eqSearch.toLowerCase()) ||
    eq.standard.toLowerCase().includes(eqSearch.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-28 pb-20 grid-bg min-h-screen text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6 font-mono text-[10px] text-steel">
            <Link href="/" className="hover:text-orange transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">RESOURCES & FAQS</span>
          </div>

          {/* Page Header */}
          <div className="mb-16 max-w-3xl space-y-4">
            <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold block">
              B2B Knowledge Desk
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-none">
              Technical Resources & Equivalent Guides
            </h1>
            <p className="font-sans text-sm text-steel leading-relaxed">
              Find standard comparison articles, check grade equivalent standards across AISI/DIN/BS, and download our company profile catalogue for reference.
            </p>
          </div>

          {/* Catalog Download Section */}
          <div className="bg-graphite border border-border p-6 rounded-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-orange uppercase tracking-widest block font-bold">
                Dynamic Reference Document
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">
                Bab Al Khibrah Product Catalogue
              </h3>
              <p className="font-sans text-xs text-steel leading-relaxed max-w-xl">
                Contains complete dimensions, chemical formulas, and operational capabilities verified for Sharjah yard dispatch.
              </p>
            </div>
            <a
              href="/BAK_Company_Profile.pdf"
              download
              className="font-sans text-xs font-bold uppercase tracking-wider bg-blue hover:bg-blue/90 text-white px-6 py-4 rounded-sm flex items-center justify-center space-x-2 shrink-0 shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF (4.7 MB)</span>
            </a>
          </div>

          {/* Main Grid: Equivalents & Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Equivalents Lookup (5 Cols) */}
            <div className="lg:col-span-5 space-y-4 h-fit bg-graphite border border-border p-6 rounded-sm shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-steel uppercase block">Standard Check</span>
                <h3 className="font-display text-lg font-bold text-foreground">Grade Equivalence Guide</h3>
              </div>

              {/* Equiv search box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-steel absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter standards (e.g. EN8, D2, S45C)..."
                  value={eqSearch}
                  onChange={(e) => setEqSearch(e.target.value)}
                  className="w-full font-sans text-xs bg-white border border-border rounded-sm py-2.5 pl-9 pr-4 text-foreground focus:outline-none focus:border-orange transition-colors"
                />
              </div>

              {/* Equivalents Table list */}
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {filteredEquivalents.map((item, idx) => (
                  <div key={idx} className="bg-white border border-border p-2.5 rounded-sm flex justify-between items-center text-xs font-mono">
                    <div>
                      <span className="font-bold text-foreground">{item.grade}</span>
                      <span className="block text-[9px] text-steel">{item.standard}</span>
                    </div>
                    <span className="text-orange font-bold">{item.equivalent}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles List (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-display text-xl font-bold text-foreground flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-orange" />
                <span>Technical Sizing Articles</span>
              </h3>

              <div className="space-y-6">
                {articles.map((art, idx) => (
                  <div
                    key={idx}
                    className="border-b border-border pb-6 space-y-2 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-steel">
                      <span className="uppercase text-orange font-bold tracking-wider">{art.topic}</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h4 className="font-display text-base font-bold text-foreground group-hover:text-orange transition-colors">
                      {art.title}
                    </h4>
                    <p className="font-sans text-xs text-steel leading-relaxed">
                      {art.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* FAQs List */}
          <div className="border-t border-border pt-16 max-w-4xl mx-auto space-y-8">
            <h2 className="font-display text-2xl font-bold text-foreground text-center flex items-center justify-center space-x-2">
              <HelpCircle className="w-5 h-5 text-orange" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-graphite border border-border p-6 rounded-sm space-y-2 shadow-sm"
                >
                  <h3 className="font-display text-sm font-bold text-foreground flex items-start space-x-2">
                    <span className="font-mono text-orange font-bold">Q:</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="font-sans text-xs text-steel pl-5 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
