import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

interface CategoryItem {
  title: string;
  family: string;
  image: string;
  grades: string[];
  forms: string;
  href: string;
}

export default function CategoryExplorer() {
  const categories: CategoryItem[] = [
    {
      title: "Medium Carbon Steel",
      family: "General Machining & Shafts",
      image: "/PRODUCTS/Medium Carbon Steel C-45.jpg",
      grades: ["EN8", "C45", "C45E"],
      forms: "Round bars, Plates, Cut pieces",
      href: "/materials?family=Medium+Carbon+Steel"
    },
    {
      title: "Hard Chrome Plated Bar",
      family: "Hydraulic Cylinder Rods",
      image: "/PRODUCTS/Hard Chrome Plated Bar C45E  CK45.jpg",
      grades: ["C45E", "CK45 Chrome Rods"],
      forms: "Rods, Cut pieces",
      href: "/materials?family=Hard+Chrome+Plated+Bar"
    },
    {
      title: "Tool Steel",
      family: "Cold-Work & Plastic Mould Dies",
      image: "/PRODUCTS/Tool Steel  Cold Work Die Steel 1.2379  D2.jpg",
      grades: ["D2 / 1.2379", "P20 / 1.2311", "1.2312"],
      forms: "Plates, Blocks, Round bars, Cut pieces",
      href: "/materials?family=Tool+Steel"
    },
    {
      title: "Alloy Steel",
      family: "High-Tensile & Torsional Shafts",
      image: "/PRODUCTS/Chromium-Molybdenum EN19  42CrMo4  4140.jpg",
      grades: ["EN19 / 4140", "EN24 / 4340", "42CrMo4"],
      forms: "Round bars, Plates, Blocks, Cut pieces",
      href: "/materials?family=Alloy+Steel"
    },
    {
      title: "Aluminium Alloy",
      family: "Aerospace & Precision Tooling Jigs",
      image: "/PRODUCTS/Aluminium-Alloy 7075.png",
      grades: ["7075-T6", "2024"],
      forms: "Plates, Round bars, Blocks, Cut pieces",
      href: "/materials?family=Aluminium+Alloy"
    },
    {
      title: "Stainless Steel",
      family: "Corrosion & Marine Grade",
      image: "/PRODUCTS/Stainless Steel SS 316L.png",
      grades: ["SS 316L", "SS 304L"],
      forms: "Round bars, Plates, Pipes, Cut pieces",
      href: "/materials?family=Stainless+Steel"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-border pb-6">
          <div className="max-w-xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D65A24] font-semibold">
              Stocked Inventory
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Official Product Categories
            </h2>
          </div>
          <Link
            href="/materials"
            className="group inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#D65A24] hover:text-[#B84A1C] transition-colors"
          >
            <span>Explore Complete Product Range</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Official Categories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <div
              key={cat.title}
              className="bg-graphite border border-border p-6 rounded-sm flex flex-col justify-between hover:border-[#D65A24]/40 transition-all duration-300 group shadow-md"
            >
              <div>
                {/* Official Product Category Image */}
                <div className="relative w-full h-48 rounded-sm overflow-hidden mb-5 border border-border bg-background">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm border border-border px-2 py-0.5 rounded-sm font-mono text-[9px] text-[#D65A24] font-bold">
                    0{index + 1}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#D65A24] font-bold block">
                    {cat.family}
                  </span>

                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-[#D65A24] transition-colors">
                    {cat.title}
                  </h3>

                  <div className="space-y-2 pt-1">
                    <div className="flex flex-wrap gap-1">
                      {cat.grades.map(grade => (
                        <span
                          key={grade}
                          className="font-mono text-[10px] bg-background border border-border px-2 py-0.5 rounded-sm text-foreground/90 font-medium"
                        >
                          {grade}
                        </span>
                      ))}
                    </div>
                    <p className="font-sans text-[11px] text-steel">
                      <span className="font-semibold text-foreground/80">Stock Forms:</span> {cat.forms}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex items-center justify-between mt-6">
                <Link
                  href={cat.href}
                  className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground hover:text-[#D65A24] transition-colors flex items-center space-x-1"
                >
                  <span>View Stock Grades</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/contact?family=${encodeURIComponent(cat.title)}`}
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
