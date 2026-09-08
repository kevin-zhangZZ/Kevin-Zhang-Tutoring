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
import MethodsQ19_2016 from './questions/MethodsQ19_2016'
import MethodsQ20_2016 from './questions/MethodsQ20_2016'
import MethodsQ11_2015 from './questions/MethodsQ11_2015'
import SpecialistQ7_2016 from './questions/SpecialistQ7_2016'
import SpecialistQ4_2015 from './questions/SpecialistQ4_2015'
import SpecialistQ6_2015 from './questions/SpecialistQ6_2015'
import MethodsQ18_2018 from './questions/MethodsQ18_2018'
import MethodsQ20_2018 from './questions/MethodsQ20_2018'
import MethodsQ17_2017 from './questions/MethodsQ17_2017'
import MethodsQ11_2018 from './questions/MethodsQ11_2018'
import MethodsQ7_2017 from './questions/MethodsQ7_2017'
import SpecialistQ10_2017 from './questions/SpecialistQ10_2017'
import SpecialistQ12_2018 from './questions/SpecialistQ12_2018'
import SpecialistQ2_2017 from './questions/SpecialistQ2_2017'
import SpecialistQ5_2018 from './questions/SpecialistQ5_2018'

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

  // Hardest-5 MCQs per subject, 2014-2016 Exam 2 (see data.ts percentCorrect)
  'meth-q19-2016': MethodsQ19_2016,
  'meth-q20-2016': MethodsQ20_2016,
  'meth-q11-2015': MethodsQ11_2015,
  'spec-q7-2016': SpecialistQ7_2016,
  'spec-q4-2015': SpecialistQ4_2015,
  'spec-q6-2015': SpecialistQ6_2015,

  // Hardest-5 MCQs per subject, 2017-2018 Exam 2 (see data.ts percentCorrect)
  'meth-q18-2018': MethodsQ18_2018,
  'meth-q20-2018': MethodsQ20_2018,
  'meth-q17-2017': MethodsQ17_2017,
  'meth-q11-2018': MethodsQ11_2018,
  'meth-q7-2017': MethodsQ7_2017,
  'spec-q10-2017': SpecialistQ10_2017,
  'spec-q12-2018': SpecialistQ12_2018,
  'spec-q2-2017': SpecialistQ2_2017,
  'spec-q5-2018': SpecialistQ5_2018,
}
