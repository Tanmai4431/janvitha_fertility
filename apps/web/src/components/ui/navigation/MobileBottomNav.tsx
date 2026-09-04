'use client';
import React, { useState, useEffect } from 'react';
import client from '../../../../../../client.json';

export interface MobileBottomNavProps {
  primaryPhone?: string;
  whatsappPhone?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  primaryPhone = client.contact.primaryPhone,
  whatsappPhone = client.contact.whatsappPhone || client.contact.primaryPhone
}) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cleanPhone = primaryPhone.replace(/[^0-9+]/g, '');
  const cleanWa = whatsappPhone.replace(/[^0-9]/g, '');

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const shareData = {
      title: document.title || client.business.name,
      text: `Check out ${client.business.name} - ${client.business.tagline}`,
      url: window.location.href
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch (err) {
        console.error('Failed to copy share link:', err);
      }
    }
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation Bar"
      className={`fixed -bottom-[1px] left-0 right-0 z-[50] w-full nav-desktop:hidden select-none pointer-events-auto transition-all duration-500 ease-out transform ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="relative bg-surface/95 supports-[backdrop-filter]:bg-surface/90 backdrop-blur-2xl border-t border-border shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex items-center justify-around gap-2 after:content-[''] after:absolute after:top-full after:left-0 after:right-0 after:h-20 after:bg-surface">
        
        {/* 1. Call Action */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center flex-1 py-1 px-1.5 rounded-button text-primary hover:text-tertiary transition-all duration-200 group shrink-0 active:scale-95"
          data-analytics-click="MobileBottomNav - Call"
        >
          <div className="w-8.5 h-8.5 rounded-full bg-background border border-border flex items-center justify-center group-hover:border-tertiary/40 group-hover:-translate-y-0.5 transition-all duration-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-tertiary">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
            </svg>
          </div>
          <span className="font-label font-bold uppercase tracking-wider text-primary group-hover:text-tertiary pt-1">
            Call
          </span>
        </a>

        {/* 2. WhatsApp Action */}
        <a
          href={`https://wa.me/${cleanWa}?text=Hi%20${encodeURIComponent(client.business.name)}%2C%20I%20would%20like%20to%20inquire%20about%20fertility%20consultation.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 py-1 px-1.5 rounded-button text-primary hover:text-[#25D366] transition-all duration-200 group shrink-0 active:scale-95"
          data-analytics-click="MobileBottomNav - WhatsApp"
        >
          <div className="w-8.5 h-8.5 rounded-full bg-background border border-border flex items-center justify-center group-hover:border-[#25D366]/40 group-hover:-translate-y-0.5 transition-all duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </div>
          <span className="font-label font-bold uppercase tracking-wider text-primary group-hover:text-[#25D366] pt-1">
            WhatsApp
          </span>
        </a>

        {/* 3. Services Action */}
        <a
          href="/services"
          className="flex flex-col items-center justify-center flex-1 py-1 px-1.5 rounded-button text-primary hover:text-tertiary transition-all duration-200 group shrink-0 active:scale-95"
          data-astro-prefetch="hover"
          data-analytics-click="MobileBottomNav - Services"
        >
          <div className="w-8.5 h-8.5 rounded-full bg-background border border-border flex items-center justify-center group-hover:border-tertiary/40 group-hover:-translate-y-0.5 transition-all duration-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-tertiary">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <span className="font-label font-bold uppercase tracking-wider text-primary group-hover:text-tertiary pt-1">
            Services
          </span>
        </a>

        {/* 4. Share Action */}
        <button
          type="button"
          onClick={handleShare}
          className="flex flex-col items-center justify-center flex-1 py-1 px-1.5 rounded-button text-primary hover:text-tertiary transition-all duration-200 group shrink-0 active:scale-95 border-none outline-none bg-transparent cursor-pointer"
          data-analytics-click="MobileBottomNav - Share"
          aria-label="Share page"
        >
          <div className="w-8.5 h-8.5 rounded-full bg-background border border-border flex items-center justify-center group-hover:border-tertiary/40 group-hover:-translate-y-0.5 transition-all duration-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-tertiary">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </div>
          <span className="font-label font-bold uppercase tracking-wider text-primary group-hover:text-tertiary pt-1">
            {copied ? 'Copied!' : 'Share'}
          </span>
        </button>

      </div>
    </nav>
  );
};

export default MobileBottomNav;
