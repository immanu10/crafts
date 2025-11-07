import { useState, useEffect } from "react";
import { cn } from "../../util";

export default function StockProfitVisualizer() {
  const [input, setInput] = useState("7,2,3,20,4,3,2,5");
  const [prices, setPrices] = useState<number[]>([]);
  const [result, setResult] = useState<null | {
    profit: number;
    buyDay: null | number;
    sellDay: null | number;
    message: null | string;
  }>(null);

  useEffect(() => {
    const parsed = input
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v));

    if (parsed.length > 1) {
      setPrices(parsed);
      calculateProfit(parsed);
    } else {
      setPrices([]);
      setResult(null);
    }
  }, [input]);

  // Kadane’s Algorithm
  const calculateProfit = (arr: number[]) => {
    let minPrice = arr[0];
    let minIndex = 0;

    let maxProfit = 0;
    let buyDay = 0;
    let sellDay = 0;

    for (let i = 1; i < arr.length; i++) {
      let currentProfit = arr[i] - minPrice;

      if (currentProfit > maxProfit) {
        maxProfit = currentProfit;
        buyDay = minIndex;
        sellDay = i;
      }

      if (arr[i] < minPrice) {
        minPrice = arr[i];
        minIndex = i;
      }
    }

    if (maxProfit <= 0) {
      setResult({
        profit: 0,
        buyDay: null,
        sellDay: null,
        message: "No profitable trade possible",
      });
    } else {
      setResult({
        profit: maxProfit,
        buyDay,
        sellDay,
        message: null,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="">
        <label className="block text-sm font-medium mb-1 text-gray-400">
          Enter Stock Prices (comma-separated):
        </label>
        <input
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 7,1,5,3,6,4"
        />
      </div>

      <div className="my-2">
        {result ? (
          result.message ? (
            <p className="text-red-500">{result.message}</p>
          ) : (
            <p className="text-green-600">maximum profit is {result.profit}</p>
          )
        ) : (
          <p className=" text-gray-500">Enter at least 2 valid price</p>
        )}
      </div>
      {/* Bar Graph */}
      <div className=" flex gap-2 items-end h-48 border border-gray-200 p-3 rounded mb-4 overflow-x-auto">
        {prices.map((price, index) => {
          const isBuy = result && index === result.buyDay;
          const isSell = result && index === result.sellDay;
          return (
            <div key={index} className="text-center">
              {isBuy && (
                <p className="text-green-600 font-medium text-sm">BUY</p>
              )}
              {isSell && (
                <p className="text-red-600 font-medium text-sm">SELL</p>
              )}
              <div
                className={`w-8 mx-auto rounded-t transition-all duration-300 ${
                  isBuy ? "bg-green-500" : isSell ? "bg-red-500" : "bg-gray-300"
                }`}
                style={{ height: `${price * 3}px` }}
              ></div>
              <p
                className={cn(
                  "text-sm mt-1",
                  (isBuy || isSell) && "text-blue-500 font-bold"
                )}
              >
                {price}
              </p>
              <p className="text-[10px] text-gray-500">Day {index}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
