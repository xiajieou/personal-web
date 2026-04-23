import { Box, useColorModeValue } from '@chakra-ui/react'

const SkillTag = ({ children }) => {
  const bg = useColorModeValue(
    'rgba(15,15,20,0.05)',
    'rgba(255,255,255,0.04)'
  )
  const border = useColorModeValue(
    'rgba(15,15,20,0.1)',
    'rgba(255,255,255,0.08)'
  )

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      gap={2}
      px={3}
      py={1.5}
      borderRadius="md"
      fontSize="sm"
      fontFamily="var(--font-mono)"
      bg={bg}
      border="1px solid"
      borderColor={border}
      transition="all 200ms ease"
      _hover={{
        borderColor: 'accent.cyan',
        transform: 'translateY(-1px)'
      }}
    >
      <Box w="6px" h="6px" borderRadius="full" bg="accent.cyan" />
      {children}
    </Box>
  )
}

export default SkillTag
