import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SunIcon, TrendingDownIcon, WindIcon } from "../ui/icons";

const cards = [
  {
    type: "weather",
    component: <WeatherCard />,
  },
  {
    type: "stocks",
    component: <StockPrice />,
  },
  {
    type: "airquality",
    component: <AirQualityCard />,
  },
];

export function CarouselWidget() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    if (index < cards.length - 1) {
      setDirection(1);
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
    }
  };

  const handleDotClick = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };
  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -100 : 100,
      opacity: 0,
      filter: "blur(6px)",
    }),
  };

  return (
    <div className="w-48 h-48 mx-auto rounded-2xl border border-neutral-200 shadow-md bg-white relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(_e, { offset }) => {
            if (offset.y < -50) next();
            if (offset.y > 50) prev();
          }}
          className="absolute top-0 left-0 w-full h-full p-4"
        >
          {cards[index].component}
        </motion.div>
      </AnimatePresence>
      {/* Dots */}
      <div className="flex flex-col gap-2 absolute right-3 top-1/2 -translate-y-1/2">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => handleDotClick(i)}
            initial={false}
            animate={{
              height: index === i ? 24 : 8,
              width: 8,
              borderRadius: 8,
              backgroundColor: index === i ? "#737373" : "#e5e5e5",
            }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}

// carousel content
export function WeatherCard() {
  return (
    <div>
      <h2 className="font-medium">Bengaluru</h2>
      <div className="my-5 flex gap-2 items-center">
        <p className="text-3xl font-semibold text-neutral-600">28°C</p>
        <SunIcon className="text-yellow-400 w-8 h-8" />
      </div>
      <p className="text-neutral-500">Sunny</p>
      <p className="text-neutral-500">Oct 30</p>
    </div>
  );
}

export function StockPrice() {
  return (
    <div>
      <h2 className="font-medium">
        NIFTY 50 <span className="text-red-500 text-sm">-0.60%</span>
      </h2>
      <div className="my-5 flex gap-2 items-center">
        <p className="text-3xl font-semibold text-neutral-600">25,200</p>
        <TrendingDownIcon className="text-red-500 w-6 h-6" />
      </div>
      <p className="text-neutral-500">INDEX</p>
      <p className="text-neutral-500">4 Nov, 5pm IST</p>
    </div>
  );
}
export function AirQualityCard() {
  return (
    <div>
      <h2 className="font-medium">Air Quality</h2>
      <div className="my-5 flex gap-2 items-center">
        <p className="text-3xl font-semibold text-neutral-600">53</p>
        <div className=" rounded-full bg-green-600 p-1">
          <WindIcon className="text-white w-6 h-6" />
        </div>
      </div>
      <p className="text-neutral-500">Kundapura,</p>
      <p className="text-neutral-500">Udupi</p>
    </div>
  );
}
