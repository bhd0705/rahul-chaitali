import type { WeddingConfig } from "../../types";
import { BackgroundPair, BirdDivider } from "../Decorations";
import { Reveal } from "../Reveal";

export function WeddingSection({ config }: { config: WeddingConfig }) {
  const w = config.wedding;
  const [venueName, ...venueAddressParts] = w.venueName.split("\n");
  const venueAddress = venueAddressParts.join("\n");

  return (
    <section
      id="wedding"
      className="relative isolate min-h-screen overflow-hidden"
      style={{ background: config.theme.sectionGray }}
    >
      <BackgroundPair mobile={w.images.mobile} desktop={w.images.desktop} />

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-4 pb-12 pt-[clamp(17rem,48vh,23rem)] text-center sm:px-6 sm:pt-[clamp(19rem,42vh,25rem)] md:pt-16 md:pb-16">
        {/* Keep only the schedule heading/subtitle in the upper paper area. */}
        <Reveal variant="down" className="mb-3 w-full max-w-3xl md:mb-6">
          <h2 className="font-display text-2xl font-medium uppercase leading-tight tracking-[0.08em] text-[var(--primary)] sm:text-3xl md:text-5xl md:tracking-[0.1em]">
            {w.title}
          </h2>
          <p className="mt-2 font-caps text-[10px] font-semibold leading-relaxed tracking-[0.12em] text-[var(--primary)] sm:text-xs md:mt-3 md:text-sm md:tracking-[0.15em]">
            {w.subtitle}
          </p>
          <div className="mt-2 flex justify-center opacity-85 md:mt-3"><BirdDivider /></div>
        </Reveal>

        {/* Everything below the heading is deliberately pushed into the blue area on mobile. */}
        <div className="mt-[clamp(5.5rem,12vh,8.5rem)] flex w-full flex-col items-center md:mt-0">
          <Reveal delayMs={100} className="z-10 w-full max-w-xl px-1">
            <h3 className="font-display text-base font-medium uppercase leading-relaxed tracking-[0.08em] text-[var(--primary)] sm:text-lg md:text-xl md:tracking-[0.1em]">
              {w.dateHeading}
            </h3>
          </Reveal>

          <Reveal
            variant="scale"
            delayMs={200}
            className="relative z-10 mt-2 flex h-24 w-32 items-center justify-center overflow-hidden sm:h-32 sm:w-40 md:mt-4 md:h-56 md:w-56"
          >
            <img
              src={w.decorativeImage}
              alt=""
              className="pointer-events-none absolute left-1/2 top-1/2 w-[420px] max-w-none object-cover opacity-90 mix-blend-lighten sm:w-[500px] md:w-[600px]"
              style={{ transform: "translate(-50%, -52%)", clipPath: "inset(42% 0 43% 0)" }}
            />
          </Reveal>

          <Reveal delayMs={300} className="z-10 -mt-1 w-full max-w-xl px-1 sm:-mt-2 md:-mt-6">
            <h1 className="font-script text-5xl leading-none text-[var(--primary)] sm:text-6xl md:text-7xl">{w.eventName}</h1>
            <div className="mt-1 flex justify-center opacity-85 md:mt-2"><BirdDivider /></div>

            <div className="mt-2 flex items-center justify-center gap-4 font-bold tracking-widest text-[var(--primary)] sm:mt-3 md:mt-4 md:text-xl">
              <span className="h-px w-6 bg-[var(--gold)]" />
              <span className="text-base sm:text-lg md:text-xl">{w.time}</span>
              <span className="h-px w-6 bg-[var(--gold)]" />
            </div>

            <p className="mt-2 font-script text-2xl text-[var(--gold)] sm:mt-3 sm:text-3xl md:mt-4 md:text-4xl">{w.venueLabel}</p>

            <a
              href={w.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-1 block w-full max-w-[290px] break-words text-[var(--primary)] hover:text-[var(--gold)] sm:max-w-sm md:max-w-md"
            >
              <span className="block font-display text-base font-bold leading-tight tracking-wide sm:text-lg md:text-2xl">
                {venueName}
              </span>
              {venueAddress && (
                <span className="mt-1 block whitespace-pre-line break-words font-display text-xs font-semibold leading-snug tracking-wide sm:text-sm md:text-base md:leading-[1.3]">
                  {venueAddress}
                </span>
              )}
            </a>
          </Reveal>

          <Reveal delayMs={400} className="z-10 mt-8 w-full max-w-md px-2 sm:mt-10 md:mt-20">
            <p className="mx-auto max-w-sm whitespace-pre-line font-serif text-sm italic leading-relaxed text-[var(--primary)] sm:text-base">"{w.bibleQuote}"</p>
            <p className="mt-3 font-caps text-[0.65rem] font-bold tracking-[0.2em] text-[var(--primary)]">{w.bibleReference}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
