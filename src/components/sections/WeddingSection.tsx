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
      style={{ background: config.theme.paper }}
    >
      <BackgroundPair
        mobile={w.images.mobile}
        desktop={w.images.desktop}
        className="object-fill md:object-center"
      />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-5xl grid-rows-[23%_62%_15%] px-3 text-center sm:grid-rows-[24%_58%_18%] sm:px-6 md:grid-rows-[25%_55%_20%] md:px-8">
        {/* Top cream area */}
        <Reveal
          variant="down"
          className="flex h-full flex-col items-center justify-end pb-2 sm:pb-3 md:pb-5"
        >
          <h2 className="font-display text-2xl font-medium uppercase leading-tight tracking-[0.08em] text-[var(--primary)] sm:text-3xl md:text-5xl md:tracking-[0.1em]">
            {w.title}
          </h2>
          <p className="mt-1 font-caps text-[9px] font-semibold leading-relaxed tracking-[0.1em] text-[var(--primary)] sm:mt-1.5 sm:text-xs md:mt-3 md:text-sm md:tracking-[0.15em]">
            {w.subtitle}
          </p>
          <div className="mt-1 flex justify-center opacity-85 sm:mt-1.5 md:mt-3">
            <BirdDivider />
          </div>
        </Reveal>

        {/* Full blue event area: all event details live here */}
        <div className="relative flex h-full min-h-0 flex-col items-center justify-start overflow-hidden px-1 pt-[7%] sm:pt-[6%] md:pt-[5%]">
          <Reveal delayMs={100} className="w-full max-w-xl shrink-0">
            <h3 className="font-display text-sm font-medium uppercase leading-tight tracking-[0.08em] text-[var(--primary)] sm:text-lg md:text-2xl md:tracking-[0.1em]">
              {w.dateHeading}
            </h3>
          </Reveal>

          <Reveal
            variant="scale"
            delayMs={200}
            className="mt-2 flex w-full shrink-0 justify-center sm:mt-3 md:mt-4"
          >
            <img
              src={w.decorativeImage}
              alt=""
              className="pointer-events-none h-auto max-h-[4rem] w-full max-w-[7rem] object-contain sm:max-h-[5rem] sm:max-w-[9rem] md:max-h-[6rem] md:max-w-[11rem]"
            />
          </Reveal>

          <Reveal delayMs={300} className="w-full max-w-xl shrink-0">
            <div className="mt-2.5 flex items-center justify-center gap-3 font-bold tracking-widest text-[var(--primary)] sm:mt-4 md:mt-5">
              <span className="h-px w-6 bg-[var(--gold)] sm:w-8" />
              <span className="text-base sm:text-xl md:text-2xl">{w.time}</span>
              <span className="h-px w-6 bg-[var(--gold)] sm:w-8" />
            </div>

            <p className="mt-2 font-script text-2xl text-[var(--gold)] sm:mt-3 sm:text-3xl md:mt-4 md:text-4xl">
              {w.venueLabel}
            </p>

            <a
              href={w.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-1 block w-full max-w-[320px] break-words px-1 text-[var(--primary)] hover:text-[var(--gold)] sm:max-w-sm md:max-w-md"
            >
              <span className="block font-display text-base font-bold leading-tight tracking-wide sm:text-lg md:text-2xl">
                {venueName}
              </span>
              {venueAddress && (
                <span className="mt-1 block whitespace-pre-line font-display text-xs font-semibold leading-snug tracking-wide sm:text-sm md:text-base md:leading-snug">
                  {venueAddress}
                </span>
              )}
            </a>
          </Reveal>
        </div>

        {/* Quote remains below the event details */}
        <Reveal
          delayMs={400}
          className="flex h-full flex-col items-center justify-start px-3 pt-2 sm:px-2 sm:pt-4 md:pt-5"
        >
          <p className="mx-auto max-w-sm whitespace-pre-line font-serif text-sm italic leading-relaxed text-[var(--primary)] sm:text-base md:max-w-lg">
            "{w.bibleQuote}"
          </p>
          <p className="mt-2 font-caps text-[0.65rem] font-bold tracking-[0.2em] text-[var(--primary)] md:mt-3">
            {w.bibleReference}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
