import { ComponentType } from 'react'
import UnitCircle from './unit-circle'
import SpeedMaths from './speed-maths'
import MonteCarlo from './monte-carlo'
import ExamSkipGuide from './exam-skip-guide'
import ContactMe from './contact-me'

export interface Tool {
  id: string
  name: string
  description: string
  route: string
  component: ComponentType
  icon: string
}

// Central registry — add new tools here only.
// Sidebar and Home page render automatically from this list.
export const tools: Tool[] = [
  {
    id: 'unit-circle',
    name: 'Unit Circle',
    description: 'Memorize and practice the 16 key angles with their exact sin, cos, and tan values.',
    route: '/unit-circle',
    component: UnitCircle,
    icon: '◎',
  },
  {
    id: 'speed-maths',
    name: 'Speed Maths',
    description: 'Race the clock: solve as many arithmetic problems as you can before time runs out.',
    route: '/speed-maths',
    component: SpeedMaths,
    icon: '⚡',
  },
  {
    id: 'monte-carlo',
    name: 'Monte Carlo',
    description: 'Use random sampling to estimate π, probabilities, and expected values — and watch the Law of Large Numbers in action.',
    route: '/monte-carlo',
    component: MonteCarlo,
    icon: '🎲',
  },
  {
    id: 'exam-skip-guide',
    name: 'Past Exam Skip Guide',
    description: 'Which 2014–2022 Methods, Specialist, and Chemistry exam questions to skip now that the study design has changed.',
    route: '/exam-skip-guide',
    component: ExamSkipGuide,
    icon: '📋',
  },
  {
    id: 'contact-me',
    name: 'Contact Me',
    description: 'Get in touch by email, or scan to add me on WeChat.',
    route: '/contact-me',
    component: ContactMe,
    icon: '✉️',
  },
]
