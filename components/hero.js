import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  HStack,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Globe = dynamic(() => import('./globe'), {
  ssr: false,
  loading: () => null
})

const PHRASES = [
  'building full-stack apps',
  'shipping AI/ML projects',
  'organizing hackathons',
  'breaking and fixing things'
]

const Typewriter = () => {
  const [idx, setIdx] = useState(0)
  const [sub, setSub] = useState('')
  const [dir, setDir] = useState(1)

  useEffect(() => {
    const phrase = PHRASES[idx]
    let timeout
    if (dir === 1) {
      if (sub.length < phrase.length) {
        timeout = setTimeout(() => setSub(phrase.slice(0, sub.length + 1)), 55)
      } else {
        timeout = setTimeout(() => setDir(-1), 1500)
      }
    } else {
      if (sub.length > 0) {
        timeout = setTimeout(() => setSub(phrase.slice(0, sub.length - 1)), 28)
      } else {
        setDir(1)
        setIdx((idx + 1) % PHRASES.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [sub, dir, idx])

  return (
    <Box as="span" fontFamily="var(--font-mono)" color="accent.cyan">
      {sub}
      <Box
        as={motion.span}
        display="inline-block"
        ml="2px"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        _
      </Box>
    </Box>
  )
}

const Chip = ({ children, color = 'accent.cyan' }) => {
  const bg = useColorModeValue(
    'rgba(15,15,20,0.05)',
    'rgba(255,255,255,0.04)'
  )
  const border = useColorModeValue(
    'rgba(15,15,20,0.1)',
    'rgba(255,255,255,0.08)'
  )
  return (
    <HStack
      spacing={2}
      px={3}
      py={1}
      borderRadius="full"
      bg={bg}
      border="1px solid"
      borderColor={border}
      fontSize="xs"
      fontFamily="var(--font-mono)"
    >
      <Box
        w="6px"
        h="6px"
        borderRadius="full"
        bg={color}
        boxShadow={`0 0 10px ${color}`}
      />
      <Box>{children}</Box>
    </HStack>
  )
}

const Hero = () => {
  const subtle = useColorModeValue('gray.600', 'whiteAlpha.700')

  return (
    <Box
      as="section"
      pt={{ base: 8, md: 16 }}
      pb={{ base: 10, md: 20 }}
      position="relative"
      id="top"
    >
      <HStack spacing={3} mb={5} flexWrap="wrap">
        <Chip color="#22c55e">available for internships</Chip>
        <Chip color="#22d3ee">based in nyc</Chip>
      </HStack>

      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        gap={{ base: 6, md: 10 }}
      >
        <Box flex={1}>
          <Heading
            as="h1"
            fontSize={{ base: '44px', md: '72px' }}
            fontWeight={800}
            letterSpacing="-0.035em"
            lineHeight={1}
            mb={4}
          >
            Xia Jie{' '}
            <Box
              as="span"
              bgGradient="linear(to-r, #22d3ee, #a855f7, #ff63c3)"
              bgClip="text"
            >
              Ou
            </Box>
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color={subtle}
            maxW="620px"
            mb={5}
          >
            Software engineer & CS student at{' '}
            <Box as="span" color="accent.cyan" fontFamily="var(--font-mono)">
              CUNY CSI
            </Box>
            . Currently <Typewriter />.
          </Text>

          <HStack spacing={3} flexWrap="wrap" rowGap={3}>
            <Button
              as={NextLink}
              href="#projects"
              scroll={false}
              size="md"
              borderRadius="full"
              color="#07070b"
              bgGradient="linear(to-r, #22d3ee, #a855f7)"
              _hover={{
                transform: 'translateY(-1px)',
                boxShadow: '0 12px 30px -10px rgba(168,85,247,0.5)'
              }}
              transition="all 180ms ease"
            >
              view projects →
            </Button>
            <Button
              as={Link}
              href="mailto:xiajieou.yc@gmail.com"
              size="md"
              borderRadius="full"
              variant="outline"
              fontWeight={500}
              _hover={{ textDecoration: 'none', transform: 'translateY(-1px)' }}
              transition="all 180ms ease"
            >
              get in touch
            </Button>
          </HStack>
        </Box>

        <Box
          flexShrink={0}
          position="relative"
          w={{ base: '180px', md: '260px' }}
          h={{ base: '180px', md: '260px' }}
        >
          <Box
            position="absolute"
            inset="-18px"
            borderRadius="full"
            bgGradient="linear(to-tr, #22d3ee, #a855f7, #ff63c3)"
            filter="blur(32px)"
            opacity={0.55}
            aria-hidden="true"
          />
          <Box
            position="relative"
            borderRadius="full"
            overflow="hidden"
            w="full"
            h="full"
          >
            <Globe />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default Hero
