import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { IoArrowForward, IoLocationSharp } from 'react-icons/io5'
import { TagList } from './skill-tag'

// Bulleted list with a slanted square marker in the given color
export const BulletList = ({ items = [], marker = 'fn.yellow', ...rest }) => (
  <Box
    as="ul"
    role="list"
    display="grid"
    gap={2}
    listStyleType="none"
    lineHeight={1.65}
    color="rgba(244, 248, 255, 0.92)"
    {...rest}
  >
    {items.map(item => (
      <Box
        as="li"
        key={item}
        position="relative"
        pl={5}
        _before={{
          content: '""',
          position: 'absolute',
          left: '2px',
          // half of the 1.65 line height, minus half the marker
          top: 'calc(0.825em - 4px)',
          w: '8px',
          h: '8px',
          bg: marker,
          borderRadius: '1px',
          transform: 'skewX(-8deg)'
        }}
      >
        {item}
      </Box>
    ))}
  </Box>
)

const ExperienceItem = ({
  role,
  org,
  zone,
  location,
  period,
  bullets = [],
  stats = [],
  tags = [],
  links = [],
  compact = false,
  headingAs = 'h3'
}) => {
  const meta = [period, location].filter(Boolean).join(' · ')
  const showStats = !compact && stats.length > 0

  return (
    <Flex
      as="article"
      layerStyle="panel"
      position="relative"
      overflow="hidden"
      direction="column"
      h="100%"
      p={compact ? { base: 4, md: 5 } : { base: 5, md: 6 }}
      pl={compact ? { base: '22px', md: '26px' } : { base: '26px', md: '30px' }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        w: '6px',
        bg: 'fn.yellow'
      }}
    >
      {/* The flavor tag follows the title in the DOM; it is shown above it
          when stacked and to its right on wide cards. */}
      <Flex
        direction={
          compact ? 'column-reverse' : { base: 'column-reverse', md: 'row' }
        }
        justify="space-between"
        align="flex-start"
        gap={compact ? 2.5 : { base: 2.5, md: 4 }}
      >
        <Box minW={0}>
          <Box
            as={headingAs}
            textStyle="display"
            fontSize={
              compact
                ? { base: '20px', md: '22px' }
                : { base: '24px', md: '28px' }
            }
            lineHeight={1.1}
            color="white"
          >
            {role}
          </Box>
          <Text
            mt={1.5}
            fontSize={compact ? 'md' : { base: 'md', md: 'lg' }}
            fontWeight={700}
            lineHeight={1.35}
            color="fn.yellow"
          >
            {org}
          </Text>
          {meta && (
            <Text mt={1.5} textStyle="hud" fontSize="sm" color="fn.muted">
              {meta}
            </Text>
          )}
        </Box>
        {zone && (
          <Flex
            flexShrink={0}
            align="center"
            gap={1}
            textStyle="hud"
            fontSize="xs"
            color="fn.ice"
            bg="rgba(88, 196, 255, 0.12)"
            border="1px solid"
            borderColor="fn.line"
            borderRadius="full"
            pl={2}
            pr={2.5}
            py={1}
          >
            <Box as={IoLocationSharp} aria-hidden="true" boxSize="12px" />
            <span>Drop zone: {zone}</span>
          </Flex>
        )}
      </Flex>

      {bullets.length > 0 && (
        <BulletList
          items={bullets}
          mt={compact ? 3 : 4}
          fontSize={compact ? 'sm' : { base: 'sm', md: 'md' }}
        />
      )}

      {showStats && (
        <Box
          as="ul"
          role="list"
          display="flex"
          flexWrap="wrap"
          gap={2}
          listStyleType="none"
          mt={5}
        >
          {stats.map(stat => (
            <Flex
              as="li"
              key={stat.label}
              align="center"
              gap={2}
              bg="rgba(5, 10, 40, 0.6)"
              border="1px solid"
              borderColor="fn.line"
              borderRadius="full"
              pl={3}
              pr={3.5}
              py={1}
            >
              <Box
                as="span"
                textStyle="display"
                fontSize="20px"
                color="fn.yellow"
                pt="4px"
              >
                {stat.value}
              </Box>
              <Box as="span" textStyle="hud" fontSize="sm" color="fn.text">
                {stat.label}
              </Box>
            </Flex>
          ))}
        </Box>
      )}

      {/* mt="auto" pins tags and links to the bottom when cards share a row */}
      <Box mt="auto">
        <TagList items={tags} mt={compact ? 4 : 5} />
        {links.length > 0 && (
          <Flex wrap="wrap" columnGap={5} rowGap={2} mt={4}>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label}: ${org}`}
                display="inline-flex"
                alignItems="center"
                gap={1.5}
                textStyle="hud"
                fontSize="sm"
                sx={{
                  svg: { transition: 'transform 140ms ease' },
                  '&:hover svg': { transform: 'translateX(3px)' },
                  '@media (prefers-reduced-motion: reduce)': {
                    svg: { transition: 'none' },
                    '&:hover svg': { transform: 'none' }
                  }
                }}
              >
                {link.label}
                <IoArrowForward aria-hidden="true" />
              </Link>
            ))}
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default ExperienceItem
