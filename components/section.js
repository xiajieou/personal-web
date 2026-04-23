import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

const Section = ({ children, delay = 0, id, ...rest }) => (
  <StyledDiv
    id={id}
    initial={{ y: 18, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay }}
    mb={20}
    scrollMarginTop="90px"
    {...rest}
  >
    {children}
  </StyledDiv>
)

export default Section
