import { forwardRef } from 'react'
import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.700', 'whiteAlpha.800')
  const activeColor = useColorModeValue('#0066ff', '#7dd3fc')
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      px={2}
      py={1}
      fontSize="sm"
      fontWeight={500}
      color={active ? activeColor : inactiveColor}
      target={target}
      _hover={{ color: activeColor, textDecoration: 'none' }}
      {...props}
    >
      {children}
    </Link>
  )
}

const MenuLink = forwardRef((props, ref) => (
  <Link ref={ref} as={NextLink} {...props} />
))
MenuLink.displayName = 'MenuLink'

const RESUME_URL =
  'https://drive.google.com/file/d/1UWzWu4A6lzX0CnBflB8EV9rMUrriPBMC/view?usp=sharing'

const Navbar = props => {
  const { path } = props
  const navBg = useColorModeValue('rgba(255,255,255,0.65)', 'rgba(7,7,11,0.55)')
  const borderColor = useColorModeValue(
    'rgba(15,15,20,0.08)',
    'rgba(255,255,255,0.06)'
  )

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      top={0}
      bg={navBg}
      borderBottom="1px solid"
      borderColor={borderColor}
      css={{ backdropFilter: 'saturate(180%) blur(14px)' }}
      zIndex={10}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.lg"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Logo />
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          spacing={1}
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/#about" path={path}>
            About
          </LinkItem>
          <LinkItem href="/#experience" path={path}>
            Experience
          </LinkItem>
          <LinkItem href="/#projects" path={path}>
            Projects
          </LinkItem>
          <LinkItem href="/#leadership" path={path}>
            Leadership
          </LinkItem>
          <LinkItem href="/#contact" path={path}>
            Contact
          </LinkItem>
          <LinkItem target="_blank" href={RESUME_URL} path={path}>
            Resume ↗
          </LinkItem>
        </Stack>

        <Box flex={1} textAlign="right">
          <ThemeToggleButton />
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
                size="sm"
              />
              <MenuList>
                <MenuItem as={MenuLink} href="/#about">
                  About
                </MenuItem>
                <MenuItem as={MenuLink} href="/#experience">
                  Experience
                </MenuItem>
                <MenuItem as={MenuLink} href="/#projects">
                  Projects
                </MenuItem>
                <MenuItem as={MenuLink} href="/#leadership">
                  Leadership
                </MenuItem>
                <MenuItem as={MenuLink} href="/#contact">
                  Contact
                </MenuItem>
                <MenuItem as={Link} href={RESUME_URL} target="_blank">
                  Resume
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
