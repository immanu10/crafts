import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "../../util";
import { HeartIcon, Home, UserIcon } from "../ui/icons";
const tabs = [
  { label: "Home", value: "home", icon: Home },
  { label: "Likes", value: "like", icon: HeartIcon },
  { label: "Profile", value: "profile", icon: UserIcon },
];
export function TabMotion() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <div className="flex space-x-1 p-1.5 bg-neutral-100 rounded-full w-fit mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={cn(
            "px-3 py-2 rounded-full font-semibold text-lg relative transition cursor-pointer"
          )}
          onClick={() => setActiveTab(tab.value)}
        >
          {activeTab === tab.value && (
            <motion.div
              layoutId="tabactive"
              className="absolute inset-0 rounded-full bg-linear-to-b from-white via-white to-neutral-100 shadow-md"
              style={{
                borderRadius: 9999,
              }}
              transition={{
                type: "spring",
                bounce: 0.2,
              }}
            />
          )}
          <AnimatePresence mode="wait">
            <motion.span
              key={
                tab.value + (activeTab === tab.value ? "-active" : "-inactive")
              }
              initial={{ filter: "blur(4px)" }}
              animate={{ filter: "blur(0px)" }}
              exit={{ filter: "blur(4px)" }}
              transition={{ duration: 0.1 }}
              className={cn(
                "flex items-center gap-2 relative z-10",
                activeTab === tab.value ? "text-rose-500" : "text-neutral-400"
              )}
            >
              {<tab.icon className="w-5" />}
              {tab.label}
            </motion.span>
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
}
