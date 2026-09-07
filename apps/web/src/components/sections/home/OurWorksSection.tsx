import * as React from "react";
import { WorksCarousel, type WorkItem } from "@/components/ui/works-carousel";
import { InteractiveHoverButton } from "@/components/ui/buttons/interactive-hover-button";
import client from "../../../../../../client.json";

interface OurWorksSectionProps {
  works?: WorkItem[];
}

export const OurWorksSection: React.FC<OurWorksSectionProps> = ({ works }) => {
  const worksList = (works && works.length > 0) ? works : ((client.works || []) as WorkItem[]);

  return (
    <section id="our-works-section" className="w-full py-3 sm:py-4 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-[32px] sm:rounded-[36px] bg-[#FFFDFC] border-2 border-[#FDDCEB] p-5 sm:p-7 lg:p-9 shadow-[0_4px_30px_rgba(228,0,110,0.04)] space-y-8"
          data-animate="fade-up"
        >
          {/* Section Header Block */}
          <div className="text-center max-w-3xl mx-auto space-y-3 font-sans">
            <div className="flex items-center justify-center gap-2">
              <span className="font-label font-bold uppercase tracking-wider text-primary">
                PATIENT STORIES & CARE SHOWCASE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-primary leading-tight">
              Selected Clinical <span className="text-tertiary">Care Showcase</span>
            </h2>

            <p className="text-secondary text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
              Real stories of hope, advanced reproductive care, and dedicated clinical excellence at {client.business.name}.
            </p>
          </div>

          {/* Carousel with Cards */}
          <div className="relative w-full pt-2">
            <WorksCarousel works={worksList} stepIntervalMs={4500} />
          </div>

          {/* Bottom-Right CTA */}
          <div className="flex justify-end pt-2">
            <InteractiveHoverButton
              href="/our-works"
              className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider py-3 px-6"
            >
              Explore All Patient Stories
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWorksSection;
