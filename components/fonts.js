import { Inter, Luckiest_Guy, Barlow_Condensed } from 'next/font/google'

export const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})

// Chunky display face for titles (single weight — never set it bold)
export const display = Luckiest_Guy({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-display',
  preload: true,
  fallback: ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif']
})

// Condensed face for HUD labels, buttons and meta text
export const hud = Barlow_Condensed({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'],
  variable: '--font-hud',
  preload: false,
  fallback: ['Arial Narrow', 'system-ui', 'sans-serif']
})

const Fonts = () => null
export default Fonts
