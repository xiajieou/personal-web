import { motion, MotionConfig } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const MotionSection = chakra(motion.section, {
  shouldForwardProp: prop => shouldForwardProp(prop) || prop === 'transition'
})

// Fades each page section up the first time it scrolls into view.
// reducedMotion="user" makes framer skip the slide (the fade stays) for
// visitors who ask for reduced motion, without touching the server markup,
// so there is no hydration mismatch. Sections can be far taller than the
// viewport, so the trigger is "any part visible", never a fraction of the
// section.
const Section = ({ id, children, delay = 0, ...rest }) => (
  <MotionConfig reducedMotion="user">
    <MotionSection
      id={id}
      data-reveal=""
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some', margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      mb={{ base: 20, md: 28 }}
      // 18px + the 72px scroll padding on <html> = 90px under the navbar
      scrollMarginTop="18px"
      {...rest}
    >
      {children}
    </MotionSection>
  </MotionConfig>
)

export default Section
