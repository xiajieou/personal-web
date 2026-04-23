import { Flex, Heading, Box, useColorModeValue } from '@chakra-ui/react'

const SectionHeading = ({ number, title }) => {
  const mutedColor = useColorModeValue('gray.500', 'whiteAlpha.600')
  const lineColor = useColorModeValue(
    'rgba(15,15,20,0.1)',
    'rgba(255,255,255,0.08)'
  )
  return (
    <Flex align="center" gap={4} mb={6}>
      <Box
        as="span"
        fontFamily="var(--font-mono)"
        fontSize="sm"
        color="accent.cyan"
      >
        {number}
      </Box>
      <Heading as="h2" variant="section-title" m={0}>
        {title}
      </Heading>
      <Box flex={1} h="1px" bg={lineColor} />
      <Box
        as="span"
        fontFamily="var(--font-mono)"
        fontSize="xs"
        color={mutedColor}
      >
        ./section
      </Box>
    </Flex>
  )
}

export default SectionHeading
