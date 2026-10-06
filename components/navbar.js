import NextLink from 'next/link'
import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { IoMenu } from 'react-icons/io5'
import Logo from './logo'
import ThemeToggleButton from './theme-toggle-button'
import { PROFILE, SECTIONS } from '../lib/data'

const FOCUS_RING = {
  outline: '2px solid',
  outlineColor: 'fn.yellow',
  outlineOffset: '2px',
  boxShadow: 'none'
}

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' }

const ArrowUpRight = props => (
  <Box
    as="svg"
    viewBox="0 0 16 16"
    w="0.85em"
    h="0.85em"
    flexShrink={0}
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      d="M4.5 11.5l7-7M5.5 4.5h6v6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Box>
)

// No scroll={false} on the hash links: in the pages router that flag also
// skips the scroll to the #id, so the link would only change the URL.
const NavLink = ({ id, label }) => (
  <Box
    as={NextLink}
    href={`/#${id}`}
    display="block"
    px={{ md: 1, lg: 2.5 }}
    py={2}
    borderRadius="6px"
    textStyle="hud"
    fontSize="sm"
    color="white"
    whiteSpace="nowrap"
    transition="color 140ms ease"
    _hover={{ color: 'fn.yellow', textDecoration: 'none' }}
    _focusVisible={FOCUS_RING}
  >
    {label}
  </Box>
)

// Chakra's menu styles follow the color mode. These keep the dropdown a dark
// navy HUD panel in both modes.
const MENU_ITEM = {
  bg: 'transparent',
  color: 'white',
  textStyle: 'hud',
  fontSize: 'md',
  px: 4,
  py: 2.5,
  _hover: { bg: 'fn.royal', color: 'white', textDecoration: 'none' },
  _focus: { bg: 'fn.royal', color: 'white' },
  _active: { bg: 'fn.royal', color: 'white' }
}

const MobileMenu = () => (
  <Menu isLazy id="navbar-menu" placement="bottom-end" autoSelect={false}>
    <MenuButton
      as={IconButton}
      icon={<IoMenu />}
      aria-label="Navigation menu"
      size="md"
      variant="outline"
      fontSize="22px"
      bg="transparent"
      color="white"
      border="2px solid"
      borderColor="fn.line"
      _hover={{ bg: 'whiteAlpha.200', color: 'fn.yellow' }}
      _active={{ bg: 'fn.royal', color: 'white', borderColor: 'fn.sky' }}
      _focusVisible={FOCUS_RING}
    />
    <MenuList
      minW="210px"
      py={2}
      bg="#0a1238"
      color="white"
      border="2px solid"
      borderColor="fn.line"
      borderRadius="12px"
      // Scrolls instead of running off short viewports (landscape phones,
      // 400% zoom); browsers without dvh just keep the full height
      overflowX="hidden"
      overflowY="auto"
      maxH="calc(100dvh - 72px)"
      boxShadow="0 6px 0 rgba(5, 10, 40, 0.55), 0 22px 40px -18px rgba(3, 8, 30, 0.75)"
    >
      {SECTIONS.map(({ id, number, label }) => (
        <MenuItem key={id} as={NextLink} href={`/#${id}`} {...MENU_ITEM}>
          <Box as="span" aria-hidden="true" w={8} color="fn.yellow">
            {number}
          </Box>
          {label}
        </MenuItem>
      ))}
      <MenuDivider my={2} borderColor="fn.line" opacity={1} />
      <MenuItem
        as="a"
        href={PROFILE.links.resume}
        {...EXTERNAL}
        {...MENU_ITEM}
        color="fn.yellow"
      >
        <Box as="span" aria-hidden="true" w={8}>
          <ArrowUpRight display="block" />
        </Box>
        Resume
      </MenuItem>
    </MenuList>
  </Menu>
)

const Navbar = () => (
  <Box
    as="nav"
    aria-label="Primary"
    position="fixed"
    top={0}
    left={0}
    w="100%"
    zIndex={10}
    bg="rgba(10, 18, 56, 0.72)"
    borderBottom="2px solid"
    borderColor="fn.line"
    css={{
      backdropFilter: 'saturate(160%) blur(12px)',
      WebkitBackdropFilter: 'saturate(160%) blur(12px)'
    }}
  >
    <Container
      maxW="container.lg"
      h="56px"
      px={{ base: 5, md: 8 }}
      display="flex"
      alignItems="center"
    >
      <Logo />

      <Flex
        as="ul"
        display={{ base: 'none', md: 'flex' }}
        align="center"
        listStyleType="none"
        ml={{ md: 3, lg: 5 }}
      >
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <NavLink id={id} label={label} />
          </li>
        ))}
      </Flex>

      <Flex align="center" gap={2} ml="auto" pl={3}>
        <Button
          as="a"
          href={PROFILE.links.resume}
          {...EXTERNAL}
          variant="play"
          size="sm"
          display={{ base: 'none', md: 'inline-flex' }}
          rightIcon={<ArrowUpRight />}
          iconSpacing={1.5}
          boxShadow="0 3px 0 #b38a00"
          _hover={{
            bg: '#fff27a',
            color: 'fn.ink',
            textDecoration: 'none',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 0 #b38a00'
          }}
          _active={{
            transform: 'translateY(2px)',
            boxShadow: '0 1px 0 #b38a00'
          }}
        >
          Resume
        </Button>
        <ThemeToggleButton />
        <Box display={{ base: 'block', md: 'none' }}>
          <MobileMenu />
        </Box>
      </Flex>
    </Container>
  </Box>
)

export default Navbar
