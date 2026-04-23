import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    'html, body': {
      bg: mode('#fafafa', '#07070b')(props),
      color: mode('#0a0a0f', '#e4e4e7')(props),
      scrollBehavior: 'smooth'
    },
    '::selection': {
      background: mode('#00c2ff33', '#7c3aed55')(props)
    },
    '.grain': {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      opacity: mode(0.03, 0.05)(props),
      zIndex: 0,
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.8'/></svg>\")"
    }
  })
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        fontSize: { base: 'xl', md: '2xl' },
        fontWeight: 700,
        letterSpacing: '-0.02em',
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#0066ff', '#7dd3fc')(props),
      _hover: {
        textDecoration: 'none',
        color: mode('#a855f7', '#c4b5fd')(props)
      }
    })
  }
}

const fonts = {
  heading: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
  body: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
  mono: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace'
}

const colors = {
  accent: {
    cyan: '#22d3ee',
    purple: '#a855f7',
    pink: '#ff63c3',
    green: '#22c55e'
  },
  surface: {
    dark: '#0d0d12',
    darker: '#07070b',
    card: '#11111a'
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
