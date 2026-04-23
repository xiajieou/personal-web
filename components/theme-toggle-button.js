import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <IconButton
          aria-label="Toggle theme"
          size="sm"
          variant="ghost"
          color={useColorModeValue('gray.700', 'whiteAlpha.900')}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemeToggleButton
