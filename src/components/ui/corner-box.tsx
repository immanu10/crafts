import type { ReactNode } from "react";

interface CornerBoxProps {
  children: ReactNode;
  className?: string;
  borderColor?: string; // tailwind border color class, e.g. "border-black"
  size?: number; // corner size in px
}

export default function CornerBox({
  children,
  className = "",
  borderColor = "border-black",
  size = 8,
}: CornerBoxProps) {
  const cornerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className={`relative border border-neutral-200 p-4 ${className}`}>
      {/* top-left */}
      <div
        className={`absolute -top-px -left-px border-t border-l ${borderColor}`}
        style={cornerStyle}
      ></div>

      {/* top-right */}
      <div
        className={`absolute -top-px -right-px border-t border-r ${borderColor}`}
        style={cornerStyle}
      ></div>

      {/* bottom-left */}
      <div
        className={`absolute -bottom-px -left-px border-b border-l ${borderColor}`}
        style={cornerStyle}
      ></div>

      {/* bottom-right */}
      <div
        className={`absolute -bottom-px -right-px border-b border-r ${borderColor}`}
        style={cornerStyle}
      ></div>

      {children}
    </div>
  );
}
