import { ComponentType } from 'react'
import UnitCircle from './unit-circle'
import SpeedMaths from './speed-maths'
import ExamSkipGuide from './exam-skip-guide'
import WorkedSolutions from './worked-solutions'
import ExamAnalysis from './exam-analysis'
import ContactMe from './contact-me'

export interface Tool {
  id: string
  name: string
  description: string
  /** One short line, for the compact tool cards and the phone home list. */
  tagline: string
  route: string
  component: ComponentType
  icon: string
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
    icon: '🎬',
  },
  {
    id: 'exam-analysis',
    name: 'Exam Analysis',
    description: 'How the 2014–2025 Methods and Specialist exams split their marks across topics, which topics students find hardest, and what’s being examined more or less.',
    tagline: 'Topics, marks and difficulty, 2014–2025',
    route: '/exam-analysis',
    component: ExamAnalysis,
    icon: '📊',
  },
  {
    id: 'exam-skip-guide',
    name: 'Past Exam Skip Guide',
    description: 'Which 2014–2022 Methods, Specialist, and Chemistry exam questions to skip now that the study design has changed.',
    tagline: 'What to skip in 2014–2022 papers',
    route: '/exam-skip-guide',
    component: ExamSkipGuide,
    icon: '📋',
  },
  {
    id: 'unit-circle',
    name: 'Unit Circle',
    description: 'Memorize and practice the 16 key angles with their exact sin, cos, and tan values.',
    tagline: 'Learn and test the 16 key angles',
    route: '/unit-circle',
    component: UnitCircle,
    icon: '◎',
  },
  {
    id: 'speed-maths',
    name: 'Speed Maths',
    description: 'Race the clock: solve as many arithmetic problems as you can before time runs out.',
    tagline: 'Mental arithmetic against the clock',
    route: '/speed-maths',
    component: SpeedMaths,
    icon: '⚡',
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
    icon: '✉️',
    section: 'contact',
  },
]

export const contactTool = tools.find(t => t.section === 'contact')
