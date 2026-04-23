import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  const muted = useColorModeValue('gray.600', 'whiteAlpha.600')
  const borderColor = useColorModeValue(
    'rgba(15,15,20,0.08)',
    'rgba(255,255,255,0.06)'
  )
  return (
    <Box
      mt={20}
      pt={6}
      pb={10}
      borderTop="1px solid"
      borderColor={borderColor}
      fontSize="sm"
      color={muted}
      fontFamily="var(--font-mono)"
    >
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', sm: 'center' }}
        gap={2}
      >
        <Box>
          <Box as="span" color="accent.cyan">
            $
          </Box>{' '}
          echo &ldquo;built with Next.js · deployed on Vercel&rdquo;
        </Box>
        <Flex gap={4}>
          <Link href="https://github.com/xiajieou" target="_blank">
            github
          </Link>
          <Link href="https://www.linkedin.com/in/xiajieou" target="_blank">
            linkedin
          </Link>
          <Link href="mailto:xiajieou.yc@gmail.com">email</Link>
        </Flex>
      </Flex>
      <Box mt={2} opacity={0.7}>
        © {new Date().getFullYear()} Xia Jie Ou
      </Box>
    </Box>
  )
}

export default Footer
