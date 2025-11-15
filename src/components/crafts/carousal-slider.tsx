import { useRef, useState } from "react";
import { cn } from "../../util";
import { motion } from "motion/react";
import { ChevronIcon } from "../ui/icons";

const slides = [
  {
    id: 0,
    url: "sachin",
  },
  {
    id: 1,
    url: "sehwag",
  },
  {
    id: 2,
    url: "gambhir",
  },
  {
    id: 3,
    url: "kohli",
  },
  {
    id: 4,
    url: "yuvraj",
  },
  {
    id: 6,
    url: "raina",
  },
  {
    id: 5,
    url: "dhoni",
  },
  {
    id: 7,
    url: "harbhajan",
  },
  {
    id: 8,
    url: "zaheer",
  },
  {
    id: 9,
    url: "patel",
  },
  {
    id: 10,
    url: "sreesanth",
  },
];
export function CarousalSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: i * 144,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    if (index < slides.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };
  const prevSlide = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const snapIndex = Math.round(scrollLeft / 144);
    if (snapIndex != index) {
      setIndex(snapIndex);
    }
  };

  return (
    <div className="relative bg-linear-to-r from-orange-400/50 via-white to-green-500/50 mask-x-from-90%">
      <button
        className={cn("absolute left-0 inset-y-0 w-8 cursor-pointer z-10")}
        onClick={prevSlide}
      >
        <ChevronIcon className={cn("text-black")} />
      </button>
      <div
        ref={containerRef}
        onScroll={() => {
          handleScroll();
        }}
        className="w-full flex items-center scroll-smooth overflow-x-scroll px-[calc(50%-72px)] no-scrollbar"
      >
        {slides.map((item, i) => {
          const isActive = i === index;
          return (
            <motion.div
              key={item.id}
              animate={{
                scale: isActive ? 1.2 : 1,
                filter: isActive ? "blur(0px)" : "blur(1px)",
                opacity: isActive ? 1 : 0.8,
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.3,
              }}
              className="shrink-0 w-36 h-36 relative"
            >
              <img
                src={`/crafts/assets/${item.url}-removebg-preview.png`}
                alt=""
                className="w-full h-full object-fill select-none pointer-events-none"
              />
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 uppercase z-10 text-white font-bold text-xl select-none"
                style={{
                  textShadow:
                    "0px 2px 3px rgba(0,0,0,0.6), 0px 4px 6px rgba(0,0,0,0.4)",
                }}
              >
                {item.url}
              </motion.h1>
            </motion.div>
          );
        })}
      </div>
      <button
        className={cn("absolute right-0 inset-y-0 w-8 cursor-pointer z-10 ")}
        onClick={nextSlide}
      >
        <ChevronIcon className={cn("text-black rotate-180")} />
      </button>
    </div>
  );
}
