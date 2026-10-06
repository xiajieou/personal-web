import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Container } from '@chakra-ui/react'
import NavBar from '../navbar'
import Footer from '../footer'
import Sky from '../sky'
import DropHud from '../drop-hud'
import { PROFILE } from '../../lib/data'

const DESCRIPTION = `${PROFILE.name}: software engineer and computer science student at ${PROFILE.school}, Class of ${PROFILE.gradYear}. GPU deep learning, AI agents, full-stack apps, and hackathons.`

const Main = ({ children }) => {
  const { events } = useRouter()

  // Next's hash links (navbar, mobile menu, "Drop in") scroll to the section
  // but leave keyboard focus on the link. Move it to the section so the next
  // Tab continues from there. The delay lets Chakra's menu hand focus back to
  // its button first.
  useEffect(() => {
    const focusTarget = url => {
      const id = url.split('#')[1]
      const el = id && document.getElementById(id)
      if (!el) return
      el.setAttribute('tabindex', '-1')
      el.style.outline = 'none'
      setTimeout(() => el.focus({ preventScroll: true }), 50)
    }
    events.on('hashChangeComplete', focusTarget)
    return () => events.off('hashChangeComplete', focusTarget)
  }, [events])

  return (
    <Box position="relative" overflowX="hidden" minH="100vh">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={DESCRIPTION} />
        <meta name="author" content="Xia Jie Ou" />
        <meta name="theme-color" content="#1273ea" />
        <link
          rel="shortcut icon"
          href="/images/penguinforicon.webp"
          type="image/webp"
        />
        <meta property="og:site_name" content="Xia Jie Ou" />
        <meta property="og:title" content="Xia Jie Ou — Software Engineer" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/penguinforicon.webp" />
        <meta name="twitter:card" content="summary" />
        <title>Xia Jie Ou — Software Engineer</title>
      </Head>

      {/* Stacking: Sky 0, page content 1, DropHud 5, navbar 10 */}
      <Sky />
      <NavBar />

      <Container maxW="container.lg" pt={24} px={{ base: 5, md: 8 }}>
        <Box position="relative" zIndex={1}>
          {/* Only the page is the main landmark: the navbar and the rail nav
              stay outside it, and the footer becomes contentinfo */}
          <Box as="main">{children}</Box>
          <Footer />
        </Box>
      </Container>

      {/* Last in the DOM: its section links repeat the navbar's, so keyboard
          and screen-reader users reach the navbar and the page first */}
      <DropHud />
    </Box>
  )
}

export default Main
