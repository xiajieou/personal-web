import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

const GradientPreview = ({ gradient, label }) => (
  <Box
    aria-hidden="true"
    position="relative"
    h="140px"
    borderTopRadius="xl"
    overflow="hidden"
    sx={{ background: gradient }}
  >
    <Box
      position="absolute"
      inset={0}
      sx={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        maskImage:
          'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, black 40%, transparent 85%)'
      }}
    />
    <Box
      position="absolute"
      bottom={3}
      left={4}
      fontFamily="var(--font-mono)"
      fontSize="xs"
      color="rgba(255,255,255,0.85)"
      letterSpacing="0.1em"
      textTransform="uppercase"
    >
      {label}
    </Box>
  </Box>
)

const TechPill = ({ children }) => {
  const bg = useColorModeValue(
    'rgba(15,15,20,0.06)',
    'rgba(255,255,255,0.06)'
  )
  const border = useColorModeValue(
    'rgba(15,15,20,0.1)',
    'rgba(255,255,255,0.08)'
  )
  return (
    <Box
      as="span"
      fontSize="xs"
      fontFamily="var(--font-mono)"
      px={2}
      py={0.5}
      borderRadius="md"
      bg={bg}
      border="1px solid"
      borderColor={border}
    >
      {children}
    </Box>
  )
}

const ProjectCard = ({
  title,
  description,
  tags = [],
  repoLink,
  liveLink,
  meta,
  gradient,
  previewLabel
}) => {
  const cardBg = useColorModeValue(
    'rgba(255,255,255,0.7)',
    'rgba(17,17,26,0.7)'
  )
  const border = useColorModeValue(
    'rgba(15,15,20,0.08)',
    'rgba(255,255,255,0.08)'
  )
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMouseMove = e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setStyle({
      background: `radial-gradient(320px circle at ${x}% ${y}%, rgba(124,58,237,0.18), transparent 40%)`
    })
  }

  const resetStyle = () => setStyle({})

  return (
    <Box
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={resetStyle}
      position="relative"
      borderRadius="xl"
      border="1px solid"
      borderColor={border}
      bg={cardBg}
      css={{ backdropFilter: 'blur(8px)' }}
      overflow="hidden"
      transition="transform 220ms ease, border-color 220ms ease"
      _hover={{
        transform: 'translateY(-3px)',
        borderColor: 'rgba(124,58,237,0.4)'
      }}
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        pointerEvents="none"
        position="absolute"
        inset={0}
        style={style}
        transition="background 120ms ease"
      />
      <GradientPreview gradient={gradient} label={previewLabel} />
      <Box p={5} position="relative" display="flex" flexDirection="column" flex={1}>
        {meta && (
          <Text
            fontFamily="var(--font-mono)"
            fontSize="xs"
            color="accent.cyan"
            mb={1}
          >
            {meta}
          </Text>
        )}
        <Heading as="h3" fontSize="lg" fontWeight={700} mb={2}>
          {title}
        </Heading>
        <Text
          fontSize="sm"
          opacity={0.8}
          mb={4}
          flex={1}
        >
          {description}
        </Text>
        <HStack spacing={2} flexWrap="wrap" rowGap={2} mb={4}>
          {tags.map(t => (
            <TechPill key={t}>{t}</TechPill>
          ))}
        </HStack>
        <Flex gap={4} fontSize="sm">
          {repoLink && (
            <Link href={repoLink} target="_blank" rel="noopener">
              github ↗
            </Link>
          )}
          {liveLink && (
            <Link href={liveLink} target="_blank" rel="noopener">
              live ↗
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  )
}

export default ProjectCard
