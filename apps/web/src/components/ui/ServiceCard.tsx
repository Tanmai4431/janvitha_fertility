import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Stethoscope, CheckCircle2 } from 'lucide-react';
import client from '../../../../../client.json';

export interface ServiceCardData {
  id?: string;
  slug: string;
  category?: string;
  badge?: string;
  title: string;
  shortDesc?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  subservices?: Array<string | { title: string; slug?: string }>;
  features?: string[];
  metrics?: Array<{ label: string; value: string }>;
}

export interface ServiceCardProps {
  service: ServiceCardData;
  className?: string;
}

const DEFAULT_SERVICE_IMAGE =
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80';

export function ServiceCard({ service, className = '' }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setStyle({});
    const handleReset = () => {
      setStyle({});
    };

    document.addEventListener('astro:page-load', handleReset);
    return () => {
      document.removeEventListener('astro:page-load', handleReset);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    if (!width || !height) return;

    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * -3;
    const rotateY = ((x - width / 2) / (width / 2)) * 3;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'none',
      transition: 'transform 0.4s ease-in-out',
    });
  };

  const cleanCategory = (service.category || service.badge || 'Specialized Care').replace(/^\d+\s*[•·-]\s*/, '').trim();
  const serviceUrl = `/services/${service.slug}`;
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(service.imageUrl || DEFAULT_SERVICE_IMAGE);

  useEffect(() => {
    setCurrentImageSrc(service.imageUrl || DEFAULT_SERVICE_IMAGE);
  }, [service.imageUrl]);

  const displayDesc = service.shortDesc || service.description || '';
  
  // Extract subservice or feature pills
  const chips: string[] = [];
  if (service.subservices && service.subservices.length > 0) {
    service.subservices.slice(0, 3).forEach((sub) => {
      const name = typeof sub === 'string' ? sub : sub.title;
      if (name) chips.push(name);
    });
  } else if (service.features && service.features.length > 0) {
    service.features.slice(0, 3).forEach((f) => {
      if (f) chips.push(f);
    });
  }

  const highlightMetric = service.metrics && service.metrics.length > 0 ? service.metrics[0] : null;

  return (
    <a
      href={serviceUrl}
      className="flex flex-col w-full h-full group cursor-pointer text-left select-none focus:outline-none"
      data-astro-prefetch="hover"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={`relative w-full flex-1 flex flex-col justify-between rounded-card bg-surface shadow-xs hover:shadow-md overflow-hidden transform-gpu border border-border transition-all duration-300 ${className}`}
      >
        {/* Top Editorial Media Frame (Clean without distracting top guards) */}
        <div className="relative w-full h-[220px] min-h-[220px] max-h-[220px] bg-background overflow-hidden rounded-t-card shrink-0">
          {/* Image with smooth zoom on hover */}
          <img
            src={currentImageSrc}
            alt={service.title}
            onError={() => setCurrentImageSrc(DEFAULT_SERVICE_IMAGE)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shrink-0"
            loading="lazy"
          />
        </div>

        {/* Card Body Details: Title, Small description, and subservice pills */}
        <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between space-y-3 bg-surface rounded-b-card">
          <div className="space-y-1.5">
            <h3 className="text-sm sm:text-[15px] font-heading font-bold text-gray-900 group-hover:text-[#E4006E] transition-colors leading-snug line-clamp-2">
              {service.title}
            </h3>

            {displayDesc && (
              <p className="text-sm text-secondary leading-relaxed line-clamp-2 font-sans">
                {displayDesc}
              </p>
            )}

            {chips.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-1.5">
                {chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="font-label bg-background text-secondary px-2.5 py-0.5 rounded-sm font-semibold text-[11px] truncate max-w-[200px]"
                  >
                    • {chip}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Card Footer Row - Fully responsive with no button clipping */}
          <div className="pt-3 border-t border-border flex items-center justify-between gap-2 shrink-0 min-w-0">
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-primary shrink-0">
                <Stethoscope className="w-4 h-4 text-secondary" />
              </div>
              <div className="flex flex-col min-w-0 flex-1 truncate">
                <span className="text-xs font-heading font-bold text-primary truncate leading-tight">
                  {client.business.specialist?.name || client.business.name}
                </span>
                <span className="font-label text-secondary truncate leading-tight text-[11px]">
                  {client.business.specialist?.designation || 'Consultant Specialist'}
                </span>
              </div>
            </div>

            {/* Explore Treatment Button (Never cut in half) */}
            <div className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-tertiary bg-surface text-tertiary font-sans font-bold text-xs uppercase tracking-wide group-hover:bg-tertiary group-hover:text-white transition-all duration-200 shadow-xs whitespace-nowrap">
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </div>
    </a>
  );
}

export default ServiceCard;
