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
  const { t, isRTL } = useLanguage();
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

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

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

  // File Validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const files = e.target.files;
    if (!files) return;

    const newFiles: File[] = [];
    const allowedExtensions = ["pdf", "dwg", "dxf", "step", "xlsx", "csv", "jpg", "png"];
    const maxSizeBytes = 15 * 1024 * 1024; // 15MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split(".").pop()?.toLowerCase();
      
      if (!extension || !allowedExtensions.includes(extension)) {
        setFileError(`Invalid file format: .${extension}. Only PDF, DWG, DXF, STEP, Excel (XLSX/CSV), and JPEGs are accepted.`);
        return;
      }

      if (file.size > maxSizeBytes) {
        setFileError(`File too large: ${file.name} (Max size: 15MB).`);
        return;
      }
      newFiles.push(file);
    }
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // RFQ Submit Handler
  const handleRfqSubmit = (e: React.FormEvent) => {
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
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbz4DpulmIhOIFa3k6ENelP4NBO6qNxtxcd7qR-SVxPdudNsfusvPi7v5O4xQFcRMkPv/exec";
    if (scriptUrl) {
      fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          formType: "rfq",
          refNum,
          ...rfqForm
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
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbz4DpulmIhOIFa3k6ENelP4NBO6qNxtxcd7qR-SVxPdudNsfusvPi7v5O4xQFcRMkPv/exec";
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
                <span className="font-mono text-xs text-orange uppercase tracking-wider block">
                  {t("salesCoordinates")}
                </span>
                <h1 className="font-display text-4xl font-black text-foreground leading-none">
                  {t("contactHeader")}
                </h1>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {t("contactSubheader")}
                </p>
              </div>

              {/* Direct Contacts List */}
              <div className="bg-graphite border border-border p-6 rounded-sm space-y-6">
                <span className="font-mono text-[9px] text-steel uppercase tracking-widest block border-b border-border pb-2">
                  {t("salesCoordinates")}
                </span>

                <div className="space-y-4 font-sans text-xs">
                  <div className="flex items-start space-x-3.5">
                    <Phone className="w-5 h-5 text-orange shrink-0" />
                    <div>
                      <span className="block font-bold text-foreground">Phone & WhatsApp Support</span>
                      <a href="tel:+971505751347" className="text-steel hover:text-orange transition-colors block mt-0.5">Mobile: +971 50 575 1347</a>
                      <a href="https://wa.me/971505751347" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline transition-colors block mt-0.5 font-semibold">WhatsApp: +971 50 575 1347</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Mail className="w-5 h-5 text-orange shrink-0" />
                    <div>
                      <span className="block font-bold text-foreground">Enquiry Email</span>
                      <a href="mailto:kaleel@babalkhibrah.com" className="text-steel hover:text-orange transition-colors block mt-0.5">kaleel@babalkhibrah.com</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <MapPin className="w-5 h-5 text-orange shrink-0" />
                    <div>
                      <span className="block font-bold text-foreground">Sharjah Yard Location</span>
                      <p className="text-steel leading-relaxed mt-0.5">
                        Office #1, Al Saja'a Industrial Area, Sharjah, United Arab Emirates (P.O. Box 24891)
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
                  <span className="text-steel">Monday – Saturday:</span>
                  <span className="text-foreground/90 font-medium">8:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel">Sunday:</span>
                  <span className="text-orange font-bold font-mono">Closed</span>
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
                        setUploadedFiles([]);
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
                        className={`font-display text-sm font-bold uppercase tracking-wider pb-2 border-b-2 mr-6 transition-all ${
                          activeTab === "rfq" ? "border-orange text-orange" : "border-transparent text-steel hover:text-foreground"
                        }`}
                      >
                        Detailed Material RFQ
                      </button>
                      <button
                        onClick={() => setActiveTab("general")}
                        className={`font-display text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                          activeTab === "general" ? "border-orange text-orange" : "border-transparent text-steel hover:text-foreground"
                        }`}
                      >
                        General Message Desk
                      </button>
                    </div>

                    {/* Detailed RFQ Form */}
                    {activeTab === "rfq" && (
                      <form onSubmit={handleRfqSubmit} className="space-y-6">
                        
                        {/* Section 1: B2B Contact Info */}
                        <div className="space-y-4">
                          <span className="font-mono text-[9px] text-orange uppercase tracking-widest block font-bold border-b border-border pb-1">
                            Step 1: Company Contact Details
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Contact Name *</label>
                              <input
                                type="text"
                                required
                                value={rfqForm.name}
                                onChange={e => setRfqForm({...rfqForm, name: e.target.value})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. John Doe"
                              />
                            </div>
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Company Name *</label>
                              <input
                                type="text"
                                required
                                value={rfqForm.companyName}
                                onChange={e => setRfqForm({...rfqForm, companyName: e.target.value})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. Precision Machining LLC"
                              />
                            </div>
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Email Address *</label>
                              <input
                                type="email"
                                required
                                value={rfqForm.email}
                                onChange={e => setRfqForm({...rfqForm, email: e.target.value})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. buyer@company.com"
                              />
                            </div>
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Phone Number *</label>
                              <input
                                type="tel"
                                required
                                value={rfqForm.phone}
                                onChange={e => setRfqForm({...rfqForm, phone: e.target.value})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. +971 50 123 4567"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Material Specifications */}
                        <div className="space-y-4 pt-4 border-t border-border">
                          <span className="font-mono text-[9px] text-orange uppercase tracking-widest block font-bold border-b border-border pb-1">
                            Step 2: Material Specifications
                          </span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Material Family */}
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Material Family</label>
                              <select
                                value={rfqForm.materialFamily}
                                onChange={e => setRfqForm({...rfqForm, materialFamily: e.target.value})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-[#D65A24] transition-colors"
                              >
                                <option value="All">Select Product...</option>
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
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Target Grade *</label>
                              <input
                                type="text"
                                required
                                value={rfqForm.grade}
                                onChange={e => setRfqForm({...rfqForm, grade: e.target.value})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                                placeholder="E.g. EN19, 4140, D2"
                              />
                            </div>

                            {/* Shape / Form */}
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Material Shape</label>
                              <select
                                value={rfqForm.form}
                                onChange={e => setRfqForm({...rfqForm, form: e.target.value})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                              >
                                {shapes.map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Dynamic Dimension Inputs based on shape */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-background border border-border p-4 rounded-sm">
                            <span className="col-span-full font-mono text-[9px] text-steel uppercase block border-b border-border pb-1 mb-1">
                              Enter Dimensions (mm)
                            </span>

                            {/* Diameter - shown for round bars, rods, pipes */}
                            {(rfqForm.form === "Round bars" || rfqForm.form === "Rods" || rfqForm.form === "Pipes") && (
                              <div>
                                <label className="block font-mono text-[9px] text-steel uppercase mb-1">Diameter (ø)</label>
                                <input
                                  type="text"
                                  placeholder="E.g. 50"
                                  value={rfqForm.diameter}
                                  onChange={e => setRfqForm({...rfqForm, diameter: e.target.value})}
                                  className="w-full font-sans text-xs bg-graphite border border-steel/25 rounded-sm p-2 text-foreground focus:outline-none focus:border-orange"
                                />
                              </div>
                            )}

                            {/* Thickness - shown for plates, blocks, cut pieces */}
                            {(rfqForm.form === "Plates" || rfqForm.form === "Blocks" || rfqForm.form === "Cut pieces") && (
                              <div>
                                <label className="block font-mono text-[9px] text-steel uppercase mb-1">Thickness (T)</label>
                                <input
                                  type="text"
                                  placeholder="E.g. 20"
                                  value={rfqForm.thickness}
                                  onChange={e => setRfqForm({...rfqForm, thickness: e.target.value})}
                                  className="w-full font-sans text-xs bg-graphite border border-steel/25 rounded-sm p-2 text-foreground focus:outline-none focus:border-orange"
                                />
                              </div>
                            )}

                            {/* Width - shown for plates, blocks, cut pieces */}
                            {(rfqForm.form === "Plates" || rfqForm.form === "Blocks" || rfqForm.form === "Cut pieces") && (
                              <div>
                                <label className="block font-mono text-[9px] text-steel uppercase mb-1">Width (W)</label>
                                <input
                                  type="text"
                                  placeholder="E.g. 100"
                                  value={rfqForm.width}
                                  onChange={e => setRfqForm({...rfqForm, width: e.target.value})}
                                  className="w-full font-sans text-xs bg-graphite border border-steel/25 rounded-sm p-2 text-foreground focus:outline-none focus:border-orange"
                                />
                              </div>
                            )}

                            {/* Length - shown for all */}
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1">Length (L)</label>
                              <input
                                type="text"
                                placeholder="E.g. 300"
                                value={rfqForm.length}
                                onChange={e => setRfqForm({...rfqForm, length: e.target.value})}
                                className="w-full font-sans text-xs bg-graphite border border-steel/25 rounded-sm p-2 text-foreground focus:outline-none focus:border-orange"
                              />
                            </div>

                            {/* Quantity & Unit */}
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1">Quantity</label>
                              <input
                                type="text"
                                required
                                placeholder="E.g. 10"
                                value={rfqForm.quantity}
                                onChange={e => setRfqForm({...rfqForm, quantity: e.target.value})}
                                className="w-full font-sans text-xs bg-graphite border border-steel/25 rounded-sm p-2 text-foreground focus:outline-none focus:border-orange"
                              />
                            </div>

                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1">Unit</label>
                              <select
                                value={rfqForm.unit}
                                onChange={e => setRfqForm({...rfqForm, unit: e.target.value as any})}
                                className="w-full font-sans text-xs bg-graphite border border-steel/25 rounded-sm p-2 text-foreground focus:outline-none focus:border-orange"
                              >
                                <option value="pcs">Pieces (pcs)</option>
                                <option value="kgs">Kilograms (kgs)</option>
                                <option value="tons">Metric Tons (tons)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Section 3: Processing & Quality */}
                        <div className="space-y-4 pt-4 border-t border-border">
                          <span className="font-mono text-[9px] text-orange uppercase tracking-widest block font-bold border-b border-border pb-1">
                            Step 3: Sizing & Quality Controls
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Cutting spec */}
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Sizing Requirement</label>
                              <select
                                value={rfqForm.cuttingRequirement}
                                onChange={e => setRfqForm({...rfqForm, cuttingRequirement: e.target.value})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange"
                              >
                                <option value="Full lengths">Full Lengths (6 meters)</option>
                                <option value="Bandsaw cut to size">In-House Bandsaw Sizing</option>
                                <option value="Oxy-fuel flame cut">Oxy-Fuel Profile Cut</option>
                                <option value="Custom cutting required">Special Cut-To-Size Details</option>
                              </select>
                            </div>

                            {/* Certificates */}
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Certificate Spec</label>
                              <select
                                value={rfqForm.certificateRequirement}
                                onChange={e => setRfqForm({...rfqForm, certificateRequirement: e.target.value as any})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange"
                              >
                                <option value="MTC 3.1">Mill Test Certificate EN10204 3.1</option>
                                <option value="Third-Party">Third-Party Witness Stamp (LR/BV/SGS)</option>
                                <option value="None">Commercial Sourcing standard</option>
                              </select>
                            </div>

                            {/* Delivery location */}
                            <div>
                              <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Delivery City (UAE/GCC)</label>
                              <input
                                type="text"
                                required
                                value={rfqForm.deliveryLocation}
                                onChange={e => setRfqForm({...rfqForm, deliveryLocation: e.target.value})}
                                className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange"
                                placeholder="E.g. Sharjah Yard, Jebel Ali, Riyadh"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 4: Secure File Uploader */}
                        <div className="space-y-4 pt-4 border-t border-border">
                          <span className="font-mono text-[9px] text-[#D65A24] uppercase tracking-widest block font-bold border-b border-border pb-1">
                            Step 4: CAD Drawings & Specifications (Optional)
                          </span>

                          <div className="border border-dashed border-steel/30 rounded-sm p-6 text-center hover:border-orange transition-colors relative bg-background">
                            <input
                              type="file"
                              multiple
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              title="Upload CAD drawings"
                            />
                            <Upload className="w-8 h-8 text-steel mx-auto mb-2 opacity-70" />
                            <p className="font-sans text-xs text-foreground/80 font-semibold mb-1">
                              Drag & Drop files or Click to select
                            </p>
                            <p className="font-mono text-[9px] text-steel leading-relaxed">
                              ACCEPTED: PDF, DWG, DXF, STEP, XLSX, CSV, JPG, PNG (MAX size: 15MB)
                            </p>
                          </div>

                          {fileError && (
                            <div className="flex items-center space-x-2 bg-orange/5 border border-orange/20 p-2.5 rounded-sm text-[11px] text-orange">
                              <AlertCircle className="w-4 h-4 shrink-0" />
                              <span>{fileError}</span>
                            </div>
                          )}

                          {/* List of uploaded files */}
                          {uploadedFiles.length > 0 && (
                            <div className="space-y-1.5">
                              {uploadedFiles.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-background border border-border p-2 rounded-sm text-xs">
                                  <div className="flex items-center space-x-2 text-steel">
                                    <FileText className="w-4 h-4 text-orange" />
                                    <span className="truncate text-foreground/90 max-w-xs">{file.name}</span>
                                    <span>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(idx)}
                                    className="text-orange hover:text-white font-mono text-[10px] uppercase font-bold"
                                  >
                                    Delete
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border">
                          <div>
                            <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Additional Notes / Tolerances</label>
                            <textarea
                              rows={3}
                              value={rfqForm.additionalNotes}
                              onChange={e => setRfqForm({...rfqForm, additionalNotes: e.target.value})}
                              className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange"
                              placeholder="Describe custom tolerances, certification rules, or delivery requirements."
                            />
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="font-sans text-xs font-bold uppercase tracking-wider bg-blue hover:bg-blue/90 text-white w-full py-4 rounded-sm transition-all shadow-md shadow-orange/10 hover:shadow-orange/20"
                          >
                            Submit B2B RFQ Desk
                          </button>
                        </div>
                      </form>
                    )}

                    {/* General Contact Form */}
                    {activeTab === "general" && (
                      <form onSubmit={handleGeneralSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Name *</label>
                            <input
                              type="text"
                              required
                              value={generalForm.name}
                              onChange={e => setGeneralForm({...generalForm, name: e.target.value})}
                              className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                              placeholder="E.g. John Doe"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Company</label>
                            <input
                              type="text"
                              value={generalForm.company}
                              onChange={e => setGeneralForm({...generalForm, company: e.target.value})}
                              className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                              placeholder="E.g. Steel Fabricators LLC"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Email *</label>
                            <input
                              type="email"
                              required
                              value={generalForm.email}
                              onChange={e => setGeneralForm({...generalForm, email: e.target.value})}
                              className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                              placeholder="E.g. info@company.com"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Phone Number</label>
                            <input
                              type="tel"
                              value={generalForm.phone}
                              onChange={e => setGeneralForm({...generalForm, phone: e.target.value})}
                              className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                              placeholder="E.g. +971 50 575 1347"
                            />
                          </div>
                          <div className="col-span-full">
                            <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Subject</label>
                            <input
                              type="text"
                              value={generalForm.subject}
                              onChange={e => setGeneralForm({...generalForm, subject: e.target.value})}
                              className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange transition-colors"
                              placeholder="Describe your inquiry briefly..."
                            />
                          </div>
                          <div className="col-span-full">
                            <label className="block font-mono text-[9px] text-steel uppercase mb-1.5">Message *</label>
                            <textarea
                              rows={5}
                              required
                              value={generalForm.message}
                              onChange={e => setGeneralForm({...generalForm, message: e.target.value})}
                              className="w-full font-sans text-xs bg-background border border-border rounded-sm p-3 text-foreground focus:outline-none focus:border-orange"
                              placeholder="Type your message here..."
                            />
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="font-sans text-xs font-bold uppercase tracking-wider bg-blue hover:bg-blue/90 text-white w-full py-4 rounded-sm transition-all"
                          >
                            Send General Inquiry Message
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
                <span className="font-mono text-xs text-[#D65A24] uppercase tracking-widest font-bold block mb-1">
                  Visit Bab Al Khibrah
                </span>
                <h2 className="font-display text-2xl font-black text-foreground">
                  Visit Our Bab Al Khibrah Yard &amp; Sales Office
                </h2>
                <p className="font-sans text-xs text-steel mt-1">
                  Office #1, Yard #3600 sq.ft, Al Saja'a Industrial Area, Sharjah, United Arab Emirates (P.O. Box 24891)
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
