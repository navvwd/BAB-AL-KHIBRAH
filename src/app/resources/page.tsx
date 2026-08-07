"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDown, Search, ArrowRight, BookOpen, HelpCircle } from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { equivalentGradesLookup } from "@/data/catalog";
import { useLanguage } from "@/context/LanguageContext";

export default function ResourcesPage() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";
  const [eqSearch, setEqSearch] = useState("");

  const articles = [
    {
      title: isAr ? "مقارنة سبائك EN19 و EN24 عالية الشد" : "EN19 vs EN24: High-Tensile Steel Comparison",
      desc: isAr
        ? "تحليل ميتالورجي مفصل يربط بين طاقات التحمل، مقاومة الصدمات، والتركيب الكيميائي لنيكل كروم موليبدينوم بين خامات EN19 و EN24."
        : "An in-depth metallurgical analysis comparing load capacities, impact resistance, and nickel-chrome-moly chemical compositions between EN19 and EN24 grades.",
      readTime: isAr ? "قراءة 5 دقائق" : "5 min read",
      topic: isAr ? "سبائك الصلب" : "Alloy Steel"
    },
    {
      title: isAr ? "صلب القوالب D2 مقابل P20: قرارات التحديد" : "D2 vs P20 Tool Steel: Die Sizing Decisions",
      desc: isAr
        ? "فهم الفروق في مستويات الصلادة (HRC)، قابلية التلميع، ومعاملات التأكل عند الاختيار بين صلب القوالب الباردة D2 وصفائح البلاستيك P20."
        : "Understand differences in hardness profiles (HRC limits), clean polishability, and wear coefficients when choosing between D2 cold-work steel and P20 pre-hardened mold steel.",
      readTime: isAr ? "قراءة 4 دقائق" : "4 min read",
      topic: isAr ? "صلب الأدوات" : "Tool Steel"
    },
    {
      title: isAr ? "الفولاذ المقاوم للصدأ 304L مقابل 316L" : "304L vs 316L Stainless: Chloride Pitting Defense",
      desc: isAr
        ? "لماذا يجعل عنصر الموليبدينوم إضافياً في عيار 316L الخيار الأفضل والمفضل للتطبيقات البحرية والصناعات الكيميائية مقارنة بالفولاذ 304L."
        : "Why 316L's added molybdenum makes it the industry standard for marine environments and chemical processing over standard 304L austenitic steel.",
      readTime: isAr ? "قراءة 6 دقائق" : "6 min read",
      topic: isAr ? "الستانلس ستيل" : "Stainless Steel"
    },
    {
      title: isAr ? "فهم حالات التخمير والمعالجة الحرارية" : "Understanding Annealed & Quenched Conditions",
      desc: isAr
        ? "دليل لحالات التوريد الحرارية. تعرّف على تأثيرات التخمير والمعالجة الحرارية والتطبيع على قوة الخضوع ودقة التشغيل الآلي على ماكينات CNC."
        : "A guide to thermal supply conditions. Learn how tempering, annealing, and normalization impact yield strength and final CNC machining tolerances.",
      readTime: isAr ? "قراءة 5 دقائق" : "5 min read",
      topic: isAr ? "المعالجة الحرارية" : "Heat Treatment"
    },
    {
      title: isAr ? "كيف يقلل التجهيز والقص المسبق من هدر التشغيل" : "How Cut-to-Size Steel Reduces Machining Waste",
      desc: isAr
        ? "أدلة وتجارب تثبت أن شراء خامات مقصوصة مسبقاً من باب الخبرة يقلل من مخلفات الخراطة ويختصر أوقات الإعداد والتجهيز."
        : "Factual evidence demonstrating how buying pre-cut blanks from Bab Al Khibrah minimizes CNC scrap volume and reduces loading and prep times.",
      readTime: isAr ? "قراءة 3 دقائق" : "3 min read",
      topic: isAr ? "تحسين التشغيل" : "CNC Optimization"
    }
  ];

  const faqs = [
    {
      q: isAr ? "هل تأتي جميع المواد المخزنة مرفقة بشهادات فحص المصنع (MTC)؟" : "Does all stocked material come with Mill Test Certificates (MTC)?",
      a: isAr
        ? "نعم. جميع الطلبيات الموردة من قضبان، ألواح، وبلوكات صلب تأتي مرفقة بشهادات المصنع الأصلية المطابقة لمعايير EN 10204 3.1."
        : "Yes. Every steel round bar, plate, block, or pipe dispatched from our yard is supplied with original manufacturer Mill Test Certificates (MTC) conforming to EN 10204 3.1 standards."
    },
    {
      q: isAr ? "هل يمكنكم تنسيق فحوصات المعاينة مع طرف ثالث (Third-Party)؟" : "Can you coordinate third-party witness inspections?",
      a: isAr
        ? "نعم. ننسق مع مفتشين معتمدين في دولة الإمارات (مثل Lloyd's Register, BV, SGS, TÜV) لمعاينة التقطيع ونقل الختم واختبارات المعمل."
        : "Yes. We coordinate with accredited local UAE inspectors (Lloyd's Register, BV, SGS, TÜV) to witness material cutting, stamp transfers, and NDT laboratory testing."
    },
    {
      q: isAr ? "هل توفرون خدمة التوصيل لأبوظبي والعين والإمارات الأخرى؟" : "Do you offer delivery to Abu Dhabi, Al Ain, and other emirates?",
      a: isAr
        ? "نعم. نقوم بتشغيل شاحنات النقل الخاصة بنا لتنسيق التوصيل لكافة إمارات الدولة. كما يمكن ترتيب الشحن الخارجي لدول الخليج عبر شركائنا الموثوقين."
        : "Yes. We operate our own flatbed logistics pickups to coordinate deliveries across all UAE emirates. Export shipments across the GCC can be arranged via trusted freight partners."
    },
    {
      q: isAr ? "هل يمكن تقديم مخططات خاصة لقص الألواح حرارياً؟" : "Can I submit custom drawings for oxy-fuel profile cutting?",
      a: isAr
        ? "نعم. يقبل فريق البرمجة لدينا صيغ الملفات PDF و DXF و DWG و STEP لبرمجة ماكينات القص الحراري بدقة مطابقة للمخطط."
        : "Yes. Our programming team accepts PDF, DXF, DWG, and STEP file formats to program our profile cutters exactly to drawing profiles."
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
            <Link href="/" className="hover:text-orange transition-colors">{t("home").toUpperCase()}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{isAr ? "الموارد الفنية والأسئلة الشائعة" : "RESOURCES & FAQS"}</span>
          </div>

          {/* Page Header */}
          <div className="mb-16 max-w-3xl space-y-4">
            <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold block">
              {isAr ? "منصة المعرفة الفنية B2B" : "B2B Knowledge Desk"}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-none">
              {isAr ? "الموارد الفنية ودليل المكافآت والمعايير" : "Technical Resources & Equivalent Guides"}
            </h1>
            <p className="font-sans text-sm text-steel leading-relaxed">
              {isAr
                ? "استعرض مقالات المقارنة الفنية، تحقق من مكافآت المعايير الدولية (AISI / DIN / BS / JIS)، وقم بتحميل الكتالوج الرقمي للشركة."
                : "Find standard comparison articles, check grade equivalent standards across AISI/DIN/BS, and download our company profile catalogue for reference."}
            </p>
          </div>

          {/* Catalog Download Section */}
          <div className="bg-graphite border border-border p-6 rounded-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-orange uppercase tracking-widest block font-bold">
                {isAr ? "وثيقة الملف الفني الرقمي" : "Dynamic Reference Document"}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">
                {isAr ? "كتالوج شركة باب الخبرة لتجارة الصلب" : "Bab Al Khibrah Product Catalogue"}
              </h3>
              <p className="font-sans text-xs text-steel leading-relaxed max-w-xl">
                {isAr
                  ? "يحتوي على المقاسات الكاملة، المعادلات الكيميائية، والإمكانيات الميكانيكية المتاحة بمستودع الشارقة."
                  : "Contains complete dimensions, chemical formulas, and operational capabilities verified for Sharjah yard dispatch."}
              </p>
            </div>
            <a
              href="/BAK_Company_Profile.pdf"
              download
              className="font-sans text-xs font-bold uppercase tracking-wider bg-blue hover:bg-blue/90 text-white px-6 py-4 rounded-sm flex items-center justify-center space-x-2 shrink-0 shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              <span>{isAr ? "تحميل الكتالوج (4.7 ميجابايت)" : "Download PDF (4.7 MB)"}</span>
            </a>
          </div>

          {/* Main Grid: Equivalents & Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Equivalents Lookup (5 Cols) */}
            <div className="lg:col-span-5 space-y-4 h-fit bg-graphite border border-border p-6 rounded-sm shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-steel uppercase block">
                  {isAr ? "البحث في المواصفات القياسية" : "Standard Check"}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {isAr ? "دليل المكافآت والمعايير الدولية" : "Grade Equivalence Guide"}
                </h3>
              </div>

              {/* Equiv search box */}
              <div className="relative">
                <Search className={`w-3.5 h-3.5 text-steel absolute top-1/2 -translate-y-1/2 ${isAr ? "right-3" : "left-3"}`} />
                <input
                  type="text"
                  placeholder={isAr ? "تصفية المعايير (مثلاً EN8, D2, S45C)..." : "Filter standards (e.g. EN8, D2, S45C)..."}
                  value={eqSearch}
                  onChange={(e) => setEqSearch(e.target.value)}
                  className={`w-full font-sans text-xs bg-white border border-border rounded-sm py-2.5 text-foreground focus:outline-none focus:border-orange transition-colors ${
                    isAr ? "pr-9 pl-4" : "pl-9 pr-4"
                  }`}
                />
              </div>

              {/* Table */}
              <div className="border border-border rounded-sm overflow-hidden bg-white text-xs max-h-[360px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-graphite font-mono text-[9px] uppercase tracking-widest text-steel sticky top-0 border-b border-border">
                    <tr>
                      <th className="p-3">{isAr ? "العيار" : "Grade"}</th>
                      <th className="p-3">{isAr ? "المكافئ الدولي" : "Equivalent"}</th>
                      <th className="p-3">{isAr ? "المعيار" : "Standard"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-sans">
                    {filteredEquivalents.map((eq, i) => (
                      <tr key={i} className="hover:bg-graphite/40 transition-colors">
                        <td className="p-3 font-bold text-foreground">{eq.grade}</td>
                        <td className="p-3 text-steel">{eq.equivalent}</td>
                        <td className="p-3 font-mono text-[10px] text-orange">{eq.standard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Articles (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1 border-b border-border pb-4">
                <span className="font-mono text-[9px] text-steel uppercase block">
                  {isAr ? "مقالات ودراسات فنية" : "Technical Knowledge Base"}
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {isAr ? "مقالات التحليل الميتالورجي للصلب" : "Steel Metallurgical Articles"}
                </h3>
              </div>

              <div className="space-y-4">
                {articles.map((art, idx) => (
                  <div key={idx} className="bg-graphite border border-border p-5 rounded-sm space-y-2 hover:border-orange/30 transition-colors">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-orange font-bold uppercase">{art.topic}</span>
                      <span className="text-steel">{art.readTime}</span>
                    </div>
                    <h4 className="font-display text-base font-bold text-foreground">{art.title}</h4>
                    <p className="font-sans text-xs text-steel leading-relaxed">{art.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* FAQs Accordion/List */}
          <div className="bg-graphite border border-border p-6 sm:p-8 rounded-sm space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-orange" />
              <span>{isAr ? "الأسئلة الشائعة والمعايير التشغيلية" : "Frequently Asked B2B Questions"}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-border p-5 rounded-sm space-y-2">
                  <h3 className="font-display text-sm font-bold text-foreground">{faq.q}</h3>
                  <p className="font-sans text-xs text-steel leading-relaxed">{faq.a}</p>
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
