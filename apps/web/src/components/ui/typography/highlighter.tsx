"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";

export type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

export interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  className?: string;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#FECDD3",
  strokeWidth = 2.5,
  animationDuration = 800,
  iterations = 2,
  padding = 2,
  multiline = true,
  className = "",
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let annotation: RoughAnnotation | null = null;
    const timers: NodeJS.Timeout[] = [];

    const clearTimers = () => {
      timers.forEach((t) => clearTimeout(t));
      timers.length = 0;
    };

    const cleanup = () => {
      clearTimers();
      if (annotation) {
        try {
          annotation.hide();
          annotation.remove();
        } catch (_) {}
        annotation = null;
      }
      if (element && element.parentElement) {
        element.parentElement.querySelectorAll("svg.rough-annotation").forEach((svg) => {
          try {
            svg.remove();
          } catch (_) {}
        });
      }
    };

    const draw = () => {
      if (!element || !document.body.contains(element)) return;

      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      cleanup();

      try {
        annotation = annotate(element, {
          type: action,
          color,
          strokeWidth,
          animationDuration,
          iterations,
          padding,
          multiline,
        });
        annotation.show();
      } catch (e) {}
    };

    const scheduleDraw = () => {
      clearTimers();
      document.fonts.ready.then(() => {
        const delays = [100, 400, 800];
        delays.forEach((delay) => {
          const t = setTimeout(() => {
            requestAnimationFrame(draw);
          }, delay);
          timers.push(t);
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scheduleDraw();
          } else {
            cleanup();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    const handleAstroPageLoad = () => {
      scheduleDraw();
    };

    document.addEventListener("astro:page-load", handleAstroPageLoad);
    document.addEventListener("astro:after-swap", handleAstroPageLoad);

    scheduleDraw();

    return () => {
      clearTimers();
      observer.disconnect();
      document.removeEventListener("astro:page-load", handleAstroPageLoad);
      document.removeEventListener("astro:after-swap", handleAstroPageLoad);
      cleanup();
    };
  }, [action, color, strokeWidth, animationDuration, iterations, padding, multiline]);

  return (
    <span ref={elementRef} className={`relative inline-block mx-0.5 z-10 ${className}`}>
      {children}
    </span>
  );
}

export default Highlighter;
