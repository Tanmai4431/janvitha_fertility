"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CompanyTaglineRollProps {
  prefix?: string;
  words?: string[];
}

export function CompanyTaglineRoll({ prefix, words }: CompanyTaglineRollProps) {
  const defaultWords = words || ["Care,", "Compassion,", "Excellence."];
  const defaultPrefix = prefix || "with";

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % defaultWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [defaultWords.length]);

  const currentWord = defaultWords[index] || defaultWords[0];
  const letters = currentWord.split("");

  return (
    <div className="flex items-center justify-center gap-2 py-1 mx-auto text-center select-none w-full max-w-full overflow-hidden">
      <span className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-primary lowercase shrink-0 leading-none">
        {defaultPrefix}
      </span>
      <div className="relative font-heading font-bold text-xl sm:text-3xl md:text-4xl text-tertiary min-w-[120px] sm:min-w-[180px] h-[34px] sm:h-[48px] overflow-hidden inline-flex items-center justify-start text-left">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentWord}
            className="inline-flex items-center"
            initial={{ opacity: 0, y: 35, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -35, rotateX: 90 }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={`${currentWord}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CompanyTaglineRoll;
