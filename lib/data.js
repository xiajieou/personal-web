// Single source of truth for the site's content. The main arrays mirror the
// résumé; SIDE_QUESTS holds older work that isn't on the résumé anymore.

// Flip to false to show résumé-only content.
export const SHOW_SIDE_QUESTS = true

export const PROFILE = {
  name: 'Xia Jie Ou',
  firstName: 'Xia Jie',
  lastName: 'Ou',
  title: 'Software Engineer',
  school: 'CUNY College of Staten Island',
  schoolShort: 'CUNY CSI',
  degree: 'B.S. in Computer Science',
  gradDate: 'May 2029',
  gradYear: 2029,
  location: 'New York, NY',
  email: 'xiajieou.yc@gmail.com',
  links: {
    github: 'https://github.com/xiajieou',
    linkedin: 'https://www.linkedin.com/in/xiajieou',
    // Served from public/. The old Google Drive copy has an outdated grad date.
    resume: '/xia-jie-ou-resume.pdf'
  },
  coursework: [
    'Data Structures',
    'Algorithms',
    'Operating Systems',
    'Databases',
    'Object-Oriented Programming'
  ],
  interests: ['hiking', 'gym', 'tactical fps'],
  // Hero typewriter: "Currently dropping into ___"
  phrases: [
    'GPU kernels in C++ and CUDA',
    'AI agents on the XRP Ledger',
    'full-stack apps',
    'the next hackathon'
  ],
  about: [
    "I'm Xia Jie, a computer science student at CUNY College of Staten Island (B.S., May 2029). I like dropping into hard problems: I wrote Flint, a deep learning engine in C++ and CUDA, from scratch, and I ship full-stack and AI projects the rest of the time.",
    "So far that's two software engineering internships, plus first-place finishes at hackathons including Columbia DivHacks and HackNYU. Back on campus I run Dolphin Hacks and help lead the Computer Science Club."
  ]
}

// Page sections, top to bottom. `label` is the plain name (nav, headings),
// `kicker` is the themed flavor text shown next to it.
export const SECTIONS = [
  { id: 'about', number: '01', label: 'About', kicker: 'The Lobby' },
  { id: 'experience', number: '02', label: 'Experience', kicker: 'Drop Zones' },
  { id: 'projects', number: '03', label: 'Projects', kicker: 'Loot Pool' },
  {
    id: 'leadership',
    number: '04',
    label: 'Leadership',
    kicker: 'Squad Leader'
  },
  { id: 'skills', number: '05', label: 'Skills', kicker: 'Loadout' },
  { id: 'contact', number: '06', label: 'Contact', kicker: 'Ready Up' }
]

export const EXPERIENCES = [
  {
    role: 'Software Engineer Intern',
    org: 'CUNY High Performance Computing Center',
    zone: 'Cluster Canyon',
    location: 'New York, NY',
    period: 'Aug 2025 – Nov 2025',
    bullets: [
      'Built a Python web crawler data pipeline to unify research paper data from 10,000+ publications.',
      'Designed and implemented a PostgreSQL schema to optimize queries for all publications from multiple sources.'
    ],
    stats: [{ value: '10,000+', label: 'publications unified' }],
    tags: ['Python', 'PostgreSQL', 'Web Crawling', 'Data Pipelines']
  },
  {
    role: 'Software Engineer Intern',
    org: 'Evergreen Investments',
    zone: 'Evergreen Estates',
    location: 'New York, NY',
    period: 'Mar 2025 – May 2025',
    bullets: [
      'Engineered a full-stack real estate app in React/Vite, Express/Node, and PostgreSQL for 1,000+ users.',
      'Developed Zoho check-in and check-out with Deluge, reducing manual time-tracking by 30% for teams.'
    ],
    stats: [
      { value: '1,000+', label: 'users' },
      { value: '30%', label: 'less manual time-tracking' }
    ],
    tags: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Zoho Deluge']
  }
]

// `rarity` is a key of RARITY in lib/rarity.js. `win: true` marks a 1st-place
// finish. `icon` is a key the project card maps to an icon.
export const PROJECTS = [
  {
    title: 'Flint',
    subtitle: 'GPU Deep Learning Engine',
    summary: 'A deep learning engine written from scratch in C++ and CUDA.',
    rarity: 'mythic',
    icon: 'flame',
    bullets: [
      'Built a deep learning engine from scratch in C++ and CUDA with hand-written convolution and matrix multiply kernels.',
      'Implemented backpropagation to train a Siamese CNN on the engine and evaluated FP16 inference against PyTorch.',
      'Shipped the engine as a Python package with pybind11, powering real-time face authentication in a local AI assistant.'
    ],
    tags: ['C++', 'CUDA', 'Python', 'PyTorch', 'pybind11'],
    links: [{ label: 'GitHub', href: 'https://github.com/xiajieou/flint' }]
  },
  {
    title: 'Fuse',
    subtitle: 'Autonomous Invoice Agent',
    award: '1st Place · Columbia University DivHacks',
    win: true,
    summary: 'An AI agent that autonomously pays invoices on the XRP Ledger.',
    rarity: 'legendary',
    icon: 'bolt',
    bullets: [
      'Built an AI agent that autonomously pays invoices on the XRP Ledger, capping worst-case loss at a small float with ledger-enforced multisig and delegation, proven across 14 live devnet scenarios.',
      'Designed the architecture and built the policy, signer, and reader services in FastAPI with a local XRPL stand-in that verifies real signatures, writing 82 of 104 tests.'
    ],
    tags: ['Python', 'FastAPI', 'XRP Ledger', 'xrpl-py', 'Gemini API'],
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/fuse-76qwx1' }
    ]
  },
  {
    title: 'EcoScan',
    subtitle: 'Sustainable Fashion Scanner',
    award: '1st Place · HackNYU',
    win: true,
    summary:
      'Scan a clothing tag with your phone and get eco-scores and greener alternatives.',
    rarity: 'legendary',
    icon: 'leaf',
    bullets: [
      'Built the React Native app that scans a clothing tag and garment with the phone camera, uploads both to a FastAPI pipeline, and renders eco-scores, alternatives, and scan history.',
      "Added scan-based search with a reusable price-range filter across 20 alternatives per scan, and a script that reuses the eco-score heuristics to generate the app's recommendation data."
    ],
    tags: [
      'React Native',
      'Expo',
      'Python',
      'FastAPI',
      'Gemini 2.5',
      'OCR',
      'Lykdat'
    ],
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/ecoscan-gkfw31' },
      { label: 'GitHub', href: 'https://github.com/xiajieou/EcoScan' }
    ]
  }
]

export const LEADERSHIP = [
  {
    role: 'Vice President',
    org: 'Computer Science Club',
    zone: 'Club HQ',
    location: 'New York, NY',
    period: 'Jan 2026 – Present',
    bullets: [
      'Taught programming workshops, ran coding competitions, and mentored students to build their technical skills.',
      'Drove a 75% membership increase and 25+ average attendance by leading company partnerships and events.'
    ],
    stats: [
      { value: '75%', label: 'membership growth' },
      { value: '25+', label: 'average attendance' }
    ],
    tags: ['Workshops', 'Mentorship', 'Partnerships']
  },
  {
    role: 'Founder & Lead Organizer',
    org: 'Dolphin Hacks (Google × MLH)',
    zone: 'Dolphin Cove',
    location: 'New York, NY',
    period: 'Jan 2026 – Present',
    bullets: [
      'Founded and independently organized Dolphin Hacks, a 12-hour hackathon at the College of Staten Island: sponsorships, website development, Devpost and MLH launch, judging design, and event execution.',
      'Secured $1,000+ in sponsorships from Google, MLH, and the CSI CS Department through targeted outreach.'
    ],
    stats: [
      { value: '$1,000+', label: 'in sponsorships' },
      { value: '12 hr', label: 'hackathon' }
    ],
    tags: ['Hackathons', 'Sponsorships', 'Event Ops'],
    links: [
      { label: 'GitHub', href: 'https://github.com/xiajieou/Dolphin-Hacks' }
    ]
  }
]

// Each group gets one rarity color in the loadout.
export const SKILLS = [
  {
    group: 'Languages',
    rarity: 'legendary',
    items: ['Python', 'TypeScript', 'JavaScript', 'C++']
  },
  {
    group: 'Frameworks & Tools',
    rarity: 'epic',
    items: [
      'PyTorch',
      'CUDA',
      'FastAPI',
      'Linux',
      'Node.js',
      'Express.js',
      'React',
      'Next.js',
      'Kubernetes'
    ]
  },
  {
    group: 'Databases',
    rarity: 'rare',
    items: ['PostgreSQL', 'MySQL', 'SQLite']
  }
]

export const SIDE_QUESTS = {
  experiences: [
    {
      role: 'Undergraduate Researcher',
      org: 'CUNY Research Scholar Program',
      zone: 'Pulse Peaks',
      location: 'New York, NY',
      period: 'Oct 2024 – Jul 2025',
      bullets: [
        'Developed a non-contact heart-rate monitor in Python/OpenCV that estimates pulse in real time from face video.',
        'Built a stable facial pipeline aggregating multiple ROIs to mitigate motion and lighting shifts.'
      ],
      tags: ['Python', 'OpenCV', 'Signal Processing']
    },
    {
      role: 'Code to Give Participant',
      org: 'Morgan Stanley',
      zone: 'Lemon Grove',
      location: 'New York, NY',
      period: 'Mar 2026',
      bullets: [
        'Selected as 1 of 100 from 2,500+ applicants for Morgan Stanley’s Code to Give hackathon.',
        'Collaborated on a volunteer-outreach platform for nonprofit LemonTree to streamline operations.'
      ],
      tags: ['Full-Stack', 'Non-profit', 'Collaboration']
    }
  ],
  projects: [
    {
      title: 'Skinalyze',
      subtitle: 'Real-Time Skin Analysis',
      award: '1st Place · HackKnight (Bloomberg)',
      win: true,
      summary:
        'Real-time skin analysis platform using a microservices architecture with Python + OpenCV preprocessing, Google Gemini Vision for instant responses, and Google Maps API for dermatology locations.',
      rarity: 'epic',
      icon: 'scan',
      tags: ['React', 'TypeScript', 'Express', 'FastAPI', 'OpenCV', 'Gemini'],
      links: [
        { label: 'GitHub', href: 'https://github.com/xiajieou/HackKnight' }
      ]
    },
    {
      title: 'CSI Nursing Dashboard',
      subtitle: 'Mobile-First Study Platform',
      summary:
        'Mobile-first study platform helping CSI nursing students graduate and pass the NCLEX with curated question banks, progress tracking, and dashboards.',
      rarity: 'rare',
      icon: 'medkit',
      tags: ['Next.js', 'TypeScript', 'Auth', 'Vercel'],
      links: [
        { label: 'Live', href: 'https://csi-nursing-dashboard.vercel.app/' }
      ]
    },
    {
      title: 'CSI CS Website Revamp',
      subtitle: 'CS Department · Open Source',
      summary:
        'Modernized the CSI Computer Science department website with a clean, fast, accessible stack, replacing the legacy site with a maintainable component-based codebase.',
      rarity: 'rare',
      icon: 'code',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/xiajieou/csi-website-revamp'
        }
      ]
    },
    {
      title: 'LemonTree Outreach',
      subtitle: 'Morgan Stanley · Code to Give',
      summary:
        'Volunteer-outreach platform built with Team 3 to help nonprofit LemonTree streamline operations, connecting volunteers, coordinators, and events in one place.',
      rarity: 'uncommon',
      icon: 'team',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/xiajieou/MS-CodeToGive-TEAM3'
        }
      ]
    }
  ]
}
