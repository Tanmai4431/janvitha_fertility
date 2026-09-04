"use client";

import React, { type ElementType, type ComponentPropsWithoutRef } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface TimelineContentProps<T extends ElementType = "div"> {
  as?: T;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLDivElement | HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children?: React.ReactNode;
}

export function TimelineContent<T extends ElementType = "div">({
  as,
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TimelineContentProps<T>>) {
  const Component = (as ? motion[as as keyof typeof motion] : motion.div) as any;

  const defaultVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: Math.min(i * 0.02, 0.12),
        duration: 0.3,
        ease: "easeOut" as const,
      },
    }),
    hidden: {
      filter: "blur(4px)",
      y: 10,
      opacity: 0,
    },
  };

  const variantsToUse = customVariants || defaultVariants;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.01, margin: "150px 0px" }}
      custom={animationNum}
      variants={variantsToUse}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}
