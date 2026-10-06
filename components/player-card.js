import { Fragment } from 'react'
import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden
} from '@chakra-ui/react'
import {
  PROFILE,
  EXPERIENCES,
  PROJECTS,
  LEADERSHIP,
  SIDE_QUESTS,
  SHOW_SIDE_QUESTS
} from '../lib/data'
import { getRarity, rarityGradient } from '../lib/rarity'
import { TagList } from './skill-tag'

const INSET_BG = 'rgba(5, 10, 40, 0.5)'

const initials = PROFILE.firstName
  .split(' ')
  .map(word => word[0])
  .join('')

const wins = [
  ...PROJECTS,
  ...(SHOW_SIDE_QUESTS ? SIDE_QUESTS.projects || [] : [])
].filter(project => project.win).length

const FACTS = [
  ['School', PROFILE.school],
  ['Degree', PROFILE.degree],
  ['Graduating', PROFILE.gradDate],
  ['Based in', PROFILE.location],
  ['Off the clock', PROFILE.interests.join(' · ')]
]

// `sr` is a plain-language version for screen readers when the visible
// label is themed.
const STATS = [
  {
    value: wins,
    label: '#1 Victory Royales',
    caption: 'hackathon wins',
    sr: `${wins} first-place hackathon wins`
  },
  { value: EXPERIENCES.length, label: 'internships' },
  { value: LEADERSHIP.length, label: 'orgs led' }
]

// Full, segmented HUD bar. Decorative only.
const Meter = ({ label, color }) => (
  <Flex align="center" gap={2.5}>
    <Box as="span" w="42px" textStyle="hud" fontSize="11px" color="fn.muted">
      {label}
    </Box>
    <Box
      flex={1}
      h="12px"
      p="2px"
      bg="rgba(3, 8, 30, 0.75)"
      borderRadius="3px"
      transform="skewX(-12deg)"
    >
      <Box
        h="100%"
        borderRadius="1px"
        bgColor={color}
        bgImage="repeating-linear-gradient(90deg, rgba(3, 8, 30, 0) 0, rgba(3, 8, 30, 0) calc(10% - 2px), rgba(3, 8, 30, 0.75) calc(10% - 2px), rgba(3, 8, 30, 0.75) 10%), linear-gradient(180deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%)"
      />
    </Box>
    <Box as="span" w="24px" textStyle="hud" fontSize="xs" textAlign="right">
      100
    </Box>
  </Flex>
)

const StatTile = ({ value, label, caption, sr }) => (
  <Flex
    as="li"
    align="center"
    gap={3.5}
    px={4}
    py={3}
    bg={INSET_BG}
    border="1px solid"
    borderColor="fn.line"
    borderRadius="10px"
  >
    {sr && <VisuallyHidden>{sr}</VisuallyHidden>}
    <Box
      as="span"
      aria-hidden={sr ? 'true' : undefined}
      flexShrink={0}
      pt="6px"
      textStyle="display"
      fontSize={{ base: '40px', md: '48px' }}
      color="fn.yellow"
      textShadow="0 3px 0 rgba(5, 10, 40, 0.7)"
    >
      {value}
    </Box>
    <Box aria-hidden={sr ? 'true' : undefined} minW={0}>
      <Box
        as="span"
        display="block"
        textStyle="hud"
        fontSize="md"
        color="white"
      >
        {label}
      </Box>
      {caption && (
        <Box as="span" display="block" mt={0.5} fontSize="xs" color="fn.muted">
          {caption}
        </Box>
      )}
    </Box>
  </Flex>
)

const PlayerCard = () => {
  const legendary = getRarity('legendary')

  return (
    <Box layerStyle="panel" p={{ base: 5, md: 8 }}>
      <Grid
        templateColumns={{ base: '1fr', md: 'minmax(0, 1.2fr) minmax(0, 1fr)' }}
        gap={{ base: 6, md: 8 }}
        alignItems="start"
      >
        <Stack spacing={4} fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.7}>
          {PROFILE.about.map(paragraph => (
            <Text key={paragraph}>{paragraph}</Text>
          ))}
        </Stack>

        <Box
          p={{ base: 4, md: 5 }}
          bg={INSET_BG}
          border="1px solid"
          borderColor="fn.line"
          borderRadius="12px"
        >
          <Flex align="center" gap={4}>
            <Flex
              aria-hidden="true"
              flexShrink={0}
              align="center"
              justify="center"
              boxSize="72px"
              pt="5px"
              textStyle="display"
              fontSize="34px"
              color="white"
              textShadow="0 2px 0 #0a1238"
              bg={rarityGradient('legendary')}
              border="3px solid"
              borderColor="fn.ink"
              borderRadius="12px"
              boxShadow={`0 0 0 2px ${legendary.color}, 0 6px 0 rgba(5, 10, 40, 0.5)`}
            >
              {initials}
            </Flex>
            <Box minW={0}>
              <Text textStyle="display" fontSize={{ base: '24px', md: '26px' }}>
                {PROFILE.name}
              </Text>
              <Box
                layerStyle="tag"
                display="inline-block"
                mt={1.5}
                px={2}
                py="2px"
              >
                <Box
                  as="span"
                  display="block"
                  textStyle="hud"
                  fontSize="xs"
                  transform="skewX(8deg)"
                >
                  Class of {PROFILE.gradYear}
                </Box>
              </Box>
            </Box>
          </Flex>

          <Stack aria-hidden="true" spacing={1.5} mt={5}>
            <Meter label="Shield" color="fn.shield" />
            <Meter label="Health" color="fn.health" />
          </Stack>

          <Grid
            as="dl"
            templateColumns="max-content minmax(0, 1fr)"
            columnGap={{ base: 3, md: 4 }}
            rowGap={2.5}
            alignItems="baseline"
            mt={5}
          >
            {FACTS.map(([label, value]) => (
              <Fragment key={label}>
                <Box as="dt" textStyle="hud" fontSize="xs" color="fn.muted">
                  {label}
                </Box>
                <Box as="dd" fontSize="sm" lineHeight={1.45} color="fn.text">
                  {value}
                </Box>
              </Fragment>
            ))}
          </Grid>
        </Box>
      </Grid>

      <SimpleGrid
        as="ul"
        role="list"
        columns={{ base: 1, md: 3 }}
        spacing={3}
        listStyleType="none"
        mt={{ base: 6, md: 8 }}
      >
        {STATS.map(stat => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </SimpleGrid>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        gap={{ base: 2.5, md: 4 }}
        mt={{ base: 6, md: 7 }}
      >
        <Text
          id="coursework-label"
          flexShrink={0}
          textStyle="hud"
          fontSize="sm"
          color="fn.muted"
        >
          Coursework
        </Text>
        <TagList
          items={PROFILE.coursework}
          aria-labelledby="coursework-label"
        />
      </Flex>
    </Box>
  )
}

export default PlayerCard
