import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { IoLogoGithub, IoLogoLinkedin, IoMail } from 'react-icons/io5'
import { PROFILE } from '../lib/data'

const LINKS = [
  { label: 'GitHub', href: PROFILE.links.github, icon: IoLogoGithub },
  { label: 'LinkedIn', href: PROFILE.links.linkedin, icon: IoLogoLinkedin },
  { label: 'Email', href: `mailto:${PROFILE.email}`, icon: IoMail }
]

const FooterLink = ({ label, href, icon }) => {
  const external = href.startsWith('http')
  return (
    <Flex
      as="a"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      align="center"
      gap={1.5}
      py={1}
      borderRadius="6px"
      textStyle="hud"
      fontSize="sm"
      color="fn.text"
      transition="color 140ms ease"
      _hover={{ color: 'fn.yellow', textDecoration: 'none' }}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'fn.yellow',
        outlineOffset: '3px'
      }}
    >
      <Icon as={icon} boxSize="1.15em" aria-hidden="true" />
      {label}
    </Flex>
  )
}

// Sits on the dark grass at the very bottom of the island drawn by Sky. The
// top margin is the landing zone: it keeps the last panel of the page above
// the hills and the supply drop, so the island is in plain view.
const Footer = () => (
  <Box
    as="footer"
    layerStyle="panel"
    mt={{ base: 40, sm: 56, md: 72 }}
    mb={6}
    p={5}
  >
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      justify="space-between"
      align={{ base: 'flex-start', sm: 'center' }}
      gap={4}
    >
      <Box>
        {/* The year is baked in at build time and can trail the visitor's
            clock, which would otherwise fail hydration every January */}
        <Text
          textStyle="hud"
          fontSize="sm"
          color="fn.text"
          suppressHydrationWarning
        >
          © {new Date().getFullYear()} {PROFILE.name}
        </Text>
        <Text textStyle="hud" fontSize="xs" color="fn.muted" mt={1}>
          Built with Next.js · deployed on Vercel
        </Text>
      </Box>
      <Flex as="ul" listStyleType="none" wrap="wrap" columnGap={5} rowGap={1}>
        {LINKS.map(link => (
          <li key={link.label}>
            <FooterLink {...link} />
          </li>
        ))}
      </Flex>
    </Flex>
    <Text
      mt={4}
      pt={3}
      borderTop="1px solid"
      borderColor="fn.line"
      fontSize="xs"
      lineHeight={1.5}
      color="fn.muted"
    >
      Fan-made theme inspired by Fortnite. Not affiliated with or endorsed by
      Epic Games.
    </Text>
  </Box>
)

export default Footer
