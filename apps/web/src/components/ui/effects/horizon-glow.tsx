"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HorizonGlowProps {
  className?: string;
  children?: React.ReactNode;
}

export function HorizonGlow({ className, children }: HorizonGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const noiseSvg = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.150'/></svg>")`;

    const updateGradient = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const t = (timestamp - startTime) / 1000;

      const ph = t * 0.72;
      const amt = 0.62;
      const dir = 1;
      const spin = ph * dir;

      const domeFactor = 1 + Math.sin(spin * 0.8) * amt * 0.07;
      const backlightFactor = 1 + Math.sin(spin * 0.8) * amt * 0.35;

      const domeW = (101 * domeFactor).toFixed(4);
      const domeH = (49 * domeFactor).toFixed(4);

      const b1W = (42.42 * backlightFactor).toFixed(4);
      const b1H = (18.62 * backlightFactor).toFixed(4);

      const b2W = (53.53 * backlightFactor).toFixed(4);
      const b2H = (28.42 * backlightFactor).toFixed(4);

      const bgImage = `${noiseSvg}, radial-gradient(${domeW}% ${domeH}% at 50% 100%, #fc8279 0.0%, #FB6A60 23.8%, #FDA096 51.4%, #F52929 79.0%, rgba(245, 41, 41, 0) 91.0%), radial-gradient(${b1W}% ${b1H}% at 50% 100%, rgba(252, 158, 152, 0.3672) 0%, rgba(251, 106, 96, 0.1428) 38%, rgba(251, 106, 96, 0) 72%), radial-gradient(${b2W}% ${b2H}% at 50% 100%, rgba(253, 160, 150, 0.1326) 0%, rgba(253, 160, 150, 0) 80%)`;

      if (containerRef.current) {
        containerRef.current.style.backgroundImage = bgImage;
      }

      animationFrameId = requestAnimationFrame(updateGradient);
    };

    animationFrameId = requestAnimationFrame(updateGradient);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full rounded-3xl overflow-hidden transition-all duration-300",
        className
      )}
      style={{
        backgroundColor: "#F7F4EC",
        backgroundSize: "120px 120px, auto, auto, auto",
        backgroundBlendMode: "overlay, normal, normal, normal",
      }}
    >
      {children}
    </div>
  );
}
