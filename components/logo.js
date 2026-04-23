import Link from 'next/link'
import { useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.01em;
  padding: 6px 8px;

  .mono {
    font-family: var(--font-mono);
    opacity: 0.65;
    font-weight: 500;
  }

  .mark {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: linear-gradient(135deg, #22d3ee 0%, #7c3aed 60%, #ff63c3 100%);
    box-shadow: 0 0 20px -4px rgba(124, 58, 237, 0.6);
    transition: transform 220ms ease;
  }

  &:hover .mark {
    transform: rotate(20deg) scale(1.08);
  }
`

const Logo = () => {
  const color = useColorModeValue('gray.800', 'whiteAlpha.900')
  return (
    <Link href="/" scroll={false} aria-label="Xia Jie Ou — home">
      <LogoBox style={{ color }}>
        <span className="mark" aria-hidden="true" />
        <span>Xia Jie</span>
        <span className="mono">/ou</span>
      </LogoBox>
    </Link>
  )
}

export default Logo
