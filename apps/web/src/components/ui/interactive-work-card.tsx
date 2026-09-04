import * as React from "react";
import { ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { WorkItem } from "@/components/ui/works-carousel";

interface InteractiveWorkCardProps {
  work: WorkItem;
}

export const InteractiveWorkCard: React.FC<InteractiveWorkCardProps> = ({ work }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-surface rounded-card border border-border shadow-xs hover:shadow-md hover:border-tertiary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-[480px] group shrink-0 select-none cursor-pointer block text-left"
    >
      {/* Top Browser Header Frame */}
      <div className="bg-background border-b border-border px-4 py-2.5 flex items-center justify-between shrink-0 h-[36px]">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
        </div>
        <div className="bg-surface px-3 py-0.5 rounded-sm border border-border text-[11px] font-sans text-secondary truncate max-w-[200px]">
          https://{work.domain}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-sans font-bold text-tertiary shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
        </div>
      </div>

      {/* Screen Recording Video Container */}
      <div className="relative w-full h-[210px] min-h-[210px] max-h-[210px] bg-primary overflow-hidden shrink-0">
        {work.videoSrc ? (
          <video
            ref={videoRef}
            src={work.videoSrc}
            poster={work.imageSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shrink-0"
          />
        ) : (
          <img
            src={work.imageSrc}
            alt={`${work.business} work preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shrink-0"
          />
        )}
      </div>

      {/* Card Content Footer: 24px padding (p-6) */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-3 bg-surface overflow-hidden">
        <div className="space-y-2">
          {/* Tag & Category Header Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="badge-neon-pill shrink-0">
              <CheckCircle2 className="w-3 h-3 text-tertiary shrink-0" />
              {work.tag}
            </span>
            <span className="font-label font-bold text-secondary uppercase tracking-wider truncate max-w-[140px] text-right">
              {work.type}
            </span>
          </div>

          <h3 className="text-xl font-heading font-bold text-primary group-hover:text-tertiary transition-colors leading-snug line-clamp-1">
            {work.business}
          </h3>

          <p className="text-xs text-secondary leading-relaxed line-clamp-2 font-sans">
            {work.description}
          </p>
        </div>

        {/* Badges & Direct Link Button */}
        <div className="pt-3 border-t border-border flex items-center justify-between shrink-0">
          <div className="flex flex-wrap gap-1 max-w-[190px]">
            {work.techStack?.map((tech, i) => (
              <span key={i} className="font-label bg-background text-secondary px-2 py-0.5 rounded-sm font-semibold">
                {tech}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary group-hover:bg-tertiary px-3.5 py-1.5 rounded-button transition-colors duration-200 shrink-0 shadow-xs">
            <span>Visit</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default InteractiveWorkCard;
