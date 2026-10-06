import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, chakra } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'
import Glider from './glider'
import { PROFILE, SECTIONS } from '../lib/data'

// Rail geometry, in px. The track is inset inside the rail so the canopy has
// room above its first stop and the altitude readout below its last one.
const RAIL_TOP = 96
const RAIL_BOTTOM = 40
const RAIL_WIDTH = 132
const TRACK_TOP = 34
const TRACK_BOTTOM = 48
const TRACK_X = 28 // track centre, measured from the rail's right edge
const LABEL_GAP = 33 // track centre to the labels, clears the glider and readout
const MIN_TICK_GAP = 26
const GLIDER_SIZE = 52
// The character's head (y = 59 of 96 in the art) is the point that rides the
// track, so a tick tucks in behind it when the glider reaches a section.
const GLIDER_ANCHOR = Math.round((GLIDER_SIZE * 59) / 96)

// Chakra's xl breakpoint. Between here and LABELS_FROM the rail is only the
// track, glider and readout, which reach 16 + 28 + 32 = 76px in from the
// viewport edge: well inside the (1280 - 1024) / 2 = 128px page margin.
const RAIL_QUERY = '(min-width: 80em)'
// With labels the rail reaches 16 + 132 = 148px in, more than that 128px, so
// the labels wait for 1360px: (1360 - 17px scrollbar - 1024) / 2 = 159px.
const LABELS_FROM = '@media screen and (min-width: 85em)'
const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)'

const SECTION_OFFSET = 90 // the html scroll padding + the sections' scroll margin
const ACTIVE_SLACK = 32 // px of scroll before a section top that already counts
const START_ALTITUDE = PROFILE.gradYear
const LANDED_AT = 0.985
const LANDED = 'Landed'

const STOPS = [
  { id: 'top', label: 'Bus' },
  ...SECTIONS.map(({ id, label }) => ({ id, label }))
]

// Evenly spaced until the real section positions are measured after mount.
// `f` is the scroll progress at which a stop is reached, `y` is where its tick
// sits on the track (both 0..1).
const INITIAL_TICKS = STOPS.map((stop, i) => ({
  ...stop,
  f: i / STOPS.length,
  y: i / STOPS.length
}))

// Stand-in until the window is measured, so the first render can be static
const INITIAL_TRACK_HEIGHT = 600

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const px = value => `${value}px`
const pct = value => `${(value * 100).toFixed(2)}%`

// Keeps neighbouring labels MIN_TICK_GAP px apart: crowded ticks are pushed
// down, then anything pushed past the end of the track is pulled back up.
const spread = (fractions, height) => {
  const last = fractions.length - 1
  const ys = fractions.map(f => f * height)
  for (let i = 1; i <= last; i++) {
    ys[i] = Math.max(ys[i], ys[i - 1] + MIN_TICK_GAP)
  }
  ys[last] = Math.min(ys[last], height)
  for (let i = last - 1; i >= 0; i--) {
    ys[i] = Math.min(ys[i], ys[i + 1] - MIN_TICK_GAP)
  }
  return ys.map(y => clamp(y / height, 0, 1))
}

// Scroll progress → position on the track, interpolated between ticks so the
// glider is level with a tick at the moment its section is reached, even when
// that tick was nudged by spread().
const railPosition = (progress, ticks) => {
  let from = { f: 0, y: 0 }
  for (const tick of ticks) {
    if (tick.f > progress) {
      const t = (progress - from.f) / (tick.f - from.f)
      return from.y + t * (tick.y - from.y)
    }
    from = tick
  }
  if (from.f >= 1) return from.y
  return from.y + ((progress - from.f) / (1 - from.f)) * (1 - from.y)
}

const activeStop = (progress, ticks, slack) => {
  let id = ticks[0].id
  for (const tick of ticks) {
    if (tick.f <= progress + slack) id = tick.id
  }
  return id
}

const sameTicks = (a, b) =>
  a.length === b.length &&
  a.every(
    (tick, i) =>
      tick.id === b[i].id &&
      Math.abs(tick.f - b[i].f) < 0.0001 &&
      Math.abs(tick.y - b[i].y) < 0.0001
  )

const altitude = progress => {
  if (progress >= LANDED_AT) return LANDED
  const metres = Math.min(
    START_ALTITUDE,
    Math.round((START_ALTITUDE * (1 - progress)) / 5) * 5
  )
  // Fixed formatting: toLocaleString could differ between server and browser
  return String(metres).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const sway = keyframes`
  from { transform: rotate(-4deg); }
  to { transform: rotate(4deg); }
`

// A full-height strip that is slid down by a share of its own height. This
// places (and animates) a stop with a transform only, and needs no measuring.
const Slot = ({ y, children, ...props }) => (
  <Box
    position="absolute"
    top={0}
    h="100%"
    transform={`translateY(${pct(y)})`}
    transition="transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)"
    sx={{ [REDUCED_MOTION]: { transition: 'none' } }}
    {...props}
  >
    {children}
  </Box>
)

// The glider art spans 32px above and 20px below its anchor, with the readout
// under that. A tick fades out inside that span instead of poking out from
// behind the art.
const Tick = ({ y, active, position, trackHeight }) => {
  const opacity = useTransform(position, latest => {
    const below = (y - latest) * trackHeight
    return clamp(Math.max(-below - 34, below - 46) / 10, 0, 1)
  })

  return (
    <Slot y={y} right={px(TRACK_X - 1)}>
      <Box
        as={motion.div}
        style={{ opacity }}
        position="absolute"
        top="-3px"
        right={0}
        w="10px"
        h="6px"
        border="1.5px solid"
        borderColor="fn.ink"
        borderRadius="full"
        bg={active ? 'fn.yellow' : 'white'}
      />
    </Slot>
  )
}

const StopLink = ({ id, label, active }) => (
  <chakra.a
    href={`#${id}`}
    aria-current={active ? 'location' : undefined}
    textStyle="hud"
    position="absolute"
    top={0}
    right={0}
    display="block"
    px="5px"
    pt="5px"
    pb="4px"
    fontSize="xs"
    lineHeight={1}
    letterSpacing="0.05em"
    whiteSpace="nowrap"
    border="1px solid"
    borderRadius="5px"
    pointerEvents="auto"
    transition="background-color 140ms ease, border-color 140ms ease, color 140ms ease"
    {...(active
      ? {
          bg: 'fn.yellow',
          color: 'fn.ink',
          borderColor: 'fn.ink',
          boxShadow: '0 2px 0 rgba(5, 10, 40, 0.55)',
          transform: 'translateY(-50%) skewX(-8deg)',
          _hover: { bg: '#fff27a' }
        }
      : {
          bg: 'fn.panel',
          color: 'white',
          borderColor: 'fn.line',
          textShadow: '0 1px 0 rgba(5, 10, 40, 0.6)',
          transform: 'translateY(-50%)',
          _hover: { bg: 'fn.royal', borderColor: 'fn.sky' }
        })}
    _focusVisible={{
      outline: '2px solid #ffe83d',
      outlineOffset: '3px',
      boxShadow: '0 0 0 3px #0a1238'
    }}
  >
    <chakra.span display="block" transform={active ? 'skewX(8deg)' : undefined}>
      {label}
    </chakra.span>
  </chakra.a>
)

// Its own component so the frequent text updates re-render only the pill.
const Altitude = ({ progress }) => {
  const [text, setText] = useState(() => altitude(0))
  const shown = useRef(text)

  const update = useCallback(latest => {
    const next = altitude(latest)
    if (next !== shown.current) {
      shown.current = next
      setText(next)
    }
  }, [])

  useMotionValueEvent(progress, 'change', update)
  useEffect(() => update(progress.get()), [progress, update])

  const landed = text === LANDED

  return (
    <Box
      textStyle="hud"
      mt="4px"
      px="6px"
      pt="4px"
      pb="3px"
      fontSize="10px"
      lineHeight={1}
      letterSpacing="0.04em"
      whiteSpace="nowrap"
      border="1px solid"
      borderColor={landed ? 'fn.ink' : 'fn.line'}
      borderRadius="full"
      bg={landed ? 'fn.yellow' : 'fn.panel'}
      color={landed ? 'fn.ink' : 'white'}
      sx={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {landed ? (
        LANDED
      ) : (
        <>
          <chakra.span color="fn.sky">Alt</chakra.span> {text} m
        </>
      )}
    </Box>
  )
}

const DropHud = () => {
  const { asPath } = useRouter()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const progress = reduceMotion ? scrollYProgress : smoothProgress

  // The first render (server and client) is always the same static default.
  // The rail stays out of it and mounts once the page is measured, so it never
  // flashes on a page that has no sections (the 404).
  const [canScroll, setCanScroll] = useState(true)
  const [visible, setVisible] = useState(false)
  const [ticks, setTicks] = useState(INITIAL_TICKS)
  const [trackHeight, setTrackHeight] = useState(INITIAL_TRACK_HEIGHT)
  const [activeId, setActiveId] = useState(STOPS[0].id)

  const ticksRef = useRef(INITIAL_TICKS)
  const slackRef = useRef(0)
  const activeRef = useRef(STOPS[0].id)
  const ticksValue = useMotionValue(INITIAL_TICKS)

  // Where the glider is on the track, 0..1
  const position = useTransform([progress, ticksValue], ([latest, stops]) =>
    railPosition(clamp(latest, 0, 1), stops)
  )
  const gliderY = useTransform(position, pct)

  const syncActive = useCallback(latest => {
    const next = activeStop(latest, ticksRef.current, slackRef.current)
    if (next !== activeRef.current) {
      activeRef.current = next
      setActiveId(next)
    }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', syncActive)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      setCanScroll(scrollable > 0)
      const height =
        window.innerHeight - RAIL_TOP - RAIL_BOTTOM - TRACK_TOP - TRACK_BOTTOM
      const sections = SECTIONS.map(({ id, label }) => ({
        id,
        label,
        el: document.getElementById(id)
      })).filter(section => section.el)

      // Nothing to show: below xl, a page that does not scroll, a page with
      // none of the sections (404), or a window too short to fit every label.
      if (
        !window.matchMedia(RAIL_QUERY).matches ||
        scrollable <= 0 ||
        sections.length === 0 ||
        height < MIN_TICK_GAP * sections.length
      ) {
        setVisible(false)
        return
      }

      const stops = [
        { ...STOPS[0], f: 0 },
        ...sections.map(({ id, label, el }) => ({
          id,
          label,
          f: clamp(
            (el.getBoundingClientRect().top + window.scrollY - SECTION_OFFSET) /
              scrollable,
            0,
            1
          )
        }))
      ]
      const ys = spread(
        stops.map(stop => stop.f),
        height
      )
      const next = stops.map((stop, i) => ({ ...stop, y: ys[i] }))

      if (!sameTicks(next, ticksRef.current)) {
        ticksRef.current = next
        ticksValue.set(next)
        setTicks(next)
      }
      setTrackHeight(height)
      slackRef.current = ACTIVE_SLACK / scrollable
      syncActive(clamp(window.scrollY / scrollable, 0, 1))
      setVisible(true)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('resize', schedule)
    // Catches the page growing or shrinking (fonts, images, route changes)
    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(schedule)
    if (observer) observer.observe(document.body)

    return () => {
      window.removeEventListener('resize', schedule)
      if (observer) observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [asPath, syncActive, ticksValue])

  return (
    <>
      {/* A page that cannot scroll reports progress 1: no bar there */}
      {canScroll && (
        <Box
          aria-hidden="true"
          position="fixed"
          top={0}
          left={0}
          right={0}
          h="3px"
          zIndex={11}
          pointerEvents="none"
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #9b4dff, #ffe83d)',
              originX: 0,
              scaleX: progress
            }}
          />
        </Box>
      )}

      {visible && (
        <Box
          position="fixed"
          top={px(RAIL_TOP)}
          bottom={px(RAIL_BOTTOM)}
          right={{ xl: '16px', '2xl': '40px' }}
          w={px(RAIL_WIDTH)}
          zIndex={5}
          display={{ base: 'none', xl: 'block' }}
          pointerEvents="none"
        >
          <Box
            position="absolute"
            top={px(TRACK_TOP)}
            bottom={px(TRACK_BOTTOM)}
            left={0}
            right={0}
          >
            <Box aria-hidden="true">
              <Box
                position="absolute"
                top="-12px"
                bottom="-12px"
                right={px(TRACK_X - 3)}
                w="6px"
                borderRadius="full"
                bg="fn.panelSoft"
              />
              <Box
                position="absolute"
                top="-8px"
                bottom="-8px"
                right={px(TRACK_X - 1)}
                borderLeft="2px dashed"
                borderColor="fn.line"
              />
              {ticks.map(tick => (
                <Tick
                  key={tick.id}
                  y={tick.y}
                  active={tick.id === activeId}
                  position={position}
                  trackHeight={trackHeight}
                />
              ))}
            </Box>

            <chakra.nav
              aria-label="Drop progress"
              sx={{ display: 'none', [LABELS_FROM]: { display: 'block' } }}
            >
              <chakra.ul role="list" listStyleType="none" m={0} p={0}>
                {ticks.map(tick => (
                  <Slot
                    as="li"
                    key={tick.id}
                    y={tick.y}
                    right={px(TRACK_X + LABEL_GAP)}
                  >
                    <StopLink
                      id={tick.id}
                      label={tick.label}
                      active={tick.id === activeId}
                    />
                  </Slot>
                ))}
              </chakra.ul>
            </chakra.nav>

            <motion.div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                right: TRACK_X - GLIDER_SIZE / 2,
                width: GLIDER_SIZE,
                height: '100%',
                y: gliderY
              }}
            >
              <Box
                position="absolute"
                top={px(-GLIDER_ANCHOR)}
                left="50%"
                w="max-content"
                transform="translateX(-50%)"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  transformOrigin="50% 61%"
                  animation={`${sway} 2.6s ease-in-out infinite alternate`}
                  sx={{ [REDUCED_MOTION]: { animation: 'none' } }}
                >
                  <Glider boxSize={px(GLIDER_SIZE)} />
                </Box>
                <Altitude progress={progress} />
              </Box>
            </motion.div>
          </Box>
        </Box>
      )}
    </>
  )
}

export default DropHud
