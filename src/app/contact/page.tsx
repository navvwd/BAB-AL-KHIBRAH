"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Upload, FileText, CheckCircle, ArrowRight, ShieldCheck, AlertCircle, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { materialCatalog } from "@/data/catalog";
import { useLanguage } from "@/context/LanguageContext";

// We wrap the inner contact component in a Suspense boundary as Next.js requires it for useSearchParams()
export default function ContactDesk() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center font-sans text-steel">
        Loading RFQ Desk...
      </div>
    }>
      <ContactDeskInner />
    </Suspense>
  );
}

function ContactDeskInner() {
  const { t, isRTL, language } = useLanguage();
  const isAr = language === "ar";
  const searchParams = useSearchParams();
  const gradeQuery = searchParams.get("grade");
  const serviceQuery = searchParams.get("service");
  const familyQuery = searchParams.get("family");

  const [activeTab, setActiveTab] = useState<"rfq" | "general">("rfq");
  
  // Success Confirmation State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedRefNum, setGeneratedRefNum] = useState("");
  const [rfqSummaryForWhatsApp, setRfqSummaryForWhatsApp] = useState("");

  // Detailed RFQ State
  const [rfqForm, setRfqForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    whatsAppNumber: "",
    country: "United Arab Emirates",
    deliveryLocation: "Sharjah",
    materialFamily: "All",
    grade: "",
    equivalentGrade: "",
    form: "Round bars",
    diameter: "",
    thickness: "",
    width: "",
    length: "",
    quantity: "",
    unit: "pcs",
    supplyCondition: "As Rolled",
    cuttingRequirement: "Full lengths",
    tolerance: "",
    certificateRequirement: "MTC 3.1",
    inspectionRequirement: "None",
    requiredDeliveryDate: "",
    additionalNotes: ""
  });

  // General Contact State
  const [generalForm, setGeneralForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // Prefill hook
  useEffect(() => {
    if (gradeQuery) {
      const match = materialCatalog.find(g => g.grade.toLowerCase() === gradeQuery.toLowerCase());
      if (match) {
        setRfqForm(prev => ({
          ...prev,
          grade: match.grade,
          materialFamily: match.family,
          form: match.forms[0] || "Round bars"
        }));
      } else {
        setRfqForm(prev => ({ ...prev, grade: gradeQuery }));
      }
    }
    if (familyQuery) {
      setRfqForm(prev => ({ ...prev, materialFamily: familyQuery }));
    }
    if (serviceQuery) {
      setRfqForm(prev => ({ ...prev, cuttingRequirement: `Cut to sizes (${serviceQuery})` }));
    }
  }, [gradeQuery, serviceQuery, familyQuery]);

  // RFQ Submit Handler
  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple verification
    if (!rfqForm.name || !rfqForm.companyName || !rfqForm.email || !rfqForm.phone) {
      alert("Please fill in all core contact information fields.");
      return;
    }

    // Generate unique reference number (e.g. RFQ-2026-0804-A98B)
    const dateStr = new Date().toISOString().slice(0,10).replace(/-/g,"");
    const randomHex = Math.random().toString(16).substring(2,6).toUpperCase();
    const refNum = `RFQ-${dateStr}-${randomHex}`;
    
    // Set success states
    setGeneratedRefNum(refNum);
    setIsSubmitted(true);
    
    // Build WhatsApp message brief
    const waText = `Hi Bab Al Khibrah Sales, I have submitted a B2B RFQ with Reference *${refNum}*.\n\n*Brief Detail:*\n- Grade: ${rfqForm.grade || "Sourcing Grade"}\n- Shape/Form: ${rfqForm.form}\n- Quantity: ${rfqForm.quantity} ${rfqForm.unit}\n- Company: ${rfqForm.companyName}\n- Contact: ${rfqForm.name}`;
    setRfqSummaryForWhatsApp(encodeURIComponent(waText));

    // Async post to Google Apps Script (Sheet1) if Web App URL configured
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbx9xKXEXrlwmSvKbxTr5H5gTck2_wWwYcN79dAllpLns5Q25xEeadJb5zGFpE6C-DmlVQ/exec";
    if (scriptUrl) {
      fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          formType: "rfq",
          refNum,
          ...rfqForm,
          notes: rfqForm.additionalNotes,
          files: []
        })
      }).catch(err => console.error("Google Script post error:", err));
    }

    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // General Contact Submit Handler
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generalForm.name || !generalForm.email || !generalForm.message) {
      alert("Please fill in Name, Email, and Message fields.");
      return;
    }
    
    const randomHex = Math.random().toString(16).substring(2,6).toUpperCase();
    const refNum = `MSG-${randomHex}`;
    setGeneratedRefNum(refNum);
    setIsSubmitted(true);
    
    const waText = `Hi Bab Al Khibrah Sales, I sent a general inquiry regarding *${generalForm.subject || "Steel supply inquiry"}*.\n\n- Name: ${generalForm.name}\n- Company: ${generalForm.company}`;
    setRfqSummaryForWhatsApp(encodeURIComponent(waText));

    // Async post to Google Apps Script (Sheet2) if Web App URL configured
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbx9xKXEXrlwmSvKbxTr5H5gTck2_wWwYcN79dAllpLns5Q25xEeadJb5zGFpE6C-DmlVQ/exec";
    if (scriptUrl) {
      fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          formType: "general",
          refNum,
          ...generalForm
        })
      }).catch(err => console.error("Google Script post error:", err));
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const countries = ["United Arab Emirates", "Saudi Arabia", "Oman", "Kuwait", "Qatar", "Bahrain"];
  
  const shapes = ["Round bars", "Plates", "Pipes", "Rods", "Blocks", "Cut pieces", "Other requested sections"];

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-28 pb-20 grid-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6 font-mono text-[10px] text-steel">
            <Link href="/" className="hover:text-orange transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">CONTACT DESK</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column Contact Details (4 Cols) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <h1 className="font-display text-4xl font-black text-foreground leading-none">
                  {t("contactHeader")}
                </h1>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {t("contactSubheader")}
                </p>
              </div>

              {/* Direct Contacts List */}
              <div className="bg-graphite border border-border p-6 sm:p-7 rounded-sm space-y-6">
                <div className="space-y-6 font-sans text-sm">
                  <div className="flex items-start space-x-3.5">
                    <Phone className="w-6 h-6 text-orange shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="block font-bold text-foreground text-sm sm:text-base">Phone &amp; WhatsApp Support</span>
                      <div className="text-steel text-xs sm:text-sm leading-relaxed">
                        Mobile: <a href="tel:+971505751347" className="hover:text-orange transition-colors font-medium text-foreground/90">+971 50 575 1347</a> | <a href="tel:+9710564467949" className="hover:text-orange transition-colors font-medium text-foreground/90">+971 056 446 7949</a>
                      </div>
                      <div className="text-steel text-xs sm:text-sm leading-relaxed">
                        Telephone: <a href="tel:+97165735949" className="hover:text-orange transition-colors font-medium text-foreground/90">+971 65 735 949</a>
                      </div>
                      <a href="https://wa.me/971505751347" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline transition-colors block font-bold text-xs sm:text-sm pt-0.5">
                        WhatsApp: +971 50 575 1347
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Mail className="w-6 h-6 text-orange shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="block font-bold text-foreground text-sm sm:text-base">Enquiry Email</span>
                      <div className="text-steel text-xs sm:text-sm leading-relaxed">
                        <a href="mailto:kaleel@babalkhibrah.com" className="hover:text-orange transition-colors font-medium text-foreground/90">kaleel@babalkhibrah.com</a> | <a href="mailto:sales@babalkhibrah.com" className="hover:text-orange transition-colors font-medium text-foreground/90">sales@babalkhibrah.com</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <MapPin className="w-6 h-6 text-orange shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="block font-bold text-foreground text-sm sm:text-base">Sharjah Yard Location</span>
                      <p className="text-steel text-xs sm:text-sm leading-relaxed">
                        Emirates Industrial City,Office #1, Al Saja'a Industrial Area, Sharjah, United Arab Emirates (P.O. Box 24891)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Hours */}
              <div className="bg-graphite border border-border p-6 rounded-sm space-y-4 font-sans text-xs">
                <span className="font-mono text-[9px] text-steel uppercase tracking-widest block border-b border-border pb-2">
                  Operating Hours
                </span>
                <div className="flex justify-between">
                  <span className="text-steel">Saturday – Friday:</span>
                  <span className="text-foreground/90 font-medium">8:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Right Column Tabbed Form (8 Cols) */}
            <div className="lg:col-span-8 bg-graphite border border-border p-6 sm:p-8 rounded-sm relative">
              
              <AnimatePresence mode="wait">
                {/* Success view overlay */}
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                  >
                    <CheckCircle className="w-16 h-16 text-orange" />
                    
                    <div className="space-y-2">
                      <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground">
                        Inquiry Registered Successfully
                      </h2>
                      <p className="font-mono text-sm text-orange font-bold uppercase tracking-wider">
                        REFERENCE ID: {generatedRefNum}
                      </p>
                      <p className="font-sans text-xs text-steel max-w-md mx-auto leading-relaxed">
                        Your specifications have been logged in our Sharjah dashboard. An estimation engineer is reviewing the sizes and MTC standards.
                      </p>
                    </div>

                    {/* WhatsApp Continuation CTA */}
                    <div className="bg-background border border-border p-5 rounded-sm max-w-md space-y-4">
                      <span className="font-mono text-[10px] text-steel uppercase tracking-widest block">
                        Speed Up Quote Estimation
                      </span>
                      <p className="font-sans text-[11px] text-steel leading-relaxed">
                        Forward your Reference ID directly to our sales coordinator on WhatsApp to speed up stock checks.
                      </p>
                      <a
                        href={`https://wa.me/971505751347?text=${rfqSummaryForWhatsApp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 rounded-sm flex items-center justify-center space-x-2 transition-all w-full"
                      >
                        <span>Forward Reference via WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                      }}
                      className="font-sans text-xs text-steel hover:text-foreground transition-colors border-b border-border hover:border-foreground"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-6">
                    {/* Tabs Selection */}
                    <div className="flex border-b border-border pb-4">
                      <button
                        onClick={() => setActiveTab("rfq")}
                        className={`font-display text-base sm:text-lg font-extrabold uppercase tracking-wider pb-3 border-b-2 mr-6 sm:mr-8 transition-all ${
                          activeTab === "rfq" ? "border-orange text-orange" : "border-transparent text-steel hover:text-foreground"
                        }`}
                      >
                        {isAr ? "طلب عرض سعر مفصل للخامات" : "Detailed Material RFQ"}
                      </button>
                      <button
                        onClick={() => setActiveTab("general")}
                        className={`font-display text-base sm:text-lg font-extrabold uppercase tracking-wider pb-3 border-b-2 transition-all ${
                          activeTab === "general" ? "border-orange text-orange" : "border-transparent text-steel hover:text-foreground"
                        }`}
                      >
                        {isAr ? "منصة الرسائل الاستفسارية" : "General Message Desk"}
                      </button>
                    </div>

                    {/* Detailed RFQ Form */}
                    {activeTab === "rfq" && (
                      <form onSubmit={handleRfqSubmit} className="space-y-7">
                        
                        {/* Section 1: B2B Contact Info */}
                        <div className="space-y-4">
                          <span className="font-mono text-sm sm:text-base text-orange uppercase tracking-widest block font-bold border-b border-border pb-2">
                            {isAr ? "الخطوة 1: بيانات تواصل الشركة" : "Step 1: Company Contact Details"}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "اسم المسؤول *" : "Contact Name *"}
                              </label>
                              <input
                                type="text"
                                required
                                value={rfqForm.name}
                                onChange={e => setRfqForm({...rfqForm, name: e.target.value})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. John Doe"
                              />
                            </div>
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "اسم الشركة *" : "Company Name *"}
                              </label>
                              <input
                                type="text"
                                required
                                value={rfqForm.companyName}
                                onChange={e => setRfqForm({...rfqForm, companyName: e.target.value})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. Precision Machining LLC"
                              />
                            </div>
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "البريد الإلكتروني *" : "Email Address *"}
                              </label>
                              <input
                                type="email"
                                required
                                value={rfqForm.email}
                                onChange={e => setRfqForm({...rfqForm, email: e.target.value})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. buyer@company.com"
                              />
                            </div>
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "رقم الجوال / الهاتف *" : "Phone Number *"}
                              </label>
                              <input
                                type="tel"
                                required
                                value={rfqForm.phone}
                                onChange={e => setRfqForm({...rfqForm, phone: e.target.value})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. +971 50 123 4567"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Material Specifications */}
                        <div className="space-y-4 pt-5 border-t border-border">
                          <span className="font-mono text-sm sm:text-base text-orange uppercase tracking-widest block font-bold border-b border-border pb-2">
                            {isAr ? "الخطوة 2: مواصفات الفولاذ المطلوب" : "Step 2: Material Specifications"}
                          </span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {/* Material Family */}
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "عائلة الخامة" : "Material Family"}
                              </label>
                              <select
                                value={rfqForm.materialFamily}
                                onChange={e => setRfqForm({...rfqForm, materialFamily: e.target.value})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-[#D65A24] transition-colors"
                              >
                                <option value="All">{isAr ? "اختر نوع المنتج..." : "Select Product..."}</option>
                                <option value="Medium Carbon Steel">Medium Carbon Steel (EN8 / C45 / C45E)</option>
                                <option value="Hard Chrome Plated Bar">Hard Chrome Plated Bar (C45E / CK45)</option>
                                <option value="Tool Steel">Tool Steel (D2 / P20 / 1.2379 / 1.2311)</option>
                                <option value="Alloy Steel">Alloy Steel (EN19 / EN24 / 4140 / 4340)</option>
                                <option value="Aluminium Alloy">Aluminium Alloy (7075-T6 / 2024)</option>
                                <option value="Stainless Steel">Stainless Steel (SS 316L / 304L)</option>
                              </select>
                            </div>

                            {/* Grade */}
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "العيار المطلوب *" : "Target Grade *"}
                              </label>
                              <input
                                type="text"
                                required
                                value={rfqForm.grade}
                                onChange={e => setRfqForm({...rfqForm, grade: e.target.value})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. EN19, 4140, D2"
                              />
                            </div>

                            {/* Shape / Form */}
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "شكل الخامة" : "Material Shape"}
                              </label>
                              <select
                                value={rfqForm.form}
                                onChange={e => setRfqForm({...rfqForm, form: e.target.value})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                              >
                                {shapes.map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Dynamic Dimension Inputs based on shape */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-background border border-border p-5 rounded-sm">
                            <span className="col-span-full font-mono text-xs sm:text-sm text-orange font-bold uppercase tracking-wider block border-b border-border pb-1.5 mb-2">
                              {isAr ? "أدخل الأبعاد (مم)" : "Enter Dimensions (mm)"}
                            </span>

                            {/* Diameter - shown for round bars, rods, pipes */}
                            {(rfqForm.form === "Round bars" || rfqForm.form === "Rods" || rfqForm.form === "Pipes") && (
                              <div>
                                <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-1.5">
                                  {isAr ? "القطر (Ø)" : "Diameter (ø)"}
                                </label>
                                <input
                                  type="text"
                                  placeholder="E.g. 50"
                                  value={rfqForm.diameter}
                                  onChange={e => setRfqForm({...rfqForm, diameter: e.target.value})}
                                  className="w-full font-sans text-sm bg-graphite border border-steel/25 rounded-sm p-3 text-foreground font-medium focus:outline-none focus:border-orange"
                                />
                              </div>
                            )}

                            {/* Thickness - shown for plates, blocks, cut pieces */}
                            {(rfqForm.form === "Plates" || rfqForm.form === "Blocks" || rfqForm.form === "Cut pieces") && (
                              <div>
                                <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-1.5">
                                  {isAr ? "السمك (T)" : "Thickness (T)"}
                                </label>
                                <input
                                  type="text"
                                  placeholder="E.g. 20"
                                  value={rfqForm.thickness}
                                  onChange={e => setRfqForm({...rfqForm, thickness: e.target.value})}
                                  className="w-full font-sans text-sm bg-graphite border border-steel/25 rounded-sm p-3 text-foreground font-medium focus:outline-none focus:border-orange"
                                />
                              </div>
                            )}

                            {/* Width - shown for plates, blocks, cut pieces */}
                            {(rfqForm.form === "Plates" || rfqForm.form === "Blocks" || rfqForm.form === "Cut pieces") && (
                              <div>
                                <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-1.5">
                                  {isAr ? "العرض (W)" : "Width (W)"}
                                </label>
                                <input
                                  type="text"
                                  placeholder="E.g. 100"
                                  value={rfqForm.width}
                                  onChange={e => setRfqForm({...rfqForm, width: e.target.value})}
                                  className="w-full font-sans text-sm bg-graphite border border-steel/25 rounded-sm p-3 text-foreground font-medium focus:outline-none focus:border-orange"
                                />
                              </div>
                            )}

                            {/* Length - shown for all */}
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-1.5">
                                {isAr ? "الطول (L)" : "Length (L)"}
                              </label>
                              <input
                                type="text"
                                placeholder="E.g. 300"
                                value={rfqForm.length}
                                onChange={e => setRfqForm({...rfqForm, length: e.target.value})}
                                className="w-full font-sans text-sm bg-graphite border border-steel/25 rounded-sm p-3 text-foreground font-medium focus:outline-none focus:border-orange"
                              />
                            </div>

                            {/* Quantity & Unit */}
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-1.5">
                                {isAr ? "الكمية *" : "Quantity *"}
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="E.g. 10"
                                value={rfqForm.quantity}
                                onChange={e => setRfqForm({...rfqForm, quantity: e.target.value})}
                                className="w-full font-sans text-sm bg-graphite border border-steel/25 rounded-sm p-3 text-foreground font-medium focus:outline-none focus:border-orange"
                              />
                            </div>

                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-1.5">
                                {isAr ? "الوحدة" : "Unit"}
                              </label>
                              <select
                                value={rfqForm.unit}
                                onChange={e => setRfqForm({...rfqForm, unit: e.target.value as any})}
                                className="w-full font-sans text-sm bg-graphite border border-steel/25 rounded-sm p-3 text-foreground font-medium focus:outline-none focus:border-orange"
                              >
                                <option value="pcs">{isAr ? "قطع (pcs)" : "Pieces (pcs)"}</option>
                                <option value="kgs">{isAr ? "كيلوجرام (kgs)" : "Kilograms (kgs)"}</option>
                                <option value="tons">{isAr ? "طن متري (tons)" : "Metric Tons (tons)"}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Section 3: Processing & Quality */}
                        <div className="space-y-4 pt-5 border-t border-border">
                          <span className="font-mono text-sm sm:text-base text-orange uppercase tracking-widest block font-bold border-b border-border pb-2">
                            {isAr ? "الخطوة 3: الأبعاد والشهادات وشروط التوريد" : "Step 3: Sizing & Quality Controls"}
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {/* Cutting spec */}
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "متطلبات القص والتفصيل" : "Sizing Requirement"}
                              </label>
                              <select
                                value={rfqForm.cuttingRequirement}
                                onChange={e => setRfqForm({...rfqForm, cuttingRequirement: e.target.value})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange"
                              >
                                <option value="Full lengths">{isAr ? "أطوال كاملة (6 أمتار)" : "Full Lengths (6 meters)"}</option>
                                <option value="Bandsaw cut to size">{isAr ? "قص ميكانيكي بالمنشار" : "In-House Bandsaw Sizing"}</option>
                                <option value="Oxy-fuel flame cut">{isAr ? "قص حراري بالأكسجين" : "Oxy-Fuel Profile Cut"}</option>
                                <option value="Custom cutting required">{isAr ? "تفاصيل قص مخصصة" : "Special Cut-To-Size Details"}</option>
                              </select>
                            </div>

                            {/* Certificates */}
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "معيار الشهادة المعتمدة" : "Certificate Spec"}
                              </label>
                              <select
                                value={rfqForm.certificateRequirement}
                                onChange={e => setRfqForm({...rfqForm, certificateRequirement: e.target.value as any})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange"
                              >
                                <option value="MTC 3.1">{isAr ? "شهادة مصنع EN10204 3.1" : "Mill Test Certificate EN10204 3.1"}</option>
                                <option value="Third-Party">{isAr ? "ختم فحص طرف ثالث (LR/BV/SGS)" : "Third-Party Witness Stamp (LR/BV/SGS)"}</option>
                                <option value="None">{isAr ? "معيار توريد تجاري" : "Commercial Sourcing standard"}</option>
                              </select>
                            </div>

                            {/* Delivery location */}
                            <div>
                              <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                                {isAr ? "مدينة التوريد (الإمارات/الخليج)" : "Delivery City (UAE/GCC)"}
                              </label>
                              <input
                                type="text"
                                required
                                value={rfqForm.deliveryLocation}
                                onChange={e => setRfqForm({...rfqForm, deliveryLocation: e.target.value})}
                                className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange"
                                placeholder="E.g. Sharjah Yard, Jebel Ali, Riyadh"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-5 border-t border-border">
                          <div>
                            <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                              {isAr ? "ملاحظات إضافية / التسامحات المطلوبة" : "Additional Notes / Tolerances"}
                            </label>
                            <textarea
                              rows={4}
                              value={rfqForm.additionalNotes}
                              onChange={e => setRfqForm({...rfqForm, additionalNotes: e.target.value})}
                              className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange"
                              placeholder="Describe custom tolerances, certification rules, or delivery requirements."
                            />
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-3">
                          <button
                            type="submit"
                            className="font-sans text-sm sm:text-base font-extrabold uppercase tracking-wider bg-blue hover:bg-blue/90 text-white w-full py-4.5 rounded-sm transition-all shadow-md shadow-orange/10 hover:shadow-orange/20 cursor-pointer"
                          >
                            {isAr ? "إرسال طلب عرض السعر للمكتب" : "Submit B2B RFQ Desk"}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* General Contact Form */}
                    {activeTab === "general" && (
                      <form onSubmit={handleGeneralSubmit} className="space-y-7">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                              {isAr ? "اسم المسؤول *" : "Name *"}
                            </label>
                            <input
                              type="text"
                              required
                              value={generalForm.name}
                              onChange={e => setGeneralForm({...generalForm, name: e.target.value})}
                              className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                              placeholder="E.g. John Doe"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                              {isAr ? "اسم الشركة" : "Company"}
                            </label>
                            <input
                              type="text"
                              value={generalForm.company}
                              onChange={e => setGeneralForm({...generalForm, company: e.target.value})}
                              className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                              placeholder="E.g. Steel Fabricators LLC"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                              {isAr ? "البريد الإلكتروني *" : "Email *"}
                            </label>
                            <input
                              type="email"
                              required
                              value={generalForm.email}
                              onChange={e => setGeneralForm({...generalForm, email: e.target.value})}
                              className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                              placeholder="E.g. info@company.com"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                              {isAr ? "رقم الجوال / الهاتف" : "Phone Number"}
                            </label>
                            <input
                              type="tel"
                              value={generalForm.phone}
                              onChange={e => setGeneralForm({...generalForm, phone: e.target.value})}
                              className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                              placeholder="E.g. +971 50 575 1347"
                            />
                          </div>
                          <div className="col-span-full">
                            <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                              {isAr ? "موضوع الاستفسار" : "Subject"}
                            </label>
                            <input
                              type="text"
                              value={generalForm.subject}
                              onChange={e => setGeneralForm({...generalForm, subject: e.target.value})}
                              className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange transition-colors"
                              placeholder="Describe your inquiry briefly..."
                            />
                          </div>
                          <div className="col-span-full">
                            <label className="block font-mono text-xs text-foreground/80 font-bold uppercase mb-2">
                              {isAr ? "نص الرسالة *" : "Message *"}
                            </label>
                            <textarea
                              rows={5}
                              required
                              value={generalForm.message}
                              onChange={e => setGeneralForm({...generalForm, message: e.target.value})}
                              className="w-full font-sans text-sm sm:text-base bg-background border border-border rounded-sm p-3.5 sm:p-4 text-foreground font-medium focus:outline-none focus:border-orange"
                              placeholder="Type your message here..."
                            />
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-3">
                          <button
                            type="submit"
                            className="font-sans text-sm sm:text-base font-extrabold uppercase tracking-wider bg-blue hover:bg-blue/90 text-white w-full py-4.5 rounded-sm transition-all cursor-pointer shadow-md"
                          >
                            {isAr ? "إرسال الرسالة للمكتب" : "Send General Inquiry Message"}
                          </button>
                        </div>
                      </form>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

          {/* Interactive Sharjah Yard Location Map Section */}
          <div className="mt-16 bg-graphite border border-border p-6 sm:p-8 rounded-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="font-mono text-sm sm:text-base text-[#D65A24] uppercase tracking-widest font-bold block mb-1">
                  Visit Bab Al Khibrah
                </span>
                <h2 className="font-display text-2xl font-black text-foreground">
                  Visit Our Bab Al Khibrah Yard &amp; Sales Office
                </h2>
                <p className="font-sans text-sm text-steel mt-1 font-medium">
                  Emirates Industrial City,Office #1, Al Saja'a Industrial Area, Sharjah, United Arab Emirates (P.O. Box 24891)
                </p>
              </div>

              <a
                href="https://maps.app.goo.gl/e6r8qU6VLgimDKrr5"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs font-bold uppercase tracking-wider bg-[#1C3B5E] hover:bg-[#152D47] text-white px-5 py-3 rounded-sm flex items-center justify-center space-x-2 transition-all shrink-0 shadow-sm"
              >
                <MapPin className="w-4 h-4 text-[#D65A24]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            {/* High-Resolution Google Maps Embedded Frame */}
            <div className="relative w-full h-[420px] rounded-sm overflow-hidden border border-border bg-background shadow-inner">
              <iframe
                title="Bab Al Khibrah Trading LLC Location Map"
                src="https://maps.google.com/maps?q=Bab+Al+Khibrah+Trading+LLC+Al+Sajaa+Industrial+Area+Sharjah+UAE&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
