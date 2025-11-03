"use client";
import { motion } from "motion/react";
import {
  CloseIcon,
  GithubIcon,
  LinkedinIcon,
  ShareIcon,
  XIcon,
} from "../icons";

export function FabShare() {
  const socialButtons = [
    {
      icon: GithubIcon,
      name: "github",
    },
    {
      icon: LinkedinIcon,
      name: "linkedin",
    },
    {
      icon: XIcon,
      name: "linkedin",
    },
  ];

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { rotate: -90, scale: 0 },
  };

  const closeVariants = {
    initial: { rotate: 90, scale: 0 },
    hover: { rotate: 0, scale: 1 },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10, scale: 0.8 },
    hover: { opacity: 1, y: 0, scale: 1 },
  };

  const listVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.div
      className="group flex items-center rounded-full shadow-lg overflow-hidden cursor-pointer "
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { width: "3.5rem" }, // w-14 = fits just the main button
        hover: { width: "fit-content" }, // expand width when hovered
      }}
    >
      <div className="relative group-hover:bg-neutral-100 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
        <motion.div variants={iconVariants} className="absolute">
          <ShareIcon className="w-6 h-6" />
        </motion.div>
        <motion.div variants={closeVariants} className="absolute">
          <CloseIcon className="w-6 h-6" />
        </motion.div>
      </div>
      {/* Expandable social icons */}
      <motion.div
        className="flex items-center"
        variants={listVariants}
        transition={{ duration: 0.25 }}
      >
        {socialButtons.map((btn) => (
          <motion.button
            key={btn.name}
            variants={itemVariants}
            whileTap={{ scale: 0.9 }}
            className="p-4 hover:bg-neutral-100 rounded-full cursor-pointer"
          >
            {<btn.icon className="w-6 h-6" />}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
