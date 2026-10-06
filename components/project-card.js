import { Box, Button, Flex, Text } from '@chakra-ui/react'
import {
  GiFirstAidKit,
  GiFlame,
  GiLockedChest,
  GiPowerLightning,
  GiThreeFriends,
  GiThreeLeaves
} from 'react-icons/gi'
import {
  IoCodeSlash,
  IoLogoGithub,
  IoOpenOutline,
  IoScanCircle,
  IoTrophy
} from 'react-icons/io5'
import { getRarity, rarityGradient } from '../lib/rarity'
import { BulletList } from './experience-item'
import { TagList } from './skill-tag'

// `icon` keys used in lib/data.js. Anything else falls back to a chest.
const ICONS = {
  flame: GiFlame,
  bolt: GiPowerLightning,
  leaf: GiThreeLeaves,
  scan: IoScanCircle,
  medkit: GiFirstAidKit,
  code: IoCodeSlash,
  team: GiThreeFriends
}

const LINK_ICONS = {
  GitHub: IoLogoGithub,
  Devpost: IoTrophy,
  Live: IoOpenOutline
}

const RAYS =
  'repeating-conic-gradient(from -4deg, rgba(255, 255, 255, 0.17) 0deg 8deg, rgba(255, 255, 255, 0) 8deg 20deg)'
const RAYS_MASK = 'radial-gradient(closest-side, #000 12%, transparent 78%)'

// Dark outline that keeps the colored border crisp against the bright sky
const INK_RING = '0 0 0 2px rgba(10, 18, 56, 0.6)'

const noMotion = {
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    _hover: { transform: 'none' }
  }
}

// Rarity-colored art: sunburst, icon, and a strip naming the tier
const LootArt = ({ rarity, icon, compact }) => {
  const r = getRarity(rarity)
  const Icon = ICONS[icon] || GiLockedChest

  return (
    <Flex
      aria-hidden="true"
      position="relative"
      direction="column"
      flexShrink={0}
      overflow="hidden"
      w={compact ? '100%' : { base: '100%', md: '220px' }}
      h={compact ? '96px' : { base: '140px', md: 'auto' }}
      bg={rarityGradient(rarity)}
    >
      <Box
        position="absolute"
        inset="-60%"
        bg={RAYS}
        sx={{ maskImage: RAYS_MASK, WebkitMaskImage: RAYS_MASK }}
      />
      <Flex
        position="relative"
        flex={1}
        minH={0}
        align="center"
        justify="center"
      >
        <Box
          as={Icon}
          boxSize={compact ? '44px' : { base: '72px', md: '84px' }}
          color="white"
          filter="drop-shadow(0 4px 0 rgba(10, 18, 56, 0.6)) drop-shadow(0 8px 10px rgba(10, 18, 56, 0.3))"
        />
      </Flex>
      <Box
        position="relative"
        py={compact ? '3px' : 1}
        textStyle="hud"
        fontSize="xs"
        letterSpacing="0.16em"
        textAlign="center"
        color="fn.ink"
        bg={r.color}
        borderTop="2px solid rgba(10, 18, 56, 0.4)"
      >
        {r.label}
      </Box>
    </Flex>
  )
}

const ProjectCard = ({
  title,
  subtitle,
  award,
  win,
  summary,
  rarity,
  icon,
  bullets = [],
  tags = [],
  links = [],
  compact = false,
  headingAs = 'h3'
}) => {
  const r = getRarity(rarity)
  const showBullets = !compact && bullets.length > 0

  return (
    <Flex
      as="article"
      layerStyle="panel"
      borderWidth="3px"
      borderColor={r.color}
      boxShadow={`${INK_RING}, 0 6px 0 2px rgba(5, 10, 40, 0.55), 0 22px 40px -18px rgba(3, 8, 30, 0.75)`}
      overflow="hidden"
      direction={compact ? 'column' : { base: 'column', md: 'row' }}
      h="100%"
      transition="transform 180ms ease, box-shadow 180ms ease"
      _hover={{
        transform: 'translateY(-3px)',
        boxShadow: `${INK_RING}, 0 9px 0 2px rgba(5, 10, 40, 0.55), 0 0 30px 4px ${r.glow}`
      }}
      sx={noMotion}
    >
      <LootArt rarity={rarity} icon={icon} compact={compact} />

      <Flex
        direction="column"
        flex={1}
        minW={0}
        p={compact ? 4 : { base: 5, md: 7 }}
        pt={compact ? 4 : { base: 5, md: 6 }}
      >
        {(win || award) && (
          <Flex wrap="wrap" align="center" columnGap={3} rowGap={2} mb={3}>
            {win && (
              <Box
                aria-hidden="true"
                layerStyle="tag"
                flexShrink={0}
                px={2.5}
                pt="6px"
                pb="3px"
              >
                <Box
                  as="span"
                  display="block"
                  textStyle="display"
                  fontSize={compact ? '13px' : '15px'}
                  transform="skewX(8deg)"
                >
                  #1 Victory Royale
                </Box>
              </Box>
            )}
            {award && (
              <Text
                textStyle="hud"
                fontSize={compact ? 'xs' : 'sm'}
                color="fn.yellow"
              >
                {award}
              </Text>
            )}
          </Flex>
        )}

        <Box
          as={headingAs}
          textStyle="display"
          fontSize={compact ? '22px' : { base: '30px', md: '36px' }}
          lineHeight={1.05}
          color="white"
        >
          {title}
        </Box>
        {subtitle && (
          <Text
            mt={1.5}
            textStyle="hud"
            fontSize={compact ? 'sm' : { base: 'sm', md: 'md' }}
            color="fn.ice"
          >
            {subtitle}
          </Text>
        )}

        {showBullets ? (
          <BulletList
            items={bullets}
            marker={r.color}
            mt={4}
            fontSize={{ base: 'sm', md: 'md' }}
          />
        ) : (
          summary && (
            <Text
              mt={3}
              fontSize={compact ? 'sm' : { base: 'sm', md: 'md' }}
              lineHeight={1.65}
              color="rgba(244, 248, 255, 0.92)"
            >
              {summary}
            </Text>
          )
        )}

        {/* mt="auto" pins tags and links to the bottom when cards share a row */}
        <Box mt="auto">
          <TagList items={tags} mt={compact ? 4 : 5} />
          {links.length > 0 && (
            <Flex wrap="wrap" gap={2.5} mt={compact ? 4 : 5}>
              {links.map(link => {
                const LinkIcon = LINK_ICONS[link.label] || IoOpenOutline
                return (
                  <Button
                    key={link.href}
                    as="a"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label}: ${title}`}
                    variant="hud"
                    size="sm"
                    bg="whiteAlpha.100"
                    leftIcon={<LinkIcon aria-hidden="true" />}
                  >
                    {link.label}
                  </Button>
                )
              })}
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default ProjectCard
