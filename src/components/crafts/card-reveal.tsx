import { useState } from "react";
import { EyClosed, EyOpen } from "../ui/icons";
import { TextRoll } from "../text-roll";
import { motion } from "motion/react";
import { cn } from "../../util";

export function CardReveal() {
  const [show, setShow] = useState(false);
  return (
    <div className="p-2 border-2 border-slate-300 rounded-2xl flex items-center gap-4 max-w-sm w-fit mx-auto">
      <div
        className={cn(
          "font-medium text-lg tracking-widest flex gap-2",
          show && "shimmer-bg"
        )}
      >
        <span className="w-12">4958</span>
        <TextRoll
          className="w-12 overflow-clip"
          key={show ? "show1" : "hide1"}
          getEnterDelay={(i) => i * 0.05}
          getExitDelay={(i) => i * 0.05 + 0.1}
          transition={{
            ease: "easeOut",
          }}
        >
          {show ? "3934" : "xxxx"}
        </TextRoll>
        <TextRoll
          className="w-12 overflow-clip"
          key={show ? "show2" : "hide2"}
          getEnterDelay={(i) => i * 0.05}
          getExitDelay={(i) => i * 0.05 + 0.1}
          transition={{
            ease: "easeOut",
          }}
        >
          {show ? "5783" : "xxxx"}
        </TextRoll>
        <span className="w-12">7689</span>
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
