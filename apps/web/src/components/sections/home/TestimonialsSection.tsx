"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import clientData from "../../../../../../client.json";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
  business?: string;
  rating?: number;
  domain?: string;
  date?: string;
}

export interface TestimonialsSectionProps {
  customTestimonials?: TestimonialItem[];
  title?: string;
  highlightTitle?: string;
  ratingScore?: string;
  reviewCount?: string;
  sidebarHeading?: string;
  className?: string;
}

export function TestimonialsSection({
  customTestimonials,
  title = "Reviews from",
  highlightTitle = "real people",
  ratingScore = "4.5/5",
  reviewCount = "Based on 3,987 reviews",
  sidebarHeading,
  className = "",
}: TestimonialsSectionProps) {
  const testimonialsList: TestimonialItem[] =
    customTestimonials && customTestimonials.length > 0
      ? customTestimonials
      : (clientData as any).testimonials || [];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Derive dynamic sidebar heading based on business context if not provided
  const resolvedSidebarHeading =
    sidebarHeading ||
    ((clientData as any).business?.category?.toLowerCase().includes("health") ||
    (clientData as any).business?.category?.toLowerCase().includes("fertility") ||
    (clientData as any).business?.category?.toLowerCase().includes("clinic")
      ? "What our patients are saying"
      : "What our customers are saying");

  // Track scroll position to update progress bar and arrow states
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const currentScroll = el.scrollLeft;
    const progress = Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100));
    setScrollProgress(progress);
    setCanScrollLeft(currentScroll > 4);
    setCanScrollRight(currentScroll < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, testimonialsList]);

  // Automatic auto-scroll every 3 seconds (pauses on hover or touch)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const el = scrollContainerRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const cardWidth = el.querySelector<HTMLElement>("[data-testimonial-card]")?.offsetWidth || 360;
      const scrollAmount = cardWidth + 24;

      if (el.scrollLeft >= maxScroll - 15) {
        // Smoothly loop back to start
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScroll = (direction: "prev" | "next") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Scroll by roughly one card width plus gap
    const cardWidth = el.querySelector<HTMLElement>("[data-testimonial-card]")?.offsetWidth || 360;
    const scrollAmount = (cardWidth + 24) * (direction === "prev" ? -1 : 1);

    el.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimonials" className={`w-full py-3 sm:py-4 scroll-mt-24 ${className}`}>
      {/* Outer Section Width Constraint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            ONE MAIN PARENT CARD: Encapsulates Entire Testimonials Section Block
            Matching exact structural container as AboutSection & HospitalLocationCard
           ========================================================================= */}
        <div
          className="rounded-[32px] sm:rounded-[36px] bg-[#FFFDFC] border-2 border-[#FDDCEB] p-5 sm:p-7 lg:p-9 shadow-[0_4px_30px_rgba(228,0,110,0.04)]"
          data-animate="fade-up"
        >
          {/* ========================================================================= */}
          {/* 1. TOP HEADER: Reviews from real people & Trustpilot Rating Summary       */}
          {/* ========================================================================= */}
          <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-heading font-medium tracking-tight text-gray-900 leading-tight">
            {title} <span className="font-extrabold text-[#E4006E]">{highlightTitle}</span>
          </h2>

          <div className="flex items-center flex-wrap justify-center gap-2 text-sm sm:text-base text-gray-600 pt-1 font-sans">
            <span className="font-bold text-gray-900">{ratingScore}</span>

            {/* Trustpilot Green Star Icon */}
            <div className="inline-flex items-center gap-1 px-1 py-0.5">
              <svg className="w-5 h-5 fill-[#00B67A]" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="font-bold tracking-tight text-gray-900 text-base">Trustpilot</span>
            </div>

            <span className="text-gray-400 font-light">•</span>
            <span className="text-gray-500 font-normal">{reviewCount}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN SECTION: Left Quote & Controls + Right Speech-Bubble Cards Slider */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Large Quote Mark, Headline, Navigation Arrows & Progress Bar */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 sm:space-y-8 pr-0 lg:pr-4">
            
            {/* Big Double Quote Glyph in Thick Pink */}
            <div className="text-[#E4006E]/40">
              <svg
                className="w-14 h-12 sm:w-16 sm:h-14 fill-current text-[#E4006E]/40"
                viewBox="0 0 64 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 29.333C0 16.222 10.667 6.4 24 0l4.267 7.467C19.2 11.733 13.867 17.067 13.867 24H26.667V48H0V29.333zm37.333 0C37.333 16.222 48 6.4 61.333 0l4.267 7.467c-9.067 4.266-14.4 9.6-14.4 16.533H64V48H37.333V29.333z" />
              </svg>
            </div>

            {/* Left Headline */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-gray-900 leading-snug tracking-tight max-w-xs">
              {resolvedSidebarHeading}
            </h3>

            {/* Navigation & Progress Indicator Controls */}
            <div className="flex items-center gap-4 pt-2">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => handleScroll("prev")}
                aria-label="Previous testimonials"
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  canScrollLeft
                    ? "text-gray-800 hover:text-[#6B21A8] hover:bg-[#FAF5FF] active:scale-95 cursor-pointer"
                    : "text-gray-300 cursor-not-allowed opacity-60"
                }`}
                disabled={!canScrollLeft}
              >
                <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dynamic Progress Bar Track in Pink */}
              <div className="w-24 sm:w-32 h-1.5 bg-[#FDDCEB] rounded-full relative overflow-hidden">
                <div
                  className="h-full bg-[#E4006E] rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${Math.max(20, scrollProgress)}%`,
                  }}
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => handleScroll("next")}
                aria-label="Next testimonials"
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  canScrollRight
                    ? "text-gray-800 hover:text-[#6B21A8] hover:bg-[#FAF5FF] active:scale-95 cursor-pointer"
                    : "text-gray-300 cursor-not-allowed opacity-60"
                }`}
                disabled={!canScrollRight}
              >
                <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Horizontal Carousel of Light Pink Speech Bubble Cards with Thick Pink Accents */}
          <div 
            className="lg:col-span-8 overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-2 -mx-2 no-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {testimonialsList.map((item, index) => {
                const ratingCount = item.rating || 5;
                const authorSubtitle =
                  item.date ||
                  (item.role && item.business
                    ? `${item.role} • ${item.business}`
                    : item.role || item.business || "Verified Patient");

                return (
                  <div
                    key={`${item.name}-${index}`}
                    data-testimonial-card
                    className="shrink-0 w-[300px] sm:w-[340px] md:w-[360px] snap-start flex flex-col group select-none"
                  >
                    {/* Light Pink Speech Bubble Card Container */}
                    <div className="relative bg-[#FFF0F6] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(228,0,110,0.05)] border border-[#FADCEB] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(228,0,110,0.12)] hover:border-[#E4006E]/50 flex flex-col justify-between min-h-[220px]">
                      
                      {/* Review Paragraph */}
                      <p className="text-gray-800 text-sm sm:text-[15px] leading-relaxed font-sans font-normal">
                        {item.text}
                      </p>

                      {/* 5 Green Stars at Bottom of Bubble (matching heading Trustpilot star) */}
                      <div className="flex items-center gap-1 pt-6 text-[#00B67A]">
                        {[...Array(ratingCount)].map((_, starIdx) => (
                          <svg
                            key={starIdx}
                            className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>

                      {/* Light Pink Speech Bubble Pointer Tail */}
                      <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-[#FFF0F6] drop-shadow-[0_2px_2px_rgba(228,0,110,0.05)]" />
                    </div>

                    {/* Author Details Below the Speech Bubble (Aligned with pointer tail) */}
                    <div className="flex items-center gap-3.5 mt-5 pl-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={44}
                        height={44}
                        loading="lazy"
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#FCE1EE] ring-2 ring-[#E4006E]/20 shadow-sm shrink-0 group-hover:ring-[#E4006E] transition-all"
                      />
                      <div className="flex flex-col text-left">
                        <span className="font-heading font-bold text-gray-900 group-hover:text-[#E4006E] transition-colors text-sm sm:text-base leading-tight">
                          {item.name}
                        </span>
                        <span className="text-xs text-[#E4006E]/80 font-sans font-medium mt-0.5">
                          {authorSubtitle}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
);
}

export default TestimonialsSection;
