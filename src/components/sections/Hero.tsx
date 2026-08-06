"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Compass, Truck, ShieldCheck, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, isRTL } = useLanguage();

  const trustBadges = [
    { icon: <Box className="w-5 h-5 text-[#D65A24]" />, title: t("inHouseSawing"), desc: t("inHouseSawingDesc") },
    { icon: <Compass className="w-5 h-5 text-[#D65A24]" />, title: t("stockedAlloys"), desc: t("stockedAlloysDesc") },
    { icon: <Truck className="w-5 h-5 text-[#D65A24]" />, title: t("uaeDispatch"), desc: t("uaeDispatchDesc") },
    { icon: <ShieldCheck className="w-5 h-5 text-[#D65A24]" />, title: t("millCertified"), desc: t("millCertifiedDesc") }
  ];

  // The 7 official yard & stock images requested by the user
  const heroSlides = [
    {
      image: "/hero/IMG_8117.jpg",
      title: t("slide1Title"),
      category: t("slide1Cat"),
      desc: t("slide1Desc")
    },
    {
      image: "/hero/IMG_8121.jpg",
      title: t("slide2Title"),
      category: t("slide2Cat"),
      desc: t("slide2Desc")
    },
    {
      image: "/hero/IMG_8126.jpg",
      title: t("slide3Title"),
      category: t("slide3Cat"),
      desc: t("slide3Desc")
    },
    {
      image: "/hero/IMG_8134.jpg",
      title: t("slide4Title"),
      category: t("slide4Cat"),
      desc: t("slide4Desc")
    },
    {
      image: "/hero/IMG_20260801_174755.jpg.jpeg",
      title: t("slide5Title"),
      category: t("slide5Cat"),
      desc: t("slide5Desc")
    },
    {
      image: "/hero/IMG_20260801_175228.jpg.jpeg",
      title: t("slide6Title"),
      category: t("slide6Cat"),
      desc: t("slide6Desc")
    },
    {
      image: "/hero/1000228303.jpg.jpeg",
      title: t("slide7Title"),
      category: t("slide7Cat"),
      desc: t("slide7Desc")
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto loop slides every 4 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const activeSlide = heroSlides[currentIndex];

  return (
    <section className="relative bg-background pt-28 lg:pt-36 pb-16 overflow-hidden border-b border-border grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Location & Sector Tag */}
            <div className="inline-flex items-center space-x-2 bg-graphite border border-border px-3.5 py-1.5 rounded-sm">
              <span className="w-2 h-2 bg-[#D65A24] rounded-full animate-pulse shrink-0"></span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground font-bold">
                {t("tagline")}
              </span>
            </div>

            {/* Headline & Description */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-[1.05]">
                {t("heroTitleLine1")} <br />
                {t("heroTitleLine2")}<span className="text-[#D65A24]">{t("heroTitleLine3")}</span> <br />
                {t("heroTitleLine4")}
              </h1>
              <p className="font-sans text-base text-steel leading-relaxed max-w-xl">
                {t("heroDesc")}
              </p>
            </div>

            {/* Primary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="group font-sans text-xs font-bold uppercase tracking-wider bg-[#1C3B5E] hover:bg-[#152D47] text-white px-8 py-4 rounded-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>{t("requestQuote")}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
              </Link>
              <Link
                href="/materials"
                className="font-sans text-xs font-semibold uppercase tracking-wider border border-border hover:border-steel bg-background text-foreground hover:bg-graphite px-8 py-4 rounded-sm transition-all duration-200 text-center"
              >
                {t("exploreProducts")}
              </Link>
            </div>

            {/* Key Trust Pillars */}
            <div className="border-t border-border pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {trustBadges.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="mb-2">{item.icon}</div>
                  <span className="font-display text-xs font-bold text-foreground block">
                    {item.title}
                  </span>
                  <span className="font-sans text-[10px] text-steel block">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Hero Image Gallery Showcase (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Interactive Image Frame */}
            <div
              className="relative w-full h-[440px] sm:h-[500px] rounded-sm overflow-hidden border border-border bg-graphite shadow-xl group"
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {/* Progress Line */}
              <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-border">
                <motion.div
                  key={currentIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: isPlaying ? 4 : 0, ease: "linear" }}
                  className="h-full bg-[#D65A24]"
                />
              </div>

              {/* Controls Overlay */}
              <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
                <span className="font-mono text-[9px] bg-background/90 backdrop-blur-sm border border-border text-[#D65A24] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                  {t("sajaaGallery")}
                </span>
                <div className="flex items-center space-x-2 pointer-events-auto">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-sm bg-background/90 hover:bg-[#D65A24] text-foreground hover:text-white border border-border transition-colors cursor-pointer"
                    title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span className="font-mono text-[9px] bg-background/90 border border-border text-steel px-2 py-1 rounded-sm">
                    {currentIndex + 1} / {heroSlides.length}
                  </span>
                </div>
              </div>

              {/* Slide Transition Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Sleek Overlay Text */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1">
                    <span className="font-mono text-[9px] text-[#D65A24] font-bold tracking-widest uppercase block">
                      {activeSlide.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white">
                      {activeSlide.title}
                    </h3>
                    <p className="font-sans text-xs text-steel/90 line-clamp-2">
                      {activeSlide.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-sm bg-background/80 hover:bg-[#D65A24] text-foreground hover:text-white border border-border transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-sm bg-background/80 hover:bg-[#D65A24] text-foreground hover:text-white border border-border transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 7 Image Thumbnails Bar */}
            <div className="flex sm:grid sm:grid-cols-7 gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
              {heroSlides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative h-14 w-14 sm:w-auto shrink-0 snap-start rounded-sm overflow-hidden border transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "border-[#D65A24] opacity-100 shadow-sm"
                      : "border-border opacity-50 hover:opacity-100"
                  }`}
                  title={slide.title}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
