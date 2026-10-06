import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { IoMoon, IoSunny } from 'react-icons/io5'

// Light mode is the daytime drop, dark mode is the night storm. The icon
// shows where the switch takes you. Only the icon is swapped, so the button
// keeps keyboard focus across a toggle.
const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()
  const mode = useColorModeValue('light', 'dark')
  const reduceMotion = useReducedMotion()
  const isDay = mode === 'light'
  const shift = reduceMotion ? 0 : 12

  return (
    <IconButton
      aria-label={isDay ? 'Switch to night drop' : 'Switch to day drop'}
      size="sm"
      variant="ghost"
      minW={{ base: 10, md: 8 }}
      h={{ base: 10, md: 8 }}
      fontSize={{ base: '20px', md: '18px' }}
      overflow="hidden"
      color="white"
      _hover={{ bg: 'whiteAlpha.200', color: 'fn.yellow' }}
      _active={{ bg: 'whiteAlpha.300', color: 'fn.yellow' }}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'fn.yellow',
        outlineOffset: '2px',
        boxShadow: 'none'
      }}
      onClick={toggleColorMode}
      icon={
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            aria-hidden="true"
            style={{ display: 'inline-flex' }}
            initial={{ y: -shift, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: shift, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {isDay ? <IoMoon /> : <IoSunny />}
          </motion.span>
        </AnimatePresence>
      }
    />
  )
}

export default ThemeToggleButton
