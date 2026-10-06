import { useId } from 'react'
import { chakra } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const INK = '#0a1238'
const YELLOW = '#ffe83d'
const GOLD = '#f9bf30'
const BLUE = '#1e90ff'
const ROYAL = '#1b3fc4'
const SKY = '#58c4ff'
const ORANGE = '#ff9f3d'
const STEEL = '#aab4d4'
const GLASS = '#16235c'

// Each of these outlines is drawn more than once (fill, clip, ink line).
const ENVELOPE =
  'M320 30C444 30 536 98 536 186C536 282 432 328 382 392L258 392C208 328 104 282 104 186C104 98 196 30 320 30Z'
const BODY =
  'M172 474H480Q524 474 524 518V606Q524 646 484 646H112Q72 646 72 606V592Q72 562 100 558L114 556L130 504Q139 474 172 474Z'
const ROPES = 'M172 300L182 462M224 348L232 462M416 348L408 462M468 300L458 462'

const sway = keyframes`
  from { transform: rotate(-1.5deg) }
  to { transform: rotate(1.5deg) }
`

// The ropes shear in step with the balloon so their tops follow it while
// their feet stay planted on the roof rack.
const lean = keyframes`
  from { transform: skewX(0.9deg) }
  to { transform: skewX(-0.9deg) }
`

const flicker = keyframes`
  0%, 100% { transform: scale(1, 1); opacity: 1 }
  22% { transform: scale(0.94, 1.05) }
  48% { transform: scale(1.05, 0.92); opacity: 0.86 }
  74% { transform: scale(0.97, 1.04) }
`

const thrust = keyframes`
  0%, 100% { transform: scale(1, 1); opacity: 1 }
  35% { transform: scale(1.14, 0.93) }
  65% { transform: scale(0.9, 1.05); opacity: 0.84 }
`

const MOVING = '.bb-balloon, .bb-ropes, .bb-burner, .bb-thruster'

// fill-box makes each origin relative to the group's own bounding box: the
// balloon pivots on its mouth, the ropes on the roof rack, and each flame
// scales away from its nozzle. The balloon and rope geometry (clipped parts
// included) is symmetric about x=320, which keeps 50% on the centre line.
const MOTION = {
  [MOVING]: { transformBox: 'fill-box' },
  '.bb-balloon': {
    transformOrigin: '50% 100%',
    animation: `${sway} 3.4s ease-in-out infinite alternate`
  },
  '.bb-ropes': {
    transformOrigin: '50% 100%',
    animation: `${lean} 3.4s ease-in-out infinite alternate`
  },
  '.bb-burner': {
    transformOrigin: '50% 100%',
    animation: `${flicker} 0.9s ease-in-out infinite`
  },
  '.bb-thruster': {
    transformOrigin: '0% 50%',
    animation: `${thrust} 0.45s ease-in-out infinite`
  },
  '@media (prefers-reduced-motion: reduce)': {
    [MOVING]: { animation: 'none' }
  }
}

const Pane = ({ x }) => (
  <g transform={`translate(${x} 502)`}>
    <rect
      width="76"
      height="52"
      rx="9"
      fill={GLASS}
      stroke={INK}
      strokeWidth="8"
    />
    <path d="M12 45L31 7H49L30 45Z" fill={SKY} opacity=".6" />
    <path d="M42 45L61 7H67L48 45Z" fill="#fff" opacity=".55" />
  </g>
)

const Wheel = ({ x }) => (
  <g transform={`translate(${x} 648)`}>
    <circle r="46" fill="#27306b" stroke={INK} strokeWidth="12" />
    <path d="M-29 -14A32 32 0 0 1 -6 -31" stroke="#8c9be0" strokeWidth="7" />
    <circle r="22" fill={YELLOW} stroke={INK} strokeWidth="8" />
    <path d="M-11 -6A13 13 0 0 1 -2 -13" stroke="#fff" strokeWidth="5" />
    <circle r="7" fill={INK} />
  </g>
)

const BattleBus = ({
  animated = true,
  title = 'Flying battle bus',
  sx,
  ...props
}) => {
  // useId output contains colons, which are awkward inside url(#...)
  const uid = `bb-${useId().replace(/:/g, '')}`
  const ref = name => `url(#${uid}-${name})`

  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 720"
      width="100%"
      height="auto"
      display="block"
      overflow="visible"
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      sx={{ ...(animated ? MOTION : null), ...sx }}
      {...props}
    >
      <defs>
        <clipPath id={`${uid}-envelope`}>
          <path d={ENVELOPE} />
        </clipPath>
        <clipPath id={`${uid}-body`}>
          <path d={BODY} />
        </clipPath>
        {/* Hard stop at the centre line: the two far-side gores sit in shade */}
        <linearGradient id={`${uid}-gold`}>
          <stop offset=".5" stopColor={YELLOW} />
          <stop offset=".5" stopColor={GOLD} />
        </linearGradient>
        <linearGradient id={`${uid}-blue`}>
          <stop offset=".5" stopColor={BLUE} />
          <stop offset=".5" stopColor="#1b78e2" />
        </linearGradient>
      </defs>

      <g fill="none" strokeLinejoin="round" strokeLinecap="round">
        <g className="bb-ropes">
          <path d={ROPES} stroke={INK} strokeWidth="16" />
          <path d={ROPES} stroke={YELLOW} strokeWidth="6" />
        </g>

        <g className="bb-thruster">
          <path
            d="M546 564C582 560 600 582 616 593C600 604 582 626 546 622Z"
            fill={ORANGE}
            stroke={INK}
            strokeWidth="9"
          />
          <path
            d="M546 577C570 575 584 586 592 593C584 600 570 611 546 609Z"
            fill={YELLOW}
          />
          <path
            d="M546 586C558 586 564 590 568 593C564 596 558 600 546 600Z"
            fill="#fff"
          />
        </g>

        <g className="bb-balloon">
          <path d={ENVELOPE} fill={ref('gold')} />
          <g clipPath={ref('envelope')} stroke={INK} strokeWidth="6">
            <path
              d="M320 30C419 30 493 98 493 186C493 282 410 328 368 392L272 392C230 328 147 282 147 186C147 98 221 30 320 30Z"
              fill={ref('blue')}
            />
            <path
              d="M320 30C382 30 428 98 428 186C428 282 376 328 350 392L290 392C264 328 212 282 212 186C212 98 258 30 320 30Z"
              fill={YELLOW}
            />
            <path
              d="M320 30C342 30 359 98 359 186C359 282 340 328 331 392L309 392C300 328 281 282 281 186C281 98 298 30 320 30Z"
              fill="#fff"
            />
            <path
              d="M40 266Q320 210 600 266V304Q320 248 40 304Z"
              fill={ROYAL}
              strokeWidth="8"
            />
            <g fill="#fff" stroke="none">
              <circle cx="320" cy="257" r="10" />
              <circle cx="240" cy="259" r="10" />
              <circle cx="400" cy="259" r="10" />
              <circle cx="168" cy="266" r="9" />
              <circle cx="472" cy="266" r="9" />
            </g>
            <path
              d="M220 364Q320 338 420 364V406H220Z"
              fill={ROYAL}
              strokeWidth="8"
            />
            <ellipse
              cx="196"
              cy="112"
              rx="16"
              ry="42"
              transform="rotate(32 196 112)"
              fill="#fff"
              stroke="none"
              opacity=".85"
            />
            <circle
              cx="166"
              cy="176"
              r="8"
              fill="#fff"
              stroke="none"
              opacity=".85"
            />
            <path
              d="M127 150C132 120 150 94 178 76"
              stroke="#fff"
              strokeWidth="7"
              opacity=".9"
            />
          </g>
          <path d={ENVELOPE} stroke={INK} strokeWidth="14" />
          <ellipse
            cx="320"
            cy="392"
            rx="62"
            ry="13"
            fill={GLASS}
            stroke={INK}
            strokeWidth="9"
          />
          <path
            d="M290 36Q292 18 320 18Q348 18 350 36Q320 45 290 36Z"
            fill={ROYAL}
            stroke={INK}
            strokeWidth="8"
          />
          <path d="M304 28Q310 25 318 25" stroke={SKY} strokeWidth="5" />
          <g fill={YELLOW} stroke={INK} strokeWidth="6">
            <circle cx="176" cy="315" r="8" />
            <circle cx="226" cy="359" r="8" />
            <circle cx="414" cy="359" r="8" />
            <circle cx="464" cy="315" r="8" />
          </g>
        </g>

        <g className="bb-burner">
          <path
            d="M323 381C331 397 349 409 349 427C349 443 336 452 320 452C304 452 291 443 291 427C291 418 296 411 302 405C304 412 307 416 311 418C311 404 317 392 323 381Z"
            fill={ORANGE}
            stroke={INK}
            strokeWidth="8"
          />
          <path
            d="M320 407C327 416 338 423 338 434C338 444 329 449 320 449C311 449 302 444 302 434C302 423 313 416 320 407Z"
            fill={YELLOW}
          />
          <ellipse cx="320" cy="437" rx="7" ry="8" fill="#fff" />
        </g>

        <g className="bb-bus">
          <path d="M500 482L507 420" stroke={INK} strokeWidth="11" />
          <path d="M500 482L507 420" stroke={STEEL} strokeWidth="4" />
          <path
            d="M507 424L552 438L504 451Z"
            fill={YELLOW}
            stroke={INK}
            strokeWidth="7"
          />
          <rect
            x="297"
            y="436"
            width="46"
            height="18"
            rx="5"
            fill={STEEL}
            stroke={INK}
            strokeWidth="7"
          />
          <rect
            x="160"
            y="450"
            width="320"
            height="28"
            rx="11"
            fill={YELLOW}
            stroke={INK}
            strokeWidth="10"
          />
          <path d="M178 461H222M236 461H244" stroke="#fff" strokeWidth="5" />
          <path
            d="M518 574L550 562V624L518 612Z"
            fill={STEEL}
            stroke={INK}
            strokeWidth="10"
          />
          <path d="M527 579L541 574" stroke="#fff" strokeWidth="5" />
          <path d="M128 524H112" stroke={INK} strokeWidth="9" />
          <rect
            x="96"
            y="508"
            width="17"
            height="32"
            rx="7"
            fill={YELLOW}
            stroke={INK}
            strokeWidth="8"
          />
          <path d={BODY} fill={BLUE} />
          <g clipPath={ref('body')}>
            <rect x="60" y="466" width="480" height="24" fill={SKY} />
            <rect x="60" y="592" width="480" height="60" fill={ROYAL} />
            <rect
              x="99"
              y="574"
              width="460"
              height="18"
              fill={YELLOW}
              stroke={INK}
              strokeWidth="6"
            />
            <path
              d="M124 648A56 56 0 0 1 236 648ZM364 648A56 56 0 0 1 476 648Z"
              fill={INK}
            />
          </g>
          <path
            d="M190 485H330M348 485H372"
            stroke="#fff"
            strokeWidth="7"
            opacity=".9"
          />
          <path
            d="M262 620H326M342 620H354"
            stroke={SKY}
            strokeWidth="6"
            opacity=".85"
          />
          <path d={BODY} stroke={INK} strokeWidth="14" />
          <path
            d="M157 502H184Q192 502 192 510V546Q192 554 184 554H142Q134 554 136 546L147 510Q149 502 157 502Z"
            fill={GLASS}
            stroke={INK}
            strokeWidth="8"
          />
          <path d="M150 548L162 508H174L162 548Z" fill={SKY} opacity=".6" />
          <Pane x={208} />
          <Pane x={300} />
          <Pane x={392} />
          <rect
            x="496"
            y="518"
            width="14"
            height="30"
            rx="5"
            fill={ORANGE}
            stroke={INK}
            strokeWidth="6"
          />
          <circle
            cx="99"
            cy="585"
            r="14"
            fill={YELLOW}
            stroke={INK}
            strokeWidth="8"
          />
          <circle cx="94" cy="580" r="4.5" fill="#fff" />
          <rect
            x="48"
            y="621"
            width="76"
            height="26"
            rx="11"
            fill={YELLOW}
            stroke={INK}
            strokeWidth="10"
          />
          <path d="M62 630H82" stroke="#fff" strokeWidth="5" />
          <Wheel x={180} />
          <Wheel x={420} />
        </g>
      </g>
    </chakra.svg>
  )
}

export default BattleBus
