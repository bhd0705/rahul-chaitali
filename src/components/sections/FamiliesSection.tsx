import type { WeddingConfig } from "../../types";
import { BackgroundPair } from "../Decorations";
import { Reveal } from "../Reveal";

function FamilyColumn({ member, variant }: { member: WeddingConfig["families"]["partner1"]; variant: "left" | "right" }) {
  return (
    <Reveal variant={variant === "left" ? "left" : "right"} delayMs={200}>
      <div className="flex flex-col items-center text-center px-1">
        <h3 className="font-script text-3xl sm:text-4xl md:text-5xl text-[var(--primary)] leading-none italic">{member.name}</h3>
        <div className="flex items-center justify-center gap-1.5 my-2 opacity-70">
          <span className="h-[0.5px] w-6 bg-gradient-to-r from-transparent to-[var(--gold)]" />
          <span className="text-[var(--gold)] text-[6px]">✦</span>
          <span className="h-[0.5px] w-6 bg-gradient-to-l from-transparent to-[var(--gold)]" />
        </div>
        <p className="font-caps text-[0.4rem] sm:text-[0.45rem] tracking-[0.2em] text-[var(--muted-foreground)] mb-1 uppercase font-semibold">{member.relationLabel}</p>
        <p className="font-display text-[0.65rem] sm:text-sm text-[var(--primary)] tracking-wide uppercase font-semibold">{member.parents}</p>
        <p className="font-caps text-[0.4rem] sm:text-[0.45rem] tracking-[0.2em] text-[var(--muted-foreground)] mt-3 mb-1 uppercase font-semibold">{member.siblingLabel}</p>
        <p className="font-display text-[0.6rem] sm:text-xs text-[var(--muted-foreground)] tracking-wide leading-tight uppercase font-semibold whitespace-pre-line">{member.siblings}</p>
      </div>
    </Reveal>
  );
}

export function FamiliesSection({ config }: { config: WeddingConfig }) {
  const { families, couple } = config;
  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen py-10 px-4 text-center select-none overflow-hidden isolate bg-white">
      <BackgroundPair mobile={families.images.mobile} desktop={families.images.desktop} />

      <Reveal variant="down" className="flex-none w-full pt-4 md:pt-12">
        <p className="font-caps text-[0.55rem] md:text-xs tracking-[0.3em] text-[var(--primary)] font-semibold">{families.eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl md:text-4xl tracking-wide text-[var(--primary)] uppercase font-medium">
          {families.title}
          <span className="block font-script text-[var(--gold)] text-3xl md:text-5xl italic capitalize mt-0.5 normal-case">{families.titleScript}</span>
        </h2>
      </Reveal>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[640px] py-8">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-x-2 md:gap-x-6 items-center w-full px-1">
          <FamilyColumn member={families.partner1} variant="left" />
          <Reveal variant="scale" delayMs={400} className="flex flex-col items-center self-stretch min-h-[160px] md:min-h-[220px]">
            <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent to-[var(--gold)]/75" />
            <div className="my-2 animate-float-delayed">
              <img src={couple.monogramImage} alt={couple.monogramAlt} className="h-20 w-20 object-contain" />
            </div>
            <div className="w-[1px] flex-1 bg-gradient-to-t from-transparent to-[var(--gold)]/75" />
          </Reveal>
          <FamilyColumn member={families.partner2} variant="right" />
        </div>

        <Reveal delayMs={600} className="w-full mt-6 md:mt-10 pb-4">
          <p className="font-caps text-[0.55rem] md:text-[0.65rem] tracking-[0.25em] text-[var(--primary)] whitespace-pre-line font-semibold">{families.closingLine1}</p>
          <p className="font-script text-[var(--gold)] text-2xl md:text-4xl italic mt-1">{families.closingLine2}</p>
        </Reveal>
      </div>
    </section>
  );
}
