import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InteractiveWorkCard } from "@/components/ui/interactive-work-card";
import { InteractiveHoverButton } from "@/components/ui/buttons/interactive-hover-button";
import client from "../../../../../../client.json";

export interface OurWorksPaginatedGridProps {
  works?: any[];
  itemsPerPage?: number;
}

export function OurWorksPaginatedGrid({
  works = [],
  itemsPerPage = 6,
}: OurWorksPaginatedGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const worksList = (works && works.length > 0) ? works : (client.works || []);
  const totalItems = worksList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Compute slice for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentWorks = worksList.slice(startIndex, endIndex);

  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);

      // Defer scroll calculation so DOM updates first
      setTimeout(() => {
        const gridSection = document.getElementById("portfolio-grid-top");
        if (gridSection) {
          const headerOffset = 110; // Clearance for floating navbar
          const elementPosition = gridSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
        }
      }, 20);
    }
  };

  return (
    <div id="portfolio-grid-top" className="space-y-12 w-full">
      {/* Paginated Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentWorks.map((work: any, idx: number) => (
          <div key={work.id || work.title + idx} className="h-full">
            <InteractiveWorkCard work={work} />
          </div>
        ))}
      </div>

      {/* Modern Precise Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2 border-t border-border text-xs font-sans">
          {/* Left: Project Count Range Indicator */}
          <div className="text-secondary font-label font-bold uppercase tracking-wider text-xs">
            Showing <span className="text-tertiary font-bold">{startIndex + 1}–{endIndex}</span> of <span className="text-primary font-bold">{totalItems}</span> Stories
          </div>

          {/* Right: Page Number Controls & Prev/Next Arrows */}
          <div className="flex items-center gap-2">
            {/* Prev Arrow Button */}
            <button
              type="button"
              onClick={(e) => handlePageChange(e, currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className="w-8 h-8 rounded-button border border-border bg-surface text-primary hover:text-tertiary disabled:opacity-40 disabled:hover:text-primary flex items-center justify-center font-bold text-sm transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={(e) => handlePageChange(e, pageNum)}
                className={`w-8 h-8 rounded-button font-sans font-bold text-xs transition-all duration-200 cursor-pointer shadow-xs ${
                  currentPage === pageNum
                    ? "bg-tertiary text-white shadow-xs"
                    : "bg-surface text-secondary border border-border hover:border-tertiary hover:text-tertiary"
                }`}
              >
                {String(pageNum).padStart(2, "0")}
              </button>
            ))}

            {/* Next Arrow Button */}
            <button
              type="button"
              onClick={(e) => handlePageChange(e, currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className="w-8 h-8 rounded-button border border-border bg-surface text-primary hover:text-tertiary disabled:opacity-40 disabled:hover:text-primary flex items-center justify-center font-bold text-sm transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* CTA Button Below Showcase Grid */}
      <div className="pt-4 flex justify-center w-full">
        <InteractiveHoverButton href="/contact">
          Schedule Appointment
        </InteractiveHoverButton>
      </div>
    </div>
  );
}

export default OurWorksPaginatedGrid;
