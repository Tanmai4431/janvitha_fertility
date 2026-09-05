"use client";

import React, { useState } from "react";
import { 
  Navigation, 
  Phone, 
  ExternalLink, 
  Star,
  Image as ImageIcon,
  Compass,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import clientData from "../../../../../../client.json";

export interface GalleryPhoto {
  id: string;
  title: string;
  url: string;
  alt: string;
}

const DEFAULT_PHOTOS: GalleryPhoto[] = [
  {
    id: "facade",
    title: "Clinic Exterior & Entrance",
    url: "/assets/hospital-facade.jpg",
    alt: "Janvithas Fertility Center Building Entrance & Facade",
  },
  {
    id: "reception",
    title: "Reception & Waiting Lounge",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80",
    alt: "Modern Reception & Patient Lounge",
  },
  {
    id: "consultation",
    title: "Specialist Consultation Suite",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80",
    alt: "Doctor Consultation Room",
  },
  {
    id: "lab",
    title: "Advanced Embryology Suite",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1000&auto=format&fit=crop&q=80",
    alt: "State-of-the-Art ART Laboratory",
  },
];

export function HospitalLocationCard() {
  const [activeTab, setActiveTab] = useState<"photo" | "360">("photo");
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const phone = clientData.contact.primaryPhone || "+91 81214 49988";
  const address = "15–381, Opp. Rotary School, Kamala Nagar, Ananthapuram – 515001, Andhra Pradesh, India";
  const mapsUrl = "https://maps.google.com/?q=15-381,+Opp.+Rotary+School,+Kamala+Nagar,+Ananthapuram,+Andhra+Pradesh+515001";
  const embedMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.203363384213!2d77.5956041!3d14.6840656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14b09cf931b6d%3A0x6b7720bc2085731!2sKamala%20Nagar%2C%20Anantapur%2C%20Andhra%20Pradesh%20515001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setActivePhotoIdx((prev) => (prev + 1) % DEFAULT_PHOTOS.length);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIdx((prev) => (prev - 1 + DEFAULT_PHOTOS.length) % DEFAULT_PHOTOS.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  const openPhoto = (idx: number) => {
    setActivePhotoIdx(idx);
    setIsLightboxOpen(true);
  };

  return (
    <section id="location" className="w-full py-3 sm:py-4 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div 
          className="rounded-[32px] sm:rounded-[36px] bg-[#FFFDFC] border-2 border-[#FDDCEB] p-5 sm:p-7 lg:p-9 shadow-[0_4px_30px_rgba(228,0,110,0.04)] space-y-8"
          data-animate="fade-up"
        >
          
          {/* 1. Header: Hospital Heading + Book Appointment Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary tracking-tight">
                Best Fertility Hospital in <br></br>
                {" "}
                <span className=" text-tertiary">Ananthapuram</span>
              </h2>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-[12px] sm:rounded-[14px] bg-[#E4006E] hover:bg-[#6B21A8] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-[0_2px_8px_rgba(228,0,110,0.25)] hover:shadow-[0_4px_14px_rgba(107,33,168,0.35)] transition-all duration-200 active:scale-[0.98] shrink-0 self-start sm:self-auto"
            >
              <span>Book An Appointment</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* 2. Photo / 360° Video Tab Switcher */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("photo")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "photo"
                  ? "bg-[#E4006E] hover:bg-[#6B21A8] text-white shadow-sm"
                  : "bg-[#FFF0F6] text-[#6B7280] hover:text-[#6B21A8] hover:bg-[#FAF5FF]"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photo</span>
            </button>
          </div>

          {/* 3. Hospital Photo Gallery / 360° Virtual Tour Area */}
          {activeTab === "photo" ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-stretch">
              
              {/* Main Large Photo (Clickable to open in modal) */}
              <div 
                onClick={() => openPhoto(activePhotoIdx)}
                className="md:col-span-7 lg:col-span-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-rose-50/30 relative aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:min-h-[440px] group shadow-2xs cursor-pointer select-none"
                role="button"
                tabIndex={0}
                aria-label="Click to enlarge hospital photo"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPhoto(activePhotoIdx);
                  }
                }}
              >
                <img
                  src={DEFAULT_PHOTOS[activePhotoIdx].url}
                  alt={DEFAULT_PHOTOS[activePhotoIdx].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Expand Overlay Banner */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/30 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    <span>Click to Enlarge</span>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 sm:p-5 text-white flex items-center justify-between">
                  <p className="text-xs sm:text-sm md:text-base font-sans font-semibold text-white/95">
                    {DEFAULT_PHOTOS[activePhotoIdx].title}
                  </p>
                  <span className="text-[11px] text-white/90 bg-white/20 px-2.5 py-0.5 rounded-full border border-white/25">
                    {activePhotoIdx + 1} / {DEFAULT_PHOTOS.length}
                  </span>
                </div>
              </div>

              {/* Extended Thumbnail Photos Column (Clearly fits 3 cards vertically on desktop / horizontal on mobile) */}
              <div className="md:col-span-5 lg:col-span-4 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[460px] pr-1 scrollbar-thin">
                {DEFAULT_PHOTOS.map((photo, idx) => {
                  const isActive = idx === activePhotoIdx;
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => openPhoto(idx)}
                      className={`relative rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all shrink-0 w-36 sm:w-44 md:w-full md:h-[132px] group text-left cursor-pointer flex flex-col justify-end p-2.5 ${
                        isActive
                          ? "border-[#E4006E] ring-2 ring-[#E4006E]/30 shadow-sm"
                          : "border-border hover:border-[#E4006E]/60 opacity-85 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                      
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <span className="text-white text-[11px] sm:text-xs font-semibold font-sans drop-shadow-sm truncate pr-2">
                          {photo.title}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#E4006E] shrink-0"></span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          ) : (
            /* 360° Virtual Tour Video Area */
            <div className="w-full rounded-2xl overflow-hidden border border-border bg-black aspect-[16/9] relative shadow-2xs">
              <iframe
                title="Janvithas Fertility Center 360 Clinic Tour"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* 4. Google Maps Embed Card (Directly BELOW the Photos) */}
          <div className="w-full rounded-2xl overflow-hidden border border-border bg-rose-50/20 relative shadow-2xs">
            {/* Top-Left 'Open in Maps' Floating Button */}
            <div className="absolute top-3 left-3 z-10">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] bg-white hover:bg-[#FAF5FF] text-[#E4006E] hover:text-[#6B21A8] border border-[#FADCEB] hover:border-[#6B21A8]/40 text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-current" />
              </a>
            </div>

            {/* Interactive Google Map Iframe */}
            <iframe
              title="Janvithas Fertility Center Google Maps Location"
              src={embedMapsUrl}
              className="w-full h-64 sm:h-72 md:h-80 border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* 5. Hospital Details, Action Buttons & Google Rating */}
          <div className="pt-2 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Clinic Title, Address, and Action Buttons */}
            <div className="space-y-3 max-w-xl">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-tertiary">
                  Janvithas Fertility Center – Ananthapuram
                </h3>
                <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed mt-1">
                  {address}
                </p>
              </div>

              {/* Action Buttons: Get Direction & Call */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[12px] bg-[#E4006E] hover:bg-[#6B21A8] text-white text-xs font-semibold tracking-wide shadow-[0_2px_8px_rgba(228,0,110,0.25)] hover:shadow-[0_4px_14px_rgba(107,33,168,0.35)] transition-all duration-200 active:scale-[0.98]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Direction</span>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[12px] border border-[#E4006E] hover:border-[#6B21A8] bg-white hover:bg-[#FAF5FF] text-[#E4006E] hover:text-[#6B21A8] font-semibold text-xs shadow-sm transition-all duration-200 active:scale-[0.98]"
                >
                  <Phone className="w-3.5 h-3.5 text-current" />
                  <span>Call</span>
                </a>
              </div>
            </div>

            {/* Right: Google Rating & Reviews Card */}
            <div className="self-start lg:self-center">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-surface border border-border hover:border-tertiary/40 shadow-2xs hover:shadow-xs transition-all group"
              >
                {/* Google Multicolor 'G' Icon */}
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.28 21.43 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.1z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.28 2.57 1.25 6.58l4.03 3.1c.95-2.83 3.6-4.93 6.72-4.93z"
                  />
                </svg>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-sm text-primary">4.9</span>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] font-sans text-secondary font-medium">
                    583 reviews
                  </span>
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 6. FULLSCREEN HOSPITAL PHOTO LIGHTBOX MODAL DIALOG                        */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged hospital photo viewer"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar: Title, Counter & Close Button */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between text-white py-2 px-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col text-left">
              <span className="font-heading font-bold text-sm sm:text-base text-white">
                {DEFAULT_PHOTOS[activePhotoIdx].title}
              </span>
              <span className="text-xs text-white/70 font-sans">
                Photo {activePhotoIdx + 1} of {DEFAULT_PHOTOS.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close photo viewer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white hover:text-white border border-white/20 transition-all cursor-pointer shadow-md"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Main Image Center Stage with Left & Right Nav Arrows */}
          <div 
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Photo Button */}
            <button
              type="button"
              onClick={() => setActivePhotoIdx((prev) => (prev - 1 + DEFAULT_PHOTOS.length) % DEFAULT_PHOTOS.length)}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-[#E4006E] text-white border border-white/20 hover:border-transparent transition-all shadow-lg cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Enlarged Image Display */}
            <div className="max-w-full max-h-[75vh] flex items-center justify-center">
              <img
                src={DEFAULT_PHOTOS[activePhotoIdx].url}
                alt={DEFAULT_PHOTOS[activePhotoIdx].alt}
                className="max-w-full max-h-[75vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Next Photo Button */}
            <button
              type="button"
              onClick={() => setActivePhotoIdx((prev) => (prev + 1) % DEFAULT_PHOTOS.length)}
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-[#E4006E] text-white border border-white/20 hover:border-transparent transition-all shadow-lg cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Bottom Thumbnail Navigation Strip */}
          <div 
            className="w-full max-w-xl flex items-center justify-center gap-2 sm:gap-3 py-2 overflow-x-auto z-10 no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {DEFAULT_PHOTOS.map((photo, idx) => {
              const isSelected = idx === activePhotoIdx;
              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative w-14 sm:w-16 h-10 sm:h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "border-[#E4006E] ring-2 ring-[#E4006E]/40 scale-105"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>

        </div>
      )}

    </section>
  );
}

export default HospitalLocationCard;
