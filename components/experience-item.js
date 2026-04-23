import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'

const ExperienceItem = ({ role, org, location, period, bullets = [], tags = [] }) => {
  const border = useColorModeValue(
    'rgba(15,15,20,0.08)',
    'rgba(255,255,255,0.08)'
  )
  const muted = useColorModeValue('gray.600', 'whiteAlpha.700')
  const pillBg = useColorModeValue(
    'rgba(15,15,20,0.06)',
    'rgba(255,255,255,0.06)'
  )

  return (
    <Flex
      gap={{ base: 4, md: 6 }}
      py={5}
      borderTop="1px solid"
      borderColor={border}
      direction={{ base: 'column', md: 'row' }}
      _hover={{ '& .role-dot': { boxShadow: '0 0 16px #22d3ee' } }}
      transition="all 220ms ease"
    >
      <Box
        minW={{ md: '180px' }}
        fontFamily="var(--font-mono)"
        fontSize="xs"
        color={muted}
        pt={1}
      >
        <Flex align="center" gap={2}>
          <Box
            className="role-dot"
            w="8px"
            h="8px"
            borderRadius="full"
            bg="accent.cyan"
            transition="box-shadow 220ms ease"
          />
          {period}
        </Flex>
      </Box>
      <Box flex={1}>
        <Heading as="h3" fontSize="md" fontWeight={700} mb={1}>
          {role} · <Box as="span" color="accent.cyan">{org}</Box>
        </Heading>
        {location && (
          <Text fontSize="xs" color={muted} fontFamily="var(--font-mono)" mb={2}>
            {location}
          </Text>
        )}
        <Box as="ul" pl={4} mb={3} color={muted} fontSize="sm" sx={{ 'li': { mb: 1 } }}>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </Box>
        {tags.length > 0 && (
          <HStack spacing={2} flexWrap="wrap" rowGap={2}>
            {tags.map(t => (
              <Box
                key={t}
                as="span"
                fontSize="xs"
                fontFamily="var(--font-mono)"
                px={2}
                py={0.5}
                borderRadius="md"
                bg={pillBg}
                border="1px solid"
                borderColor={border}
              >
                {t}
              </Box>
            ))}
          </HStack>
        )}
      </Box>
    </Flex>
  )
}

export default ExperienceItem
