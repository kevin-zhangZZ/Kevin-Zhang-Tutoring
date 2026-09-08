// Maps a question id (see data.ts) to its written worked-solution component.
// Add a new file under ./questions and register it here as you write more up.

import { ComponentType } from 'react'
import SpecialistMCQ6 from './questions/SpecialistMCQ6'
import SpecialistQ2_2016 from './questions/SpecialistQ2_2016'
import SpecialistSAQ3_2016 from './questions/SpecialistSAQ3_2016'
import SpecialistQ4_2016 from './questions/SpecialistQ4_2016'
import MethodsQ3_2015 from './questions/MethodsQ3_2015'
import MethodsQ16_2015 from './questions/MethodsQ16_2015'
import MethodsQ17_2015 from './questions/MethodsQ17_2015'
import MethodsQ4_2014Exam1 from './questions/MethodsQ4_2014Exam1'
import MethodsQ21_2014 from './questions/MethodsQ21_2014'
import MethodsQ22_2014 from './questions/MethodsQ22_2014'
import MethodsQ3_2014Exam2 from './questions/MethodsQ3_2014Exam2'
import MethodsQ4_2014Exam2 from './questions/MethodsQ4_2014Exam2'

export const QUESTION_DETAILS: Partial<Record<string, ComponentType>> = {
  'spec-mcq6': SpecialistMCQ6,
  'spec-q2-2016': SpecialistQ2_2016,
  'spec-saq3': SpecialistSAQ3_2016,
  'spec-q4-2016': SpecialistQ4_2016,

  'meth-q3-2015': MethodsQ3_2015,
  'meth-q16-2015': MethodsQ16_2015,
  'meth-q17-2015': MethodsQ17_2015,
  'meth-q4-2014-e1': MethodsQ4_2014Exam1,
  'meth-q21-2014': MethodsQ21_2014,
  'meth-q22-2014': MethodsQ22_2014,
  'meth-q3-2014-e2': MethodsQ3_2014Exam2,
  'meth-q4-2014-e2': MethodsQ4_2014Exam2,
}
