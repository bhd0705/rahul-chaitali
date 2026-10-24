import type { WeddingConfig } from "../../types";
import { BackgroundPair, BirdDivider } from "../Decorations";
import { Reveal } from "../Reveal";

export function WeddingSection({ config }: { config: WeddingConfig }) {
  const w = config.wedding;
  const [venueName, ...venueAddressParts] = w.venueName.split("\n");
  const venueAddress = venueAddressParts.join("\n");

  return (
    <section id="wedding" className="relative isolate min-h-screen" style={{ background: config.theme.sectionGray }}>
      <BackgroundPair mobile={w.images.mobile} desktop={w.images.desktop} />
      <div className="relative w-full min-h-screen flex flex-col items-center pt-32 md:pt-16 px-4 pb-20">
        <Reveal variant="down" className="text-center mb-4 md:mb-8">
          <h2 className="font-display text-3xl md:text-5xl text-[var(--primary)] font-medium tracking-[0.1em] uppercase">{w.title}</h2>
          <p className="mt-3 font-caps text-xs md:text-sm text-[var(--primary)] tracking-[0.15em] font-semibold">{w.subtitle}</p>
          <div className="mt-3 flex justify-center opacity-85"><BirdDivider /></div>
        </Reveal>

        <Reveal delayMs={100} className="text-center mt-2 md:mt-4 z-10">
          <h3 className="font-display text-lg md:text-xl text-[var(--primary)] font-medium tracking-[0.1em] uppercase">{w.dateHeading}</h3>
        </Reveal>

        <Reveal variant="scale" delayMs={200} className="relative w-36 h-36 md:w-56 md:h-56 flex items-center justify-center z-10 overflow-hidden">
          <img
            src={w.decorativeImage}
            alt=""
            className="absolute w-[500px] md:w-[600px] max-w-none object-cover pointer-events-none mix-blend-lighten opacity-90"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -52%)", clipPath: "inset(42% 0 43% 0)" }}
          />
        </Reveal>

        <Reveal delayMs={300} className="text-center z-10 -mt-1 md:-mt-6 max-md:-translate-y-2">
          <h1 className="font-script text-5xl md:text-7xl text-[var(--primary)] leading-none">{w.eventName}</h1>
          <div className="mt-1 md:mt-2 flex justify-center opacity-85"><BirdDivider /></div>
          <div className="mt-2 md:mt-4 flex items-center justify-center gap-4 text-[var(--primary)] font-bold text-lg md:text-xl tracking-widest">
            <span className="h-[1px] w-6 bg-[var(--gold)]" />
            {w.time}
            <span className="h-[1px] w-6 bg-[var(--gold)]" />
          </div>

          <p className="mt-2 md:mt-4 font-script text-2xl md:text-4xl text-[var(--gold)]">{w.venueLabel}</p>
          <a
            href={w.venueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 mx-auto w-full max-w-[250px] md:max-w-md text-[var(--primary)] hover:text-[var(--gold)] block whitespace-pre-line break-words"
          >
            <span className="block font-display text-lg md:text-2xl font-bold tracking-wide leading-tight">
              {venueName}
            </span>
            {venueAddress && (
              <span className="block mt-0.5 font-display text-[11px] md:text-base font-semibold tracking-wide leading-[1.3] break-words">
                {venueAddress}
              </span>
            )}
          </a>
        </Reveal>

        <Reveal delayMs={400} className="text-center mt-12 md:mt-28 z-10">
          <p className="font-serif italic text-[var(--primary)] text-sm md:text-base max-w-xs mx-auto whitespace-pre-line">"{w.bibleQuote}"</p>
          <p className="mt-3 font-caps text-[0.65rem] tracking-[0.2em] text-[var(--primary)] font-bold">{w.bibleReference}</p>
        </Reveal>
      </div>
    </section>
  );
}
