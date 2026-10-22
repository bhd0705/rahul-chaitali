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

      const background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      background.addColorStop(0, "#1d3b63");
      background.addColorStop(0.55, "#2d5b8b");
      background.addColorStop(1, "#3974a6");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(226, 190, 112, 0.72)";
      const confetti = [
        [0.08, 0.23, 1.4], [0.13, 0.7, 1], [0.2, 0.13, 1.3], [0.27, 0.82, 1.1],
        [0.36, 0.17, 0.8], [0.64, 0.79, 1], [0.73, 0.17, 1.1], [0.83, 0.77, 1.4],
        [0.9, 0.23, 1], [0.94, 0.63, 1.2], [0.57, 0.12, 0.8], [0.43, 0.86, 0.9],
      ];
      for (const [x, y, radius] of confetti) {
        ctx.beginPath();
        ctx.arc(canvas.width * x, canvas.height * y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const centerX = canvas.width / 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#e8c477";
      ctx.font = "16px Georgia, serif";
      ctx.fillText("✦", centerX - 80, canvas.height * 0.43);
      ctx.fillText("✦", centerX + 80, canvas.height * 0.43);
      ctx.font = "500 14px 'Cormorant SC', Georgia, serif";
      ctx.fillText("SCRATCH TO REVEAL", centerX, canvas.height * 0.43);
      ctx.font = "italic 13px 'Cormorant Garamond', Georgia, serif";
      ctx.fillStyle = "rgba(239, 226, 202, 0.9)";
      ctx.fillText("our special day", centerX, canvas.height * 0.61);

      ctx.strokeStyle = "rgba(226, 190, 112, 0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.08, canvas.height * 0.84);
      ctx.quadraticCurveTo(canvas.width * 0.17, canvas.height * 0.91, canvas.width * 0.2, canvas.height * 0.96);
      ctx.stroke();
      ctx.fillStyle = "rgba(226, 190, 112, 0.6)";
      ctx.beginPath();
      ctx.ellipse(canvas.width * 0.12, canvas.height * 0.87, 8, 2.5, -0.5, 0, Math.PI * 2);
      ctx.fill();

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
