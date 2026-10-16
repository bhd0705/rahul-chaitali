import { Birds, Petals } from "./components/Decorations";
import { IntroOverlay } from "./components/IntroOverlay";
import { FamiliesSection } from "./components/sections/FamiliesSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ReceptionSection } from "./components/sections/ReceptionSection";
import { RsvpSection } from "./components/sections/RsvpSection";
import { ScheduleSection } from "./components/sections/ScheduleSection";
import { StorySection } from "./components/sections/StorySection";
import { WeddingSection } from "./components/sections/WeddingSection";
import { useWeddingConfig } from "./hooks/useWeddingConfig";

export default function App() {
  const { config, error } = useWeddingConfig();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <p className="text-red-700 font-display">{error}</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-caps tracking-widest text-[var(--gold)] animate-pulse">Loading…</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative">
      <IntroOverlay intro={config.intro} />
      <Birds enabled={config.effects.birds} />
      <Petals enabled={config.effects.petals} />

      <HeroSection config={config} />
      <FamiliesSection config={config} />
      <StorySection config={config} />
      <ScheduleSection config={config} />
      <WeddingSection config={config} />
      <ReceptionSection config={config} />
      <RsvpSection config={config} />
    </main>
  );
}
