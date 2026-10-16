import { useEffect, useRef, useState } from "react";

export function ScratchCard({
  enabled,
  onReveal,
  children,
}: {
  enabled: boolean;
  onReveal: () => void;
  children: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(!enabled);
  const drawing = useRef(false);

  useEffect(() => {
    if (!enabled || revealed) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "rgba(201, 157, 78, 0.85)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "destination-out";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [enabled, revealed]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || revealed) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) transparent++;
    }
    if (transparent / (data.length / 16) > 0.35) {
      setRevealed(true);
      onReveal();
    }
  };

  const pointer = (e: React.PointerEvent) => {
    if (revealed || !enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full aspect-[5/2] rounded-xl overflow-hidden border border-[var(--gold)]/30 shadow-md">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-md p-4 text-center">
        {children}
      </div>
      {!revealed && enabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-grab touch-none"
          onPointerDown={(e) => {
            drawing.current = true;
            pointer(e);
          }}
          onPointerMove={(e) => drawing.current && pointer(e)}
          onPointerUp={() => {
            drawing.current = false;
          }}
          onPointerLeave={() => {
            drawing.current = false;
          }}
        />
      )}
    </div>
  );
}
