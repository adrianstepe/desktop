import type { ReactNode } from "react";
import { Shuffle } from "@solar-icons/react";
import type { ShuffleMode } from "../store/playerStore";
import { cn } from "@/shared/lib";

export interface ShuffleIconProps {
  mode: ShuffleMode;
  size?: number;
  className?: string;
  icon?: ReactNode;
}

export function SparkleStar({
  size = 10,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <path d="M8 0C8 4.418 4.418 8 0 8C4.418 8 8 11.582 8 16C8 11.582 11.582 8 16 8C11.582 8 8 4.418 8 0Z" />
    </svg>
  );
}

export function ShuffleIcon({
  mode,
  size = 18,
  className,
  icon,
}: ShuffleIconProps) {
  const sparkleSize = Math.max(7, Math.round(size * 0.45));
  const offset = -Math.round(sparkleSize * 0.4);

  return (
    <span
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
      data-shuffle-mode={mode}
    >
      {icon ?? <Shuffle size={size} weight="Outline" />}
      {mode === "smart" && (
        <span
          className="absolute flex pointer-events-none"
          style={{ top: offset, left: offset }}
        >
          <SparkleStar size={sparkleSize} />
        </span>
      )}
    </span>
  );
}

export default ShuffleIcon;
