"use client";

import Link from "next/link";
import { ShieldCheck, FileCheck, ClipboardList, CheckCircle, BadgeAlert } from "lucide-react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function QualityPage() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  const steps = [
    {
      title: isAr ? "التحقق من الخامات ونقل ختم الصهر" : "Material Verification & Stamp Transfer",
      desc: isAr
        ? "تخضع جميع المواد التي تدخل ساحتنا للفحص الفوري ومطابقة الفواتير وأرقام الصهر. وقبل القص بالمنشار الميكانيكي أو المقص الحراري، يتم نقل وختم رقم الصهر (Heat Number) على المواد المقصوصة لضمان تتبعها."
        : "All materials entering our yard undergo immediate inspection against invoice specifications and mill heat markings. Prior to bandsaw or oxy-fuel cutting, heat number markings are stamp-transferred onto cut-off blanks to preserve traceability."
    },
    {
      title: isAr ? "فحص الأبعاد والتسامحات الدقيقة" : "Calibrated Dimensional Audits",
      desc: isAr
        ? "يجري مفتشو الجودة فحوصات بصرية وتدقيقاً للأبعاد باستخدام أجهزة الميكرومتر والفرنية الرقمية المعايرة. ويتم التحقق من الأقطار والسماكات والأطوال وزوايا القطع العمودية مع المخططات."
        : "Yard dispatch inspectors conduct thorough visual checks and dimensional audits using calibrated digital micrometers and callipers. Diameters, thicknesses, lengths, and cut perpendicularity are checked against drawing specifications."
    },
    {
      title: isAr ? "شهادات الفحص الأصلية للمصنع (MTC)" : "Mill Test Certificates (MTC)",
      desc: isAr
        ? "نرفق شهادات فحص المصنع الأصلية المطابقة لمعيار EN 10204 3.1 مع جميع الطلبيات، والتي توفر التحليل الكيميائي لنسب العناصر، حدود الحمل الميكانيكي، وتاريخ المعالجة الحرارية."
        : "We supply original manufacturer Mill Test Certificates conforming to EN 10204 3.1 standards with all deliveries, providing chemical analysis limits, heat numbers, mechanical load limits, and heat-treatment history."
    },
    {
      title: isAr ? "تنسيق فحص الطرف الثالث (Third Party)" : "Third-Party Witness Coordination",
      desc: isAr
        ? "بالنسبة لمشاريع البنية التحتية والنفط والغاز الحساسة، ننسق مع هيئات الفحص المحلية المعتمدة في الإمارات (مثل Lloyd's Register, Bureau Veritas, SGS, TÜV) لمعاينة الخامات والختم والقص بمقرنا."
        : "For critical infrastructure or offshore oilfield projects, we coordinate local third-party inspection agencies (Lloyd's Register, Bureau Veritas, SGS, TÜV) to witness material audits, stamping, and cutting directly at our yard."
    },
    {
      title: isAr ? "الاختبارات غير المدمرة والمعملية (NDT)" : "Non-Destructive Testing (NDT)",
      desc: isAr
        ? "من خلال مختبرات محلية معتمدة بالإمارات، نرتب اختبارات المحاكاة والفحص المعملي المعتمد بما في ذلك الفحص الكيميائي الفوري (PMI)، الاختبارات بالموجات فوق الصوتية (UT)، واختبارات الصلادة والشد."
        : "Through accredited local UAE laboratories, we arrange certified mechanical and metallurgical witness tests, including Positive Material Identification (PMI), ultrasonic testing (UT), hardness testing, and tensile testing."
    },
    {
      title: isAr ? "التخزين الآمن والتغليف للشحن" : "Safe Storage & Dispatch Audits",
      desc: isAr
        ? "تُحفظ قضبان وألواح الصلب في أرفف مخصصة ومصنفة حسب العيار لتجنب تداخل السبائك. وتُحمل الشحنات الثقيلة بواسطة الرافعات العلوية وتُربط بحزام صناعي شديد التحمل قبل الانطلاق."
        : "Steel bars and plates are stored in designated racks organized by grade to prevent cross-contamination. Bundles are loaded securely via overhead gantry cranes, protected with industrial strapping prior to dispatch."
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-28 pb-20 grid-bg min-h-screen text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6 font-mono text-[10px] text-steel">
            <Link href="/" className="hover:text-orange transition-colors">{t("home").toUpperCase()}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{isAr ? "ضمان الجودة والتتبع" : "QUALITY ASSURANCE"}</span>
          </div>

          {/* Page Header */}
          <div className="mb-16 max-w-3xl space-y-4">
            <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold block">
              {isAr ? "سياسة التتبع وضمان الموثوقية B2B" : "B2B Traceability Policy"}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-none">
              {isAr ? "التتبع وضمان الجودة واختبارات الفحص" : "Traceability & Inspection Audits"}
            </h1>
            <p className="font-sans text-sm text-steel leading-relaxed">
              {isAr
                ? "نضمن أن كافة منتجات صلب الهندسة، صلب الأدوات، وسبائك الألمنيوم لدينا تلبي المعايير الميكانيكية والكيميائية المعتمدة. استعرض خيارات الفحص والجودة أدناه."
                : "We ensure our engineering steel, tool steel, and aluminium alloys satisfy rigorous mechanical and chemical standard boundaries. Read our verified quality control and witness audit options below."}
            </p>
          </div>

          {/* Quality Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-graphite border border-border p-6 rounded-sm flex flex-col justify-between hover:border-orange/20 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="font-mono text-xs text-orange font-bold">
                      [QC_STAGE_0{idx + 1}]
                    </span>
                    <ShieldCheck className="w-5 h-5 text-orange" />
                  </div>
                  <h2 className="font-display text-lg font-bold text-foreground group-hover:text-orange transition-colors">
                    {step.title}
                  </h2>
                  <p className="font-sans text-xs text-steel leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* MTC & Certification Notice */}
          <div className="bg-graphite border border-border p-6 sm:p-8 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-display text-lg font-bold text-foreground flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-orange" />
                <span>{isAr ? "طلب شهادات فحص المصنع (3.1 MTC)" : "Request Mill Test Certificates (3.1 MTC)"}</span>
              </h3>
              <p className="font-sans text-xs text-steel leading-relaxed">
                {isAr
                  ? "تأتي جميع المواد الموردة مرفقة بملفات شهادات الصنع المعتمدة المتوافقة مع مواصفات EN 10204 3.1 وتتضمن رقم الصهر والتحليل الكيميائي لنسب العناصر."
                  : "All dispatched orders include full EN 10204 3.1 compliant documentation. If your project requires pre-dispatch verification, contact our desk."}
              </p>
            </div>
            <Link
              href="/contact"
              className="font-sans text-xs font-bold uppercase tracking-wider bg-orange hover:bg-orange/90 text-white px-6 py-3.5 rounded-sm transition-all shrink-0"
            >
              {t("contact")}
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
