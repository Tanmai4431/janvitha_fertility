'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from './menu-toggle-icon';
import { useScroll } from './use-scroll';
import client from '../../../../../../client.json';

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLinkItem {
  platform: string;
  customPlatformName?: string;
  url: string;
  svgCode?: string;
  iconUrl?: string | null;
}

export interface FloatingHeaderProps {
  siteName?: string;
  navLogoUrl?: string | null;
  navBrandIconUrl?: string | null;
  links?: NavLink[];
  cta?: {
    label: string;
    href: string;
  };
  socialLinks?: SocialLinkItem[];
  primaryPhone?: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

const allServices = client.services || [];

export function getPlatformIcon(item: SocialLinkItem) {
  if (item.svgCode && item.svgCode.trim().length > 0) {
    return (
      <span
        className="w-4 h-4 flex items-center justify-center shrink-0 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
        dangerouslySetInnerHTML={{ __html: item.svgCode }}
      />
    );
  }

  if (item.iconUrl) {
    return (
      <img
        src={item.iconUrl}
        alt={item.platform === 'Other' && item.customPlatformName ? item.customPlatformName : item.platform}
        className="w-4 h-4 object-contain shrink-0"
      />
    );
  }

  const p = (item.platform || '').toLowerCase();
  if (p.includes('linkedin')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    );
  }
  if (p.includes('instagram')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    );
  }
  if (p.includes('facebook')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    );
  }
  if (p.includes('youtube')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  if (p.includes('whatsapp')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  );
}

export function getServiceDropdownIcon(slug: string) {
  switch (slug) {
    case 'female-infertility':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="8" r="5" />
          <path d="M12 13v8M9 17h6" />
        </svg>
      );
    case 'male-infertility':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="10" cy="14" r="5" />
          <path d="M19 5l-5.5 5.5M14 5h5v5" />
        </svg>
      );
    case 'ivf-treatment':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="8" />
          <circle cx="10" cy="10" r="2" />
          <circle cx="14" cy="14" r="2" />
        </svg>
      );
    case 'iui-insemination':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M18 3l3 3-10 10-4 1 1-4 10-10z" />
          <path d="M14 7l3 3M3 21l3-3" />
        </svg>
      );
    case 'icsi-procedure':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="14" cy="12" r="6" />
          <circle cx="14" cy="12" r="2" />
          <path d="M2 12h7" />
        </svg>
      );
    case 'picsi-technology':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'genetic-program':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M4 6c4 0 4 6 8 6s4 6 8 6M4 18c4 0 4-6 8-6s4-6 8-6" />
          <circle cx="4" cy="6" r="1.5" />
          <circle cx="20" cy="18" r="1.5" />
        </svg>
      );
    case 'fertility-preservation':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 2v20M2 12h20" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'blastocyst-culture':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="8" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="14" cy="10" r="1.5" />
          <circle cx="12" cy="14" r="1.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
}

export function FloatingHeader({
  siteName = client.business.name,
  navLogoUrl,
  navBrandIconUrl,
  links = DEFAULT_LINKS,
  cta = { label: client.hero?.primaryCta || 'Book Appointment', href: '/contact' },
  socialLinks = [],
  primaryPhone = client.contact?.primaryPhone || '+91 81214 49988',
}: FloatingHeaderProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrolled = useScroll(15);

  const activeSocials = (socialLinks || []).filter(
    (item) => item && typeof item.url === 'string' && item.url.trim().length > 0
  );

  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [activeHoveredServiceSlug, setActiveHoveredServiceSlug] = useState<string>(allServices[0]?.slug || '');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const handleServicesMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setHoveredIndex(null);
  }, [open]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);

      const handleLocation = () => {
        setCurrentPath(window.location.pathname);
      };

      document.addEventListener('astro:page-load', handleLocation);
      document.addEventListener('astro:after-swap', handleLocation);
      window.addEventListener('popstate', handleLocation);
      return () => {
        document.removeEventListener('astro:page-load', handleLocation);
        document.removeEventListener('astro:after-swap', handleLocation);
        window.removeEventListener('popstate', handleLocation);
      };
    }
  }, []);

  const isLinkActive = (href: string) => {
    if (!mounted) return false;
    const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');
    if (!path) return false;

    const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
    const cleanHref = href.length > 1 && href.endsWith('/') ? href.slice(0, -1) : href;

    if (cleanHref === '/') {
      return cleanPath === '/' || cleanPath === '';
    }
    return cleanPath === cleanHref || cleanPath.startsWith(cleanHref + '/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024 && open) {
        setOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const close = () => {
      setOpen(false);
      setIsServicesDropdownOpen(false);
      setMobileServicesOpen(false);
      setHoveredIndex(null);
      document.body.style.overflow = '';
    };
    document.addEventListener('astro:before-swap', close);
    document.addEventListener('astro:after-swap', close);
    document.addEventListener('astro:page-load', close);
    return () => {
      document.removeEventListener('astro:before-swap', close);
      document.removeEventListener('astro:after-swap', close);
      document.removeEventListener('astro:page-load', close);
    };
  }, []);

  const activeServiceData = allServices.find((s) => s.slug === activeHoveredServiceSlug) || allServices[0];
  const activeSubservices = activeServiceData?.subservices || [];

  return (
    <>
      {/* Sticky Top Navigation Wrapper */}
      <div className="sticky top-0 z-[60] w-full select-none">
        
        {/* Top Utility Bar (Clean, Subtle Pink Glow Border, Accessible Phone & Appointment) */}
        <div className="w-full bg-[#FFFDFC]/95 backdrop-blur-md border-b border-[#F7E5F0] relative z-[61] transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
            {/* Left: Phone & Appointment Shortcut Pills */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs sm:text-[13px] font-sans">
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[#1A0B3C] hover:text-[#E4006E] hover:bg-[#FFF0F6] font-semibold transition-all duration-200 group"
                data-analytics-click="TopBar - Phone"
              >
                <div className="w-5 h-5 rounded-full bg-[#FFF0F6] text-[#E4006E] group-hover:bg-[#E4006E] group-hover:text-white flex items-center justify-center transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 text-current"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                  </svg>
                </div>
                <span>{primaryPhone}</span>
              </a>

              <span className="h-3.5 w-[1px] bg-[#F0D5E4]" aria-hidden="true" />

              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[#1A0B3C] hover:text-[#E4006E] hover:bg-[#FFF0F6] font-semibold transition-all duration-200 group"
                data-analytics-click="TopBar - Book Appointment"
                data-astro-prefetch="hover"
              >
                <div className="w-5 h-5 rounded-full bg-[#FFF0F6] text-[#E4006E] group-hover:bg-[#E4006E] group-hover:text-white flex items-center justify-center transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 text-current"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span>Book Consultation</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Sticky Nav Header */}
        <header
          ref={headerRef}
          className={cn(
            'w-full transition-all duration-300 relative',
            scrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(228,0,110,0.06)] py-2 sm:py-2.5 px-4 sm:px-6 lg:px-8'
              : 'bg-white/90 backdrop-blur-md py-2.5 sm:py-3 px-4 sm:px-6 lg:px-8'
          )}
        >
          <div className="max-w-7xl mx-auto w-full">
            <nav className="relative flex w-full items-center justify-between h-12 sm:h-14 lg:h-15">
              
              {/* Left Side: Brand Logo */}
              <a
                href="/"
                className="flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02] shrink-0"
                data-analytics-click="Nav - Logo"
                data-astro-prefetch="hover"
              >
                {navLogoUrl ? (
                  <img
                    src={navLogoUrl}
                    alt={siteName}
                    className="h-10 sm:h-11 md:h-12 w-auto max-w-[220px] sm:max-w-[260px] object-contain"
                  />
                ) : navBrandIconUrl ? (
                  <div className="flex items-center gap-2.5">
                    <img
                      src={navBrandIconUrl}
                      alt={siteName}
                      className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-xl shadow-xs"
                    />
                    <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#1A0B3C]">
                      {siteName}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E4006E] text-white font-heading font-bold flex items-center justify-center shadow-md">
                      {siteName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#1A0B3C]">
                      {siteName}
                    </span>
                  </div>
                )}
              </a>

              {/* Center Desktop Navigation Links (Floating Glass Pill Container) */}
              <div 
                className="hidden lg:flex items-center justify-center p-1 rounded-full bg-[#FFFDFC]/90 border border-[#FADCEB] shadow-[0_2px_10px_rgba(0,0,0,0.02)] absolute left-1/2 -translate-x-1/2"
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  handleServicesMouseLeave();
                }}
              >
                {links.map((link, i) => {
                  const isActive = isLinkActive(link.href);
                  const isHovered = hoveredIndex === i;
                  const isPillTarget = hoveredIndex !== null ? isHovered : isActive;
                  const isServices = link.label.toLowerCase() === 'services';

                  if (isServices) {
                    return (
                      <div
                        key={i}
                        className="relative flex items-center"
                        onMouseEnter={() => {
                          setHoveredIndex(i);
                          handleServicesMouseEnter();
                        }}
                        onMouseLeave={handleServicesMouseLeave}
                      >
                        <a
                          className={cn(
                            'relative text-[13.5px] font-sans font-semibold tracking-wide rounded-full px-4 py-2 transition-all duration-200 z-10 flex items-center gap-1.5',
                            isActive || isHovered || isServicesDropdownOpen
                              ? 'text-[#E4006E] font-bold'
                              : 'text-[#1A0B3C] hover:text-[#E4006E]'
                          )}
                          href={link.href}
                          data-analytics-click={`Nav - ${link.label}`}
                          data-astro-prefetch="hover"
                          onClick={() => {
                            setIsServicesDropdownOpen(false);
                            setHoveredIndex(null);
                          }}
                        >
                          {/* Active Background Spring Pill */}
                          {isPillTarget && (
                            <motion.div
                              layoutId="desktop-nav-active-pill"
                              className="absolute inset-0 rounded-full bg-[#FFF0F6] border border-[#FADCEB] shadow-2xs z-[-1] pointer-events-none"
                              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                            />
                          )}

                          <span className="relative z-10 flex items-center gap-1">
                            <span>{link.label}</span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={cn(
                                'w-3.5 h-3.5 transition-transform duration-200 shrink-0',
                                isServicesDropdownOpen ? 'rotate-180 text-[#E4006E]' : 'text-[#853676]'
                              )}
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </a>

                        {/* Services Dropdown Menu: Side-by-Side Dual-Panel Flyout */}
                        <AnimatePresence>
                          {isServicesDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 14, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.96 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[100]"
                              style={{ zIndex: 100 }}
                              onMouseEnter={handleServicesMouseEnter}
                              onMouseLeave={handleServicesMouseLeave}
                            >
                              <div 
                                className="bg-white rounded-[26px] border-2 border-[#FADCEB] shadow-[0_20px_50px_rgba(26,11,60,0.14)] overflow-hidden flex divide-x divide-[#F7E5F0] text-left relative z-[100]"
                                style={{ backgroundColor: '#ffffff', opacity: 1 }}
                              >
                                {/* Left Panel: List of Main Specialized Treatments */}
                                <div 
                                  className="w-68 sm:w-72 p-3 space-y-1 max-h-[460px] overflow-y-auto custom-scrollbar bg-white"
                                  style={{ backgroundColor: '#ffffff' }}
                                >
                                  <div className="px-3 py-1.5 mb-1">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#853676] font-sans">
                                      Specialized Treatments
                                    </span>
                                  </div>
                                  {allServices.map((service) => {
                                    const isCurrent = service.slug === activeHoveredServiceSlug;
                                    return (
                                      <a
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        onMouseEnter={() => setActiveHoveredServiceSlug(service.slug)}
                                        onClick={() => setIsServicesDropdownOpen(false)}
                                        className={cn(
                                          "flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-sans font-semibold transition-all duration-200 group",
                                          isCurrent
                                            ? "bg-[#FFF0F6] text-[#E4006E] font-bold shadow-xs border border-[#FADCEB]"
                                            : "text-[#1A0B3C] hover:bg-[#FFF0F6]/60 hover:text-[#E4006E]"
                                        )}
                                      >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                          <span
                                            className={cn(
                                              "w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors",
                                              isCurrent
                                                ? "border-[#E4006E] bg-white text-[#E4006E]"
                                                : "border-[#FADCEB] bg-[#FFF0F6]/60 text-[#853676] group-hover:border-[#E4006E] group-hover:text-[#E4006E]"
                                            )}
                                          >
                                            {getServiceDropdownIcon(service.slug)}
                                          </span>
                                          <span className="truncate">{service.title}</span>
                                        </div>
                                        <svg
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className={cn(
                                            "w-3.5 h-3.5 shrink-0 transition-transform duration-200",
                                            isCurrent ? "text-[#E4006E] translate-x-0.5" : "text-slate-300 group-hover:text-[#E4006E]"
                                          )}
                                        >
                                          <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                      </a>
                                    );
                                  })}
                                </div>

                                {/* Right Panel: Procedures & Highlights */}
                                <div 
                                  className="w-72 sm:w-80 p-4 flex flex-col justify-between bg-[#FAF7F9] text-left"
                                >
                                  <div>
                                    <div className="pb-2.5 mb-2.5 border-b border-[#F0D5E4]">
                                      <a
                                        href={`/services/${activeServiceData.slug}`}
                                        onClick={() => setIsServicesDropdownOpen(false)}
                                        className="font-heading font-bold text-sm text-[#1A0B3C] hover:text-[#E4006E] transition-colors flex items-center justify-between group"
                                      >
                                        <span className="truncate font-bold">{activeServiceData.title}</span>
                                        <span className="text-[11.5px] text-[#E4006E] font-sans font-bold group-hover:translate-x-0.5 transition-transform shrink-0 ml-1">
                                          Overview →
                                        </span>
                                      </a>
                                    </div>

                                    <div className="space-y-1">
                                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#853676] block mb-1">
                                        Procedures & Care:
                                      </span>
                                      {activeSubservices && activeSubservices.length > 0 ? (
                                        activeSubservices.map((sub: any, sIdx: number) => {
                                          const title = typeof sub === 'string' ? sub : sub.title;
                                          const subSlug = sub?.slug || (typeof sub === 'string' ? undefined : undefined);
                                          const href = subSlug
                                            ? `/services/${activeServiceData.slug}/${subSlug}`
                                            : `/services/${activeServiceData.slug}`;

                                          return (
                                            <a
                                              key={sIdx}
                                              href={href}
                                              onClick={() => setIsServicesDropdownOpen(false)}
                                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12.5px] font-sans font-medium text-[#4B5563] hover:text-[#E4006E] hover:bg-white transition-all duration-150 leading-snug group"
                                            >
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#E4006E]/40 group-hover:bg-[#E4006E] transition-colors"></span>
                                              <span className="truncate">{title}</span>
                                            </a>
                                          );
                                        })
                                      ) : (
                                        <a
                                          href={`/services/${activeServiceData.slug}`}
                                          onClick={() => setIsServicesDropdownOpen(false)}
                                          className="block px-2.5 py-1.5 rounded-lg text-[12.5px] font-sans font-medium text-[#4B5563] hover:text-[#E4006E] hover:bg-white transition-colors"
                                        >
                                          Explore {activeServiceData.title}
                                        </a>
                                      )}
                                    </div>
                                  </div>

                                  <div className="pt-3 mt-3 border-t border-[#F0D5E4]">
                                    <a
                                      href="/services"
                                      onClick={() => setIsServicesDropdownOpen(false)}
                                      className="text-xs font-bold font-sans text-[#853676] hover:text-[#E4006E] transition-colors flex items-center justify-between"
                                    >
                                      <span>Explore All Treatments</span>
                                      <span className="text-sm">→</span>
                                    </a>
                                  </div>
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={i}
                      className="relative flex items-center"
                      onMouseEnter={() => setHoveredIndex(i)}
                    >
                      <a
                        className={cn(
                          'relative text-[13.5px] font-sans font-semibold tracking-wide rounded-full px-4 py-2 transition-all duration-200 z-10 flex items-center justify-center gap-1.5',
                          isActive || isHovered
                            ? 'text-[#E4006E] font-bold'
                            : 'text-[#1A0B3C] hover:text-[#E4006E]'
                        )}
                        href={link.href}
                        data-analytics-click={`Nav - ${link.label}`}
                        data-astro-prefetch="hover"
                        onClick={() => setHoveredIndex(null)}
                      >
                        {/* Active Background Spring Pill */}
                        {isPillTarget && (
                          <motion.div
                            layoutId="desktop-nav-active-pill"
                            className="absolute inset-0 rounded-full bg-[#FFF0F6] border border-[#FADCEB] shadow-2xs z-[-1] pointer-events-none"
                            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                          />
                        )}

                        <span className="relative z-10 flex items-center">
                          {link.label}
                        </span>
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Right Side: Capsule CTA Button (Pink with Purple Hover) & Mobile Menu Toggle */}
              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                <div className="hidden lg:block">
                  <a
                    href={cta.href}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#F05698] hover:bg-[#6B21A8] text-white font-sans font-bold text-xs sm:text-sm tracking-wide shadow-[0_2px_10px_rgba(240,86,152,0.3)] hover:shadow-[0_4px_16px_rgba(107,33,168,0.35)] transition-all duration-200 active:scale-[0.98]"
                    data-analytics-click="Nav - CTA"
                    data-astro-prefetch="hover"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0 text-white">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{cta.label}</span>
                  </a>
                </div>

                {/* Mobile Hamburger Toggle Button */}
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF0F6] border border-[#FADCEB] text-[#E4006E] hover:bg-[#E4006E] hover:text-white transition-colors duration-200 outline-none focus:outline-none cursor-pointer"
                  aria-label="Toggle navigation menu"
                  aria-expanded={open}
                  title="Navigation Menu"
                  data-block="hamburger-menu-toggle"
                >
                  <MenuToggleIcon open={open} className="size-6 text-current" duration={400} />
                </button>
              </div>

            </nav>
          </div>
        </header>
      </div>

      {/* Mobile & Tablet Full-Screen Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 h-[100dvh] w-full z-[100] flex flex-col lg:hidden overflow-hidden select-none bg-gradient-to-b from-[#FFF5F9] via-[#FFFFFF] to-[#FAF0F8]"
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
            title="Mobile Navigation Drawer"
            data-block="mobile-nav-drawer"
          >
            {/* 1. Mobile Drawer Top Header with Brand Logo & Dedicated Sleek Close (✕) Button */}
            <div className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-xl border-b border-[#FADCEB] px-4 py-3 flex items-center justify-between shadow-2xs">
              <a
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
                data-astro-prefetch="hover"
              >
                {navLogoUrl ? (
                  <img
                    src={navLogoUrl}
                    alt={siteName}
                    className="h-8 sm:h-9 w-auto max-w-[200px] object-contain"
                  />
                ) : navBrandIconUrl ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={navBrandIconUrl}
                      alt={siteName}
                      className="h-7 w-7 object-contain rounded-lg shadow-2xs"
                    />
                    <span className="font-heading text-base font-bold tracking-tight text-[#1A0B3C]">
                      {siteName}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#E4006E] text-white font-heading font-bold text-xs flex items-center justify-center shadow-xs">
                      {siteName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-heading text-base font-bold tracking-tight text-[#1A0B3C]">
                      {siteName}
                    </span>
                  </div>
                )}
              </a>

              {/* Dedicated High-Affordance Close (✕) Button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F6] hover:bg-[#E4006E] text-[#E4006E] hover:text-white border border-[#FADCEB] transition-all duration-200 active:scale-95 cursor-pointer shadow-2xs group"
                aria-label="Close navigation menu"
                title="Close navigation menu"
              >
                <span className="text-xs font-bold font-sans tracking-wide">Close</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-current transition-transform duration-200 group-hover:rotate-90"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* 2. Scrollable Drawer Body Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-4 custom-scrollbar">
              {/* Navigation Stack */}
              <ul className="flex flex-col gap-2 w-full">
                {links.map((link) => {
                  const isActive = isLinkActive(link.href);
                  const isServices = link.label.toLowerCase() === 'services';

                  if (isServices) {
                    return (
                      <li key={link.label} className="w-full">
                        <div className={cn(
                          "rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs bg-white",
                          isActive || mobileServicesOpen ? "border-[#E4006E]/40" : "border-[#FADCEB]"
                        )}>
                          <div className="flex items-center justify-between p-3">
                            <a
                              href={link.href}
                              onClick={() => setOpen(false)}
                              data-astro-prefetch="hover"
                              className={cn(
                                "flex items-center gap-2.5 text-base font-heading font-bold transition-colors flex-1",
                                isActive ? "text-[#E4006E]" : "text-[#1A0B3C] hover:text-[#E4006E]"
                              )}
                            >
                              <span className="w-8 h-8 rounded-xl bg-[#FFF0F6] text-[#E4006E] flex items-center justify-center shrink-0 border border-[#FADCEB]">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                  <circle cx="12" cy="12" r="8" />
                                  <path d="M12 8v8M8 12h8" />
                                </svg>
                              </span>
                              <span>{link.label}</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                              className="w-8 h-8 rounded-full bg-[#FFF0F6] hover:bg-[#E4006E] text-[#E4006E] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-[#FADCEB]"
                              aria-label="Toggle Services List"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={cn(
                                  "w-3.5 h-3.5 transition-transform duration-200",
                                  mobileServicesOpen ? "rotate-180" : ""
                                )}
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                          </div>

                          {/* Collapsible Treatments Grid */}
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                className="border-t border-[#FADCEB] bg-[#FFFDFC] p-2.5 space-y-1.5"
                              >
                                <div className="grid grid-cols-1 gap-1.5">
                                  {allServices.map((srv) => (
                                    <a
                                      key={srv.slug}
                                      href={`/services/${srv.slug}`}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center justify-between p-2 rounded-xl bg-white hover:bg-[#FFF0F6] border border-[#F7E5F0] hover:border-[#E4006E] text-xs font-sans font-bold text-[#1A0B3C] hover:text-[#E4006E] transition-all group"
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span className="w-6 h-6 rounded-lg bg-[#FFF0F6] text-[#E4006E] group-hover:bg-white flex items-center justify-center shrink-0 border border-[#FADCEB]">
                                          {getServiceDropdownIcon(srv.slug)}
                                        </span>
                                        <span className="truncate">{srv.title}</span>
                                      </div>
                                      <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#E4006E] group-hover:translate-x-0.5 transition-all shrink-0 ml-1"
                                      >
                                        <polyline points="9 18 15 12 9 6" />
                                      </svg>
                                    </a>
                                  ))}
                                </div>

                                <div className="pt-2 text-center border-t border-[#F0D5E4]/60 mt-1">
                                  <a
                                    href="/services"
                                    onClick={() => setOpen(false)}
                                    className="text-xs font-bold text-[#853676] hover:text-[#E4006E] font-sans inline-flex items-center gap-1.5 py-1 px-3 rounded-full hover:bg-[#FFF0F6] transition-colors"
                                  >
                                    <span>Explore All Specialty Treatments</span>
                                    <span>→</span>
                                  </a>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </li>
                    );
                  }

                  // Default Nav Card Links (Home, About, Blog, Contact)
                  const getIconForLabel = (label: string) => {
                    const l = label.toLowerCase();
                    if (l.includes('home')) {
                      return (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                          <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                      );
                    }
                    if (l.includes('about')) {
                      return (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      );
                    }
                    if (l.includes('blog')) {
                      return (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                      );
                    }
                    return (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    );
                  };

                  return (
                    <li key={link.label} className="w-full">
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        data-astro-prefetch="hover"
                        className={cn(
                          "flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 shadow-2xs text-base font-heading font-bold bg-white group",
                          isActive
                            ? "border-[#E4006E] text-[#E4006E] bg-[#FFF0F6]"
                            : "border-[#FADCEB] text-[#1A0B3C] hover:border-[#E4006E] hover:text-[#E4006E]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors border",
                            isActive
                              ? "bg-white text-[#E4006E] border-[#E4006E]/30"
                              : "bg-[#FFF0F6] text-[#853676] border-[#FADCEB] group-hover:text-[#E4006E] group-hover:bg-white"
                          )}>
                            {getIconForLabel(link.label)}
                          </span>
                          <span>{link.label}</span>
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={cn(
                            "w-4 h-4 transition-transform duration-200 shrink-0",
                            isActive ? "text-[#E4006E] translate-x-0.5" : "text-[#853676] group-hover:text-[#E4006E] group-hover:translate-x-0.5"
                          )}
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* 3. Quick Action Buttons Stack */}
              <div className="w-full space-y-2.5 pt-2">
                
                {/* Book Consultation Primary Button */}
                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-full bg-[#F05698] hover:bg-[#6B21A8] text-white font-sans font-bold text-sm shadow-[0_4px_14px_rgba(240,86,152,0.3)] hover:shadow-[0_4px_16px_rgba(107,33,168,0.35)] transition-all duration-200 active:scale-[0.98]"
                  data-astro-prefetch="hover"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{cta.label}</span>
                </a>

                {/* Direct Phone Call Button */}
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-white hover:bg-[#FAF5FF] border border-[#F05698] hover:border-[#6B21A8] text-[#F05698] hover:text-[#6B21A8] font-sans font-bold text-xs shadow-2xs transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-current">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                  <span>Call: {primaryPhone}</span>
                </a>

                {/* Social Media Links (Small, Elegant, Uniform Icons) */}
                {activeSocials.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#853676]">
                        Follow Us:
                      </span>
                      <div className="flex items-center gap-2">
                        {activeSocials.map((item, iconIdx) => {
                          const label = item.platform === 'Other' && item.customPlatformName ? item.customPlatformName : item.platform || 'Social Profile';
                          return (
                            <a
                              key={`${label}-${iconIdx}`}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={label}
                              title={label}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-[#FFF0F6] border border-[#FADCEB] hover:border-[#E4006E] text-[#853676] hover:text-[#E4006E] shadow-2xs transition-all duration-200 hover:scale-105"
                            >
                              {getPlatformIcon(item)}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Clinic Location & Hours Footer Chip */}
                <div className="pt-2 text-center text-[11px] font-sans text-slate-500 space-y-0.5">
                  <p className="truncate">Opp. Rotary School, Kamala Nagar, Ananthapuram</p>
                  <p className="text-[10px] text-[#853676] font-medium">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
