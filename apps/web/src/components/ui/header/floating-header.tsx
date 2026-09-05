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
  { label: 'Success Stories', href: '/our-works' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

const allServices = client.services || [];

export function getPlatformIcon(item: SocialLinkItem) {
  if (item.svgCode && item.svgCode.trim().length > 0) {
    return (
      <span
        className="w-5 h-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
        dangerouslySetInnerHTML={{ __html: item.svgCode }}
      />
    );
  }

  if (item.iconUrl) {
    return (
      <img
        src={item.iconUrl}
        alt={item.platform === 'Other' && item.customPlatformName ? item.customPlatformName : item.platform}
        className="w-5 h-5 object-contain"
      />
    );
  }

  const p = (item.platform || '').toLowerCase();
  if (p.includes('linkedin')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    );
  }
  if (p.includes('instagram')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    );
  }
  if (p.includes('facebook')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    );
  }
  if (p.includes('youtube')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  if (p.includes('whatsapp')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const scrolled = useScroll(10);

  const activeSocials = (socialLinks || []).filter(
    (item) => item && typeof item.url === 'string' && item.url.trim().length > 0
  );

  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileHoveredIndex, setMobileHoveredIndex] = useState<number | null>(null);

  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [activeHoveredServiceSlug, setActiveHoveredServiceSlug] = useState<string>(allServices[0]?.slug || '');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileExpandedServiceSlug, setMobileExpandedServiceSlug] = useState<string | null>(null);

  const handleServicesMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileHoveredIndex(null);
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
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(76);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1300 && open) {
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
      document.body.style.overflow = '';
    };
    document.addEventListener('astro:before-swap', close);
    document.addEventListener('astro:after-swap', close);
    return () => {
      document.removeEventListener('astro:before-swap', close);
      document.removeEventListener('astro:after-swap', close);
    };
  }, []);

  const activeServiceData = allServices.find((s) => s.slug === activeHoveredServiceSlug) || allServices[0];
  const activeSubservices = activeServiceData?.subservices || [];

  return (
    <>
      {/* Sticky Top Navigation Wrapper */}
      <div className="sticky top-0 z-[60] w-full">
        {/* Top Utility Bar (Mobile Number & Book Appointment) */}
        <div className="w-full bg-white border-b border-[#F0E6EC] relative z-[61] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 nav-desktop:px-9 py-1.5 sm:py-2 flex items-center justify-between">
            {/* Left Side: Mobile number + Divider + Book an Appointment */}
            <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
              {/* Mobile Number Link */}
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[#2B4C7E] hover:text-[#E4006E] font-bold text-xs sm:text-[13.5px] font-sans transition-colors group"
                data-analytics-click="TopBar - Phone"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E4006E] stroke-[#E4006E] shrink-0 group-hover:scale-110 transition-transform"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                </svg>
                <span>{primaryPhone}</span>
              </a>

              {/* Vertical Divider Line */}
              <span className="h-3.5 sm:h-4 w-[1px] bg-slate-200" aria-hidden="true" />

              {/* Book an Appointment Button */}
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[#2B4C7E] hover:text-[#E4006E] font-bold text-xs sm:text-[13.5px] font-sans transition-colors group"
                data-analytics-click="TopBar - Book Appointment"
                data-astro-prefetch="hover"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E4006E] stroke-[#E4006E] shrink-0 group-hover:scale-110 transition-transform"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <circle cx="8" cy="14" r="0.75" fill="currentColor" />
                  <circle cx="12" cy="14" r="0.75" fill="currentColor" />
                  <circle cx="16" cy="14" r="0.75" fill="currentColor" />
                  <circle cx="8" cy="18" r="0.75" fill="currentColor" />
                  <circle cx="12" cy="18" r="0.75" fill="currentColor" />
                  <circle cx="16" cy="18" r="0.75" fill="currentColor" />
                </svg>
                <span>Book an Appointment</span>
              </a>
            </div>
          </div>
        </div>

        <header
          ref={headerRef}
          className={cn(
            'mx-auto w-full max-w-7xl border-b border-transparent transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] relative',
            {
              'bg-surface/90 supports-[backdrop-filter]:bg-surface/85 border-border backdrop-blur-xl nav-desktop:max-w-6xl nav-desktop:rounded-full nav-desktop:border nav-desktop:shadow-lg nav-desktop:mt-1.5':
                scrolled && !open,
              'bg-background border-b border-transparent': open,
              'bg-background/95 backdrop-blur-md nav-desktop:rounded-none': !open && !scrolled,
            }
          )}
        >
        <nav
          className={cn(
            'relative flex w-full items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] px-6 nav-desktop:px-9',
            scrolled ? 'h-14 nav-desktop:h-16 py-1.5 nav-desktop:py-2' : 'h-18 nav-desktop:h-20 py-2.5 nav-desktop:py-3'
          )}
        >
          {/* Left Side: Brand Logo & Title */}
          <a
            href="/"
            className="font-heading text-lg nav-desktop:text-xl font-bold tracking-tight text-primary flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
            data-analytics-click="Nav - Logo"
            data-astro-prefetch="hover"
          >
            {navLogoUrl ? (
              <img
                src={navLogoUrl}
                alt={siteName}
                className={cn(
                  'max-w-[200px] sm:max-w-[240px] w-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
                  scrolled ? 'h-8 sm:h-9 nav-desktop:h-9.5' : 'h-9 sm:h-10 nav-desktop:h-11'
                )}
              />
            ) : navBrandIconUrl ? (
              <div className="flex items-center gap-2.5">
                <img
                  src={navBrandIconUrl}
                  alt={siteName}
                  className={cn(
                    'object-contain rounded-lg shadow-sm transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
                    scrolled ? 'h-7 w-7 nav-desktop:h-8 nav-desktop:w-8' : 'h-8 w-8 nav-desktop:h-9 nav-desktop:w-9'
                  )}
                />
                <span className="font-heading text-lg nav-desktop:text-xl font-bold tracking-tight text-primary">{siteName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <span className={cn(
                  'rounded-lg bg-tertiary flex items-center justify-center text-white font-sans font-bold shadow-md transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
                  scrolled ? 'w-7.5 h-7.5 text-xs nav-desktop:text-sm' : 'w-8.5 h-8.5 text-sm nav-desktop:text-base'
                )}>
                  {siteName.charAt(0).toUpperCase()}
                </span>
                <span className="font-heading text-lg nav-desktop:text-xl font-bold tracking-tight text-primary">{siteName}</span>
              </div>
            )}
          </a>

          {/* Center Desktop Navigation Links */}
          <div 
            className="hidden nav-desktop:flex items-center justify-center gap-1.5 nav-desktop:gap-2.5 absolute left-1/2 -translate-x-1/2"
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
                        'relative text-sm font-semibold tracking-wide rounded-full px-4 py-1.5 transition-colors duration-300 z-10 flex items-center justify-center font-sans gap-1',
                        isActive || isHovered || isServicesDropdownOpen
                          ? 'text-tertiary font-bold'
                          : 'text-secondary hover:text-tertiary'
                      )}
                      href={link.href}
                      data-analytics-click={`Nav - ${link.label}`}
                      data-astro-prefetch="hover"
                    >
                      {/* Compact Background Bubble */}
                      {isPillTarget && (
                        <motion.div
                          layoutId="desktop-nav-active-pill"
                          className="absolute inset-0 rounded-full bg-surface border border-border shadow-xs z-[-1]"
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
                            isServicesDropdownOpen ? 'rotate-180 text-tertiary' : 'text-slate-400'
                          )}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </a>

                    {/* Services Dropdown Menu: Side-by-Side Two-Panel Flyout */}
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-[100]"
                          style={{ zIndex: 100 }}
                          onMouseEnter={handleServicesMouseEnter}
                          onMouseLeave={handleServicesMouseLeave}
                        >
                          <div 
                            className="bg-white rounded-[24px] border border-[#FADCEB] shadow-[0_16px_45px_rgba(26,11,60,0.16)] overflow-hidden flex divide-x divide-[#F4E2ED] text-left relative z-[100]"
                            style={{ backgroundColor: '#ffffff', opacity: 1 }}
                          >
                            {/* Left Panel: List of Main Services */}
                            <div 
                              className="w-64 sm:w-72 p-2.5 space-y-1 max-h-[440px] overflow-y-auto custom-scrollbar bg-white"
                              style={{ backgroundColor: '#ffffff' }}
                            >
                              {allServices.map((service) => {
                                const isCurrent = service.slug === activeHoveredServiceSlug;
                                return (
                                  <a
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    onMouseEnter={() => setActiveHoveredServiceSlug(service.slug)}
                                    onClick={() => setIsServicesDropdownOpen(false)}
                                    className={cn(
                                      "flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-sans font-semibold transition-all duration-150 group",
                                      isCurrent
                                        ? "bg-[#FFF0F6] text-[#E4006E] font-bold shadow-xs"
                                        : "text-[#1A0B3C] hover:bg-[#FFF0F6]/60 hover:text-[#E4006E]"
                                    )}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <span
                                        className={cn(
                                          "w-7.5 h-7.5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                                          isCurrent
                                            ? "border-[#E4006E] bg-white text-[#E4006E]"
                                            : "border-[#FADCEB] bg-[#FFF0F6]/40 text-[#853676] group-hover:border-[#E4006E] group-hover:text-[#E4006E]"
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
                                        "w-3.5 h-3.5 shrink-0 transition-transform",
                                        isCurrent ? "text-[#E4006E] translate-x-0.5" : "text-slate-400 group-hover:text-[#E4006E]"
                                      )}
                                    >
                                      <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                  </a>
                                );
                              })}
                            </div>

                            {/* Right Panel: Sub-Services List */}
                            <div 
                              className="w-64 sm:w-72 p-4 flex flex-col justify-between bg-white text-left"
                              style={{ backgroundColor: '#ffffff' }}
                            >
                              <div>
                                <div className="pb-2.5 mb-2.5 border-b border-[#F4E2ED]">
                                  <a
                                    href={`/services/${activeServiceData.slug}`}
                                    onClick={() => setIsServicesDropdownOpen(false)}
                                    className="font-heading font-bold text-sm text-[#1A0B3C] hover:text-[#E4006E] transition-colors flex items-center justify-between group"
                                  >
                                    <span className="truncate">{activeServiceData.title}</span>
                                    <span className="text-[11px] text-[#E4006E] font-sans font-bold group-hover:translate-x-0.5 transition-transform shrink-0 ml-1">
                                      View →
                                    </span>
                                  </a>
                                </div>

                                <div className="space-y-1">
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
                                          className="block px-2.5 py-1.5 rounded-lg text-[13px] font-sans font-medium text-slate-700 hover:text-[#E4006E] hover:bg-[#FFF0F6] transition-colors leading-snug"
                                        >
                                          {title}
                                        </a>
                                      );
                                    })
                                  ) : (
                                    <a
                                      href={`/services/${activeServiceData.slug}`}
                                      onClick={() => setIsServicesDropdownOpen(false)}
                                      className="block px-2.5 py-1.5 rounded-lg text-[13px] font-sans font-medium text-slate-700 hover:text-[#E4006E] hover:bg-[#FFF0F6] transition-colors"
                                    >
                                      Explore {activeServiceData.title}
                                    </a>
                                  )}
                                </div>
                              </div>

                              <div className="pt-3 mt-3 border-t border-[#F8E7F0]">
                                <a
                                  href="/services"
                                  onClick={() => setIsServicesDropdownOpen(false)}
                                  className="text-xs font-bold font-sans text-[#853676] hover:text-[#E4006E] transition-colors flex items-center justify-between"
                                >
                                  <span>All Services Overview</span>
                                  <span>→</span>
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
                      'relative text-sm font-semibold tracking-wide rounded-full px-4 py-1.5 transition-colors duration-300 z-10 flex items-center justify-center font-sans gap-1',
                      isActive || isHovered
                        ? 'text-tertiary font-bold'
                        : 'text-secondary hover:text-tertiary'
                    )}
                    href={link.href}
                    data-analytics-click={`Nav - ${link.label}`}
                    data-astro-prefetch="hover"
                  >
                    {/* Compact Background Bubble */}
                    {isPillTarget && (
                      <motion.div
                        layoutId="desktop-nav-active-pill"
                        className="absolute inset-0 rounded-full bg-surface border border-border shadow-xs z-[-1]"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      <span>{link.label}</span>
                    </span>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Right Side: Capsule CTA Button & Mobile/Tablet Hamburger Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden nav-desktop:block">
              <a
                href={cta.href}
                className="btn-primary"
                data-analytics-click="Nav - CTA"
                data-astro-prefetch="hover"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 text-white">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                </svg>
                <span>{cta.label}</span>
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="nav-desktop:hidden flex items-center justify-center w-10 h-10 rounded-full text-primary bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none active:bg-transparent select-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              title="Hamburger Menu Toggle"
              data-block="hamburger-menu-toggle"
            >
              <MenuToggleIcon open={open} className="size-7 text-primary" duration={500} />
            </button>
          </div>
        </nav>
      </header>
    </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              paddingTop: '76px',
              height: '100dvh',
              backgroundColor: '#FFF0F6',
            }}
            className="fixed inset-0 h-[100dvh] z-[55] flex flex-col nav-desktop:hidden overflow-hidden select-none bg-background"
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
            title="Mobile Navigation Drawer"
            data-block="mobile-nav-drawer"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 overflow-y-auto px-6 py-6 flex flex-col items-center justify-start text-center custom-scrollbar"
              title="Drawer Nav Links Container"
              data-block="drawer-nav-links"
            >
              <ul className="flex flex-col items-center justify-center gap-4 sm:gap-5 w-full my-auto">
                {links.map((link, idx) => {
                  const isActive = isLinkActive(link.href);
                  const isStarTarget = mobileHoveredIndex !== null ? mobileHoveredIndex === idx : isActive;
                  const isServices = link.label.toLowerCase() === 'services';

                  if (isServices) {
                    return (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.08 + idx * 0.05,
                        }}
                        className="w-full text-center"
                        onMouseEnter={() => setMobileHoveredIndex(idx)}
                        onMouseLeave={() => setMobileHoveredIndex(null)}
                      >
                        <div className="flex flex-col items-center">
                          <div className="inline-flex items-center justify-center gap-2">
                            <a
                              href={link.href}
                              onClick={() => setOpen(false)}
                              data-astro-prefetch="hover"
                              className={cn(
                                "text-2xl sm:text-3xl font-heading font-bold tracking-tight transition-colors duration-300",
                                isActive ? "text-tertiary font-bold" : isStarTarget ? "text-tertiary" : "text-primary hover:text-tertiary"
                              )}
                            >
                              {link.label}
                            </a>
                            <button
                              type="button"
                              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                              className="p-1.5 rounded-full text-primary hover:text-tertiary transition-colors"
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
                                  "w-5 h-5 transition-transform duration-200",
                                  mobileServicesOpen ? "rotate-180 text-tertiary" : ""
                                )}
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                          </div>

                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden w-full max-w-sm mx-auto pt-3 pb-2 text-left bg-white/70 rounded-2xl border border-[#FADCEB] p-2.5 my-2 space-y-1.5"
                              >
                                {allServices.map((srv) => {
                                  const isExpanded = mobileExpandedServiceSlug === srv.slug;
                                  const subs = srv.subservices || [];

                                  return (
                                    <div key={srv.slug} className="rounded-xl overflow-hidden">
                                      <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FFF0F6] transition-colors">
                                        <a
                                          href={`/services/${srv.slug}`}
                                          onClick={() => setOpen(false)}
                                          className="flex items-center gap-2 text-[13px] font-sans font-bold text-[#1A0B3C] hover:text-[#E4006E] transition-colors flex-1"
                                        >
                                          <span className="w-6 h-6 rounded-full border border-[#FADCEB] bg-white text-[#E4006E] flex items-center justify-center shrink-0">
                                            {getServiceDropdownIcon(srv.slug)}
                                          </span>
                                          <span className="truncate">{srv.title}</span>
                                        </a>

                                        {subs.length > 0 && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              setMobileExpandedServiceSlug(isExpanded ? null : srv.slug);
                                            }}
                                            className="p-1 text-slate-400 hover:text-[#E4006E] transition-colors shrink-0"
                                            aria-label={`Toggle subservices for ${srv.title}`}
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
                                                isExpanded ? "rotate-90 text-[#E4006E]" : ""
                                              )}
                                            >
                                              <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                          </button>
                                        )}
                                      </div>

                                      {isExpanded && subs.length > 0 && (
                                        <div className="pl-9 pr-2 py-1.5 space-y-1 bg-[#FAF0F8]/50 rounded-lg my-1">
                                          {subs.map((sub: any, subIdx: number) => {
                                            const subTitle = typeof sub === 'string' ? sub : sub.title;
                                            const subSlug = sub?.slug;
                                            const href = subSlug
                                              ? `/services/${srv.slug}/${subSlug}`
                                              : `/services/${srv.slug}`;
                                            return (
                                              <a
                                                key={subIdx}
                                                href={href}
                                                onClick={() => setOpen(false)}
                                                className="block text-xs font-sans font-medium text-slate-700 hover:text-[#E4006E] py-1"
                                              >
                                                • {subTitle}
                                              </a>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}

                                <div className="pt-2 border-t border-[#F8E7F0] text-center">
                                  <a
                                    href="/services"
                                    onClick={() => setOpen(false)}
                                    className="text-xs font-bold text-[#853676] hover:text-[#E4006E] font-sans inline-flex items-center gap-1 py-1"
                                  >
                                    <span>View All Services</span>
                                    <span>→</span>
                                  </a>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.li>
                    );
                  }

                  return (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.08 + idx * 0.05,
                      }}
                      className="w-full text-center"
                      onMouseEnter={() => setMobileHoveredIndex(idx)}
                      onMouseLeave={() => setMobileHoveredIndex(null)}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        data-astro-prefetch="hover"
                        className="inline-flex items-center justify-center gap-3 py-1 text-2xl sm:text-3xl font-heading font-bold tracking-tight transition-all duration-300"
                      >
                        {isStarTarget && (
                          <span className="text-tertiary text-xl inline-block animate-spin shrink-0">
                            ✱
                          </span>
                        )}
                        <span className={cn(
                          "transition-colors duration-300",
                          isActive
                            ? "text-tertiary font-bold"
                            : isStarTarget
                              ? "text-tertiary"
                              : "text-primary hover:text-tertiary"
                        )}>
                          {link.label}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="shrink-0 flex flex-col items-center w-full relative z-10"
              title="Drawer Bottom Stack"
              data-block="drawer-bottom-stack"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
                className="w-full flex justify-center pt-2 pb-3 px-6 bg-background relative z-10"
                title="Drawer CTA Action Bar"
                data-block="drawer-cta-action"
              >
                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full max-w-xs justify-center"
                  data-astro-prefetch="hover"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 text-white">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                  <span>{cta.label}</span>
                </a>
              </motion.div>

              <div
                className="w-full leading-none overflow-hidden pointer-events-none rotate-180 relative z-10 -mb-[2px] bg-background"
                title="Mountain Curve Arch"
                data-block="mountain-curve-arch"
              >
                <svg
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 160"
                  preserveAspectRatio="none"
                  className="block w-[calc(100%+1.3px)] h-16 sm:h-20 border-none outline-none"
                >
                  <path
                    d="M0,0V10C0,95,250,150,600,150C950,150,1200,95,1200,10V0Z"
                    fill="#1A0B3C"
                    stroke="none"
                    style={{ fill: '#1A0B3C', stroke: 'none', outline: 'none' }}
                  />
                </svg>
              </div>

              <div
                className="w-full px-6 pb-7 pt-0 space-y-4 flex flex-col items-center justify-center text-center bg-primary relative z-20 border-none outline-none ring-0 -mt-[1px]"
                style={{ backgroundColor: '#1A0B3C', border: 'none', outline: 'none' }}
                title="Drawer Footer Bar"
                data-block="drawer-footer"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="-mt-5 relative z-20"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="btn-outline bg-surface text-primary text-xs font-sans font-bold"
                    title="Close Menu Button"
                    data-block="cancel-menu-button"
                  >
                    Close Menu
                  </button>
                </motion.div>

                {activeSocials.length > 0 && (
                  <div
                    className="flex items-center justify-center gap-4 pt-1.5 pb-1"
                    title="Social Media Icons"
                    data-block="social-media-icons"
                  >
                    {activeSocials.map((item, iconIdx) => {
                      const label = item.platform === 'Other' && item.customPlatformName ? item.customPlatformName : item.platform || 'Social Profile';
                      return (
                        <motion.a
                          key={`${label}-${iconIdx}`}
                          initial={{ opacity: 0, scale: 0.88, y: 22 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.88, y: 14 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.6 + iconIdx * 0.08,
                          }}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-surface text-primary hover:text-tertiary border border-border shrink-0 cursor-pointer overflow-hidden p-2"
                        >
                          {getPlatformIcon(item)}
                        </motion.a>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
