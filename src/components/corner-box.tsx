import type { ReactNode } from "react";
import { cn } from "../util";

interface CornerBoxProps {
  children: ReactNode;
  className?: string;
  borderColor?: string; // tailwind border color class, e.g. "border-black"
  size?: number; // corner size in px
  showBorders?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
}

export default function CornerBox({
  children,
  className = "",
  borderColor = "border-black",
  size = 8,
  showBorders = { top: true, right: true, bottom: true, left: true },
}: CornerBoxProps) {
  const cornerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div
      className={cn(
        "relative p-4 border-neutral-200",
        showBorders.top && "border-t",
        showBorders.right && "border-r",
        showBorders.bottom && "border-b",
        showBorders.left && "border-l",
        className
      )}
    >
      {/* top-left corner */}
      <div
        className={cn(
          "absolute -top-px -left-px border-t border-l",
          borderColor
        )}
        style={cornerStyle}
      ></div>

      {/* top-right corner */}
      <div
        className={cn(
          "absolute -top-px -right-px border-t border-r",
          borderColor
        )}
        style={cornerStyle}
      ></div>

      {/* bottom-left corner */}
      <div
        className={cn(
          "absolute -bottom-px -left-px border-b border-l",
          borderColor
        )}
        style={cornerStyle}
      ></div>

      {/* bottom-right corner */}
      <div
        className={cn(
          "absolute -bottom-px -right-px border-b border-r",
          borderColor
        )}
        style={cornerStyle}
      ></div>

      {children}
    </div>
  );
}
