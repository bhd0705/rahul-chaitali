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
      <div className="relative mx-auto grid min-h-screen w-full max-w-5xl grid-rows-[32%_47%_21%] px-4 text-center sm:px-6 md:grid-rows-[27%_46%_27%] md:px-8">
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

        {/* Blue band — content only; background art supplies the blue panel */}
        <div className="flex h-full flex-col items-center justify-center gap-1 py-1 sm:gap-2 sm:py-2">
          <Reveal delayMs={100} className="w-full max-w-xl px-1">
            <h3 className="font-display text-sm font-medium uppercase leading-snug tracking-[0.08em] text-[var(--primary)] sm:text-lg md:text-xl md:tracking-[0.1em]">
              {w.dateHeading}
            </h3>
          </Reveal>

          <Reveal variant="scale" delayMs={200} className="flex w-full justify-center px-2 py-1">
            <img
              src={w.decorativeImage}
              alt=""
              className="pointer-events-none h-auto w-full max-w-[16rem] object-contain sm:max-w-[20rem] md:max-w-72"
            />
          </Reveal>

          <Reveal delayMs={300} className="w-full max-w-xl px-1">
            <h1 className="font-script text-4xl leading-none text-[var(--primary)] sm:text-6xl md:text-7xl">{w.eventName}</h1>
            <div className="mt-0.5 flex justify-center opacity-85 md:mt-2"><BirdDivider /></div>

            <div className="mt-1.5 flex items-center justify-center gap-4 font-bold tracking-widest text-[var(--primary)] sm:mt-3 md:mt-4 md:text-xl">
              <span className="h-px w-6 bg-[var(--gold)]" />
              <span className="text-sm sm:text-lg md:text-xl">{w.time}</span>
              <span className="h-px w-6 bg-[var(--gold)]" />
            </div>

            <p className="mt-1 font-script text-xl text-[var(--gold)] sm:mt-3 sm:text-3xl md:mt-4 md:text-4xl">{w.venueLabel}</p>

            <a
              href={w.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-0.5 block w-full max-w-[300px] break-words text-[var(--primary)] hover:text-[var(--gold)] sm:mt-1 sm:max-w-sm md:max-w-md"
            >
              <span className="block font-display text-sm font-bold leading-tight tracking-wide sm:text-lg md:text-2xl">
                {venueName}
              </span>
              {venueAddress && (
                <span className="mt-0.5 block font-display text-[10px] font-semibold leading-snug tracking-wide sm:mt-1 sm:text-sm md:text-base md:leading-[1.3]">
                  {venueAddress}
                </span>
              )}
            </a>
          </Reveal>
        </div>

        {/* Cream below the blue */}
        <Reveal delayMs={400} className="flex h-full flex-col items-center justify-start px-2 pt-3 md:pt-8">
          <p className="mx-auto max-w-sm whitespace-pre-line font-serif text-sm italic leading-relaxed text-[var(--primary)] sm:text-base">"{w.bibleQuote}"</p>
          <p className="mt-2 font-caps text-[0.65rem] font-bold tracking-[0.2em] text-[var(--primary)] md:mt-3">{w.bibleReference}</p>
        </Reveal>
      </div>
    </section>
  );
}
