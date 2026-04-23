import { Inter, JetBrains_Mono } from 'next/font/google'

export const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700', '800'],
  variable: '--font-sans',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
})

const Fonts = () => null
export default Fonts
