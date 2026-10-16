import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type Variant = "up" | "down" | "left" | "right" | "scale";

const hidden: Record<Variant, string> = {
  up: "opacity-0 translate-y-10",
  down: "opacity-0 -translate-y-10",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  scale: "opacity-0 scale-95",
};

export function Reveal({
  children,
  variant = "up",
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delayMs?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all ease-out duration-1000 ${visible ? "reveal-visible" : hidden[variant]} ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
