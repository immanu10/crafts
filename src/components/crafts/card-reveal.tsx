import { useState } from "react";
import { EyClosed, EyOpen } from "../ui/icons";
import { TextRoll } from "../text-roll";
import { motion } from "motion/react";
import { cn } from "../../util";

export function CardReveal() {
  const [show, setShow] = useState(false);
  return (
    <div className="py-2 pl-4 pr-2 border-2 border-slate-300 rounded-2xl flex items-center justify-between max-w-sm mx-auto">
      <div className="font-semibold text-xl tracking-wider flex gap-4 items-center">
        <span>4485</span>
        <TextRoll
          className="overflow-clip w-14"
          key={show ? "show1" : "hide1"}
          getEnterDelay={(i) => i * 0.05}
          getExitDelay={(i) => i * 0.05 + 0.01}
          transition={{
            ease: [0.175, 0.885, 0.32, 1.1],
          }}
        >
          {show ? "3934" : "xxxx"}
        </TextRoll>
        <TextRoll
          className="overflow-clip w-14"
          key={show ? "show2" : "hide2"}
          getEnterDelay={(i) => i * 0.05}
          getExitDelay={(i) => i * 0.05 + 0.01}
          transition={{
            ease: [0.175, 0.885, 0.32, 1.1],
          }}
        >
          {show ? "5783" : "xxxx"}
        </TextRoll>
        <span>7689</span>
      </div>
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer transition-all bg-slate-500 text-white "
        )}
        onClick={() => setShow(!show)}
      >
        {show ? (
          <motion.div
            key="show"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <EyClosed className="w-6 h-6 " />
          </motion.div>
        ) : (
          <motion.div
            key="unshow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <EyOpen className="w-6 h-6 " />
          </motion.div>
        )}
      </div>
    </div>
  );
}
