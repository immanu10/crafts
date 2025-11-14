import { useRef, useState } from "react";
import { cn } from "../../util";
import { motion } from "motion/react";

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
    id: 5,
    url: "dhoni",
  },
  {
    id: 6,
    url: "raina",
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
  const scrolEndTimer = useRef<ReturnType<typeof setTimeout>>(null);

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

  const handleScrollEnd = () => {
    if (scrolEndTimer.current) clearTimeout(scrolEndTimer.current);

    scrolEndTimer.current = setTimeout(() => {
      scrollToIndex(index);
    }, 100);
  };

  return (
    <div className="relative mx-auto">
      <button
        disabled={index === 0}
        className={cn(
          "absolute inset-y-1/2 left-0 w-8 h-8 bg-neutral-200 text-neutral-500 text-xl rounded-full flex justify-center items-center font-medium",
          index === 0 && "opacity-50"
        )}
        onClick={prevSlide}
      >{`<`}</button>
      <div
        ref={containerRef}
        onScroll={() => {
          handleScroll();
          handleScrollEnd();
        }}
        onMouseUp={handleScrollEnd}
        onTouchEnd={handleScrollEnd}
        className="w-full flex items-center scroll-smooth overflow-x-scroll px-[calc(50%-72px)] no-scrollbar"
      >
        {slides.map((item, i) => {
          const isActive = i === index;
          return (
            <motion.div
              key={item.id}
              animate={{
                scale: isActive ? 1 : 0.8,
                filter: isActive ? "blur(0px)" : "blur(1px)",
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.3,
              }}
              className="shrink-0 w-36 h-36 rounded-lg"
            >
              <img
                src={`/crafts/assets/${item.url}-removebg-preview.png`}
                alt=""
                className="w-full h-full object-fill select-none pointer-events-none"
              />
            </motion.div>
          );
        })}
      </div>
      <button
        disabled={index === slides.length - 1}
        className={cn(
          "absolute inset-y-1/2 right-0 w-8 h-8 bg-neutral-200 text-neutral-500 text-xl rounded-full flex justify-center items-center font-medium ",
          index === slides.length - 1 && "opacity-50"
        )}
        onClick={nextSlide}
      >{`>`}</button>
    </div>
  );
}
