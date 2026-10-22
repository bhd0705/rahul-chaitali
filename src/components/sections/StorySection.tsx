import { useState } from "react";
import type { WeddingConfig } from "../../types";
import { BackgroundPair } from "../Decorations";
import { Reveal } from "../Reveal";

export function StorySection({ config }: { config: WeddingConfig }) {
  const { story } = config;
  const [index, setIndex] = useState(0);
  const photos = story.photos;

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  return (
    <section className="relative isolate min-h-screen overflow-hidden px-6 py-16 bg-[var(--paper)]">
      <BackgroundPair mobile={story.images.mobile} desktop={story.images.desktop} className="object-fill md:object-center" />

      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal variant="down">
          <h2 className="font-display text-3xl md:text-5xl text-[var(--primary)] font-medium tracking-[0.15em] uppercase">{story.title}</h2>
          <p className="mt-3 font-display italic text-sm md:text-base text-[var(--muted-foreground)]">{story.subtitle}</p>
        </Reveal>

        <Reveal variant="scale" delayMs={200} className="mt-8 flex items-center justify-center gap-2 md:gap-6">
          <button type="button" aria-label="Previous photo" onClick={prev} className="shrink-0 h-9 w-9 rounded-full bg-white/80 border border-[var(--gold-soft)] shadow-sm">
            ‹
          </button>
          <div className="relative w-[85%] max-w-sm animate-float-slow">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--paper)] rotate-[-1.5deg] drop-shadow-xl">
              {photos.map((p, i) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ${i === index ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-1.5">
              {photos.map((_, i) => (
                <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-[var(--primary)]" : "bg-[var(--gold-soft)]"}`} />
              ))}
            </div>
          </div>
          <button type="button" aria-label="Next photo" onClick={next} className="shrink-0 h-9 w-9 rounded-full bg-white/80 border border-[var(--gold-soft)] shadow-sm">
            ›
          </button>
        </Reveal>

        <Reveal delayMs={400} className="deckled mx-auto max-w-[280px] p-4 mt-10 border border-[var(--gold)]/20 rotate-[0.5deg]">
          <p className="font-script text-[var(--gold)] text-sm italic">"{story.quote}"</p>
        </Reveal>
      </div>
    </section>
  );
}
