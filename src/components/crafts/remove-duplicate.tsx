import { useEffect, useRef, useState } from "react";
import { cn } from "../../util";

export default function RemoveDuplicatesVisual() {
  const [rawInput, setRawInput] = useState("1,1,1,2,4");
  const [arr, setArr] = useState<number[]>([]);
  const [i, setI] = useState<number | null>(null);
  const [j, setJ] = useState<number | null>(null);
  const [result, setResult] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Parse input -> sorted numeric array (ignore NaN)
  const parseInput = (str: string) =>
    str
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);

  // Initialize display array from input
  useEffect(() => {
    setArr(parseInput(rawInput));
    // cleanup
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [rawInput]);

  const resetVisualization = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setArr(parseInput(rawInput));
    setI(null);
    setJ(null);
    setResult([]);
    setIsRunning(false);
    setHasFinished(false);
  };

  const startAnimation = () => {
    if (isRunning) return;

    // Always start from a fresh copy from rawInput
    const temp = parseInput(rawInput);
    if (temp.length === 0) {
      resetVisualization();
      return;
    }

    setArr([...temp]); // show initial state
    setResult([]);
    setI(0);
    setJ(temp.length > 1 ? 1 : null);
    setIsRunning(true);
    setHasFinished(false);

    let slow = 0;
    let step = 1;

    timerRef.current = window.setInterval(() => {
      // Finished scanning
      if (step >= temp.length) {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsRunning(false);
        setHasFinished(true);
        setI(slow); // final i
        setJ(null); // j is past end
        setArr([...temp]);
        setResult(temp.slice(0, slow + 1));
        return;
      }

      setJ(step);

      if (temp[slow] !== temp[step]) {
        slow++;
        temp[slow] = temp[step]; // overwrite duplicate with next unique
        setI(slow);
        setArr([...temp]); // reflect overwrite in UI
      }

      step++;
    }, 700);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={rawInput}
          onChange={(e) => !isRunning && setRawInput(e.target.value)}
          placeholder="Enter numbers - (eg., 1,2,3,3,4)"
          className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
        <div className="flex gap-2">
          <button
            onClick={startAnimation}
            disabled={isRunning || parseInput(rawInput).length === 0}
            className="flex-1 p-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
          >
            {isRunning
              ? "Running..."
              : hasFinished
              ? "Run Again"
              : "Start Animation"}
          </button>
          <button
            onClick={resetVisualization}
            disabled={isRunning}
            className="flex-1 p-2 rounded bg-gray-100 border border-gray-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Array Display */}
      <div className="flex gap-3 mt-10 justify-center flex-wrap">
        {arr.map((num, idx) => (
          <div
            key={idx}
            className={cn(
              "relative min-w-12 h-12 border-2 flex items-center justify-center rounded-md text-lg font-bold transition-all",
              idx === i
                ? "bg-green-300 border-green-400"
                : idx === j
                ? "bg-yellow-300 border-yellow-400"
                : "bg-gray-100 border-gray-300"
            )}
          >
            {num}
            {idx === i && (
              <span className="absolute -top-7 text-md text-green-700 font-bold">
                i
              </span>
            )}
            {idx === j && (
              <span className="absolute -bottom-7 text-md text-yellow-700 font-bold">
                j
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Result */}
      {hasFinished && (
        <p className="mt-6  text-center tracking-widest">
          Result: [
          <span className="text-green-700 font-semibold text-lg">
            {result.join(", ")}
          </span>
          ]
        </p>
      )}
    </div>
  );
}
