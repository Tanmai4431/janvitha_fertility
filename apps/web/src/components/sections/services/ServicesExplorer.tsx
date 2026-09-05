import React, { useState, useMemo } from 'react';

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

// Specialty SVG Icon mapping tailored to medical fertility procedures
const ServiceIcon: React.FC<{ slug: string; className?: string }> = ({ slug, className = 'w-6 h-6 text-white' }) => {
  switch (slug) {
    case 'female-infertility':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="8" r="5" />
          <path d="M12 13v8" />
          <path d="M9 17h6" />
        </svg>
      );
    case 'male-infertility':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="10" cy="14" r="5" />
          <path d="M19 5l-5.5 5.5" />
          <path d="M14 5h5v5" />
        </svg>
      );
    case 'ivf-treatment':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="10" cy="10" r="2.5" />
          <circle cx="14" cy="14" r="2.5" />
        </svg>
      );
    case 'iui-insemination':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M18 3l3 3-10 10-4 1 1-4 10-10z" />
          <path d="M14 7l3 3" />
          <path d="M3 21l3-3" />
        </svg>
      );
    case 'icsi-procedure':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="14" cy="12" r="6" />
          <circle cx="14" cy="12" r="2" />
          <path d="M2 12h7" />
        </svg>
      );
    case 'picsi-technology':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'genetic-program':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 6c4 0 4 6 8 6s4 6 8 6" />
          <path d="M4 18c4 0 4-6 8-6s4-6 8-6" />
          <circle cx="4" cy="6" r="1.5" />
          <circle cx="20" cy="18" r="1.5" />
        </svg>
      );
    case 'fertility-preservation':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2v20M2 12h20" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'blastocyst-culture':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="14" cy="10" r="1.5" />
          <circle cx="12" cy="14" r="1.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
};

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F6] border border-[#FADCEB] text-[11px] font-bold tracking-wider uppercase text-[#E4006E]">
            <span className="w-2 h-2 rounded-full bg-[#E4006E] inline-block animate-pulse"></span>
            COMPREHENSIVE ART CARE
          </div>

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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E4006E] hover:bg-[#6B21A8] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-[0_2px_10px_rgba(228,0,110,0.25)] hover:shadow-[0_4px_16px_rgba(107,33,168,0.35)] transition-all duration-200 active:scale-95"
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
                      ? 'bg-[#E4006E] text-white shadow-xs'
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
                      ? 'bg-[#E4006E] text-white font-bold shadow-xs'
                      : 'text-[#1A0B3C] hover:text-[#E4006E] hover:bg-white'
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
              className="inline-block text-[11px] font-bold text-[#E4006E] hover:underline"
            >
              Book an Appointment →
            </a>
          </div>

        </div>

        {/* Right 3x3 Cards Grid */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {filteredServices.map((service, index) => {
              const isPink = index % 2 === 0;

              // Alternating Light Pink & Light Purple Theme Variables
              const cardBg = isPink
                ? "bg-[#FFF0F6] border-2 border-[#FADCEB] hover:border-[#E4006E] shadow-[0_4px_20px_rgba(228,0,110,0.04)] hover:shadow-[0_8px_30px_rgba(228,0,110,0.12)]"
                : "bg-[#FAF0F8] border-2 border-[#EEDBF2] hover:border-[#853676] shadow-[0_4px_20px_rgba(133,54,118,0.04)] hover:shadow-[0_8px_30px_rgba(133,54,118,0.12)]";

              const iconStyle = isPink
                ? "bg-white border border-[#FADCEB] text-[#E4006E] group-hover:bg-[#E4006E] group-hover:text-white"
                : "bg-white border border-[#EEDBF2] text-[#853676] group-hover:bg-[#853676] group-hover:text-white";

              const badgeStyle = isPink
                ? "bg-white/90 text-[#E4006E] border border-[#FADCEB]"
                : "bg-white/90 text-[#853676] border border-[#EEDBF2]";

              const titleHoverColor = isPink ? "group-hover:text-[#E4006E]" : "group-hover:text-[#853676]";

              const borderDivider = isPink ? "border-[#FADCEB]" : "border-[#EEDBF2]";

              const actionIconStyle = isPink
                ? "bg-white text-[#E4006E] group-hover:bg-[#E4006E] group-hover:text-white border border-[#FADCEB]"
                : "bg-white text-[#853676] group-hover:bg-[#853676] group-hover:text-white border border-[#EEDBF2]";

              return (
                <a
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`rounded-[24px] ${cardBg} p-5 sm:p-5.5 flex flex-col justify-between h-full hover:-translate-y-1 transition-all duration-300 group text-left relative`}
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Icon + Category Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-11 h-11 rounded-2xl ${iconStyle} flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs group-hover:scale-105`}>
                        <ServiceIcon slug={service.slug} className="w-5 h-5 text-current transition-colors" />
                      </div>

                      <span className={`text-[10px] font-bold uppercase tracking-wider ${badgeStyle} px-3 py-1 rounded-full truncate max-w-[160px] shadow-2xs`}>
                        {cleanCategoryName(service.category)}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className={`font-heading font-bold text-base sm:text-lg text-[#1A0B3C] ${titleHoverColor} transition-colors leading-snug pt-1`}>
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-secondary text-xs sm:text-[13px] leading-relaxed font-sans line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Bottom Action Row */}
                  <div className={`mt-5 pt-3.5 border-t ${borderDivider} flex items-center justify-between`}>
                    <span className={`text-xs font-bold text-[#1A0B3C] ${titleHoverColor} font-sans flex items-center gap-1.5 transition-colors`}>
                      <span>Explore Treatment</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>

                    <div className={`w-8 h-8 rounded-full ${actionIconStyle} flex items-center justify-center transition-all duration-200 shadow-2xs`}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>

                </a>
              );
            })}
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
