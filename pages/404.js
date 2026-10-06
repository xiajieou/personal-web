import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

// Keeps white text readable on both the bright day sky and the night sky
const ON_SKY_SHADOW = '0 0.06em 0 #0a1238, 0 0.14em 0.25em rgba(5,10,40,0.45)'

// Body-size text gets an extra soft halo so it holds up on the palest sky
const ON_SKY_BODY_SHADOW = [
  ON_SKY_SHADOW,
  '0 0 0.3em rgba(5,10,40,0.5)',
  '0 0 0.8em rgba(5,10,40,0.55)'
].join(', ')

const INK = '#0a1238'

const drift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(-2deg); }
  50% { transform: translate3d(0, -8px, 0) rotate(2deg); }
`

const StormCloud = props => (
  <Box
    as="svg"
    viewBox="10 4 140 138"
    display="block"
    h="auto"
    aria-hidden="true"
    focusable="false"
    animation={`${drift} 5s ease-in-out infinite`}
    sx={{
      '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
    }}
    {...props}
  >
    <defs>
      <linearGradient
        id="storm-cloud-fill"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="14"
        x2="0"
        y2="84"
      >
        <stop offset="0" stopColor="#d9c2ff" />
        <stop offset="0.5" stopColor="#9b4dff" />
        <stop offset="1" stopColor="#4a1fb8" />
      </linearGradient>
    </defs>
    <path
      d="M86 74 60 108h16l-10 28 38-42H87l12-20z"
      fill="#ffe83d"
      stroke={INK}
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <g fill={INK} stroke={INK} strokeWidth="9" strokeLinejoin="round">
      <circle cx="42" cy="60" r="22" />
      <circle cx="76" cy="44" r="30" />
      <circle cx="116" cy="58" r="24" />
      <rect x="42" y="56" width="74" height="26" rx="4" />
    </g>
    <g fill="url(#storm-cloud-fill)">
      <circle cx="42" cy="60" r="22" />
      <circle cx="76" cy="44" r="30" />
      <circle cx="116" cy="58" r="24" />
      <rect x="42" y="56" width="74" height="26" />
    </g>
    <g fill="none" stroke="#fff" strokeLinecap="round">
      <path d="M56 32c5-9 15-13 25-11" strokeOpacity="0.7" strokeWidth="5" />
      <path d="M104 44c4-3 9-4 13-3" strokeOpacity="0.5" strokeWidth="4" />
    </g>
  </Box>
)

const NotFound = () => (
  <Flex
    as="section"
    direction="column"
    align="center"
    justify="center"
    minH="60vh"
    py={10}
    textAlign="center"
  >
    <Head>
      <title>Page not found — Xia Jie Ou</title>
    </Head>

    <StormCloud w={{ base: '96px', md: '128px' }} mb={5} />

    <Box layerStyle="tag" px={3} py="5px" mb={5}>
      <Text
        textStyle="hud"
        fontSize="sm"
        lineHeight={1}
        whiteSpace="nowrap"
        transform="skewX(8deg)"
      >
        404 // out of bounds
      </Text>
    </Box>

    <Heading
      as="h1"
      textStyle="display"
      fontSize="clamp(44px, 14vw, 128px)"
      lineHeight={1}
      color="white"
      textShadow={ON_SKY_SHADOW}
      mb={4}
    >
      Eliminated
    </Heading>

    <Text
      maxW="26em"
      mb={8}
      fontSize={{ base: 'md', md: 'lg' }}
      fontWeight={700}
      color="white"
      textShadow={ON_SKY_BODY_SHADOW}
    >
      The storm got this page. Head back to the lobby and drop again.
    </Text>

    <Button as={NextLink} href="/" variant="play" size="lg">
      Return to lobby
    </Button>
  </Flex>
)

export default NotFound
