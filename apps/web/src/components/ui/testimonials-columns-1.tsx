"use client";

import React from "react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
  business?: string;
  rating?: number;
  domain?: string;
}

export interface TestimonialsColumnProps {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}

export const TestimonialsColumn: React.FC<TestimonialsColumnProps> = ({
  className = "",
  testimonials,
  duration = 20,
}) => {
  return (
    <div className={className}>
      <div
        className="animate-marquee-vertical flex flex-col gap-6 pb-6"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role, business, rating = 5 }, i) => (
              <div
                key={`${index}-${i}`}
                className="p-6 rounded-card border border-border bg-surface text-primary shadow-xl transition-all duration-300 max-w-xs sm:max-w-sm w-full space-y-4 text-left group hover:-translate-y-1 transform-gpu relative overflow-hidden shrink-0"
              >
                {/* 5-Star Rating & Business Pill Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-500" style={{ color: "#F59E0B" }}>
                    {[...Array(rating)].map((_, starIdx) => (
                      <svg
                        key={starIdx}
                        className="w-4 h-4 text-amber-500 fill-amber-500 star-gold stroke-none shrink-0"
                        viewBox="0 0 24 24"
                        fill="#F59E0B"
                        style={{ fill: "#F59E0B", color: "#F59E0B" }}
                      >
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                          fill="#F59E0B"
                          style={{ fill: "#F59E0B" }}
                        />
                      </svg>
                    ))}
                  </div>

                  {business && (
                    <span className="badge-neon-pill shrink-0">
                      {business}
                    </span>
                  )}
                </div>

                {/* Quote Text */}
                <p className="text-secondary text-sm leading-relaxed font-sans italic">
                  "{text}"
                </p>

                {/* Profile Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border border-border shrink-0"
                    />
                    <div className="flex flex-col text-left">
                      <div className="font-heading font-bold text-sm text-primary group-hover:text-tertiary transition-colors">
                        {name}
                      </div>
                      <div className="font-sans text-xs text-secondary">
                        {role}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-button border border-emerald-200/60 shrink-0">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsColumn;
