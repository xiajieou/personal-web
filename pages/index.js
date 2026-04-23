import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Link,
  HStack,
  VStack,
  Flex,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
  IoDocumentTextOutline
} from 'react-icons/io5'

import Layout from '../components/layouts/article'
import Section from '../components/section'
import SectionHeading from '../components/section-heading'
import Hero from '../components/hero'
import ProjectCard from '../components/project-card'
import ExperienceItem from '../components/experience-item'
import SkillTag from '../components/skill-tag'

const RESUME_URL =
  'https://drive.google.com/file/d/1H1bHNX4pHD2ERm6CEKKDC9KuIkyHcIY-/view?usp=sharing'

const EXPERIENCES = [
  {
    role: 'Software Engineer Intern',
    org: 'CUNY High Performance Computing Center',
    location: 'New York, NY',
    period: 'Aug 2025 — Nov 2025',
    bullets: [
      'Built a Python web crawler data pipeline unifying 10,000+ research papers across multiple sources.',
      'Designed and implemented a PostgreSQL schema to optimize query performance for all publications.'
    ],
    tags: ['Python', 'PostgreSQL', 'Crawlers', 'ETL']
  },
  {
    role: 'Software Engineer Intern',
    org: 'Evergreen Investments',
    location: 'New York, NY (Remote)',
    period: 'Mar 2025 — May 2025',
    bullets: [
      'Engineered a full-stack real estate app with React/Vite, Express/Node, and PostgreSQL serving 1,000+ users.',
      'Developed a Zoho check-in/check-out feature with Deluge, cutting manual time-tracking by 30%.'
    ],
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Zoho']
  },
  {
    role: 'Undergraduate Researcher',
    org: 'CUNY Research Scholar Program',
    location: 'New York, NY',
    period: 'Oct 2024 — Jul 2025',
    bullets: [
      'Developed a non-contact heart-rate monitor in Python/OpenCV that estimates pulse in real time from face video.',
      'Built a stable facial pipeline aggregating multiple ROIs to mitigate motion and lighting shifts.'
    ],
    tags: ['Python', 'OpenCV', 'Signal Processing']
  },
  {
    role: 'Code to Give Participant',
    org: 'Morgan Stanley',
    location: 'New York, NY',
    period: 'Mar 2026 · 1 mo',
    bullets: [
      'Selected as 1 of 100 from 2,500+ applicants for Morgan Stanley’s Code to Give hackathon.',
      'Collaborated on a volunteer-outreach platform for nonprofit LemonTree to streamline operations.'
    ],
    tags: ['Full-Stack', 'Non-profit', 'Collaboration']
  }
]

const PROJECTS = [
  {
    title: 'Skinalyze',
    meta: '1st Place · HackKnight (Bloomberg)',
    description:
      'Real-time skin analysis platform using a microservices architecture with Python + OpenCV preprocessing, Google Gemini Vision for instant responses, and Google Maps API for dermatology locations.',
    tags: ['React', 'TypeScript', 'Express', 'FastAPI', 'OpenCV', 'Gemini'],
    repoLink: 'https://github.com/xiajieou/HackKnight',
    gradient:
      'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 40%, #a855f7 100%)',
    previewLabel: 'skinalyze.ai'
  },
  {
    title: 'EcoScan',
    meta: '1st Place · HackNYU',
    description:
      'Agentic backend workflow using Gemini 2.5 + FastAPI to deep-tag product images, auto-extracting material composition and metadata to surface sustainability insights.',
    tags: ['React Native', 'Expo', 'FastAPI', 'Gemini 2.5', 'OCR'],
    repoLink: 'https://github.com/xiajieou/HackNYU',
    gradient:
      'linear-gradient(135deg, #22c55e 0%, #14b8a6 50%, #0ea5e9 100%)',
    previewLabel: 'ecoscan.app'
  },
  {
    title: 'Dolphin Hacks',
    meta: 'Founder & Lead Organizer · Google × MLH',
    description:
      '12-hour hackathon at CSI — built the website, handled Devpost/MLH launch, judging, and execution end-to-end. Secured $1,000+ from Google, MLH, and the CSI CS Department.',
    tags: ['Next.js', 'Design', 'Ops', 'Sponsorships'],
    repoLink: 'https://github.com/xiajieou/Dolphin-Hacks',
    gradient:
      'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
    previewLabel: 'dolphinhacks.org'
  },
  {
    title: 'CSI Nursing Dashboard',
    meta: 'Production · Mobile-first web app',
    description:
      'Mobile-first study platform helping CSI nursing students graduate and pass the NCLEX with curated question banks, progress tracking, and dashboards.',
    tags: ['Next.js', 'TypeScript', 'Auth', 'Vercel'],
    liveLink: 'https://csi-nursing-dashboard.vercel.app/',
    gradient:
      'linear-gradient(135deg, #f97316 0%, #ec4899 55%, #8b5cf6 100%)',
    previewLabel: 'csi-nursing.vercel.app'
  },
  {
    title: 'CSI CS Website Revamp',
    meta: 'CS Department · Open source',
    description:
      'Modernized the CSI Computer Science department website with a clean, fast, accessible stack — replacing the legacy site with a maintainable component-based codebase.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    repoLink: 'https://github.com/xiajieou/csi-website-revamp',
    gradient:
      'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #22d3ee 100%)',
    previewLabel: 'csi.cs'
  },
  {
    title: 'LemonTree Outreach',
    meta: 'Morgan Stanley · Code to Give',
    description:
      'Volunteer-outreach platform built with Team 3 to help nonprofit LemonTree streamline operations — connecting volunteers, coordinators, and events in one place.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    repoLink: 'https://github.com/xiajieou/MS-CodeToGive-TEAM3',
    gradient:
      'linear-gradient(135deg, #facc15 0%, #f59e0b 45%, #ef4444 100%)',
    previewLabel: 'lemontree.ngo'
  }
]

const LEADERSHIP = [
  {
    role: 'Vice President',
    org: 'Computer Science Club',
    location: 'CUNY College of Staten Island',
    period: 'Jan 2026 — Present',
    bullets: [
      'Taught programming workshops, ran coding competitions, and mentored students to grow their technical skills.',
      'Drove a 75% membership increase and 25+ avg attendance via company partnerships and events.'
    ],
    tags: ['Leadership', 'Workshops', 'Mentorship']
  },
  {
    role: 'Founder & Lead Organizer',
    org: 'Dolphin Hacks (Google × MLH)',
    location: 'New York, NY',
    period: 'Jan 2026 — Present',
    bullets: [
      'Founded and organized a 12-hour hackathon at CSI — sponsorships, website, Devpost/MLH, judging, and execution.',
      'Secured $1,000+ in sponsorships from Google, MLH, and the CSI CS Department via targeted outreach.'
    ],
    tags: ['Hackathons', 'Sponsorship', 'Ops']
  }
]

const SKILLS = {
  Languages: ['Python', 'TypeScript', 'JavaScript', 'C', 'C++'],
  'Frameworks & Tools': [
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'FastAPI',
    'Docker',
    'Linux'
  ],
  'Cloud & Data': ['AWS', 'Kubernetes', 'PostgreSQL', 'MySQL']
}

const AboutSection = () => {
  const muted = useColorModeValue('gray.700', 'whiteAlpha.800')
  const cardBg = useColorModeValue(
    'rgba(255,255,255,0.65)',
    'rgba(17,17,26,0.55)'
  )
  const border = useColorModeValue(
    'rgba(15,15,20,0.08)',
    'rgba(255,255,255,0.08)'
  )
  return (
    <Section id="about" delay={0.05}>
      <SectionHeading number="01" title="About" />
      <Flex gap={6} direction={{ base: 'column', md: 'row' }}>
        <Box flex={2} color={muted} fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.75}>
          <Text mb={4}>
            Hi, I&apos;m Xia Jie — a CS sophomore at{' '}
            <Box as="span" color="accent.cyan" fontFamily="var(--font-mono)">
              CUNY College of Staten Island
            </Box>{' '}
            (B.S., May 2028). I love building things that sit at the intersection of
            full-stack engineering and AI/ML — hackathon projects, research tools,
            and community platforms.
          </Text>
          <Text>
            I&apos;ve won 1st place at HackNYU and HackKnight, worked as a SWE intern
            at CUNY HPC and Evergreen Investments, and organize hackathons + mentor
            students through my university&apos;s CS Club.
          </Text>
        </Box>
        <Box
          flex={1}
          borderRadius="xl"
          border="1px solid"
          borderColor={border}
          bg={cardBg}
          p={5}
          css={{ backdropFilter: 'blur(8px)' }}
        >
          <Text fontFamily="var(--font-mono)" fontSize="xs" color="accent.cyan" mb={3}>
            ~/whoami.json
          </Text>
          <VStack align="stretch" spacing={2} fontFamily="var(--font-mono)" fontSize="sm">
            <Box>
              <Box as="span" opacity={0.6}>education: </Box>
              CUNY CSI &apos;28
            </Box>
            <Box>
              <Box as="span" opacity={0.6}>focus: </Box>
              full-stack · AI/ML
            </Box>
            <Box>
              <Box as="span" opacity={0.6}>coursework: </Box>
              DSA · algorithms · web db · digital systems
            </Box>
            <Box>
              <Box as="span" opacity={0.6}>wins: </Box>
              HackNYU · HackKnight
            </Box>
            <Box>
              <Box as="span" opacity={0.6}>loves: </Box>
              hiking · gym · tactical fps
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Section>
  )
}

const ExperienceSection = () => (
  <Section id="experience" delay={0.05}>
    <SectionHeading number="02" title="Experience" />
    <Box>
      {EXPERIENCES.map(exp => (
        <ExperienceItem key={`${exp.role}-${exp.org}`} {...exp} />
      ))}
    </Box>
  </Section>
)

const ProjectsSection = () => (
  <Section id="projects" delay={0.05}>
    <SectionHeading number="03" title="Projects" />
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      {PROJECTS.map(p => (
        <ProjectCard key={p.title} {...p} />
      ))}
    </SimpleGrid>
  </Section>
)

const LeadershipSection = () => (
  <Section id="leadership" delay={0.05}>
    <SectionHeading number="04" title="Leadership" />
    <Box>
      {LEADERSHIP.map(item => (
        <ExperienceItem key={`${item.role}-${item.org}`} {...item} />
      ))}
    </Box>
  </Section>
)

const SkillsSection = () => {
  const muted = useColorModeValue('gray.600', 'whiteAlpha.600')
  return (
    <Section id="skills" delay={0.05}>
      <SectionHeading number="05" title="Skills" />
      <VStack align="stretch" spacing={5}>
        {Object.entries(SKILLS).map(([group, items]) => (
          <Box key={group}>
            <Text
              fontSize="xs"
              fontFamily="var(--font-mono)"
              color={muted}
              mb={2}
              textTransform="uppercase"
              letterSpacing="0.1em"
            >
              {group}
            </Text>
            <HStack spacing={2} flexWrap="wrap" rowGap={2}>
              {items.map(s => (
                <SkillTag key={s}>{s}</SkillTag>
              ))}
            </HStack>
          </Box>
        ))}
      </VStack>
    </Section>
  )
}

const ContactSection = () => {
  const border = useColorModeValue(
    'rgba(15,15,20,0.08)',
    'rgba(255,255,255,0.08)'
  )
  const cardBg = useColorModeValue(
    'rgba(255,255,255,0.65)',
    'rgba(17,17,26,0.55)'
  )
  const muted = useColorModeValue('gray.700', 'whiteAlpha.800')

  return (
    <Section id="contact" delay={0.05}>
      <SectionHeading number="06" title="Contact" />
      <Box
        borderRadius="2xl"
        border="1px solid"
        borderColor={border}
        bg={cardBg}
        p={{ base: 6, md: 10 }}
        css={{ backdropFilter: 'blur(10px)' }}
        position="relative"
        overflow="hidden"
      >
        <Box
          aria-hidden="true"
          position="absolute"
          inset="-40%"
          sx={{
            background:
              'radial-gradient(400px circle at 20% 20%, rgba(34,211,238,0.15), transparent 60%), radial-gradient(500px circle at 80% 80%, rgba(168,85,247,0.18), transparent 60%)'
          }}
        />
        <Box position="relative">
          <Heading as="h3" fontSize={{ base: '2xl', md: '3xl' }} mb={3} letterSpacing="-0.02em">
            Let&apos;s build something.
          </Heading>
          <Text color={muted} mb={6} maxW="560px">
            I&apos;m open to internships, freelance collabs, and hackathon teams.
            Email is the fastest way to reach me.
          </Text>
          <HStack spacing={3} flexWrap="wrap" rowGap={3}>
            <Button
              as={Link}
              href="mailto:xiajieou.yc@gmail.com"
              leftIcon={<IoMail />}
              size="md"
              borderRadius="full"
              bgGradient="linear(to-r, #22d3ee, #a855f7)"
              color="#07070b"
              _hover={{
                textDecoration: 'none',
                transform: 'translateY(-1px)',
                boxShadow: '0 12px 30px -10px rgba(168,85,247,0.5)'
              }}
            >
              xiajieou.yc@gmail.com
            </Button>
            <Button
              as={Link}
              href="https://www.linkedin.com/in/xiajieou"
              target="_blank"
              leftIcon={<IoLogoLinkedin />}
              size="md"
              borderRadius="full"
              variant="outline"
              _hover={{ textDecoration: 'none', transform: 'translateY(-1px)' }}
            >
              LinkedIn
            </Button>
            <Button
              as={Link}
              href="https://github.com/xiajieou"
              target="_blank"
              leftIcon={<IoLogoGithub />}
              size="md"
              borderRadius="full"
              variant="outline"
              _hover={{ textDecoration: 'none', transform: 'translateY(-1px)' }}
            >
              GitHub
            </Button>
            <Button
              as={Link}
              href={RESUME_URL}
              target="_blank"
              leftIcon={<IoDocumentTextOutline />}
              size="md"
              borderRadius="full"
              variant="outline"
              _hover={{ textDecoration: 'none', transform: 'translateY(-1px)' }}
            >
              Resume
            </Button>
          </HStack>
        </Box>
      </Box>
    </Section>
  )
}

const Home = () => (
  <Layout>
    <Hero />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <LeadershipSection />
    <SkillsSection />
    <ContactSection />
  </Layout>
)

export default Home
