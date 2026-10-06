import { Box } from '@chakra-ui/react'
import { getRarity } from '../lib/rarity'

const withAlpha = (hex, alpha) => {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

// Row of small HUD pills (tech tags, coursework)
export const TagList = ({ items = [], ...rest }) => {
  if (items.length === 0) return null
  return (
    <Box
      as="ul"
      role="list"
      display="flex"
      flexWrap="wrap"
      gap={2}
      listStyleType="none"
      {...rest}
    >
      {items.map(item => (
        <Box
          as="li"
          key={item}
          textStyle="hud"
          fontSize="13px"
          letterSpacing="0.06em"
          color="fn.text"
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="fn.line"
          borderRadius="6px"
          px={2}
          py={1}
        >
          {item}
        </Box>
      ))}
    </Box>
  )
}

// One inventory slot in the loadout. Render it inside a <ul>.
const SkillTag = ({ children, rarity }) => {
  const r = getRarity(rarity)
  const shine = 'inset 0 1px 0 rgba(255, 255, 255, 0.16)'
  return (
    <Box
      as="li"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minW="108px"
      h="64px"
      px={3}
      textStyle="hud"
      fontSize="md"
      lineHeight={1.1}
      color="white"
      textAlign="center"
      textShadow="0 1px 0 rgba(5, 10, 40, 0.65)"
      bg={`linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.25)), ${withAlpha(r.to, 0.7)}`}
      border="2px solid"
      borderColor={r.color}
      borderBottomWidth="4px"
      borderRadius="8px"
      boxShadow={shine}
      transition="transform 140ms ease, box-shadow 140ms ease"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: `${shine}, 0 0 0 1px ${r.color}, 0 6px 20px -2px ${r.glow}`
      }}
      sx={{
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          _hover: { transform: 'none' }
        }
      }}
    >
      {children}
    </Box>
  )
}

export default SkillTag
