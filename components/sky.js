import { Box, chakra } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion'
import { SKY } from '../lib/theme'

const skyGradient = s =>
  `linear-gradient(180deg, ${s[0]} 0%, ${s[1]} 30%, ${s[2]} 65%, ${s[3]} 100%)`

// The sun (day) and the moon (night) share one spot in the upper right,
// measured from the right and top edges. It sits just below the fixed navbar.
const ORB_X = '13vw'
const ORB_Y = '120px'

// Warm disc with stepped halo rings. The rings are white on purpose: a
// yellow glow over the blue sky turns muddy green.
const SUN = `radial-gradient(circle clamp(210px, 34vw, 500px) at calc(100% - ${ORB_X}) ${ORB_Y}, #fffde6 0%, #fff4a8 7%, #ffe76a 8.6%, rgba(255, 255, 255, 0.42) 9.8%, rgba(255, 255, 255, 0.26) 20%, rgba(255, 255, 255, 0.17) 21%, rgba(255, 255, 255, 0.1) 42%, rgba(255, 255, 255, 0.06) 43%, rgba(255, 255, 255, 0) 100%)`

// The storm wall closing in from the left edge
const STORM =
  'linear-gradient(90deg, rgba(155, 77, 255, 0.3) 0%, rgba(155, 77, 255, 0.12) 6%, rgba(155, 77, 255, 0) 18%)'

// Scenery palette as CSS variables, swapped by Chakra's _dark selector. The
// color-mode script sets that before first paint, so a returning night-mode
// visitor never sees a flash of the day sky. Keep these values comma-free:
// Chakra reads a comma in a custom property as "token, fallback".
//
// `grass-deeper` and `grass-floor` are the grass-deep colour blended 60% and
// 90% toward the ground, so the grass gradient eases into the ground slab
// instead of stopping dead on it, which read as a hard line.
const DAY = {
  '--sky-cloud': '#ffffff',
  '--sky-cloud-shade': '#cfe8ff',
  '--sky-cloud-far': '0.55',
  '--sky-cloud-mid': '0.75',
  '--sky-cloud-near': '0.95',
  '--sky-hill-far': '#8fdcc8',
  '--sky-hill-mid': '#45b36b',
  '--sky-hill-rim': '#63c97d',
  '--sky-grass': 'colors.fn.grass',
  '--sky-grass-deep': 'colors.fn.grassDeep',
  '--sky-grass-deeper': '#257933',
  '--sky-grass-floor': '#216f2f',
  '--sky-grass-rim': '#a4ea5c',
  '--sky-ground': '#1f6b2e',
  '--sky-tree': '#1c7a3b',
  '--sky-tree-lit': '#34a24c',
  '--sky-trunk': '#70442a'
}

const NIGHT = {
  '--sky-cloud': '#5a60b8',
  '--sky-cloud-shade': '#3a3f8c',
  '--sky-cloud-far': '0.4',
  '--sky-cloud-mid': '0.55',
  '--sky-cloud-near': '0.7',
  '--sky-hill-far': '#3d3f93',
  '--sky-hill-mid': '#235a78',
  '--sky-hill-rim': '#2c6f8a',
  '--sky-grass': '#2a9a78',
  '--sky-grass-deep': '#145e55',
  '--sky-grass-deeper': '#0f4842',
  '--sky-grass-floor': '#0d3e39',
  '--sky-grass-rim': '#3fb58c',
  '--sky-ground': '#0c3a36',
  '--sky-tree': '#0e4a44',
  '--sky-tree-lit': '#187060',
  '--sky-trunk': '#3a2c48'
}

const drift = px => keyframes`
  from { transform: translate3d(-${px}px, 0, 0); }
  to { transform: translate3d(${px}px, 0, 0); }
`

const twinkle = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(0.75); }
  50% { opacity: 1; transform: scale(1); }
`

const bob = keyframes`
  from { transform: translate3d(0, -5px, 0); }
  to { transform: translate3d(0, 5px, 0); }
`

const still = {
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
}

/* ---------- path builders (pure, so server and client always agree) ------ */

const circle = (cx, cy, r) =>
  `M${cx - r},${cy}a${r},${r} 0 1,1 ${2 * r},0a${r},${r} 0 1,1 ${-2 * r},0z`

const pill = (x, y, w, h) =>
  `M${x + h / 2},${y}h${w - h}a${h / 2},${h / 2} 0 0,1 0,${h}h${h - w}a${h / 2},${h / 2} 0 0,1 0,${-h}z`

/* ---------- clouds ------------------------------------------------------ */

// A cloud is a row of [cx, cy, r] puffs sitting on a pill-shaped base
// [x, y, w, h]. `scale` sizes it against the width of its depth layer.
const CLOUD_SHAPES = {
  a: {
    w: 240,
    h: 120,
    scale: 1,
    base: [10, 72, 220, 42],
    puffs: [
      [50, 76, 26],
      [86, 56, 32],
      [130, 46, 38],
      [172, 62, 30],
      [202, 80, 20]
    ]
  },
  b: {
    w: 240,
    h: 96,
    scale: 1,
    base: [6, 56, 228, 34],
    puffs: [
      [44, 60, 18],
      [78, 48, 26],
      [120, 38, 30],
      [162, 50, 24],
      [198, 62, 16]
    ]
  },
  c: {
    w: 160,
    h: 96,
    scale: 0.8,
    base: [6, 54, 148, 36],
    puffs: [
      [40, 58, 20],
      [72, 42, 28],
      [110, 48, 24],
      [134, 64, 14]
    ]
  }
}

// `body` is the full silhouette in the shade color. `lit` is the same cloud
// nudged up and left, which leaves a shaded rim along the underside.
const cloudArt = (shape, flipped) => {
  const { w, h, base, puffs } = CLOUD_SHAPES[shape]
  const [bx, by, bw, bh] = base
  const x = flipped ? w - bx - bw : bx
  const row = puffs.map(([cx, cy, r]) => [flipped ? w - cx : cx, cy, r])
  return {
    viewBox: `0 0 ${w} ${h}`,
    body: pill(x, by, bw, bh) + row.map(p => circle(...p)).join(''),
    lit:
      pill(x + 5, by, bw - 10, bh - 9) +
      row.map(([cx, cy, r]) => circle(cx - 2, cy - 3, r - 2)).join('')
  }
}

// Far to near. `speed` is the extra scroll speed of the layer: near clouds
// rush past faster than the page, which sells the drop. `sway` is how far
// (px) a cloud drifts to either side of its resting spot.
const DEPTHS = [
  {
    speed: 0.015,
    sway: 16,
    width: 'clamp(84px, 12.5vw, 200px)',
    opacity: 'var(--sky-cloud-far)'
  },
  {
    speed: 0.04,
    sway: 26,
    width: 'clamp(112px, 18vw, 300px)',
    opacity: 'var(--sky-cloud-mid)'
  },
  {
    speed: 0.075,
    sway: 40,
    width: 'clamp(140px, 25vw, 420px)',
    opacity: 'var(--sky-cloud-near)'
  }
].map(depth => ({ ...depth, drift: drift(depth.sway) }))

// Width of the content column (Chakra's container.lg)
const COLUMN = '1024px'

// [shape, flipped, depth, top, side, inset (vw), drift duration (s)]
//
// top: a vh string pins the cloud to the hero. A number is a % of the page
// height with a pixel floor, so a short page (the 404) keeps only the first
// few clouds instead of stacking all twelve on one screen.
//
// side: the headings are white, left-aligned and sit straight on the sky, so
// the big bright clouds must not slide in behind them. A 'margin' cloud hangs
// off the left edge but, even at full sway, stops short of the text in the
// content column. That pushes it off screen once the page has no side
// margins (below about 1000px wide). 'left' and 'right' are plain insets, for
// the dim far clouds and for the ones hanging off the right edge.
const CLOUDS = [
  ['c', false, 0, '10vh', 'left', 30, 96],
  ['b', false, 1, '19vh', 'right', -5, 78],
  ['a', false, 2, '63vh', 'margin', -8, 64],
  ['a', true, 0, 13, 'right', 9, 112],
  ['c', false, 1, 20, 'margin', -3, 84],
  ['b', true, 2, 27, 'right', -11, 70],
  ['b', false, 0, 34, 'left', 5, 104],
  ['a', false, 1, 43, 'right', -7, 90],
  ['c', true, 2, 51, 'margin', -4, 62],
  ['c', false, 0, 60, 'left', 11, 118],
  ['b', true, 1, 69, 'right', -6, 76],
  ['a', true, 2, 82, 'margin', -9, 68]
].map(([shape, flipped, depth, top, side, inset, seconds], i) => {
  const { scale } = CLOUD_SHAPES[shape]
  const { sway } = DEPTHS[depth]
  const width =
    scale === 1
      ? DEPTHS[depth].width
      : `calc(${DEPTHS[depth].width} * ${scale})`
  // Resting right edge of a margin cloud. At full sway it ends 24px into the
  // column's 32px side padding, just short of the text.
  const reach = `(100vw - ${COLUMN}) / 2 + ${24 - sway}px`
  return {
    depth,
    art: cloudArt(shape, flipped),
    style: {
      top: typeof top === 'number' ? `max(${top}%, ${top * 60}px)` : top,
      [side === 'right' ? 'right' : 'left']:
        side === 'margin'
          ? `min(${inset}vw, calc(${reach} - ${width}))`
          : `${inset}vw`,
      width,
      animationDuration: `${seconds}s`,
      animationDelay: `${i * -7}s`,
      animationDirection: i % 2 ? 'alternate-reverse' : 'alternate'
    }
  }
})

/* ---------- night sky --------------------------------------------------- */

// [left %, top %, size (px), twinkle duration (s), delay (s), sparkle]
// Positions are relative to the star field, which covers the top third of
// the page, and steer clear of the moon. Fixed values keep the server and
// client markup identical.
const STARS = [
  [14.1, 50.9, 5, 3.6, -3.3, 0],
  [47.9, 30.7, 3, 4, -4, 0],
  [38.6, 35.7, 3, 3.9, -3.5, 0],
  [70.9, 29.2, 12, 5.9, -0.4, 1],
  [84.8, 51.6, 3, 4.3, -0.1, 0],
  [21.2, 4.6, 4, 3.9, -3.7, 0],
  [45.4, 73.3, 4, 5.9, -0.2, 0],
  [7.4, 65.5, 3, 3.4, -2, 0],
  [29.5, 36.3, 3, 5.3, -3.1, 0],
  [97.3, 98.7, 4, 5.7, -1.9, 0],
  [12.8, 7.6, 4, 5.9, -2, 0],
  [90.6, 26.5, 16, 5.8, -2.7, 1],
  [61.6, 69.5, 4, 4.7, -2.6, 0],
  [96.5, 5.6, 3, 3.8, -3.1, 0],
  [3.8, 11.8, 3, 4.9, -1.1, 0],
  [26.2, 78.6, 5, 3, 0, 0],
  [24.5, 30.9, 3, 5.5, -3.6, 0],
  [11.9, 29.6, 3, 5.4, -1.7, 0],
  [59.6, 3.8, 4, 2.7, -3.1, 0],
  [37.7, 98.5, 14, 4.6, -2.3, 1],
  [73.6, 14.5, 4, 3.3, 0, 0],
  [25.9, 44.3, 4, 5, -2.9, 0],
  [73.8, 43.5, 3, 3.5, -2.2, 0],
  [78.6, 31.1, 3, 4.8, -3.2, 0],
  [59.2, 35.1, 4, 3.8, -4.9, 0],
  [6.6, 35.9, 4, 2.9, -2.3, 0],
  [74.5, 87.9, 3, 5.7, -3.5, 0],
  [94.8, 40.1, 12, 5.5, -4.2, 1],
  [45.4, 9, 3, 4.4, -1.7, 0],
  [62.2, 44.4, 3, 4.4, -4.7, 0],
  [79.8, 7.1, 5, 4.2, -1.6, 0],
  [55.7, 46.2, 3, 6, -2.2, 0],
  [94.9, 24.5, 3, 5.4, -3.3, 0],
  [36.7, 13, 4, 4.3, -2, 0],
  [35.2, 46.4, 3, 5.1, -1.3, 0],
  [42.6, 58, 16, 6, -4.8, 1],
  [51.5, 8.4, 4, 5.7, -1.1, 0],
  [31, 6.7, 3, 3.6, -4.6, 0],
  [77.5, 9.4, 3, 4.4, -4.5, 0],
  [9, 71.7, 3, 5.6, -1, 0]
]

const SPARKLE =
  'polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%)'

const MOON_CRATERS =
  circle(49, 50, 6) +
  circle(68, 42, 3.5) +
  circle(58, 72, 7.5) +
  circle(76, 62, 4)

/* ---------- island ------------------------------------------------------ */

// Hills are drawn in a 1440 x 220 box that stretches to the page width. They
// run past the box on every side so the rim strokes never show an end.
const HILL_FAR =
  'M-80,64C51,64 80,36 210,36C327,36 353,84 470,84C614,84 646,16 790,16C921,16 950,76 1080,76C1179,76 1201,44 1300,44C1408,44 1432,80 1540,80V240H-80Z'
const HILL_MID =
  'M-100,96C94,96 137,126 330,126C470,126 501,86 640,86C798,86 833,126 990,126C1062,126 1078,98 1150,98C1308,98 1343,130 1500,130V240H-100Z'
const HILL_NEAR =
  'M-140,170C-18,170 9,130 130,130C306,130 345,174 520,174C691,174 729,152 900,152C986,152 1005,168 1090,168C1180,168 1200,128 1290,128C1430,128 1461,170 1600,170V240H-140Z'

const PINE_TIERS = [
  [30, 20, 44],
  [24, 46, 38],
  [17, 70, 32]
]
const OAK_PUFFS = [
  [-16, 46, 20],
  [14, 44, 22],
  [0, 66, 22]
]

const round = n => Math.round(n * 10) / 10

// Trees grow up from (cx, ground) at scale s. Each returns the three paths
// of its two-tone look: trunk, full canopy, and the lit side of the canopy.
const pine = (cx, ground, s) => ({
  trunk: `M${round(cx - 5 * s)},${ground}V${round(ground - 24 * s)}H${round(cx + 5 * s)}V${ground}Z`,
  canopy: PINE_TIERS.map(
    ([half, y, h]) =>
      `M${round(cx - half * s)},${round(ground - y * s)}L${cx},${round(ground - (y + h) * s)}L${round(cx + half * s)},${round(ground - y * s)}Z`
  ).join(''),
  lit: PINE_TIERS.map(
    ([half, y, h]) =>
      `M${round(cx - half * s)},${round(ground - y * s)}L${cx},${round(ground - (y + h) * s)}V${round(ground - y * s)}Z`
  ).join('')
})

const oak = (cx, ground, s) => ({
  trunk: `M${round(cx - 5 * s)},${ground}V${round(ground - 34 * s)}H${round(cx + 5 * s)}V${ground}Z`,
  canopy: OAK_PUFFS.map(([x, y, r]) =>
    circle(round(cx + x * s), round(ground - y * s), round(r * s))
  ).join(''),
  lit: OAK_PUFFS.map(([x, y, r]) =>
    circle(
      round(cx + (x - 3) * s),
      round(ground - (y + 4) * s),
      round((r - 5) * s)
    )
  ).join('')
})

// A grove merges its trees into three paths, so each one costs four nodes.
const grove = (w, h, trees) => {
  const parts = trees.map(([tree, cx, s]) => tree(cx, h, s))
  return {
    viewBox: `0 0 ${w} ${h}`,
    trunk: parts.map(p => p.trunk).join(''),
    canopy: parts.map(p => p.canopy).join(''),
    lit: parts.map(p => p.lit).join('')
  }
}

// Back to front. `left` and `lift` pin each grove to a crest of the hill
// paths above: left = crest x / 1440, lift = (220 - crest y) / 220.
const GROVES = [
  {
    art: grove(110, 80, [
      [pine, 30, 0.72],
      [pine, 64, 0.56],
      [oak, 91, 0.4]
    ]),
    left: '79.9%',
    lift: 0.555,
    width: { base: '50px', md: '84px' }
  },
  {
    art: grove(154, 112, [
      [pine, 50, 1.05],
      [pine, 104, 0.7],
      [oak, 133, 0.42]
    ]),
    left: '9%',
    lift: 0.409,
    width: { base: '84px', md: '150px' }
  },
  {
    art: grove(130, 112, [
      [oak, 46, 1.1],
      [pine, 101, 0.74]
    ]),
    left: '89.6%',
    lift: 0.418,
    width: { base: '76px', md: '132px' }
  }
]

// The footer sits on this much solid ground (px) below the hills
const GROUND = 200

/* ---------- component --------------------------------------------------- */

const Layer = chakra(motion.div)

const Sky = () => {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  // Reduced motion only changes the motion values, never the markup, so the
  // server render and the first client render stay identical.
  const pace = reduceMotion ? 0 : -1
  const farY = useTransform(scrollY, y => y * DEPTHS[0].speed * pace)
  const midY = useTransform(scrollY, y => y * DEPTHS[1].speed * pace)
  const nearY = useTransform(scrollY, y => y * DEPTHS[2].speed * pace)

  return (
    <Box
      aria-hidden="true"
      position="absolute"
      inset={0}
      zIndex={0}
      overflow="hidden"
      pointerEvents="none"
      bgRepeat="no-repeat"
      sx={{
        ...DAY,
        backgroundImage: `${SUN}, ${skyGradient(SKY.day)}`,
        _dark: {
          ...NIGHT,
          backgroundImage: `${STORM}, ${skyGradient(SKY.night)}`
        }
      }}
    >
      {/* Night only: moon and stars over the top third of the page */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="max(34%, 90vh)"
        display="none"
        _dark={{ display: 'block' }}
      >
        <Box
          as="svg"
          viewBox="0 0 120 120"
          position="absolute"
          top={ORB_Y}
          right={ORB_X}
          w="clamp(84px, 11vw, 150px)"
          h="auto"
          transform="translate(50%, -50%)"
        >
          <circle cx="60" cy="60" r="58" fill="#b9a6ff" opacity="0.1" />
          <circle cx="60" cy="60" r="45" fill="#b9a6ff" opacity="0.16" />
          <circle cx="60" cy="60" r="31" fill="#f1ecff" />
          <path d="M60,29a31,31 0 0,1 0,62a40,40 0 0,0 0,-62z" fill="#d9d0f7" />
          <path d={MOON_CRATERS} fill="#c9bff0" />
        </Box>
        {STARS.map(([left, top, size, seconds, delay, sparkle], i) => (
          <Box
            key={i}
            position="absolute"
            bg="#ffffff"
            opacity={0.85}
            animation={`${twinkle} ease-in-out infinite`}
            sx={still}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDuration: `${seconds}s`,
              animationDelay: `${delay}s`,
              ...(sparkle ? { clipPath: SPARKLE } : { borderRadius: '50%' })
            }}
          />
        ))}
      </Box>

      {/* Clouds: one scroll-parallax layer per depth, each cloud drifting */}
      {[farY, midY, nearY].map((y, depth) => (
        <Layer
          key={depth}
          position="absolute"
          inset={0}
          style={{ y }}
          sx={{
            '@media (prefers-reduced-motion: no-preference)': {
              willChange: 'transform'
            }
          }}
        >
          {CLOUDS.map(
            (cloud, i) =>
              cloud.depth === depth && (
                <Box
                  as="svg"
                  key={i}
                  viewBox={cloud.art.viewBox}
                  position="absolute"
                  display="block"
                  h="auto"
                  opacity={DEPTHS[depth].opacity}
                  animation={`${DEPTHS[depth].drift} ease-in-out infinite`}
                  sx={still}
                  style={cloud.style}
                >
                  <path
                    d={cloud.art.body}
                    style={{ fill: 'var(--sky-cloud-shade)' }}
                  />
                  <path
                    d={cloud.art.lit}
                    style={{ fill: 'var(--sky-cloud)' }}
                  />
                </Box>
              )
          )}
        </Layer>
      ))}

      {/* The island: stretchy hills over a slab of solid ground */}
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        h={{ base: '320px', md: '420px' }}
        bgImage="linear-gradient(var(--sky-ground), var(--sky-ground))"
        bgSize={`100% ${GROUND + 1}px`}
        bgPosition="bottom"
        bgRepeat="no-repeat"
      >
        <Box
          as="svg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          position="absolute"
          top={0}
          left={0}
          display="block"
          w="100%"
          h={`calc(100% - ${GROUND}px)`}
        >
          <linearGradient
            id="sky-grass"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="126"
            x2="0"
            y2="220"
          >
            {/* Eases into the ground colour a few px above the slab, so the
                SVG's bottom edge is ground meeting ground */}
            <stop offset="0" style={{ stopColor: 'var(--sky-grass)' }} />
            <stop
              offset="0.55"
              style={{ stopColor: 'var(--sky-grass-deep)' }}
            />
            <stop
              offset="0.72"
              style={{ stopColor: 'var(--sky-grass-deeper)' }}
            />
            <stop
              offset="0.85"
              style={{ stopColor: 'var(--sky-grass-floor)' }}
            />
            <stop offset="0.94" style={{ stopColor: 'var(--sky-ground)' }} />
          </linearGradient>
          <path d={HILL_FAR} style={{ fill: 'var(--sky-hill-far)' }} />
          <path
            d={HILL_MID}
            style={{
              fill: 'var(--sky-hill-mid)',
              stroke: 'var(--sky-hill-rim)'
            }}
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={HILL_NEAR}
            fill="url(#sky-grass)"
            style={{ stroke: 'var(--sky-grass-rim)' }}
            strokeWidth="6"
            vectorEffect="non-scaling-stroke"
          />
        </Box>

        {GROVES.map(({ art, left, lift, width }) => (
          <Box
            as="svg"
            key={left}
            viewBox={art.viewBox}
            position="absolute"
            display="block"
            left={left}
            bottom={`calc(${GROUND}px + (100% - ${GROUND}px) * ${lift} - 4px)`}
            w={width}
            h="auto"
            overflow="visible"
            transform="translateX(-50%)"
          >
            <path d={art.trunk} style={{ fill: 'var(--sky-trunk)' }} />
            <path
              d={art.canopy}
              style={{ fill: 'var(--sky-tree)', stroke: 'var(--sky-tree)' }}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d={art.lit}
              style={{
                fill: 'var(--sky-tree-lit)',
                stroke: 'var(--sky-tree-lit)'
              }}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </Box>
        ))}

        {/* Supply drop, hovering over the near hill. It stays inside the
            content column (the right page margin belongs to the DropHud rail)
            and relies on the footer's top margin to keep panels off it. */}
        <Box
          as="svg"
          viewBox="0 0 100 160"
          position="absolute"
          display="block"
          left="55%"
          bottom={{ base: '258px', md: '280px' }}
          w={{ base: '52px', md: '84px' }}
          h="auto"
          animation={`${bob} 5s ease-in-out infinite alternate`}
          sx={still}
        >
          <path
            d="M50,80L27,109M50,80L73,109"
            fill="none"
            stroke="#e8f1ff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="50" cy="38" rx="31" ry="35" fill="#ffd23d" />
          <path
            d="M50,3c17,0 31,15.7 31,35s-14,35 -31,35c8,-8 12,-20.5 12,-35s-4,-27 -12,-35z"
            fill="#f5a623"
          />
          <path
            d="M50,3c-7,8 -11,20.5 -11,35s4,27 11,35c7,-8 11,-20.5 11,-35s-4,-27 -11,-35z"
            fill="#ffe98a"
            opacity="0.55"
          />
          <ellipse
            cx="35"
            cy="24"
            rx="5"
            ry="8.5"
            fill="#ffffff"
            opacity="0.7"
            transform="rotate(24 35 24)"
          />
          <path d="M45,72h10l3,9h-16z" fill="#c9790f" />
          <rect x="20" y="106" width="60" height="50" rx="6" fill="#1746b0" />
          <rect x="20" y="106" width="60" height="44" rx="6" fill="#2f86f0" />
          <path d="M29,115h42v26h-42z" fill="#1b54c9" />
          <path
            d="M29,115l42,26M71,115l-42,26"
            stroke="#2f86f0"
            strokeWidth="6"
          />
          <path
            d="M20,112a6,6 0 0,1 6,-6h10l-16,14zM80,112a6,6 0 0,0 -6,-6h-10l16,14z"
            fill="#ffe83d"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Sky
