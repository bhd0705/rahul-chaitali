import { useCallback, useRef, useState } from "react";
import type { WeddingConfig } from "../types";

type Phase = "waiting" | "playing" | "closing";

export function IntroOverlay({ intro }: { intro: WeddingConfig["intro"] }) {
  const [dismissed, setDismissed] = useState(!intro.enabled);
  const [phase, setPhase] = useState<Phase>("waiting");
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackLimit = 4.99;

  const finish = useCallback(() => {
    setPhase("closing");
    window.setTimeout(() => setDismissed(true), 1000);
  }, []);

  const handleTap = useCallback(() => {
    if (phase !== "waiting") return;

    if (!intro.videoUrl) {
      finish();
      return;
    }

    const video = videoRef.current;
    if (!video) {
      finish();
      return;
    }

    // Keep play() directly inside the user's tap handler. iOS Safari is
    // strict about user-gesture initiated media playback.
    video.muted = true;
    video.playsInline = true;

    setPhase("playing");

    video.play().catch(() => {
      // Do not close the invitation when Safari temporarily rejects playback.
      // Return to the tap state so the user can retry without losing the page.
      setPhase("waiting");
    });
  }, [finish, intro.videoUrl, phase]);

  const stopAtPlaybackLimit = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= playbackLimit) {
      // Avoid seeking back to 4.99s here. Safari can perform a second media
      // seek at this point, which may briefly freeze or interrupt playback.
      video.pause();
      finish();
    }
  };

  if (dismissed) return null;

  const showTapHint = phase === "waiting";

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      style={{
        opacity: phase === "closing" ? 0 : 1,
        transition: "opacity 1000ms ease-in-out",
      }}
    >
      {intro.videoUrl ? (
        <video
          ref={videoRef}
          src={intro.videoUrl}
          className="w-full h-full object-cover pointer-events-none select-none"
          playsInline
          muted
          preload="auto"
          poster={intro.posterImage || undefined}
          onTimeUpdate={stopAtPlaybackLimit}
          onEnded={finish}
          onError={() => setPhase("waiting")}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-b from-[#1a2c5b] via-[#2a4070] to-[#0f1a30] flex items-center justify-center pointer-events-none">
          <p className="font-script text-5xl md:text-7xl text-[var(--gold)] opacity-90">♥</p>
        </div>
      )}

      {showTapHint && (
        <button
          type="button"
          className="absolute inset-0 cursor-pointer bg-transparent border-0 p-0"
          onClick={handleTap}
          aria-label={intro.tapToOpenText}
        >
          <span className="absolute inset-0 flex items-end justify-center pb-16 pointer-events-none">
            <span className="px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white font-caps text-xs tracking-[0.3em] animate-pulse">
              {intro.tapToOpenText}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
