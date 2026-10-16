import type { WeddingConfig } from "../../types";
import { BackgroundPair, BirdDivider } from "../Decorations";
import { Reveal } from "../Reveal";

export function ReceptionSection({ config }: { config: WeddingConfig }) {
  const r = config.reception;
  return (
    <section id="reception" className="relative isolate min-h-screen" style={{ background: config.theme.sectionGray }}>
      <BackgroundPair mobile={r.images.mobile} desktop={r.images.desktop} />
      <div className="relative w-full min-h-screen flex flex-col items-center pt-24 px-4 pb-20">
        <Reveal variant="down" className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-5xl text-[var(--primary)] font-medium tracking-[0.1em] uppercase">{r.title}</h2>
          <p className="mt-3 font-caps text-xs md:text-sm text-[var(--primary)] tracking-[0.15em] font-semibold">{r.subtitle}</p>
          <div className="mt-3 flex justify-center opacity-85"><BirdDivider /></div>
        </Reveal>
        <Reveal variant="scale" delayMs={200} className="w-full max-w-[520px] drop-shadow-2xl">
          <img src={r.scheduleImage} alt={r.scheduleAlt} className="w-full h-auto object-contain" />
        </Reveal>
      </div>
    </section>
  );
}
