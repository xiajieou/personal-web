import NextLink from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  VisuallyHidden,
  useToast
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { GiBus } from 'react-icons/gi'
import { IoArrowDown } from 'react-icons/io5'
import BattleBus from './battle-bus'
import { PROFILE } from '../lib/data'

// Everything in the hero sits straight on the sky, so all text carries the
// ink drop shadow to stay readable on both the day and the night gradient.
const SKY_SHADOW = '0 0.06em 0 #0a1238, 0 0.14em 0.25em rgba(5,10,40,0.45)'
const NAME_SHADOW = '0 0.07em 0 #0a1238, 0 0.16em 0.3em rgba(5,10,40,0.45)'

const PHRASES = PROFILE.phrases

const CHIPS = [
  { label: 'available for internships', dot: 'fn.health' },
  { label: 'based in NYC', dot: 'fn.shield' },
  { label: `Class of ${PROFILE.gradYear}`, dot: 'fn.yellow' }
]

const SUBTITLE = [
  PROFILE.title,
  `CS @ ${PROFILE.schoolShort}`,
  `Class of ${PROFILE.gradYear}`
]

const THANK_TOAST_ID = 'thank-the-bus-driver'

const FLY_IN = {
  x: { type: 'spring', duration: 1.2, bounce: 0.22, delay: 0.1 },
  opacity: { duration: 0.2, delay: 0.1 }
}

// Out/in easing per quarter gives a sine-like float that starts and loops at
// rest, so pausing and resuming the bob never jumps. The two periods differ
// so the sway drifts against the float instead of repeating in lockstep.
const wave = duration => ({
  duration,
  times: [0, 0.25, 0.5, 0.75, 1],
  ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn'],
  repeat: Infinity
})
const BOB = { y: [0, -10, 0, 10, 0], rotate: [0, 1.5, 0, -1.5, 0] }
const BOB_LOOP = { y: wave(5.2), rotate: wave(6) }
const REST = { y: 0, rotate: 0 }

const blink = keyframes`
  0%, 49% { opacity: 1 }
  50%, 100% { opacity: 0 }
`

const nudge = keyframes`
  0%, 100% { transform: translateY(-3px); opacity: 0.35 }
  50% { transform: translateY(3px); opacity: 1 }
`

const Chip = ({ dot, children }) => (
  <Flex
    as="li"
    align="center"
    gap={2}
    px={3}
    py="5px"
    borderRadius="full"
    bg="fn.panelSoft"
    border="1px solid"
    borderColor="fn.line"
    color="fn.text"
    textStyle="hud"
    fontSize="xs"
    whiteSpace="nowrap"
  >
    <Box
      aria-hidden="true"
      flexShrink={0}
      w="7px"
      h="7px"
      borderRadius="full"
      color={dot}
      bg="currentColor"
      boxShadow="0 0 8px currentColor"
    />
    {children}
  </Flex>
)

// Cursor width plus its left margin, reserved next to the hidden phrases
const CURSOR_SPACE = '0.59em'

const Cursor = () => (
  <Box
    as="span"
    display="inline-block"
    w="0.45em"
    h="1em"
    ml="0.14em"
    verticalAlign="-0.14em"
    bg="fn.yellow"
    borderRadius="1px"
    boxShadow="0 0.06em 0 #0a1238"
    animation={`${blink} 1s linear infinite`}
    sx={{
      '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
        opacity: 0
      }
    }}
  />
)

// Starts on the full first phrase so the server render (and reduced motion,
// where `active` never turns on) shows real text instead of an empty line.
const Typewriter = ({ active }) => {
  const [idx, setIdx] = useState(0)
  const [sub, setSub] = useState(PHRASES[0] || '')
  const [dir, setDir] = useState(1)

  useEffect(() => {
    if (!active || PHRASES.length === 0) return undefined
    const phrase = PHRASES[idx]
    let timeout
    if (dir === 1) {
      if (sub.length < phrase.length) {
        timeout = setTimeout(() => setSub(phrase.slice(0, sub.length + 1)), 55)
      } else {
        timeout = setTimeout(() => setDir(-1), 1500)
      }
    } else if (sub.length > 0) {
      timeout = setTimeout(() => setSub(phrase.slice(0, sub.length - 1)), 28)
    } else {
      setDir(1)
      setIdx((idx + 1) % PHRASES.length)
    }
    return () => clearTimeout(timeout)
  }, [active, sub, dir, idx])

  return (
    <>
      {/* Hidden copies of every phrase share one grid cell with the typed
          text, so the box always has the size of the longest phrase and the
          layout never shifts while typing. */}
      <Box
        as="span"
        aria-hidden="true"
        display="inline-grid"
        maxW="100%"
        color="fn.yellow"
        fontWeight={700}
      >
        {PHRASES.map(phrase => (
          <Box
            as="span"
            key={phrase}
            gridArea="1 / 1"
            visibility="hidden"
            pr={CURSOR_SPACE}
          >
            {phrase}
          </Box>
        ))}
        <Box as="span" gridArea="1 / 1">
          {sub}
          <Cursor />
        </Box>
      </Box>
      <VisuallyHidden>{PHRASES.join(', ')}</VisuallyHidden>
    </>
  )
}

const KillFeedToast = () => (
  <Flex
    display="inline-flex"
    align="center"
    gap={2.5}
    pl={3}
    pr={4}
    py={2}
    bg="fn.ink"
    color="fn.text"
    borderRadius="6px"
    borderLeft="5px solid"
    borderLeftColor="fn.yellow"
    boxShadow="0 4px 0 rgba(5, 10, 40, 0.55), 0 14px 24px -12px rgba(3, 8, 30, 0.8)"
  >
    <Icon as={GiBus} boxSize={5} color="fn.yellow" aria-hidden="true" />
    <Text textStyle="hud" fontSize="sm">
      <Box as="span" color="fn.yellow">
        You
      </Box>{' '}
      thanked the bus driver
    </Text>
  </Flex>
)

const Chevron = ({ delay = '0s' }) => (
  <Box
    lineHeight={0}
    animation={`${nudge} 1.6s ease-in-out ${delay} infinite`}
    sx={{
      '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
    }}
  >
    <svg
      width="26"
      height="15"
      viewBox="0 0 28 16"
      fill="none"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5l10 8 10-8" stroke="#0a1238" />
      <path d="M4 3l10 8 10-8" stroke="#ffffff" />
    </svg>
  </Box>
)

const ScrollCue = () => (
  <Flex
    aria-hidden="true"
    display={{ base: 'none', md: 'flex' }}
    direction="column"
    align="center"
    pt={8}
    color="white"
    pointerEvents="none"
    userSelect="none"
  >
    <Text
      textStyle="hud"
      fontSize="sm"
      letterSpacing="0.22em"
      textShadow={SKY_SHADOW}
      mb={2}
    >
      Scroll to drop
    </Text>
    <Chevron />
    <Chevron delay="0.2s" />
  </Flex>
)

const Hero = () => {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // Only keep the typewriter and the bob ticking while the hero is on screen
  const inView = useInView(ref)
  const active = inView && !reduce
  const toast = useToast()

  const thankDriver = () => {
    if (toast.isActive(THANK_TOAST_ID)) return
    toast({
      id: THANK_TOAST_ID,
      position: 'bottom-left',
      duration: 2500,
      render: () => <KillFeedToast />
    })
  }

  return (
    <Flex
      as="section"
      id="top"
      ref={ref}
      position="relative"
      direction="column"
      // 24px + the 72px scroll padding on <html> = the layout's top padding,
      // so "#top" lands at scroll 0
      scrollMarginTop={6}
      minH={{ base: 'auto', md: 'calc(100vh - 120px)' }}
      mb={{ base: 16, md: 24 }}
    >
      <Flex
        flex={1}
        direction={{ base: 'column-reverse', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        gap={{ base: 3, md: 5, xl: 6 }}
      >
        <Box position="relative" zIndex={1} flex={{ md: 1 }} minW={0}>
          <Flex
            as="ul"
            role="list"
            listStyleType="none"
            wrap="wrap"
            gap={2}
            m={0}
            p={0}
          >
            {CHIPS.map(chip => (
              <Chip key={chip.label} dot={chip.dot}>
                {chip.label}
              </Chip>
            ))}
          </Flex>

          {/* The display face keeps 0.3em of empty descent under its caps,
              hence the small negative margin before the subtitle. */}
          <Box
            as="h1"
            textStyle="display"
            fontSize={{ base: '60px', sm: '76px', md: '88px', lg: '112px' }}
            color="white"
            textShadow={NAME_SHADOW}
            whiteSpace="nowrap"
            mt={{ base: 5, md: 6 }}
            mb="-0.08em"
          >
            <Box as="span" display="block">
              {PROFILE.firstName}
            </Box>{' '}
            <Box as="span" display="block" color="fn.yellow">
              {PROFILE.lastName}
            </Box>
          </Box>

          <Text
            textStyle="hud"
            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
            color="white"
            textShadow={SKY_SHADOW}
          >
            {SUBTITLE.map((part, i) => (
              <Fragment key={part}>
                <Box as="span" whiteSpace="nowrap">
                  {part}
                  {i < SUBTITLE.length - 1 && ' ·'}
                </Box>{' '}
              </Fragment>
            ))}
          </Text>

          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight={500}
            color="white"
            textShadow={SKY_SHADOW}
            mt={3}
          >
            Currently dropping into <Typewriter active={active} />
          </Text>

          <Flex wrap="wrap" gap={3} mt={{ base: 6, md: 7 }}>
            <Button
              as={NextLink}
              href="#about"
              variant="play"
              h={{ base: 12, sm: 14 }}
              px={{ base: 6, sm: 8 }}
              fontSize={{ base: 'lg', sm: 'xl' }}
              rightIcon={<IoArrowDown aria-hidden="true" />}
            >
              Drop in
            </Button>
            <Button
              as="a"
              href={`mailto:${PROFILE.email}`}
              variant="hud"
              h={{ base: 12, sm: 14 }}
              px={{ base: 5, sm: 6 }}
              fontSize={{ base: 'md', sm: 'lg' }}
            >
              Get in touch
            </Button>
          </Flex>
        </Box>

        {/* Sized so the name's column keeps at least 4em of room at every
            breakpoint; on md+ the bus leans into the container padding. */}
        <Flex
          direction="column"
          align="center"
          flexShrink={0}
          alignSelf="center"
          w={{
            base: '230px',
            sm: '280px',
            md: 'clamp(340px, calc(100vw - 428px), 380px)',
            lg: '440px',
            xl: '460px'
          }}
          mt={{ base: -2, md: 0 }}
          mr={{ md: -6, xl: -8 }}
        >
          <Box w="100%">
            {/* data-reveal: the noscript style in pages/index.js shows it */}
            <motion.div
              data-reveal=""
              initial={{ x: '60vw', opacity: 0 }}
              animate={{ x: '0vw', opacity: 1 }}
              transition={reduce ? { type: false } : FLY_IN}
            >
              <motion.div
                animate={active ? BOB : REST}
                transition={active ? BOB_LOOP : { duration: 0.4 }}
                style={{ originX: 0.5, originY: 0.25 }}
              >
                <BattleBus animated={inView} />
              </motion.div>
            </motion.div>
          </Box>

          <Box
            as="button"
            type="button"
            onClick={thankDriver}
            mt={{ base: 1, md: 2 }}
            px={3}
            py={2}
            borderRadius="6px"
            textStyle="hud"
            fontSize="sm"
            color="white"
            textShadow={SKY_SHADOW}
            textUnderlineOffset="3px"
            _hover={{ textDecoration: 'underline', color: 'fn.yellow' }}
            _focusVisible={{
              outline: '2px solid',
              outlineColor: 'fn.yellow',
              outlineOffset: '2px'
            }}
          >
            Thank the bus driver
          </Box>
        </Flex>
      </Flex>

      <ScrollCue />
    </Flex>
  )
}

export default Hero
