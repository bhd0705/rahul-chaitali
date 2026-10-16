import type { WeddingConfig } from "../../types";
import { BackgroundPair } from "../Decorations";
import { Reveal } from "../Reveal";

export function ScheduleSection({ config }: { config: WeddingConfig }) {
  const s = config.schedulePreWedding;
  return (
    <section id="schedule" className="relative isolate min-h-screen px-6 py-20" style={{ background: config.theme.sectionGray }}>
      <BackgroundPair mobile={s.images.mobile} desktop={s.images.desktop} />
      <div className="relative mx-auto max-w-2xl flex flex-col items-center pt-8">
        <Reveal variant="down" className="text-center mb-4">
          <h2 className="font-display text-3xl md:text-5xl text-[var(--primary)] font-medium tracking-[0.1em] uppercase">{s.title}</h2>
          <p className="mt-4 font-caps text-xs md:text-sm text-[var(--primary)] tracking-[0.15em] font-semibold whitespace-pre-line">{s.subtitle}</p>
        </Reveal>
        <Reveal variant="scale" delayMs={200} className="w-full max-w-md flex justify-center mt-2">
          <img src={s.cardImage} alt={s.cardAlt} className="w-full max-h-[65vh] object-contain" />
        </Reveal>
      </div>
    </section>
  );
}
