import {
  Box,
  Button,
  Flex,
  Grid,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react'
import {
  IoDocumentText,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail
} from 'react-icons/io5'

import Layout from '../components/layouts/article'
import Hero from '../components/hero'
import Section from '../components/section'
import SectionHeading, { SubHeading } from '../components/section-heading'
import PlayerCard from '../components/player-card'
import ExperienceItem from '../components/experience-item'
import ProjectCard from '../components/project-card'
import SkillTag from '../components/skill-tag'
import { getRarity } from '../lib/rarity'
import {
  PROFILE,
  SECTIONS,
  EXPERIENCES,
  PROJECTS,
  LEADERSHIP,
  SKILLS,
  SIDE_QUESTS,
  SHOW_SIDE_QUESTS
} from '../lib/data'

const sideExperiences = SHOW_SIDE_QUESTS ? SIDE_QUESTS.experiences || [] : []
const sideProjects = SHOW_SIDE_QUESTS ? SIDE_QUESTS.projects || [] : []

const experienceKey = item => `${item.role}-${item.org}`

// Section wrapper + heading, filled in from SECTIONS by id
const PageSection = ({ id, children }) => {
  const { number, label, kicker } = SECTIONS.find(s => s.id === id)
  return (
    <Section id={id}>
      <SectionHeading number={number} title={label} kicker={kicker} />
      {children}
    </Section>
  )
}

const About = () => (
  <PageSection id="about">
    <PlayerCard />
  </PageSection>
)

const Experience = () => (
  <PageSection id="experience">
    <Stack spacing={5}>
      {EXPERIENCES.map(item => (
        <ExperienceItem key={experienceKey(item)} {...item} />
      ))}
    </Stack>
    {sideExperiences.length > 0 && (
      <>
        <SubHeading title="Side quests" caption="More experience" />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {sideExperiences.map(item => (
            <ExperienceItem
              key={experienceKey(item)}
              {...item}
              compact
              headingAs="h4"
            />
          ))}
        </SimpleGrid>
      </>
    )}
  </PageSection>
)

const Projects = () => (
  <PageSection id="projects">
    <Stack spacing={6}>
      {PROJECTS.map(project => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </Stack>
    {sideProjects.length > 0 && (
      <>
        <SubHeading title="More loot" caption="More projects" />
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
          {sideProjects.map(project => (
            <ProjectCard
              key={project.title}
              {...project}
              compact
              headingAs="h4"
            />
          ))}
        </SimpleGrid>
      </>
    )}
  </PageSection>
)

const Leadership = () => (
  <PageSection id="leadership">
    <Stack spacing={5}>
      {LEADERSHIP.map(item => (
        <ExperienceItem key={experienceKey(item)} {...item} />
      ))}
    </Stack>
  </PageSection>
)

const Skills = () => (
  <PageSection id="skills">
    <Stack
      layerStyle="panel"
      p={{ base: 5, md: 8 }}
      spacing={{ base: 6, md: 7 }}
    >
      {SKILLS.map(({ group, rarity, items }) => (
        <Grid
          key={group}
          templateColumns={{ base: '1fr', md: '176px minmax(0, 1fr)' }}
          gap={{ base: 3, md: 6 }}
        >
          <Flex align="center" gap={2.5} h={{ md: '64px' }}>
            <Box
              aria-hidden="true"
              flexShrink={0}
              boxSize="10px"
              bg={getRarity(rarity).color}
              borderRadius="2px"
              transform="skewX(-8deg)"
            />
            <Text as="h3" textStyle="hud" fontSize="sm" color="fn.muted">
              {group}
            </Text>
          </Flex>
          <Box
            as="ul"
            role="list"
            aria-label={group}
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(128px, 1fr))"
            gap={2.5}
            listStyleType="none"
          >
            {items.map(item => (
              <SkillTag key={item} rarity={rarity}>
                {item}
              </SkillTag>
            ))}
          </Box>
        </Grid>
      ))}
    </Stack>
  </PageSection>
)

const CONTACT_LINKS = [
  { label: 'LinkedIn', href: PROFILE.links.linkedin, icon: IoLogoLinkedin },
  { label: 'GitHub', href: PROFILE.links.github, icon: IoLogoGithub },
  { label: 'Resume', href: PROFILE.links.resume, icon: IoDocumentText }
]

// Buttons fill each wrapped row on phones and sit at natural width from md up
const contactButton = {
  size: { base: 'md', md: 'lg' },
  flex: { base: '1 1 auto', md: '0 0 auto' }
}

const Contact = () => (
  <PageSection id="contact">
    <Box
      layerStyle="panel"
      position="relative"
      overflow="hidden"
      p={{ base: 6, md: 10 }}
    >
      {/* One restrained storm-purple accent in the top-right corner, sized
          to stay in the empty space beside the heading and clear of the
          buttons. Phones get plain navy: the heading reaches the corner. */}
      <Box
        aria-hidden="true"
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        top={0}
        right={0}
        boxSize="200px"
        bg="radial-gradient(200px circle at 100% 0%, rgba(155, 77, 255, 0.34), rgba(155, 77, 255, 0.1) 45%, transparent 70%)"
      />
      <Box position="relative">
        <Box
          as="h3"
          textStyle="display"
          fontSize={{ base: '36px', md: '52px' }}
          lineHeight={1.05}
          color="white"
        >
          Ready to squad up?
        </Box>
        <Text
          mt={{ base: 3, md: 4 }}
          maxW="560px"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.65}
        >
          I&apos;m open to internships, freelance collabs, and hackathon teams.
          Email is the fastest way to reach me.
        </Text>
        <Flex wrap="wrap" gap={3} mt={{ base: 6, md: 8 }}>
          <Button
            as="a"
            href={`mailto:${PROFILE.email}`}
            variant="play"
            leftIcon={<IoMail aria-hidden="true" />}
            textTransform="none"
            letterSpacing="0.03em"
            {...contactButton}
          >
            {PROFILE.email}
          </Button>
          {CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
            <Button
              key={label}
              as="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variant="hud"
              bg="whiteAlpha.100"
              leftIcon={<Icon aria-hidden="true" />}
              {...contactButton}
            >
              {label}
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  </PageSection>
)

const Home = () => (
  <Layout>
    {/* Sections start hidden for the scroll reveal; show them without JS */}
    <noscript>
      <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
    </noscript>
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Leadership />
    <Skills />
    <Contact />
  </Layout>
)

export default Home
