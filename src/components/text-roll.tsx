"use client";

import { motion } from "motion/react";

export function TextRoll({
  children,
  duration = 0.3,
  getEnterDelay = (i) => i * 0.05,
  className,
  transition = { ease: "easeInOut" },
  onAnimationComplete,
}: {
  children: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  className?: string;
  transition?: any;
  onAnimationComplete?: () => void;
}) {
  const letters = children.split("");

  const variants = {
    hidden: { y: -30, filter: "blur(6px)" },
    visible: { y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.09 }}
      onAnimationComplete={onAnimationComplete}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={variants}
          transition={{
            duration,
            delay: getEnterDelay(i),
            ease: "easeOut",
            ...transition,
          }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
