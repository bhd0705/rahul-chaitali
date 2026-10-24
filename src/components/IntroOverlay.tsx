import { useCallback, useEffect, useRef, useState } from "react";
import type { WeddingConfig } from "../types";

type Phase = "waiting" | "playing" | "closing";

export function IntroOverlay({ intro }: { intro: WeddingConfig["intro"] }) {
  const [dismissed, setDismissed] = useState(!intro.enabled);
  const [phase, setPhase] = useState<Phase>("waiting");
  const videoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const playbackLimit = 4.99;

  // Keep the audio element mounted after the intro overlay disappears.
  // The music loops until the page is closed or refreshed.
  useEffect(() => {
    const music = musicRef.current;
    if (!music) return;

    const startMusic = () => {
      music.volume = 1;
      music.loop = true;
      music.play().catch(() => {
        // Browsers may block playback until the user taps the page.
      });
    };

    window.addEventListener("pageshow", startMusic);
    return () => window.removeEventListener("pageshow", startMusic);
  }, []);

  const finish = useCallback(() => {
    setPhase("closing");
    window.setTimeout(() => setDismissed(true), 1000);
  }, []);

  const handleTap = useCallback(() => {
    if (phase !== "waiting") return;

    // Start background music directly from the user's tap so mobile
    // browsers (especially iOS Safari) allow audio playback.
    const music = musicRef.current;
    if (music) {
      music.volume = 1;
      music.loop = true;
      music.play().catch(() => {
        // Some browsers may still block audio; the invitation can continue normally.
      });
    }

    if (!intro.videoUrl) {
      finish();
      return;
    }

    const video = videoRef.current;
    if (!video) {
      finish();
      return;
    }

    // Keep video playback directly in the user's tap handler for iOS Safari.
    video.muted = true;
    video.playsInline = true;
    setPhase("playing");

    video.play().catch(() => {
      setPhase("waiting");
    });
  }, [finish, intro.videoUrl, phase]);

  const stopAtPlaybackLimit = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= playbackLimit) {
      video.pause();
      finish();
    }
  };

  if (dismissed) {
    return <audio ref={musicRef} src="/assets/music.mp3" loop preload="auto" />;
  }

  const showTapHint = phase === "waiting";

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      style={{
        opacity: phase === "closing" ? 0 : 1,
        transition: "opacity 1000ms ease-in-out",
      }}
    >
      <audio ref={musicRef} src="/assets/music.mp3" loop preload="auto" />

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
