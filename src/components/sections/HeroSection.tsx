import { useEffect, useState } from "react";
import type { WeddingConfig } from "../../types";
import { BackgroundPair, GoldDivider } from "../Decorations";
import { Reveal } from "../Reveal";
import { ScratchCard } from "../ScratchCard";

function useCountdown(iso: string) {
  const [parts, setParts] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(iso).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setParts({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);

  return parts;
}

export function HeroSection({ config }: { config: WeddingConfig }) {
  const { couple, hero } = config;
  const countdown = useCountdown(hero.countdownIso);
  const [showCountdown, setShowCountdown] = useState(!hero.scratchRevealEnabled);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative flex flex-col items-center justify-between min-h-screen py-2 px-4 text-center select-none overflow-hidden isolate">
      <BackgroundPair mobile={hero.images.mobile} desktop={hero.images.desktop} className="object-top md:object-center" />

      <Reveal variant="down" delayMs={200} className="flex-none pt-4 md:pt-6">
        <div className="scale-100 md:scale-125 animate-float">
          <img src={couple.monogramImage} alt={couple.monogramAlt} className="h-28 w-28 object-contain" />
        </div>
      </Reveal>

      <div className="flex-1 flex flex-col items-center justify-start md:justify-center py-1 md:py-12 w-full max-w-md md:max-w-2xl">
        <Reveal delayMs={400}>
          <h1 className="font-script leading-[1.2] flex items-center justify-center gap-x-4 gap-y-2 flex-wrap px-4">
            <span className="text-[var(--foreground)] text-4xl sm:text-5xl md:text-7xl tracking-wide">{couple.partner1Name}</span>
            <span className="text-[var(--gold)] text-2xl sm:text-3xl md:text-5xl font-light italic lowercase px-1">{couple.wedsText}</span>
            <span className="text-[var(--foreground)] text-4xl sm:text-5xl md:text-7xl tracking-wide">{couple.partner2Name}</span>
          </h1>
        </Reveal>

        <Reveal delayMs={600} className="flex flex-col items-center">
          <GoldDivider />
          <p className="font-caps tracking-[0.25em] text-[var(--foreground)] text-xs sm:text-sm md:text-base font-semibold">{hero.tagline}</p>
          <GoldDivider />
        </Reveal>

        <div className="relative w-full max-w-[280px] sm:max-w-[310px] md:max-w-[420px] mx-auto my-1">
          <ScratchCard enabled={hero.scratchRevealEnabled} onReveal={() => setShowCountdown(true)}>
            <div className="flex flex-col items-center justify-center select-none py-1 md:py-3">
              <p className="font-caps text-[0.5rem] md:text-[0.65rem] tracking-[0.25em] text-[var(--gold)] mb-1">{hero.saveTheDateLabel}</p>
              <div className="font-script text-2xl sm:text-3xl md:text-4xl text-[var(--foreground)] leading-none my-1 md:my-2">{hero.dateDisplay}</div>
              <p className="font-caps text-[0.45rem] md:text-[0.55rem] tracking-[0.2em] text-[var(--muted-foreground)]">{hero.location}</p>
            </div>
          </ScratchCard>
        </div>

        <div
          className={`w-full transition-all duration-1000 transform ${showCountdown ? "opacity-100 max-h-[500px] mt-2" : "opacity-0 max-h-0 overflow-hidden pointer-events-none"}`}
        >
          <div className="flex items-center justify-center gap-3 text-[var(--foreground)] text-[0.65rem] sm:text-xs md:text-sm font-caps tracking-[0.25em] mb-2 md:mb-4">
            <span>⤙</span>
            <span>{hero.countdownTitle}</span>
            <span>⤚</span>
          </div>
          <div className="flex items-center justify-center gap-4 py-3 px-1 md:py-5 md:px-6 border border-[var(--gold)]/40 bg-[var(--paper)]/85 backdrop-blur-md rounded-xl md:rounded-2xl max-w-[520px] mx-auto">
            {(
              [
                { k: "d" as const, label: "DAYS" },
                { k: "h" as const, label: "HRS" },
                { k: "m" as const, label: "MINS" },
                { k: "s" as const, label: "SECS" },
              ] as const
            ).map((item, i) => (
              <div key={item.k} className="contents">
                {i > 0 && <span className="h-8 md:h-12 w-[0.5px] bg-[var(--foreground)]/25" />}
                <div className="flex-1 flex flex-col items-center">
                  <span className="font-display text-[var(--foreground)] text-2xl sm:text-3xl md:text-5xl font-semibold tabular-nums">{pad(countdown[item.k])}</span>
                  <span className="font-caps text-[0.45rem] md:text-[0.65rem] tracking-widest text-[var(--muted-foreground)] mt-2">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="font-script text-[var(--foreground)] text-xl sm:text-2xl md:text-3xl mt-3 md:mt-4 flex items-center justify-center gap-2">
            <span className="text-xs md:text-sm">❦</span>
            <span>{hero.countdownFooter}</span>
            <span className="text-xs md:text-sm">❦</span>
          </p>
        </div>
      </div>

      <Reveal delayMs={1000} className="flex-none flex flex-col items-center w-full max-w-sm md:max-w-md pb-2 md:pb-16">
        <GoldDivider width="w-44 md:w-60" />
        <p className="mt-2.5 md:my-4 font-display text-sm sm:text-base md:text-lg tracking-wide max-w-[360px]">{hero.thankYouMessage}</p>
        <GoldDivider width="w-44 md:w-60" />
      </Reveal>
    </section>
  );
}
