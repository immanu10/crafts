import { useState } from "react";
import { cn } from "../../util";

export default function AnimatedPalindromeChecker() {
  const [text, setText] = useState("RACECAR");
  const [left, setLeft] = useState<null | number>(null);
  const [right, setRight] = useState<null | number>(null);
  const [isPalindrome, setIsPalindrome] = useState<null | boolean>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Main alogorithm
  const startAnimation = () => {
    if (!text) return;
    setIsAnimating(true);
    let l = 0;
    let r = text.length - 1;

    const interval = setInterval(() => {
      setLeft(l);
      setRight(r);

      if (text[l] !== text[r]) {
        setIsPalindrome(false);
        setIsAnimating(false);
        clearInterval(interval);
      }

      if (l >= r) {
        setIsPalindrome(true);
        setIsAnimating(false);
        clearInterval(interval);
      }

      l++;
      r--;
    }, 600);
  };

  const reset = () => {
    setLeft(null);
    setRight(null);
    setIsPalindrome(null);
    setIsAnimating(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            reset();
          }}
          placeholder="Type something..."
          className={cn(
            "flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-slate-200",
            isAnimating && "bg-gray-100"
          )}
          disabled={isAnimating}
        />

        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className=" bg-purple-400 text-white px-2 py-1 font-semibold rounded hover:bg-purple-500 disabled:bg-gray-400"
        >
          {isAnimating ? "Checking..." : "Check"}
        </button>
      </div>
      {/* Result */}
      {isPalindrome !== null && !isAnimating && (
        <p className={cn(isPalindrome ? "text-green-600" : "text-red-600")}>
          {isPalindrome ? "a palindrome" : "not a palindrome"}
        </p>
      )}

      {/* Display characters with pointer highlight */}
      <div className="flex justify-center gap-2 mt-6 text-lg font-mono flex-wrap">
        {text.split("").map((char, index) => {
          return (
            <>
              <div className="flex flex-col items-center" key={index}>
                <span
                  className={cn(
                    "px-2",
                    index === left && "bg-green-300  rounded",
                    index === right && " bg-red-300  rounded"
                  )}
                >
                  {char}
                </span>
                {/* Pointer Indicator Below Character */}
                {index === left && index === right ? (
                  <span className="font-bold">
                    <span className="text-green-600">L</span>
                    <span className="text-red-600">R</span>
                  </span>
                ) : index === left ? (
                  <span className="text-green-600 font-bold">L</span>
                ) : index === right ? (
                  <span className="text-red-600 font-bold">R</span>
                ) : (
                  <span className="h-4"></span>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
