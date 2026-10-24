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

      {/* Keep the event information inside the blue band of the artwork. */}
      <div className="relative mx-auto grid min-h-screen w-full max-w-5xl grid-rows-[30%_40%_30%] px-4 text-center sm:px-6 md:px-8">
        {/* Cream above the blue */}
        <Reveal
          variant="down"
          className="flex h-full flex-col items-center justify-end pb-3 md:pb-5"
        >
          <h2 className="font-display text-2xl font-medium uppercase leading-tight tracking-[0.08em] text-[var(--primary)] sm:text-3xl md:text-5xl md:tracking-[0.1em]">
            {w.title}
          </h2>
          <p className="mt-1.5 font-caps text-[10px] font-semibold leading-relaxed tracking-[0.12em] text-[var(--primary)] sm:text-xs md:mt-3 md:text-sm md:tracking-[0.15em]">
            {w.subtitle}
          </p>
          <div className="mt-1.5 flex justify-center opacity-85 md:mt-3">
            <BirdDivider />
          </div>
        </Reveal>

        {/* Blue band — date, church, wedding, time and venue all stay here. */}
        <div className="flex h-full min-h-0 flex-col items-center justify-center overflow-hidden px-1 py-2 sm:py-3 md:py-4">
          <Reveal delayMs={100} className="w-full max-w-xl shrink-0">
            <h3 className="font-display text-[11px] font-medium uppercase leading-tight tracking-[0.08em] text-[var(--primary)] sm:text-base md:text-xl md:tracking-[0.1em]">
              {w.dateHeading}
            </h3>
          </Reveal>

          <Reveal variant="scale" delayMs={200} className="mt-1 flex w-full shrink-0 justify-center sm:mt-2 md:mt-2">
            <img
              src={w.decorativeImage}
              alt=""
              className="pointer-events-none h-auto max-h-[3.25rem] w-full max-w-[7rem] object-contain sm:max-h-[4rem] sm:max-w-[8.5rem] md:max-h-[5rem] md:max-w-[11rem]"
            />
          </Reveal>

          <Reveal delayMs={300} className="w-full max-w-xl shrink-0">
            <h1 className="mt-0.5 font-script text-3xl leading-none text-[var(--primary)] sm:text-5xl md:mt-1 md:text-7xl">
              {w.eventName}
            </h1>

            <div className="mt-1 flex scale-90 justify-center opacity-85 sm:mt-1.5 sm:scale-100 md:mt-2">
              <BirdDivider />
            </div>

            <div className="mt-1 flex items-center justify-center gap-3 font-bold tracking-widest text-[var(--primary)] sm:mt-1.5 md:mt-2 md:text-xl">
              <span className="h-px w-5 bg-[var(--gold)] sm:w-6" />
              <span className="text-xs sm:text-base md:text-xl">{w.time}</span>
              <span className="h-px w-5 bg-[var(--gold)] sm:w-6" />
            </div>

            <p className="mt-1 font-script text-lg text-[var(--gold)] sm:mt-1.5 sm:text-2xl md:mt-2 md:text-4xl">
              {w.venueLabel}
            </p>

            <a
              href={w.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-0 block w-full max-w-[290px] break-words text-[var(--primary)] hover:text-[var(--gold)] sm:max-w-sm md:max-w-md"
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
        <Reveal
          delayMs={400}
          className="flex h-full flex-col items-center justify-start px-2 pt-5 md:pt-8"
        >
          <p className="mx-auto max-w-sm whitespace-pre-line font-serif text-sm italic leading-relaxed text-[var(--primary)] sm:text-base">
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
