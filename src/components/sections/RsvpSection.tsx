import { useState } from "react";
import type { WeddingConfig } from "../../types";
import { BackgroundPair } from "../Decorations";
import { Reveal } from "../Reveal";

export function RsvpSection({ config }: { config: WeddingConfig }) {
  const { rsvp, couple, theme } = config;
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attending === null) return;
    setLoading(true);
    const payload = { name: name.trim(), attending, submittedAt: new Date().toISOString() };

    try {
      if (rsvp.submitEndpoint) {
        // Google Apps Script web apps work reliably with a simple form-encoded POST.
        // This avoids the CORS preflight that can happen with application/json.
        const body = new URLSearchParams({
          name: payload.name,
          attending: payload.attending,
          submittedAt: payload.submittedAt,
        });

        const res = await fetch(rsvp.submitEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: body.toString(),
        });
        if (!res.ok) throw new Error("Submit failed");
      } else if (rsvp.storeLocally) {
        const key = "wedding-rsvp-responses";
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        localStorage.setItem(key, JSON.stringify([...prev, payload]));
      }
      setStatus("Thank you! Your RSVP has been recorded.");
      setName("");
      setAttending(null);
    } catch {
      setStatus("Could not send RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="relative min-h-screen pt-16 px-4 isolate flex flex-col items-center">
      <BackgroundPair mobile={rsvp.images.mobile} desktop={rsvp.images.desktop} />

      <Reveal variant="scale" className="relative w-[340px] h-[650px] md:w-[440px] md:h-[840px] mt-12 flex flex-col items-center">
        <img src={rsvp.images.cardShape} alt="" className="absolute inset-0 w-full h-full object-cover drop-shadow-xl z-0" />
        <div className="absolute inset-0 z-10 w-full h-full px-8 md:px-14 pt-24 md:pt-32 pb-[195px] md:pb-[255px] text-center flex flex-col items-center">
          <span className="font-display text-lg md:text-xl tracking-[0.25em] font-light" style={{ color: theme.rsvpNavy }}>{couple.rsvpInitials}</span>
          <h2 className="mt-1 font-display text-2xl md:text-3xl tracking-[0.2em]" style={{ color: theme.rsvpNavy }}>{rsvp.title}</h2>

          <form className="text-left space-y-2 w-full mt-4" onSubmit={submit}>
            <div>
              <label className="font-caps text-[0.55rem] md:text-[0.6rem] font-semibold tracking-[0.08em] block mb-0.5" style={{ color: theme.rsvpNavy }}>
                {rsvp.nameLabel}
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={rsvp.namePlaceholder}
                className="w-full rounded-md border bg-transparent px-3 py-2 font-serif text-xs focus:outline-none"
                style={{ borderColor: `${theme.rsvpNavy}99`, color: theme.rsvpNavy }}
              />
            </div>
            <div>
              <label className="font-caps text-[0.55rem] md:text-[0.6rem] font-semibold tracking-[0.08em] block mb-0.5" style={{ color: theme.rsvpNavy }}>
                {rsvp.attendanceLabel}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`rounded-md border px-2 py-2 font-display text-xs transition ${attending === "yes" ? "bg-[var(--primary)] text-white" : ""}`}
                  style={{ borderColor: `${theme.rsvpNavy}99`, color: attending === "yes" ? undefined : theme.rsvpNavy }}
                >
                  {rsvp.acceptLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`rounded-md border px-2 py-2 font-display text-xs transition ${attending === "no" ? "bg-[var(--primary)] text-white" : ""}`}
                  style={{ borderColor: `${theme.rsvpNavy}99`, color: attending === "no" ? undefined : theme.rsvpNavy }}
                >
                  {rsvp.declineLabel}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !name.trim() || attending === null}
              className="w-full rounded-full py-2.5 font-caps text-[0.6rem] tracking-[0.18em] text-white disabled:opacity-60"
              style={{ background: theme.rsvpNavy }}
            >
              {loading ? "SENDING..." : rsvp.submitLabel}
            </button>
            {status && <p className="text-center text-xs font-display pt-2" style={{ color: theme.rsvpNavy }}>{status}</p>}
          </form>
        </div>
      </Reveal>

      <Reveal delayMs={200} className="mt-8 text-center flex flex-col items-center pb-12 relative z-10">
        <p className="font-script text-3xl italic" style={{ color: theme.rsvpNavy }}>{rsvp.footerMessage}</p>
        <a
          href={rsvp.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 rounded-full border px-8 py-2.5 font-caps text-[0.65rem] tracking-[0.15em] inline-flex items-center gap-2 backdrop-blur-md"
          style={{ borderColor: `${theme.rsvpGold}66`, color: theme.rsvpGold }}
        >
          📍 {rsvp.directionsLabel}
        </a>
      </Reveal>
    </section>
  );
}
