import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const cards = [
  { value: "2.7Cr", change: "12% ↑", label: "Stocks" },
  { value: "1.2Cr", change: "5% ↓", label: "Bonds" },
  { value: "3.3Cr", change: "8% ↑", label: "Crypto" },
];

export default function StocksCarousel() {
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
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="w-48 h-48 mx-auto rounded-2xl border border-neutral-200 shadow-md bg-white flex flex-col justify-between p-4 relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_e, { offset }) => {
            if (offset.x < -50) next();
            if (offset.x > 50) prev();
          }}
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-4"
        >
          <div className="text-3xl font-semibold">{cards[index].value}</div>
          <div className="text-sm text-gray-500">{cards[index].change}</div>
          <div className="text-lg font-medium">{cards[index].label}</div>
        </motion.div>
      </AnimatePresence>
      {/* Dots */}
      <div className="flex gap-2 mt-4 absolute bottom-4 right-4">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => handleDotClick(i)}
            initial={false}
            animate={{
              width: index === i ? 16 : 6,
              height: 6,
              borderRadius: 8,
              backgroundColor: index === i ? "#555" : "#ccc",
            }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}

function WeatherCard() {
  return (
    <div>
      <h2>Bengaluru</h2>
      <p>28°C, Sunny</p>
    </div>
  );
}

function StockPrice({
  title,
  price,
  change,
}: {
  title: string;
  price: string;
  change: string;
}) {
  return (
    <div>
      <h3>{title}</h3>
      <p>
        {price} ({change})
      </p>
    </div>
  );
}
