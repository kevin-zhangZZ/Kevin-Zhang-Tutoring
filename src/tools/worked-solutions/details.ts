// Maps a question id (see data.ts) to its written worked-solution component.
// Add a new file under ./questions and register it here as you write more up.

import { ComponentType } from 'react'
import SpecialistMCQ6 from './questions/SpecialistMCQ6'
import SpecialistQ2_2016 from './questions/SpecialistQ2_2016'
import SpecialistSAQ3_2016 from './questions/SpecialistSAQ3_2016'
import SpecialistQ4_2016 from './questions/SpecialistQ4_2016'

export const QUESTION_DETAILS: Partial<Record<string, ComponentType>> = {
  'spec-mcq6': SpecialistMCQ6,
  'spec-q2-2016': SpecialistQ2_2016,
  'spec-saq3': SpecialistSAQ3_2016,
  'spec-q4-2016': SpecialistQ4_2016,
}
