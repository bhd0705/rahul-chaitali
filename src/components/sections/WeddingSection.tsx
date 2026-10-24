import type { WeddingConfig } from "../../types";
import { BackgroundPair, BirdDivider } from "../Decorations";
import { Reveal } from "../Reveal";

export function WeddingSection({ config }: { config: WeddingConfig }) {
  const w = config.wedding;
  const [venueName, ...venueAddressParts] = w.venueName.split("\n");
  const venueAddress = venueAddressParts.join(" ");

  return (
    <section
      id="wedding"
      className="relative isolate min-h-screen overflow-hidden"
      style={{ background: config.theme.paper }}
    >
      <BackgroundPair
        mobile={w.images.mobile}
        desktop={w.images.desktop}
        className="object-fill md:object-center"
      />

      {/* Rows match the cream / blue / cream bands of the background art. */}
      <div className="relative mx-auto grid min-h-screen w-full max-w-5xl grid-rows-[28%_54%_18%] px-4 text-center sm:px-6 md:grid-rows-[26%_52%_22%] md:px-8">
        {/* Cream above the blue */}
        <Reveal variant="down" className="flex h-full flex-col items-center justify-end pb-2 md:pb-4">
          <h2 className="font-display text-2xl font-medium uppercase leading-tight tracking-[0.08em] text-[var(--primary)] sm:text-3xl md:text-5xl md:tracking-[0.1em]">
            {w.title}
          </h2>
          <p className="mt-1.5 font-caps text-[10px] font-semibold leading-relaxed tracking-[0.12em] text-[var(--primary)] sm:text-xs md:mt-3 md:text-sm md:tracking-[0.15em]">
            {w.subtitle}
          </p>
          <div className="mt-1.5 flex justify-center opacity-85 md:mt-3"><BirdDivider /></div>
        </Reveal>

        {/* Blue band — keep all event details inside the middle row */}
        <div className="flex h-full min-h-0 flex-col items-center justify-start gap-0 overflow-hidden pt-0.5 sm:gap-0.5 sm:pt-1">
          <Reveal delayMs={100} className="w-full max-w-xl shrink-0 px-1">
            <h3 className="font-display text-[11px] font-medium uppercase leading-tight tracking-[0.08em] text-[var(--primary)] sm:text-base md:text-xl md:tracking-[0.1em]">
              {w.dateHeading}
            </h3>
          </Reveal>

          <Reveal variant="scale" delayMs={200} className="flex w-full shrink-0 justify-center px-2">
            <img
              src={w.decorativeImage}
              alt=""
              className="pointer-events-none h-auto max-h-[3rem] w-full max-w-[7rem] object-contain sm:max-h-[3.75rem] sm:max-w-[8.5rem] md:max-h-[5rem] md:max-w-[11rem]"
            />
          </Reveal>

          <Reveal delayMs={300} className="w-full max-w-xl shrink-0 px-1">
            <h1 className="font-script text-3xl leading-none text-[var(--primary)] sm:text-5xl md:text-7xl">{w.eventName}</h1>
            <div className="mt-0 flex scale-90 justify-center opacity-85 sm:mt-0.5 sm:scale-100 md:mt-1"><BirdDivider /></div>

            <div className="mt-0.5 flex items-center justify-center gap-3 font-bold tracking-widest text-[var(--primary)] sm:mt-1.5 md:mt-3 md:text-xl">
              <span className="h-px w-5 bg-[var(--gold)] sm:w-6" />
              <span className="text-xs sm:text-base md:text-xl">{w.time}</span>
              <span className="h-px w-5 bg-[var(--gold)] sm:w-6" />
            </div>

            <p className="mt-0.5 font-script text-lg text-[var(--gold)] sm:mt-1.5 sm:text-2xl md:mt-3 md:text-4xl">{w.venueLabel}</p>

            <a
              href={w.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-0 block w-full max-w-[280px] break-words text-[var(--primary)] hover:text-[var(--gold)] sm:mt-0.5 sm:max-w-sm md:max-w-md"
            >
              <span className="block font-display text-[11px] font-bold leading-tight tracking-wide sm:text-base md:text-2xl">
                {venueName}
              </span>
              {venueAddress && (
                <span className="mt-px block font-display text-[8px] font-semibold leading-[1.25] tracking-wide sm:mt-0.5 sm:text-[10px] md:text-sm md:leading-[1.3]">
                  {venueAddress}
                </span>
              )}
            </a>
          </Reveal>
        </div>

        {/* Cream below the blue */}
        <Reveal delayMs={400} className="flex h-full flex-col items-center justify-start px-2 pt-4 md:pt-8">
          <p className="mx-auto max-w-sm whitespace-pre-line font-serif text-sm italic leading-relaxed text-[var(--primary)] sm:text-base">"{w.bibleQuote}"</p>
          <p className="mt-2 font-caps text-[0.65rem] font-bold tracking-[0.2em] text-[var(--primary)] md:mt-3">{w.bibleReference}</p>
        </Reveal>
      </div>
    </section>
  );
}
