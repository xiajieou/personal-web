import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Sky gradient stops, top of the page → horizon. Light mode is the daytime
// drop, dark mode is the storm at night. Panels stay dark navy in both modes
// (game-HUD style), so the sky is the only thing that reacts to color mode.
export const SKY = {
  day: ['#1273ea', '#1e90ff', '#58c4ff', '#a8e4ff'],
  night: ['#050a2c', '#0b1650', '#2a1a6e', '#4b2a8f']
}

const styles = {
  global: props => ({
    html: {
      scrollBehavior: 'smooth',
      // Keeps focused elements and anchor landings clear of the fixed navbar.
      // Sections add their own small scroll margin on top of this.
      scrollPaddingTop: '72px',
      '@media (prefers-reduced-motion: reduce)': {
        scrollBehavior: 'auto'
      }
    },
    'html, body': {
      bg: mode(SKY.day[0], SKY.night[0])(props),
      color: '#f4f8ff'
    },
    '::selection': {
      background: '#ffe83d',
      color: '#0a1238'
    }
  })
}

const colors = {
  fn: {
    yellow: '#ffe83d',
    yellowDeep: '#b38a00',
    ink: '#0a1238',
    navy: '#0f1d5c',
    royal: '#1b3fc4',
    blue: '#1e90ff',
    sky: '#58c4ff',
    ice: '#bfe9ff',
    storm: '#9b4dff',
    stormDeep: '#4a1fb8',
    shield: '#35b6ff',
    health: '#5fd13a',
    grass: '#6fce3e',
    grassDeep: '#2f8f3a',
    text: '#f4f8ff',
    muted: 'rgba(214, 230, 255, 0.8)',
    line: 'rgba(132, 196, 255, 0.38)',
    panel: 'rgba(10, 18, 56, 0.86)',
    panelSoft: 'rgba(10, 18, 56, 0.6)'
  },
  rarity: {
    common: '#a3adb8',
    uncommon: '#6fd13c',
    rare: '#3db4ff',
    epic: '#c463ff',
    legendary: '#ff9f3d',
    mythic: '#ffd84d'
  }
}

const fonts = {
  heading: 'var(--font-display), Impact, sans-serif',
  body: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
  mono: 'var(--font-hud), ui-sans-serif, system-ui, sans-serif'
}

const textStyles = {
  // Big chunky titles. The face has one weight, so keep fontWeight at 400.
  display: {
    fontFamily: 'var(--font-display), Impact, sans-serif',
    fontWeight: 400,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    lineHeight: 1
  },
  // Small condensed labels: kickers, tags, stats, nav
  hud: {
    fontFamily: 'var(--font-hud), ui-sans-serif, system-ui, sans-serif',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    lineHeight: 1.2
  }
}

const layerStyles = {
  // Default dark-navy HUD panel for all content cards
  panel: {
    bg: 'fn.panel',
    color: 'fn.text',
    border: '2px solid',
    borderColor: 'fn.line',
    borderRadius: '14px',
    boxShadow:
      '0 6px 0 rgba(5, 10, 40, 0.55), 0 22px 40px -18px rgba(3, 8, 30, 0.75)'
  },
  // Yellow slanted label that sits on top of the sky or a panel
  tag: {
    bg: 'fn.yellow',
    color: 'fn.ink',
    borderRadius: '4px',
    transform: 'skewX(-8deg)'
  }
}

const components = {
  Heading: {
    baseStyle: {
      fontWeight: 400,
      letterSpacing: '0.02em'
    }
  },
  Link: {
    baseStyle: {
      color: 'fn.yellow',
      _hover: {
        color: '#ffffff',
        textDecoration: 'underline'
      },
      // The yellow ring the rest of the site uses; boxShadow: none drops
      // Chakra's default blue ring
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'fn.yellow',
        outlineOffset: '3px',
        boxShadow: 'none'
      }
    }
  },
  Button: {
    baseStyle: {
      fontFamily: 'var(--font-hud), ui-sans-serif, system-ui, sans-serif',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      borderRadius: '8px',
      transition:
        'transform 140ms ease, box-shadow 140ms ease, background 140ms ease',
      // Two-tone focus ring: the yellow line shows on the navy panels and the
      // ink edge on the sky, where Chakra's default blue ring disappears
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'fn.yellow',
        outlineOffset: '2px',
        boxShadow: '0 0 0 5px #0a1238'
      }
    },
    variants: {
      // Primary yellow "PLAY" button
      play: {
        bg: 'fn.yellow',
        color: 'fn.ink',
        boxShadow: '0 4px 0 #b38a00, 0 12px 20px -8px rgba(0, 0, 0, 0.5)',
        _hover: {
          bg: '#fff27a',
          color: 'fn.ink',
          textDecoration: 'none',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 0 #b38a00, 0 16px 24px -8px rgba(0, 0, 0, 0.55)'
        },
        _active: {
          transform: 'translateY(2px)',
          boxShadow: '0 2px 0 #b38a00'
        }
      },
      // Secondary dark-glass button
      hud: {
        bg: 'fn.panel',
        color: 'fn.text',
        border: '2px solid',
        borderColor: 'fn.line',
        _hover: {
          bg: 'fn.royal',
          color: '#ffffff',
          borderColor: 'fn.sky',
          textDecoration: 'none',
          transform: 'translateY(-2px)'
        },
        _active: {
          transform: 'translateY(1px)'
        }
      }
    }
  }
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  styles,
  components,
  fonts,
  colors,
  textStyles,
  layerStyles
})
export default theme
