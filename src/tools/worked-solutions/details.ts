// Maps a question id (see data.ts) to its written worked-solution component.
// Add a new file under ./questions and register it here as you write more up.

import { ComponentType } from 'react'
import SpecialistMCQ6 from './questions/SpecialistMCQ6'
import SpecialistSAQ3_2016 from './questions/SpecialistSAQ3_2016'

export const QUESTION_DETAILS: Partial<Record<string, ComponentType>> = {
  'spec-mcq6': SpecialistMCQ6,
  'spec-saq3': SpecialistSAQ3_2016,
}
