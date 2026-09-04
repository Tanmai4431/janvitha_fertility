import React, { useRef, useState, useEffect } from 'react';
import { Clock, ArrowRight, User } from 'lucide-react';
import client from '../../../../../client.json';

export interface BlogCardPost {
  title: string;
  slug: string;
  category?: string;
  readTime?: string;
  publishedAt?: string;
  excerpt?: string;
  mainImageUrl?: string;
  videoUrl?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatarUrl?: string;
  tags?: string[];
  isFeatured?: boolean;
}

export interface BlogCardProps {
  post: BlogCardPost;
  className?: string;
}

export function BlogCard({ post, className = '' }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setStyle({});

    const handleReset = () => {
      setStyle({});
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

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

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
        new Date(post.publishedAt)
      )
    : 'Recently Published';

  const displayReadTime = post.readTime || '4 min read';
  const categoryName = post.category || 'Clinical Guidance';
  const articleUrl = `/blog/${post.slug}`;

  return (
    <a
      href={articleUrl}
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
        {/* Top Editorial Media Frame */}
        <div className="relative w-full h-[220px] min-h-[220px] max-h-[220px] bg-background overflow-hidden rounded-t-card shrink-0">
          <div className="absolute top-3.5 left-3.5 z-10 flex items-center">
            <span className="px-3 py-1 rounded-button bg-primary text-white font-label font-bold uppercase tracking-wider shadow-sm">
              {categoryName}
            </span>
          </div>

          <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 bg-surface text-primary px-3 py-1 rounded-button border border-border text-xs font-sans font-bold shadow-sm">
            <Clock className="w-3.5 h-3.5 text-tertiary" />
            <span>{displayReadTime}</span>
          </div>

          {post.videoUrl ? (
            <video
              ref={videoRef}
              src={post.videoUrl}
              poster={post.mainImageUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shrink-0"
            />
          ) : post.mainImageUrl ? (
            <img
              src={post.mainImageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shrink-0"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-background flex items-center justify-center border-b border-border">
              <span className="font-label font-bold uppercase tracking-wider text-tertiary">
                {client.business.name}
              </span>
            </div>
          )}
        </div>

        {/* Card Body Details: 20-24px padding */}
        <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between space-y-3 bg-surface rounded-b-card">
          <div className="space-y-1.5">
            <h3 className="text-sm sm:text-[15px] font-heading font-bold text-gray-900 group-hover:text-[#E4006E] transition-colors leading-snug line-clamp-2">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-sm text-secondary leading-relaxed line-clamp-2 font-sans">
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-label bg-background text-secondary px-2.5 py-0.5 rounded-sm font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Card Footer Row */}
          <div className="pt-3 border-t border-border flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 max-w-[200px]">
              {post.authorAvatarUrl ? (
                <img
                  src={post.authorAvatarUrl}
                  alt={post.authorName || 'Author'}
                  className="w-8 h-8 rounded-full object-cover border border-border shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-primary shrink-0">
                  <User className="w-4 h-4 text-secondary" />
                </div>
              )}
              <div className="flex flex-col truncate">
                <span className="text-xs font-heading font-bold text-primary truncate leading-tight">
                  {post.authorName || client.business.specialist?.name || client.business.name}
                </span>
                <span className="font-label text-secondary truncate leading-tight">
                  {formattedDate}
                </span>
              </div>
            </div>

            {/* Read Button */}
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-button border border-tertiary bg-surface text-tertiary font-sans font-bold text-xs uppercase tracking-wide group-hover:bg-tertiary group-hover:text-white transition-all duration-200 shadow-xs shrink-0">
              <span>Read</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </div>
    </a>
  );
}

export default BlogCard;
