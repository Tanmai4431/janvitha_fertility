"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import client from "../../../../../../client.json";

export interface BlogHeadingRollProps {
  pillars?: string[];
}

const DEFAULT_PILLARS = ((client.services || []) as any[]).map((s: any) => s.title).slice(0, 5) || [
  "IVF Treatment",
  "IUI Insemination",
  "ICSI Procedure",
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
    <div className="flex flex-col items-center justify-center text-center select-none w-full max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold tracking-tight text-primary leading-tight text-center">
        <span>Clinical Insights & Guidance on </span>
        <span className="inline-block relative overflow-hidden align-bottom h-[1.2em] px-1 text-tertiary">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={currentPillar}
              className="inline-block whitespace-nowrap font-heading font-bold text-tertiary"
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
