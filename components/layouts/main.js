import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import BackgroundGrid from '../background-grid'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8} position="relative" overflowX="hidden">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Xia Jie Ou — software engineer & CS student at CUNY College of Staten Island. Building full-stack apps, AI/ML projects, and organizing hackathons."
        />
        <meta name="author" content="Xia Jie Ou" />
        <meta name="theme-color" content="#07070b" />
        <link
          rel="shortcut icon"
          href="/images/penguinforicon.webp"
          type="image/webp"
        />
        <meta property="og:site_name" content="Xia Jie Ou" />
        <meta name="og:title" content="Xia Jie Ou — Software Engineer" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/penguinforicon.webp" />
        <meta name="twitter:card" content="summary" />
        <title>Xia Jie Ou — Software Engineer</title>
      </Head>

      <BackgroundGrid />
      <div className="grain" />

      <NavBar path={router.asPath} />

      <Container maxW="container.lg" pt={24} px={{ base: 5, md: 8 }}>
        <Box position="relative" zIndex={1}>
          {children}
          <Footer />
        </Box>
      </Container>
    </Box>
  )
}

export default Main
