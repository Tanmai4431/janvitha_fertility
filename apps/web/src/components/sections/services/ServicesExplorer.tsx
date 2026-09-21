import React, { useState, useMemo } from 'react';
import { ServiceCard } from '../../ui/ServiceCard';

export interface SubserviceItem {
  title: string;
  desc?: string;
}

export interface ServiceItemData {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDescription?: string;
  imageUrl?: string;
  videoUrl?: string;
  subservices?: SubserviceItem[];
  features?: string[];
  metrics?: { label: string; value: string }[];
}

interface ServicesExplorerProps {
  services: ServiceItemData[];
  siteName: string;
  siteDescription?: string;
  primaryPhone?: string;
}

export const ServicesExplorer: React.FC<ServicesExplorerProps> = ({
  services,
  siteName,
  siteDescription,
  primaryPhone,
}) => {
  // Normalize category name
  const cleanCategoryName = (cat: string) => {
    if (!cat) return 'Specialized Care';
    return cat.replace(/^\d+\s*[•·-]\s*/, '').trim();
  };

  // Extract unique categories
  const categories = useMemo(() => {
    const rawSet = new Set<string>();
    services.forEach((s) => {
      const clean = cleanCategoryName(s.category);
      if (clean) rawSet.add(clean);
    });
    return ['All Treatments', ...Array.from(rawSet)];
  }, [services]);

  const [activeCategory, setActiveCategory] = useState<string>('All Treatments');

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (activeCategory === 'All Treatments') return services;
    return services.filter((s) => cleanCategoryName(s.category) === activeCategory);
  }, [services, activeCategory]);

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      
      {/* ── TOP HEADER HERO BLOCK ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start justify-between">
        
        {/* Left Headline */}
        <div className="lg:col-span-7 space-y-2 text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#1A0B3C] tracking-tight leading-[1.2]">
            Fertility Treatments & Care at{' '}
            <span className="text-[#E4006E]">
              {siteName}
            </span>
          </h2>
        </div>

        {/* Right Description & View Services Button */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between space-y-3.5 pt-0.5 text-left">
          <p className="text-secondary text-xs sm:text-[13.5px] leading-relaxed max-w-lg font-sans">
            {siteDescription ||
              'Janvithas Fertility Center is a specialized fertility and reproductive healthcare center in Ananthapuram, providing world-class fertility evaluations, IVF, IUI, ICSI, PICSI, genetic programs, and fertility preservation with compassionate medical care.'}
          </p>

          <a
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF0F6] lg:bg-[#F05698] text-[#E4006E] lg:text-white border border-[#FADCEB] lg:border-transparent hover:bg-[#6B21A8] hover:text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xs lg:shadow-[0_2px_10px_rgba(240,86,152,0.25)] hover:shadow-[0_4px_16px_rgba(107,33,168,0.35)] transition-all duration-200 active:scale-95"
          >
            <span>View Services</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

      </div>

      {/* ── MAIN CONTENT (SIDEBAR TABS + COMPACT 3x3 SERVICES CARD GRID) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar Category Filter Navigation */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-3">
          
          {/* Mobile Horizontal Scrollable List */}
          <div className="flex lg:hidden overflow-x-auto pb-2 gap-1.5 no-scrollbar border-b border-[#FADCEB]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-150 shrink-0 ${
                    isActive
                      ? 'bg-[#FFF0F6] text-[#E4006E] border-2 border-[#FADCEB] shadow-xs'
                      : 'bg-white text-[#1A0B3C] border border-[#FADCEB] hover:text-[#E4006E] hover:bg-[#FFF0F6]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Desktop Vertical Menu */}
          <div className="hidden lg:flex flex-col space-y-1.5 bg-[#FFF0F6]/70 p-2.5 rounded-[22px] border border-[#FADCEB]">
            <p className="text-[10.5px] font-bold uppercase tracking-wider text-secondary px-3 py-1 font-label">
              Filter by Specialty
            </p>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left py-2.5 px-3.5 rounded-[14px] text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'bg-[#F05698] text-white font-bold shadow-xs'
                      : 'text-[#1A0B3C] hover:text-[#F05698] hover:bg-white'
                  }`}
                >
                  <span className="truncate pr-1">{cat}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-white shrink-0"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mini Help Widget */}
          <div className="hidden lg:block p-4 rounded-[20px] bg-white border border-[#FADCEB] text-left space-y-2 shadow-2xs">
            <p className="font-heading font-bold text-xs text-[#1A0B3C]">Need Consultation Guidance?</p>
            <p className="text-[11px] text-secondary font-sans leading-relaxed">
              Dr. P. Bharathi provides personalized dual-partner evaluations.
            </p>
            <a
              href="/contact"
              className="inline-block text-[11px] font-bold text-[#F05698] hover:text-[#6B21A8] hover:underline"
            >
              Book an Appointment →
            </a>
          </div>

        </div>

        {/* Right 3x3 Cards Grid */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-[#FADCEB]">
              <p className="text-secondary text-sm">No services found in this category.</p>
            </div>
          )}
        </div>

      </div>

      {/* ── BOTTOM TAGLINE & CONSULTATION CTA ── */}
      <div className="text-center pt-6 border-t border-[#FADCEB]/80 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-sans text-xs sm:text-sm text-secondary">
        <span>Ready to discuss your personalized care plan?</span>
        <a
          href="/contact"
          className="font-bold text-[#E4006E] hover:text-[#1A0B3C] underline underline-offset-4"
        >
          Book a Free Consultation
        </a>
        {primaryPhone && (
          <span>
            or call <a href={`tel:${primaryPhone.replace(/\s+/g, '')}`} className="font-bold text-[#1A0B3C] hover:text-[#E4006E]">{primaryPhone}</a>
          </span>
        )}
      </div>

    </div>
  );
};

export default ServicesExplorer;
