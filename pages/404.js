import NextLink from 'next/link'
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react'

const NotFound = () => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    minH="60vh"
    textAlign="center"
    gap={4}
  >
    <Box fontFamily="var(--font-mono)" color="accent.cyan" fontSize="sm">
      404 · not_found
    </Box>
    <Heading
      as="h1"
      fontSize={{ base: '48px', md: '72px' }}
      fontWeight={800}
      letterSpacing="-0.03em"
      lineHeight={1}
    >
      page{' '}
      <Box
        as="span"
        bgGradient="linear(to-r, #22d3ee, #a855f7)"
        bgClip="text"
      >
        missing
      </Box>
    </Heading>
    <Text opacity={0.7} maxW="420px">
      The page you&apos;re looking for isn&apos;t here. Let&apos;s get you back home.
    </Text>
    <Button
      as={NextLink}
      href="/"
      borderRadius="full"
      bgGradient="linear(to-r, #22d3ee, #a855f7)"
      color="#07070b"
      _hover={{
        transform: 'translateY(-1px)',
        boxShadow: '0 12px 30px -10px rgba(168,85,247,0.5)'
      }}
    >
      back home →
    </Button>
  </Flex>
)

export default NotFound
