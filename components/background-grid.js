import { Box, useColorModeValue } from '@chakra-ui/react'

const BackgroundGrid = () => {
  const lineColor = useColorModeValue(
    'rgba(15,15,20,0.055)',
    'rgba(255,255,255,0.045)'
  )
  const glow1 = useColorModeValue(
    'radial-gradient(600px 400px at 15% 10%, rgba(34,211,238,0.18), transparent 60%)',
    'radial-gradient(700px 500px at 15% 10%, rgba(34,211,238,0.14), transparent 60%)'
  )
  const glow2 = useColorModeValue(
    'radial-gradient(500px 400px at 85% 30%, rgba(168,85,247,0.14), transparent 60%)',
    'radial-gradient(650px 500px at 85% 30%, rgba(168,85,247,0.18), transparent 60%)'
  )

  return (
    <Box
      aria-hidden="true"
      position="fixed"
      inset={0}
      zIndex={0}
      pointerEvents="none"
      sx={{
        backgroundImage: `${glow1}, ${glow2},
          linear-gradient(${lineColor} 1px, transparent 1px),
          linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: 'auto, auto, 48px 48px, 48px 48px',
        maskImage:
          'radial-gradient(ellipse at top, black 40%, transparent 85%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at top, black 40%, transparent 85%)'
      }}
    />
  )
}

export default BackgroundGrid
