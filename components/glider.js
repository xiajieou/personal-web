import { chakra } from '@chakra-ui/react'

const INK = '#0a1238'
const SUIT = '#2f7dff'
const SKIN = '#ffd9b0'
const ICE = '#bfe9ff'

// Original art: a chunky skydiver under an open umbrella glider. Drawn with
// heavy outlines so it still reads at ~50px on both the day and night sky.
const Glider = props => (
  <chakra.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 96 96"
    aria-hidden="true"
    focusable="false"
    display="block"
    boxSize="52px"
    flexShrink={0}
    {...props}
  >
    <g stroke={INK} strokeLinejoin="round" strokeLinecap="round">
      {/* Lines: ink casing with a light core so they show on the night sky */}
      <path d="M13 33 31 56M83 33 65 56" fill="none" strokeWidth="4.6" />
      <path
        d="M13 33 31 56M83 33 65 56"
        fill="none"
        stroke={ICE}
        strokeWidth="1.8"
      />

      {/* Canopy */}
      <path
        d="M6 34C6 15 24 4.5 48 4.5S90 15 90 34q-10.5-7.5-21 0-10.5-7.5-21 0-10.5-7.5-21 0-10.5-7.5-21 0Z"
        fill="#ffe83d"
        strokeWidth="3.5"
      />
      <path
        d="M27 34C27.5 19 36 8 48 4.5 60 8 68.5 19 69 34q-10.5-7.5-21 0-10.5-7.5-21 0Z"
        fill="#ffc21a"
        strokeWidth="2.5"
      />
      <path d="M48 4.5V34" fill="none" strokeWidth="2.5" />
      <path
        d="M14 23c3-7 9-11 17-13.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.5"
      />

      {/* Legs and arms: ink casing first, colour on top */}
      <path d="M43.5 85 42 90.5M52.5 85 54 90.5" fill="none" strokeWidth="9" />
      <path
        d="M43.5 85 42 90.5M52.5 85 54 90.5"
        fill="none"
        stroke="#1b3fc4"
        strokeWidth="4.8"
      />
      <path d="M41 73 31 56M55 73 65 56" fill="none" strokeWidth="8.6" />
      <path
        d="M41 73 31 56M55 73 65 56"
        fill="none"
        stroke={SUIT}
        strokeWidth="4.4"
      />

      {/* Body and belt */}
      <rect
        x="38"
        y="66"
        width="20"
        height="21"
        rx="7.5"
        fill={SUIT}
        strokeWidth="3"
      />
      <path
        d="M40.3 80h15.4"
        fill="none"
        stroke="#ffe83d"
        strokeWidth="3"
        strokeLinecap="butt"
      />

      {/* Head, helmet and goggles */}
      <circle cx="48" cy="59" r="11.5" fill={SKIN} strokeWidth="3" />
      <path
        d="M36.6 57.5a11.5 11.5 0 0 1 22.8 0Z"
        fill={SUIT}
        strokeWidth="2.5"
      />
      <rect
        x="40.5"
        y="55"
        width="15"
        height="6.6"
        rx="3.3"
        fill={ICE}
        strokeWidth="2.4"
      />
      <path d="M43.8 57.6h3" fill="none" stroke="#ffffff" strokeWidth="1.6" />

      {/* Hands */}
      <circle cx="31" cy="56" r="3.3" fill={SKIN} strokeWidth="2.4" />
      <circle cx="65" cy="56" r="3.3" fill={SKIN} strokeWidth="2.4" />
    </g>
  </chakra.svg>
)

export default Glider
