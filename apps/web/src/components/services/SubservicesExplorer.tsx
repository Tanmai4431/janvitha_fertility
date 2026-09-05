'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export interface SubserviceItem {
  slug?: string;
  title: string;
  desc?: string;
  shortDesc?: string;
  fullDescription?: string;
  procedureSteps?: string[];
  benefits?: string[];
  timeline?: string;
  suitableFor?: string;
}

export interface SubservicesExplorerProps {
  serviceTitle: string;
  subservices: SubserviceItem[];
  primaryPhone?: string;
}

export default function SubservicesExplorer({
  serviceTitle,
  subservices = [],
  primaryPhone = '+91 81214 49988',
}: SubservicesExplorerProps) {
  const [selectedSubservice, setSelectedSubservice] = useState<SubserviceItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedSubservice) {
        setSelectedSubservice(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSubservice]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedSubservice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSubservice]);

  if (!subservices || subservices.length === 0) return null;

  return (
    <div className="w-full space-y-6">
      {/* ── Subservices Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {subservices.map((sub, idx) => {
          const isAlt = idx % 2 === 1;
          const shortText = sub.shortDesc || sub.desc || '';
          const stepsCount = sub.procedureSteps?.length || 0;

          return (
            <div
              key={sub.slug || idx}
              onClick={() => setSelectedSubservice(sub)}
              className={cn(
                'rounded-[26px] p-6 sm:p-7 flex flex-col justify-between border-2 transition-all duration-300 group cursor-pointer text-left relative overflow-hidden',
                isAlt
                  ? 'bg-[#FAF0F8] border-[#F2DEEA] hover:border-[#853676] hover:shadow-[0_10px_30px_rgba(133,54,118,0.12)]'
                  : 'bg-[#FFF0F6] border-[#FADCEB] hover:border-[#E4006E] hover:shadow-[0_10px_30px_rgba(228,0,110,0.12)]'
              )}
            >
              <div className="space-y-4">
                {/* Header Badge Row */}
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full font-heading font-bold text-sm flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-xs',
                      isAlt
                        ? 'bg-white text-[#853676] border-purple-200 group-hover:bg-[#853676] group-hover:text-white'
                        : 'bg-white text-[#E4006E] border-rose-200 group-hover:bg-[#E4006E] group-hover:text-white'
                    )}
                  >
                    0{idx + 1}
                  </div>

                  {sub.timeline && (
                    <span className="text-[11px] font-sans font-bold px-2.5 py-1 rounded-full bg-white/90 border border-slate-200 text-slate-700 shadow-2xs">
                      ⏱️ {sub.timeline.split(';')[0].split('&')[0]}
                    </span>
                  )}
                </div>

                {/* Subservice Title */}
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#1A0B3C] group-hover:text-[#E4006E] transition-colors leading-snug">
                  {sub.title}
                </h3>

                {/* Short Description */}
                {shortText && (
                  <p className="text-secondary text-xs sm:text-[13px] font-sans leading-relaxed line-clamp-3">
                    {shortText}
                  </p>
                )}

                {/* Procedure Count & Chips */}
                {stepsCount > 0 && (
                  <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-[#853676]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#E4006E]">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <span>{stepsCount} Clinical Steps</span>
                  </div>
                )}
              </div>

              {/* Bottom Action Bar */}
              <div className="mt-5 pt-3.5 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A0B3C] group-hover:text-[#E4006E] transition-colors font-sans">
                  View Full Details
                </span>
                <span
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-white text-xs transition-transform duration-300 group-hover:translate-x-1 shadow-xs',
                    isAlt ? 'bg-[#853676]' : 'bg-[#E4006E]'
                  )}
                >
                  →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Subservice Detailed Interactive Modal ── */}
      <AnimatePresence>
        {selectedSubservice && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedSubservice(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[32px] border-2 border-[#FADCEB] shadow-[0_25px_60px_rgba(26,11,60,0.25)] flex flex-col overflow-hidden text-left z-10"
            >
              {/* Modal Top Header */}
              <div className="px-6 sm:px-8 py-5 border-b border-[#F4E2ED] bg-gradient-to-r from-[#FFF0F6] via-white to-[#FAF0F8] flex items-center justify-between shrink-0">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-[#FADCEB] text-[11px] font-bold text-[#E4006E] uppercase tracking-wider font-label">
                    {serviceTitle} • Procedure
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#1A0B3C] leading-snug">
                    {selectedSubservice.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSubservice(null)}
                  className="w-10 h-10 rounded-full bg-white border border-[#F4E2ED] text-slate-500 hover:text-[#E4006E] hover:border-[#E4006E] flex items-center justify-center text-lg font-bold shadow-xs transition-colors"
                  aria-label="Close procedure details"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body Scrollable Content */}
              <div className="px-6 sm:px-8 py-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                {/* Clinical Overview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#853676] uppercase tracking-wider font-label">
                    Clinical Overview
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                    {selectedSubservice.fullDescription || selectedSubservice.shortDesc || selectedSubservice.desc}
                  </p>
                </div>

                {/* Procedure Steps Roadmap */}
                {selectedSubservice.procedureSteps && selectedSubservice.procedureSteps.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#853676] uppercase tracking-wider font-label">
                      Step-by-Step Clinical Procedure
                    </h4>
                    <div className="space-y-2.5">
                      {selectedSubservice.procedureSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-2xl bg-[#FFF0F6]/70 border border-[#FADCEB] flex items-start gap-3.5 text-left"
                        >
                          <span className="w-7 h-7 rounded-full bg-[#E4006E] text-white flex items-center justify-center font-heading font-bold text-xs shrink-0 shadow-2xs">
                            {sIdx + 1}
                          </span>
                          <p className="text-xs sm:text-sm font-sans font-medium text-[#1A0B3C] leading-snug pt-0.5">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Benefits */}
                {selectedSubservice.benefits && selectedSubservice.benefits.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#853676] uppercase tracking-wider font-label">
                      Clinical Benefits & Advantages
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedSubservice.benefits.map((b, bIdx) => (
                        <div
                          key={bIdx}
                          className="p-3 rounded-xl bg-[#FAF0F8] border border-[#F2DEEA] flex items-start gap-2.5 text-xs sm:text-[13px] font-sans text-slate-800"
                        >
                          <span className="text-[#853676] font-bold text-sm shrink-0">✓</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suitable Candidates & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {selectedSubservice.suitableFor && (
                    <div className="p-4 rounded-2xl bg-white border border-[#F4E2ED] space-y-1">
                      <span className="text-[11px] font-bold text-[#853676] uppercase font-label">
                        Suitable For
                      </span>
                      <p className="text-xs font-sans text-slate-700">
                        {selectedSubservice.suitableFor}
                      </p>
                    </div>
                  )}

                  {selectedSubservice.timeline && (
                    <div className="p-4 rounded-2xl bg-white border border-[#F4E2ED] space-y-1">
                      <span className="text-[11px] font-bold text-[#853676] uppercase font-label">
                        Estimated Timeline
                      </span>
                      <p className="text-xs font-sans text-slate-700">
                        {selectedSubservice.timeline}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer CTA Bar */}
              <div className="px-6 sm:px-8 py-4 border-t border-[#F4E2ED] bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <p className="text-xs font-sans text-slate-600 text-center sm:text-left">
                  Have questions about this procedure? Call{' '}
                  <a href={`tel:${primaryPhone.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#E4006E]">
                    {primaryPhone}
                  </a>
                </p>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href="/contact"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#853676] hover:bg-[#E4006E] text-white font-sans font-bold text-xs sm:text-sm text-center shadow-md transition-all active:scale-95"
                  >
                    Schedule Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
