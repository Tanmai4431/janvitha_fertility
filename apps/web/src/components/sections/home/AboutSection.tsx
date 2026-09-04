"use client";

import React from "react";
import { 
  Stethoscope, 
  Award, 
  ShieldCheck, 
  Target, 
  ArrowRight, 
  Phone 
} from "lucide-react";
import clientData from "../../../../../../client.json";

export interface SocialLinkItem {
  platform: string;
  customPlatformName?: string;
  url: string;
  svgCode?: string;
  iconUrl?: string | null;
}

export interface AboutGalleryItemProps {
  mediaType?: 'image' | 'video' | string;
  imageSourceType?: 'upload' | 'cdn' | string;
  imageUrl?: string | null;
  imageCdnUrl?: string | null;
  videoSourceType?: 'upload' | 'cdn' | 'youtube' | string;
  videoFileUrl?: string | null;
  videoCdnUrl?: string | null;
  youtubeUrl?: string | null;
  alt?: string | null;
}

export interface AboutSectionProps {
  aboutImageUrl?: string | null;
  aboutImages?: string[];
  aboutGallery?: AboutGalleryItemProps[];
  socialLinks?: SocialLinkItem[];
}

export function AboutSection({
  aboutImageUrl,
}: AboutSectionProps) {
  // Doctor details from unified client.json data
  const specialist = clientData.business.specialist;
  const doctorName = specialist?.name || "Dr. P. Bharathi";
  const designation = specialist?.designation || "Consultant Obstetrician & Gynaecologist";
  
  // Concise doctor description
  const bio = "Specialist in Reproductive & Fetal Medicine (UK), dedicated to personalized fertility solutions, advanced IVF protocols, and compassionate care.";

  const doctorPhoto = aboutImageUrl || specialist?.image || "/assets/doctor-dr-p-bharathi.jpg";
  const primaryPhone = clientData.contact.primaryPhone || "+91 81214 49988";

  // 4 Feature Cards Data matching reference image
  const featureCards = [
    {
      id: "exp",
      title: "15+ Years Experience",
      subtitle: "Reproductive medicine & care",
      icon: Award,
    },
    {
      id: "fmf",
      title: "Fellow in Fetal Medicine",
      subtitle: "Certified by FMF (UK)",
      icon: ShieldCheck,
    },
    {
      id: "rm",
      title: "Reproductive Medicine",
      subtitle: "Recognised specialist fellowship",
      icon: Stethoscope,
    },
    {
      id: "art",
      title: "Advanced ART & IVF",
      subtitle: "Personalized fertility protocols",
      icon: Target,
    },
  ];

  return (
    <section id="about" className="w-full py-3 sm:py-4 scroll-mt-24">
      {/* Outer Section Width Constraint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            ONE MAIN PARENT CARD: Encapsulates Entire About Doctor Section
           ========================================================================= */}
        <div 
          className="rounded-[32px] sm:rounded-[36px] bg-[#FFFDFC] border-2 border-[#FDDCEB] p-4 sm:p-6 lg:p-7 shadow-[0_4px_30px_rgba(228,0,110,0.04)]"
          data-animate="fade-up"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 items-stretch">
            
            {/* =========================================================================
                LEFT INNER BLOCK: Doctor Image Bordered Card
               ========================================================================= */}
            <div className="lg:col-span-5 rounded-[24px] sm:rounded-[28px] bg-white border border-[#FADCEB] p-6 sm:p-8 flex items-center justify-center relative shadow-[0_2px_12px_rgba(228,0,110,0.02)] min-h-[340px] sm:min-h-[400px] lg:min-h-[440px]">
              
              {/* Circular Doctor Frame with Concentric Halo Disc */}
              <div className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-76 md:h-76 lg:w-80 lg:h-80 flex items-center justify-center">
                
                {/* Layer 1: Outer Soft Translucent Pink Gradient Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFE2F0] via-[#FFF0F7] to-[#FFE8F3] opacity-80" />

                {/* Layer 2: Concentric Layered Pink Halo Border */}
                <div className="absolute inset-1.5 sm:inset-2 rounded-full border-[8px] sm:border-[12px] md:border-[14px] border-[#FCE4F0] bg-transparent pointer-events-none" />

                {/* Layer 3: Inner Doctor Photo with Crisp White Ring Border */}
                <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] bg-rose-50/40">
                  <img
                    src={doctorPhoto}
                    alt={doctorName}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Floating Card 1: Top-Left - Lead Consultant */}
                <div className="absolute -top-1 -left-2 sm:-top-2 sm:-left-3 z-20 flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white border border-[#FCE1EE] shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:scale-105 transition-transform duration-200">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFF0F6] text-[#E4006E] flex items-center justify-center shrink-0 border border-rose-100">
                    <Stethoscope className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E4006E]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#111827] whitespace-nowrap font-sans">
                    Lead Consultant
                  </span>
                </div>

                {/* Floating Card 2: Bottom-Right - Fetal Medicine */}
                <div className="absolute -bottom-1 -right-2 sm:-bottom-2 sm:-right-3 z-20 flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white border border-[#FCE1EE] shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:scale-105 transition-transform duration-200">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFF0F6] text-[#E4006E] flex items-center justify-center shrink-0 border border-rose-100">
                    <Stethoscope className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E4006E]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#111827] whitespace-nowrap font-sans">
                    Fetal Medicine
                  </span>
                </div>

              </div>

            </div>


            {/* =========================================================================
                RIGHT INNER BLOCK: All Doctor Information Bordered Card
               ========================================================================= */}
            <div className="lg:col-span-7 rounded-[24px] sm:rounded-[28px] bg-white border border-[#FADCEB] p-5 sm:p-7 lg:p-8 flex flex-col justify-between space-y-4 sm:space-y-5 shadow-[0_2px_12px_rgba(228,0,110,0.02)]">
              
              {/* 1. Doctor Name & Designation */}
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-bold tracking-tight leading-tight">
                  <span className="text-[#111827]">Meet </span>
                  <span className="text-[#E4006E]">{doctorName}</span>
                </h2>
                
                {/* Subtitle with solid pink dot */}
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E4006E] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#4B5563] font-sans">
                    {designation}
                  </span>
                </div>
              </div>

              {/* 2. Short Doctor Bio Description */}
              <p className="text-[#4B5563] text-xs sm:text-sm leading-relaxed font-sans">
                {bio}
              </p>

              {/* 3. Information Card with Integrated Appointment Button matching reference image */}
              <div className="rounded-[18px] sm:rounded-[22px] border-2 border-[#FDDCEB] bg-[#FFFDFC] p-2.5 sm:p-3.5 space-y-2.5 sm:space-y-3 shadow-sm">
                
                {/* 2x2 Feature Items Grid with compact typography */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {featureCards.map((card) => {
                    const IconComp = card.icon;
                    return (
                      <div
                        key={card.id}
                        className="flex items-center gap-2 sm:gap-2.5 py-1.5 pl-2 sm:pl-2.5 pr-1 sm:pr-1.5 rounded-[10px] sm:rounded-[12px] bg-white border border-[#F2DEEA] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#E4006E]/40 hover:bg-[#FFF0F6]/30 transition-all duration-150"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[8px] bg-[#FFF0F6] text-[#E4006E] flex items-center justify-center shrink-0 border border-rose-100/60">
                          <IconComp className="w-3.5 h-3.5 text-[#E4006E]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-[12px] font-heading font-bold text-[#111827] leading-tight">
                            {card.title}
                          </h4>
                          <p className="text-[10px] sm:text-[10.5px] text-[#6B7280] leading-tight font-sans">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons Row: Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                  <a
                    href="/contact"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[12px] sm:rounded-[14px] bg-[#E4006E] hover:bg-[#6B21A8] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-[0_2px_8px_rgba(228,0,110,0.25)] hover:shadow-[0_4px_14px_rgba(107,33,168,0.35)] transition-all duration-200 active:scale-[0.98]"
                  >
                    <span>Book an Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[12px] sm:rounded-[14px] border border-[#E4006E] hover:border-[#6B21A8] bg-white hover:bg-[#FAF5FF] text-[#E4006E] hover:text-[#6B21A8] font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-[0.98]"
                  >
                    <Phone className="w-3.5 h-3.5 text-current" />
                    <span>Call: {primaryPhone}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;



