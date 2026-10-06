# xia jie ou — portfolio

Personal site built with **Next.js 13**, **Chakra UI**, and **Framer Motion**,
themed as a battle-royale drop. The hero is a bright sky with a flying battle
bus, and scrolling down the page drops you past each section (about,
experience, projects, leadership, skills, contact) until you land on the
island at the bottom. Light mode is a daytime drop, dark mode is a night storm.

This is a fan-made theme with original SVG/CSS art. It is not affiliated with
or endorsed by Epic Games.

## scripts

```bash
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

## stack

- **framework:** Next.js 13 (pages router), statically generated
- **ui:** Chakra UI + custom theme (HUD panels, `play` / `hud` buttons, rarity colors)
- **fonts:** Inter (body), Luckiest Guy (display), Barlow Condensed (HUD labels) via `next/font`
- **motion:** Framer Motion + CSS keyframes, with `prefers-reduced-motion` respected
- **art:** inline SVG and CSS only, no image assets for the scenery
- **analytics:** @vercel/analytics

## structure

```
lib/data.js                # all site content: profile, experience, projects, skills
lib/rarity.js              # loot rarity tiers (colors + gradients)
lib/theme.js               # chakra theme: colors, text styles, panels, buttons
components/sky.js          # the scenery: sky, clouds, storm and the island
components/battle-bus.js   # the flying battle bus (inline SVG)
components/drop-hud.js     # fixed HUD that tracks the drop while you scroll
components/layouts/main.js # page shell: sky, HUD, navbar, footer
components/                # hero, navbar, project-card, experience-item, etc.
pages/                     # index.js is the whole site, 404.js is the storm
public/                    # favicons + profile image
```

To update the site's content, edit `lib/data.js`. Older work that is no longer
on the résumé lives in `SIDE_QUESTS`; set `SHOW_SIDE_QUESTS` to `false` to show
résumé-only content.

[Credits to craftz.dog](https://www.craftz.dog/) - Initally took insipration from
