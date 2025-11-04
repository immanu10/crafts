"use client";
import { useState } from "react";
import { motion } from "motion/react";
import {
  CloseIcon,
  GithubIcon,
  LinkedinIcon,
  ShareIcon,
  XIcon,
} from "../ui/icons";

export function FabShare() {
  const [expanded, setExpanded] = useState(false);

  const socialButtons = [
    { icon: GithubIcon, name: "github" },
    { icon: LinkedinIcon, name: "linkedin" },
    { icon: XIcon, name: "x" },
  ];

  return (
    <motion.div
      initial={false}
      className="mx-auto flex items-center rounded-full shadow-lg overflow-hidden cursor-pointer bg-white"
      animate={{ width: expanded ? "fit-content" : "3.5rem" }}
    >
      <div
        className="relative w-14 h-14 rounded-full flex items-center justify-center shrink-0"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Share Icon */}
        <motion.div
          initial={false}
          animate={{ rotate: expanded ? 90 : 0, opacity: expanded ? 0 : 1 }}
          className="absolute"
        >
          <ShareIcon className="w-6 h-6" />
        </motion.div>
        {/* Close Icon */}
        <motion.div
          initial={false}
          animate={{ rotate: expanded ? 0 : -90, opacity: expanded ? 1 : 0 }}
          className="absolute"
        >
          <CloseIcon className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Social Icons */}
      {expanded && (
        <motion.div
          className="flex items-center pr-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {socialButtons.map((btn) => (
            <motion.button
              key={btn.name}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 hover:bg-neutral-100 rounded-full"
            >
              <btn.icon className="w-5 h-5" />
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
