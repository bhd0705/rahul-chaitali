import type { CSSProperties } from "react";
import type { WeddingConfig } from "../types";

function Bird({ flap }: { flap: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      className="w-10 h-10 text-[var(--gold)]/60 drop-shadow-sm"
      style={{ "--flap-duration": flap } as React.CSSProperties}
    >
      <path
        d="M 30 28 C 23 15, 16 5, 9 1 C 15 7, 23 19, 30 28 Z"
        className="animate-flap-back opacity-70"
      />
      <path
        d="M 6 32 C 14 32, 28 33, 38 31 C 46 29.5, 54 26, 58 27 C 52 30, 44 36, 38 36 C 26 36, 14 34, 6 32 Z"
        className="opacity-95"
      />
      <path
        d="M 32 30 C 24 16, 16 6, 8 2 C 15 8, 24 20, 32 30 Z"
        className="animate-flap-front"
      />
    </svg>
  );
}

const birds = [
  { cls: "animate-fly-lr", top: "12%", left: true, dur: "8s", delay: "0s", scale: 0.85, y0: 0, y1: -60, flap: "0.25s" },
  { cls: "animate-fly-rl", top: "25%", left: false, dur: "10s", delay: "1.5s", scale: 0.75, y0: 20, y1: -30, flap: "0.32s" },
  { cls: "animate-fly-lr", top: "42%", left: true, dur: "9s", delay: "3.5s", scale: 0.95, y0: -40, y1: 50, flap: "0.22s" },
  { cls: "animate-fly-rl", top: "60%", left: false, dur: "11s", delay: "5.5s", scale: 0.7, y0: 50, y1: -20, flap: "0.37s" },
  { cls: "animate-fly-lr", top: "78%", left: true, dur: "12s", delay: "7.5s", scale: 0.8, y0: -10, y1: 40, flap: "0.27s" },
];

export function Birds({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {birds.map((b, i) => (
        <div
          key={i}
          className={b.cls}
          style={{
            top: b.top,
            left: b.left ? "-64px" : "auto",
            right: b.left ? "auto" : "-64px",
            position: "absolute",
            "--fly-duration": b.dur,
            "--fly-delay": b.delay,
            "--bird-scale": b.scale,
            "--fly-y-start": `${b.y0}px`,
            "--fly-y-end": `${b.y1}px`,
          } as CSSProperties}
        >
          <Bird flap={b.flap} />
        </div>
      ))}
    </div>
  );
}

const petalPositions = [3, 8, 15, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80, 85, 91, 96, 6, 18, 29, 45, 60, 78, 93];

export function Petals({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {petalPositions.map((left, i) => (
        <div
          key={i}
          className="animate-petal absolute"
          style={{
            left: `${left}%`,
            top: "-50px",
            "--petal-duration": `${12 + (i % 13)}s`,
            "--petal-delay": `${-(i % 16)}s`,
            "--petal-scale": `${0.45 + (i % 4) * 0.1}`,
            "--petal-opacity": `${0.4 + (i % 3) * 0.08}`,
            "--petal-drift": `${50 + (i % 12) * 10}px`,
          } as CSSProperties}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${i % 2 ? "text-[var(--secondary)] w-5 h-5" : "text-[var(--primary)]"}`}>
            <path d={i % 2 ? "M12,2 C17,6 19,13 12,22 C5,13 7,6 12,2 Z" : "M12,2 C18,4 20,10 16,16 C12,21 7,20 6,14 C5,8 8,4 12,2 Z"} />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function GoldDivider({ width = "w-36 md:w-56" }: { width?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${width} my-1 md:my-3 opacity-80`}>
      <span className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-[var(--gold)]" />
      <span className="text-[var(--gold)] text-[10px] md:text-xs">♥</span>
      <span className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-[var(--gold)]" />
    </div>
  );
}

export function BirdDivider() {
  return (
    <svg viewBox="0 0 200 32" fill="currentColor" className="w-32 md:w-40 text-[var(--gold)]">
      <path d="M 100,22 C 96,17.5 93.5,14.5 93.5,11.5 C 93.5,8.8 95.8,6.8 98.5,6.8 C 99.8,6.8 100,7.8 100,7.8 C 100,7.8 100.2,6.8 101.5,6.8 C 104.2,6.8 106.5,8.8 106.5,11.5 C 106.5,14.5 104,17.5 100,22 Z" />
      <path d="M 90,16 L 25,16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M 110,16 L 175,16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function BackgroundPair({
  mobile,
  desktop,
  className = "",
}: {
  mobile: string;
  desktop: string;
  className?: string;
}) {
  return (
    <>
      <img src={mobile} alt="" className={`absolute inset-0 -z-10 h-full w-full object-cover md:hidden select-none pointer-events-none ${className}`} />
      <img src={desktop} alt="" className={`absolute inset-0 -z-10 h-full w-full object-cover hidden md:block select-none pointer-events-none ${className}`} />
    </>
  );
}

export type EffectsProps = Pick<WeddingConfig["effects"], "birds" | "petals">;
