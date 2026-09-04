import * as React from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Globe, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkItem {
  id: string | number;
  client?: string;
  business: string;
  type: string;
  tag: string;
  title: string;
  description: string;
  domain: string;
  href: string;
  brandLogoSrc?: string;
  imageSrc: string;
  videoSrc?: string;
  techStack?: string[];
}

interface WorkCardProps {
  work: WorkItem;
  onCardClick?: () => void;
}

const WorkCard = React.forwardRef<HTMLAnchorElement, WorkCardProps>(({ work, onCardClick }, ref) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  React.useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    playVideo();
    document.addEventListener("astro:page-load", playVideo);
    return () => {
      document.removeEventListener("astro:page-load", playVideo);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (onCardClick) onCardClick();
      }}
      className="relative flex-shrink-0 w-[300px] sm:w-[340px] h-[480px] rounded-card overflow-hidden group snap-start bg-surface border border-border shadow-xs hover:shadow-md hover:border-tertiary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col select-none shrink-0 my-2 block text-left"
    >
      {/* Top Browser Header Mockup Frame */}
      <div className="bg-background border-b border-border px-3.5 py-2 flex items-center justify-between shrink-0 h-[36px]">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
        </div>
        <div className="bg-surface px-2.5 py-0.5 rounded-sm border border-border text-[10px] font-sans text-secondary truncate max-w-[160px]">
          https://{work.domain}
        </div>
        <Globe className="w-3.5 h-3.5 text-tertiary shrink-0" />
      </div>

      {/* Media Container */}
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
            onLoadedData={() => setVideoLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shrink-0",
              videoLoaded ? "opacity-100" : "opacity-90"
            )}
          />
        ) : (
          <img
            src={work.imageSrc}
            alt={`${work.business} preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shrink-0"
          />
        )}
      </div>

      {/* Card Body Details: 24px padding (p-6) */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-3 bg-surface overflow-hidden">
        <div className="space-y-2">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="badge-neon-pill shrink-0">
              <CheckCircle2 className="w-3 h-3 text-tertiary shrink-0" />
              {work.tag}
            </span>
            <span className="font-label font-bold text-secondary uppercase tracking-wider truncate max-w-[120px] text-right">
              {work.type}
            </span>
          </div>

          {/* Business Name */}
          <h3 className="text-xl font-heading font-bold text-primary group-hover:text-tertiary transition-colors leading-snug line-clamp-1">
            {work.business}
          </h3>

          {/* Description */}
          <p className="text-xs text-secondary leading-relaxed line-clamp-2 font-sans">
            {work.description}
          </p>
        </div>

        {/* Tech Stack Badges & Link Button */}
        <div className="pt-3 border-t border-border flex items-center justify-between shrink-0">
          <div className="flex flex-wrap gap-1 max-w-[160px]">
            {work.techStack?.map((tech, i) => (
              <span key={i} className="font-label bg-background text-secondary px-2 py-0.5 rounded-sm font-semibold">
                {tech}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-bold text-white bg-primary group-hover:bg-tertiary px-3 py-1.5 rounded-button transition-colors duration-200 shrink-0 shadow-xs">
            <span>Visit</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </a>
  );
});

WorkCard.displayName = "WorkCard";

interface WorksCarouselProps {
  works: WorkItem[];
  stepIntervalMs?: number;
}

export const WorksCarousel: React.FC<WorksCarouselProps> = ({
  works = [],
  stepIntervalMs = 4500,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);

  const checkScrollability = React.useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  React.useEffect(() => {
    checkScrollability();
    const current = containerRef.current;
    if (current) {
      current.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        current.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [checkScrollability]);

  // Stepping Auto Loop
  React.useEffect(() => {
    if (isPaused || works.length <= 1) return;

    const timer = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const cardStep = 340 + 24;

        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          containerRef.current.scrollBy({ left: cardStep, behavior: "smooth" });
        }
      }
    }, stepIntervalMs);

    return () => clearInterval(timer);
  }, [isPaused, works.length, stepIntervalMs]);

  const scrollLeft = () => {
    if (containerRef.current) {
      const cardStep = 340 + 24;
      containerRef.current.scrollBy({ left: -cardStep, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const cardStep = 340 + 24;
      containerRef.current.scrollBy({ left: cardStep, behavior: "smooth" });
    }
  };

  if (!works || works.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Cards Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth py-2 px-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {works.map((work, idx) => (
          <WorkCard key={work.id || `${work.business}-${idx}`} work={work} />
        ))}
      </div>

      {/* Floating Prev / Next Controls Bar */}
      <div className="flex items-center justify-between pt-4 px-1">
        <div className="text-secondary font-label font-bold uppercase tracking-wider text-xs">
          Showing {works.length} Clinical Stories
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Previous Stories"
            className={cn(
              "w-9 h-9 rounded-button border border-border bg-surface text-primary flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer",
              !canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:border-tertiary hover:text-tertiary active:scale-95"
            )}
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Next Stories"
            className={cn(
              "w-9 h-9 rounded-button border border-border bg-surface text-primary flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer",
              !canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:border-tertiary hover:text-tertiary active:scale-95"
            )}
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorksCarousel;
