import React, { useRef, useState } from 'react';
import client from '../../../../../client.json';

export interface InteractiveServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
  category: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  features?: string[];
  className?: string;
}

export function InteractiveServiceCard({
  slug,
  category,
  title,
  description,
  imageUrl,
  videoUrl,
  features = [],
  className = '',
  ...props
}: InteractiveServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
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
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-in-out',
    });
  };

  const defaultFeatures = features.length > 0 ? features : [
    'Specialist Clinical Consultation',
    'High-Precision Diagnostics',
    'Personalized Treatment Protocols',
    'Dedicated Patient Guidance'
  ];

  return (
    <a 
      href={`/services/${slug}`}
      className="block w-full group cursor-pointer text-left"
      data-astro-prefetch="hover"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={`relative w-full rounded-card bg-surface overflow-hidden border border-border flex flex-col justify-between transition-all duration-300 ${className}`}
        {...props}
      >
        {/* Top Media Frame */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-background border-b border-border shrink-0">
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <img
              src={imageUrl || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80'}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        {/* Bottom Body: 24px padding (p-6) */}
        <div className="p-6 bg-surface flex flex-col justify-between flex-grow rounded-b-card space-y-4 text-left">
          
          {/* Category Badge & Service Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="badge-neon-pill">
                {category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary group-hover:text-tertiary transition-colors leading-snug">
              {title}
            </h3>

            <p className="text-secondary text-sm leading-relaxed font-sans">
              {description}
            </p>
          </div>

          {/* Key Deliverables Bullet Points List */}
          <div className="pt-3 border-t border-border space-y-2">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-secondary block mb-1">
              KEY CLINICAL HIGHLIGHTS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {defaultFeatures.slice(0, 4).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-sans text-primary">
                  <span className="w-4 h-4 rounded-full bg-background text-tertiary flex items-center justify-center font-bold text-[10px] shrink-0">✓</span>
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-3 flex items-center justify-between border-t border-border">
            <span className="font-label text-secondary uppercase">
              {client.business.name}
            </span>

            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-button border border-tertiary bg-surface text-tertiary font-sans font-bold text-xs uppercase tracking-wide group-hover:bg-tertiary group-hover:text-white transition-all duration-200 shrink-0">
              <span>Know More</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </a>
  );
}

export default InteractiveServiceCard;
