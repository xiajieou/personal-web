import NextLink from 'next/link'
import { Box, Flex } from '@chakra-ui/react'
import { PROFILE } from '../lib/data'

const INK = '#0a1238'
const YELLOW = '#ffe83d'
const BADGE_SKEW = 'translate(16 16) skewX(-8) translate(-16 -16)'

// Slanted yellow badge with a tiny balloon-and-bus glyph
const LogoMark = () => (
  <Box
    as="svg"
    className="logo-mark"
    viewBox="0 0 32 32"
    w="28px"
    h="28px"
    flexShrink={0}
    aria-hidden="true"
    focusable="false"
    transition="transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)"
    sx={{
      '@media (prefers-reduced-motion: reduce)': { transition: 'none' }
    }}
  >
    <rect
      x="3.6"
      y="4.6"
      width="24.8"
      height="25"
      rx="5"
      fill="#b38a00"
      transform={BADGE_SKEW}
    />
    <rect
      x="3.6"
      y="1.6"
      width="24.8"
      height="25"
      rx="5"
      fill={YELLOW}
      transform={BADGE_SKEW}
    />
    <g transform="translate(1.44 1.1) scale(0.91)">
      <path
        d="M16 3.6c3.5 0 6.2 2.4 6.2 5.5 0 2.4-1.7 4.3-3.7 5.3h-5c-2-1-3.7-2.9-3.7-5.3 0-3.1 2.7-5.5 6.2-5.5z"
        fill={INK}
      />
      <path
        d="M16 3.6c1.3 1.4 2 3.4 2 5.6s-.7 4-1.6 5.2h-.8c-.9-1.2-1.6-3-1.6-5.2s.7-4.2 2-5.6z"
        fill={YELLOW}
      />
      <path
        d="M13.3 14.2l-1 3.6M18.7 14.2l1 3.6"
        stroke={INK}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <rect x="8.6" y="17.2" width="14.8" height="6.2" rx="1.9" fill={INK} />
      <rect x="10.6" y="18.7" width="2.6" height="2" rx="0.5" fill={YELLOW} />
      <rect x="14.7" y="18.7" width="2.6" height="2" rx="0.5" fill={YELLOW} />
      <rect x="18.8" y="18.7" width="2.6" height="2" rx="0.5" fill={YELLOW} />
      <circle cx="12.4" cy="23.6" r="1.7" fill={INK} />
      <circle cx="19.6" cy="23.6" r="1.7" fill={INK} />
    </g>
  </Box>
)

// No scroll={false} here: with it the pages router skips the scroll back to
// the top when the logo is clicked on the home page.
const Logo = () => (
  <Flex
    as={NextLink}
    href="/"
    aria-label={`${PROFILE.name}, home`}
    display="inline-flex"
    flexShrink={0}
    align="center"
    gap={2}
    py={1}
    borderRadius="8px"
    color="white"
    _hover={{ textDecoration: 'none' }}
    _focusVisible={{
      outline: '2px solid',
      outlineColor: 'fn.yellow',
      outlineOffset: '4px'
    }}
    sx={{
      '&:hover .logo-mark, &:focus-visible .logo-mark': {
        transform: 'rotate(-10deg) scale(1.1)'
      }
    }}
  >
    <LogoMark />
    <Box
      as="span"
      display="inline-block"
      textStyle="display"
      fontSize="20px"
      pt="4px"
      whiteSpace="nowrap"
      textShadow={`0 2px 0 ${INK}`}
    >
      {PROFILE.name}
    </Box>
  </Flex>
)

export default Logo
