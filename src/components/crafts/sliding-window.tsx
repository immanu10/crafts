import { useState } from "react";
import { cn } from "../../util";

export default function SlidingWindowVisualizer() {
  const [arr] = useState([2, 1, 5, 1, 3, 2, 6, 1]);
  const [k, setK] = useState(3);
  const [start, setStart] = useState(0);
  const [maxSum, setMaxSum] = useState<null | number>(null);
  const [currentSum, setCurrentSum] = useState<null | number>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [equation, setEquation] = useState("");

  function handleNext() {
    setIsRunning(true);

    if (start === 0 && currentSum === null) {
      // First window calculation
      let sum = 0;
      for (let i = 0; i < k; i++) sum += arr[i];
      setCurrentSum(sum);
      setMaxSum(sum);
      setEquation(`Initial Sum = ${arr.slice(0, k).join(" + ")} = ${sum}`);
    } else {
      if (start + k > arr.length - 1) return;
      if (currentSum === null) return;
      if (maxSum == null) return;

      const prevItem = arr[start];
      const nextItem = arr[start + k];
      const newSum = currentSum + nextItem - prevItem;

      setEquation(
        `currentSum (${currentSum}) + next (${nextItem}) - prev (${prevItem}) = ${newSum}`
      );

      setCurrentSum(newSum);
      setMaxSum(Math.max(maxSum, newSum));
      setStart(start + 1);
    }
  }

  function handleReset() {
    setStart(0);
    setCurrentSum(null);
    setMaxSum(null);
    setIsRunning(false);
    setEquation("");
  }

  const showReset = isRunning && start + k >= arr.length;
  return (
    <div className="max-w-xl mx-auto ">
      {/* Array Display */}
      <div className="flex gap-2 mb-4 justify-center flex-wrap">
        {arr.map((num, idx) => {
          const inWindow = idx >= start && idx < start + k;
          return (
            <div
              key={idx}
              className={cn(
                "min-w-8 h-8 flex justify-center items-center rounded-md text-lg font-medium transition-all bg-gray-200",
                inWindow && "bg-green-400 text-white"
              )}
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-4 items-center">
        <input
          type="number"
          value={k}
          max={arr.length}
          min={1}
          disabled={isRunning}
          onChange={(e) => {
            if (Number(e.target.value) > arr.length) return;
            setK(Number(e.target.value));
          }}
          className={cn(
            "flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:bg-gray-100"
          )}
        />
        <button
          onClick={showReset ? handleReset : handleNext}
          className={cn(
            "flex-1 bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400",
            showReset && "bg-gray-400"
          )}
        >
          {showReset ? "Reset" : "Next"}
        </button>
      </div>

      {/* Equation Display */}
      {equation && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4 rounded">
          <p className="font-mono text-sm">{equation}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-100 p-2 rounded-lg">
          <p className="text-2xl font-semibold">
            {currentSum !== null ? currentSum : "-"}
          </p>
          <p className="text-sm">Current Window Sum</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg">
          <p className="text-2xl font-semibold">
            {maxSum !== null ? maxSum : "-"}
          </p>
          <p className="text-sm">Max Sum So Far</p>
        </div>
      </div>
    </div>
  );
}
