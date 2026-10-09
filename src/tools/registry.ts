import { ComponentType, lazy } from 'react'
import type { ToolIconName } from '../components/ToolIcon'

// Each tool's code loads only when its page is opened (App.tsx wraps the routes in Suspense),
// so Home and the light tools never download the worked solutions or the 3D demos.
const UnitCircle = lazy(() => import('./unit-circle'))
const SpeedMaths = lazy(() => import('./speed-maths'))
const ExamSkipGuide = lazy(() => import('./exam-skip-guide'))
const WorkedSolutions = lazy(() => import('./worked-solutions'))
const ExamAnalysis = lazy(() => import('./exam-analysis'))
const StudyScore = lazy(() => import('./study-score'))
const ContactMe = lazy(() => import('./contact-me'))
const MiscDemonstrations = lazy(() => import('./misc-demonstrations'))

export type ToolGroup = 'Exams' | 'Practice' | 'Explore'
export const toolGroups: ToolGroup[] = ['Exams', 'Practice', 'Explore']

export interface Tool {
  id: string
  name: string
  description: string
  /** One short line, for the compact tool cards and the phone home list. */
  tagline: string
  route: string
  component: ComponentType
  icon: ToolIconName
  /** Shorter name for the side menu, where the full one would wrap. */
  navName?: string
  /** Which heading the tool sits under in the side menu. */
  group?: ToolGroup
  /** 'contact' pages get their own place in the menu and on Home instead of a tool card. */
  section?: 'contact'
}

// Central registry — add new tools here only.
// Sidebar and Home page render automatically from this list, in this order.
export const tools: Tool[] = [
  {
    id: 'worked-solutions',
    name: 'VCAA Exam Explanations',
    description: 'Every Methods and Specialist question from 2014 to 2025, and the hardest Chemistry questions, with full working and examiners’ comments.',
    tagline: 'Every Methods & Specialist question, 2014–2025',
    route: '/worked-solutions',
    component: WorkedSolutions,
    icon: 'explanations',
    group: 'Exams',
    navName: 'Exam Explanations',
  },
  {
    id: 'exam-analysis',
    name: 'Exam Analysis',
    description: 'How the 2014–2025 Methods and Specialist exams split their marks across topics, which topics students find hardest, and what’s being examined more or less.',
    tagline: 'Topics, marks and difficulty, 2014–2025',
    route: '/exam-analysis',
    component: ExamAnalysis,
    icon: 'analysis',
    group: 'Exams',
  },
  {
    id: 'study-score',
    name: 'Study Score Projection',
    description: 'Enter your Methods or Specialist Exam 1 and Exam 2 marks and see the study score they would have earned in each year from 2016 to 2025.',
    tagline: 'Your exam marks as a study score, 2016–2025',
    route: '/study-score',
    component: StudyScore,
    icon: 'study-score',
    group: 'Exams',
  },
  {
    id: 'exam-skip-guide',
    name: 'Past Exam Skip Guide',
    description: 'Which 2014–2022 Methods, Specialist, and Chemistry exam questions to skip now that the study design has changed.',
    tagline: 'What to skip in 2014–2022 papers',
    route: '/exam-skip-guide',
    component: ExamSkipGuide,
    icon: 'skip-guide',
    group: 'Exams',
    navName: 'Skip Guide',
  },
  {
    id: 'unit-circle',
    name: 'Unit Circle',
    description: 'Memorize and practice the 16 key angles with their exact sin, cos, and tan values.',
    tagline: 'Learn and test the 16 key angles',
    route: '/unit-circle',
    component: UnitCircle,
    icon: 'unit-circle',
    group: 'Practice',
  },
  {
    id: 'speed-maths',
    name: 'Speed Maths',
    description: 'Race the clock: solve as many arithmetic problems as you can before time runs out.',
    tagline: 'Mental arithmetic against the clock',
    route: '/speed-maths',
    component: SpeedMaths,
    icon: 'speed-maths',
    group: 'Practice',
  },
  {
    id: 'misc-demonstrations',
    name: 'Misc Demonstrations',
    description: 'Interactive 3D models: slice pyramids and prisms to see where V = Ah and V = ⅓Ah come from, and fold nets into solids.',
    tagline: 'Pyramids, prisms and nets in 3D',
    route: '/misc-demonstrations',
    component: MiscDemonstrations,
    icon: 'demonstrations',
    group: 'Explore',
    navName: 'Demonstrations',
  },
  // Monte Carlo hidden from nav/routing for now — code kept at ./monte-carlo, unregister
  // above and re-add this block to bring it back.
  {
    id: 'contact-me',
    name: 'Contact Me',
    description: 'Get in touch by email, or scan to add me on WeChat.',
    tagline: 'Email or WeChat',
    route: '/contact-me',
    component: ContactMe,
    icon: 'contact',
    section: 'contact',
  },
]

export const contactTool = tools.find(t => t.section === 'contact')
