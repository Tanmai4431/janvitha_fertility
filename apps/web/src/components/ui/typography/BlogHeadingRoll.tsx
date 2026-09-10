"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import client from "../../../../../../client.json";

export interface BlogHeadingRollProps {
  pillars?: string[];
}

const DEFAULT_PILLARS = [
  "IVF Treatment",
  "IUI Insemination",
  "ICSI Procedure",
  "PICSI Technology",
  "Genetic Programs",
  "Fertility Care",
];

export function BlogHeadingRoll({ pillars }: BlogHeadingRollProps) {
  const activePillars = pillars && pillars.length > 0 ? pillars : DEFAULT_PILLARS;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activePillars.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activePillars.length]);

  const currentPillar = activePillars[index] || activePillars[0];

  return (
    <div className="flex flex-col items-center justify-center text-center select-none w-full max-w-4xl mx-auto px-2 sm:px-4 overflow-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold tracking-tight text-primary leading-snug sm:leading-tight text-center max-w-full">
        <span className="block sm:inline">Clinical Insights & Guidance on </span>
        <span className="inline-flex items-center justify-center relative overflow-hidden align-middle min-h-[1.35em] max-w-full px-1 text-tertiary">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={currentPillar}
              className="inline-block font-heading font-bold text-tertiary whitespace-nowrap"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {currentPillar}
            </motion.span>
          </AnimatePresence>
        </span>
      </h2>
    </div>
  );
}

export default BlogHeadingRoll;
