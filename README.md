# Wedding invitation (customizable clone)

A local clone of the [Suraj & Libina invitation](https://suraj-libina.invitationmedia.in/) where **every detail** is driven by configuration.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Customize content

Edit **`public/wedding.config.json`**. All text, dates, URLs, colors, and image paths live there. After saving the file, refresh the browser (restart `npm run dev` if changes do not appear).

- **Names & families** — `couple`, `families`
- **Date & countdown** — `hero.dateDisplay`, `hero.countdownIso` (ISO 8601 with timezone)
- **Story photos** — `story.photos` array (`src` + `alt`)
- **Event** — `wedding`
- **RSVP** — `rsvp` (set `submitEndpoint` to your API, or keep `storeLocally: true`)
- **Theme** — `theme` colors
- **Intro envelope video** — `intro.videoUrl` (file: `public/assets/envelope-intro-ios.mp4`, H.264 Baseline/AAC for iOS compatibility). The video stays paused until the guest taps **TAP TO OPEN**; it then plays once and the invitation appears. Set `intro.enabled` to `false` to skip. Optional `intro.posterImage` for the idle screen.
- **Assets** — replace files in `public/assets/` and update paths in config

## Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host.

## RSVP responses

With `rsvp.storeLocally: true`, responses are stored in the browser under `wedding-rsvp-responses`. For production, set `rsvp.submitEndpoint` to your backend or form service.
