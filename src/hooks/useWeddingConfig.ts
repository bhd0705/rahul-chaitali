import { useEffect, useState } from "react";
import type { WeddingConfig } from "../types";

const CONFIG_PATH = "/wedding.config.json";

export function useWeddingConfig() {
  const [config, setConfig] = useState<WeddingConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(CONFIG_PATH);
        if (!res.ok) throw new Error(`Failed to load ${CONFIG_PATH}`);
        const data = (await res.json()) as WeddingConfig;
        if (!cancelled) {
          applyTheme(data.theme);
          document.title = data.meta.title;
          setConfig(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load config");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { config, error };
}

function applyTheme(theme: WeddingConfig["theme"]) {
  const root = document.documentElement;
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--foreground", theme.foreground);
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--secondary", theme.secondary);
  root.style.setProperty("--muted", theme.muted);
  root.style.setProperty("--muted-foreground", theme.mutedForeground);
  root.style.setProperty("--gold", theme.gold);
  root.style.setProperty("--gold-soft", theme.goldSoft);
  root.style.setProperty("--paper", theme.paper);
}
