// Loot rarity tiers. `color` is the border/accent, `from`/`to` build the
// card art gradient, `glow` is the hover halo.
export const RARITY = {
  common: {
    label: 'Common',
    color: '#a3adb8',
    from: '#cfd6de',
    to: '#56616d',
    glow: 'rgba(163, 173, 184, 0.55)'
  },
  uncommon: {
    label: 'Uncommon',
    color: '#6fd13c',
    from: '#a5ee69',
    to: '#2a771b',
    glow: 'rgba(111, 209, 60, 0.55)'
  },
  rare: {
    label: 'Rare',
    color: '#3db4ff',
    from: '#7dd6ff',
    to: '#1552b3',
    glow: 'rgba(61, 180, 255, 0.55)'
  },
  epic: {
    label: 'Epic',
    color: '#c463ff',
    from: '#e09aff',
    to: '#6420b0',
    glow: 'rgba(196, 99, 255, 0.55)'
  },
  legendary: {
    label: 'Legendary',
    color: '#ff9f3d',
    from: '#ffc670',
    to: '#b24d14',
    glow: 'rgba(255, 159, 61, 0.55)'
  },
  mythic: {
    label: 'Mythic',
    color: '#ffd84d',
    from: '#fff0a0',
    to: '#b5830c',
    glow: 'rgba(255, 216, 77, 0.6)'
  }
}

export const getRarity = key => RARITY[key] || RARITY.common

export const rarityGradient = key => {
  const r = getRarity(key)
  return `radial-gradient(120% 120% at 50% 15%, ${r.from} 0%, ${r.color} 38%, ${r.to} 100%)`
}
