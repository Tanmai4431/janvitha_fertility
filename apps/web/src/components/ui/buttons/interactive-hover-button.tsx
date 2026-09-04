"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  shape?: "capsule" | "tilted-square";
}

export function InteractiveHoverButton({
  children,
  className,
  href,
  target,
  rel,
  shape = "capsule",
  ...props
}: InteractiveHoverButtonProps) {
  const content = (
    <div className="flex items-center justify-center gap-2">
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
    </div>
  );

  const baseClassName = cn(
    "group relative w-auto cursor-pointer overflow-hidden text-center font-sans font-semibold text-xs sm:text-sm tracking-wide text-white bg-[#E4006E] hover:bg-[#6B21A8] py-2.5 px-5 rounded-[12px] sm:rounded-[14px] shadow-[0_2px_8px_rgba(228,0,110,0.25)] hover:shadow-[0_4px_14px_rgba(107,33,168,0.35)] transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center select-none",
    className
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={baseClassName}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClassName} {...props}>
      {content}
    </button>
  );
}

export default InteractiveHoverButton;
