import { Box } from '@chakra-ui/react'

// Ink edge that keeps white text readable straight on the sky, day or night
export const ON_SKY_SHADOW =
  '0 0.06em 0 #0a1238, 0 0.14em 0.25em rgba(5,10,40,0.45)'

const SectionHeading = ({ number, title, kicker }) => (
  <Box mb={{ base: 6, md: 8 }}>
    <Box
      aria-hidden="true"
      layerStyle="tag"
      display="inline-block"
      px={3}
      py={1}
      mb={{ base: 2, md: 3 }}
      boxShadow="0 3px 0 rgba(10, 18, 56, 0.6)"
    >
      <Box
        as="span"
        display="block"
        textStyle="hud"
        fontSize="sm"
        transform="skewX(8deg)"
      >
        {`${number} // ${kicker}`}
      </Box>
    </Box>
    <Box
      as="h2"
      textStyle="display"
      fontSize={{ base: '44px', md: '64px' }}
      color="white"
      textShadow={ON_SKY_SHADOW}
    >
      {title}
    </Box>
  </Box>
)

// Smaller heading for the extra content under a section's main list. It sits
// in the same dark HUD chip as the hero chips: at this size the ink shadow
// alone is not enough to keep it readable on the lighter day sky further
// down the page. `title` is the themed name, `caption` says plainly what it is.
export const SubHeading = ({ title, caption, as = 'h3', ...rest }) => (
  <Box
    as={as}
    textStyle="hud"
    fontSize="lg"
    color="white"
    w="fit-content"
    bg="fn.panel"
    border="1px solid"
    borderColor="fn.line"
    borderRadius="6px"
    px={3.5}
    py={2}
    mt={{ base: 10, md: 12 }}
    mb={5}
    {...rest}
  >
    {title}
    {caption && (
      <Box as="span" color="fn.yellow">
        {` // ${caption}`}
      </Box>
    )}
  </Box>
)

export default SectionHeading
