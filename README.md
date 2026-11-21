# Deluxe Reverb Rig

Starting-point settings for a Telecaster into a Fender Deluxe Reverb, with a 7-band graphic EQ, an analog delay, and a spring or plate reverb pedal. Pick a sound, see the whole chain, and drag the knobs to tweak it.

**Use it:** [https://rig-settings.hckshr.workers.dev/](https://rig-settings.hckshr.workers.dev/)

The whole thing is one self-contained `index.html` (no dependencies). It's served by a tiny Cloudflare Worker. Custom presets are stored in the browser with `localStorage`.

## Presets

- **Clean country twang** — Normal channel, tighter lows, a short slapback, and a little spring.
- **Sparkly clean** — Vibrato channel, moderate volume, a little amp reverb.
- **Edge of breakup** — Vibrato volume 5; clean until you dig in.
- **Crunchy rhythm** — Vibrato volume 10, treble 10, bass 1, a little amp reverb.
- **Surf drip** — Vibrato channel with the amp's spring turned up.
- **Swampy tremolo** — Slow, deep tremolo on the Vibrato channel, neck pickup.
- **Ambient slapback** — Normal channel with a short slap and a smoother plate behind it.
- **Lead** — The crunchy rhythm amp setting plus a mid boost and a short delay halo.

The guitar list is set up so more instruments can be added later. For now it's Telecaster only.

Pedal names stay generic on purpose: typical 7-band graphic EQ frequencies (100 Hz–6.4 kHz, ±15 dB, plus Level), the usual analog delay knobs (Time, Mix, Repeats), and Mix / Tone / Decay on a spring or plate reverb. Reverb and tremolo on a Deluxe Reverb are only on the Vibrato channel, so Normal-channel presets use the reverb pedal instead.

## Run locally

Open `index.html` in a browser.

## Deploy

```sh
node build.mjs        # regenerate worker.js from index.html
npx wrangler deploy   # publish to Cloudflare Workers
```
