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
import SpecialistQ9_2015 from './questions/SpecialistQ9_2015'
import SpecialistQ17_2015 from './questions/SpecialistQ17_2015'
import SpecialistQ3_2015 from './questions/SpecialistQ3_2015'
import SpecialistQ10_2015 from './questions/SpecialistQ10_2015'
import SpecialistQ9_2016 from './questions/SpecialistQ9_2016'
import SpecialistQ1_2016 from './questions/SpecialistQ1_2016'
import SpecialistQ18_2016 from './questions/SpecialistQ18_2016'
import SpecialistQ10_2016 from './questions/SpecialistQ10_2016'
import SpecialistQ19_2017 from './questions/SpecialistQ19_2017'
import SpecialistQ9_2017 from './questions/SpecialistQ9_2017'
import SpecialistQ6_2017 from './questions/SpecialistQ6_2017'
import SpecialistQ3_2017 from './questions/SpecialistQ3_2017'
import SpecialistQ3_2018 from './questions/SpecialistQ3_2018'
import SpecialistQ4_2018 from './questions/SpecialistQ4_2018'
import SpecialistQ20_2018 from './questions/SpecialistQ20_2018'
import SpecialistQ19_2018 from './questions/SpecialistQ19_2018'
import MethodsQ9_2015 from './questions/MethodsQ9_2015'
import MethodsQ21_2015 from './questions/MethodsQ21_2015'
import MethodsQ14_2016 from './questions/MethodsQ14_2016'
import MethodsQ9_2016 from './questions/MethodsQ9_2016'
import MethodsQ11_2016 from './questions/MethodsQ11_2016'
import MethodsQ10_2016 from './questions/MethodsQ10_2016'
import MethodsQ18_2017 from './questions/MethodsQ18_2017'
import MethodsQ16_2017 from './questions/MethodsQ16_2017'
import MethodsQ12_2017 from './questions/MethodsQ12_2017'
import MethodsQ13_2017 from './questions/MethodsQ13_2017'
import MethodsQ4_2018 from './questions/MethodsQ4_2018'
import MethodsQ15_2018 from './questions/MethodsQ15_2018'
import MethodsQ16_2018 from './questions/MethodsQ16_2018'
import ChemistryQ29_2015 from './questions/ChemistryQ29_2015'
import ChemistryQ15_2015 from './questions/ChemistryQ15_2015'
import ChemistryQ8_2015 from './questions/ChemistryQ8_2015'
import ChemistryQ28_2015 from './questions/ChemistryQ28_2015'
import ChemistryQ4_2015 from './questions/ChemistryQ4_2015'
import ChemistryQ22_2015 from './questions/ChemistryQ22_2015'
import ChemistryQ27_2016 from './questions/ChemistryQ27_2016'
import ChemistryQ20_2016 from './questions/ChemistryQ20_2016'
import ChemistryQ25_2016 from './questions/ChemistryQ25_2016'
import ChemistryQ24_2016 from './questions/ChemistryQ24_2016'
import ChemistryQ26_2016 from './questions/ChemistryQ26_2016'
import ChemistryQ29_2016 from './questions/ChemistryQ29_2016'
import ChemistryQ9_2017 from './questions/ChemistryQ9_2017'
import ChemistryQ26_2017 from './questions/ChemistryQ26_2017'
import ChemistryQ14_2017 from './questions/ChemistryQ14_2017'
import ChemistryQ3_2017 from './questions/ChemistryQ3_2017'
import ChemistryQ22_2017 from './questions/ChemistryQ22_2017'
import ChemistryQ23_2017 from './questions/ChemistryQ23_2017'
import ChemistryQ26_2018 from './questions/ChemistryQ26_2018'
import ChemistryQ2_2018 from './questions/ChemistryQ2_2018'
import ChemistryQ12_2018 from './questions/ChemistryQ12_2018'
import ChemistryQ17_2018 from './questions/ChemistryQ17_2018'
import ChemistryQ25_2018 from './questions/ChemistryQ25_2018'
import ChemistryQ27_2018 from './questions/ChemistryQ27_2018'

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
  'spec-q9-2015': SpecialistQ9_2015,
  'spec-q17-2015': SpecialistQ17_2015,
  'spec-q3-2015': SpecialistQ3_2015,
  'spec-q10-2015': SpecialistQ10_2015,
  'spec-q9-2016': SpecialistQ9_2016,
  'spec-q1-2016': SpecialistQ1_2016,
  'spec-q18-2016': SpecialistQ18_2016,
  'spec-q10-2016': SpecialistQ10_2016,
  'spec-q19-2017': SpecialistQ19_2017,
  'spec-q9-2017': SpecialistQ9_2017,
  'spec-q6-2017': SpecialistQ6_2017,
  'spec-q3-2017': SpecialistQ3_2017,
  'spec-q3-2018': SpecialistQ3_2018,
  'spec-q4-2018': SpecialistQ4_2018,
  'spec-q20-2018': SpecialistQ20_2018,
  'spec-q19-2018': SpecialistQ19_2018,
  'meth-q9-2015': MethodsQ9_2015,
  'meth-q21-2015': MethodsQ21_2015,
  'meth-q14-2016': MethodsQ14_2016,
  'meth-q9-2016': MethodsQ9_2016,
  'meth-q11-2016': MethodsQ11_2016,
  'meth-q10-2016': MethodsQ10_2016,
  'meth-q18-2017': MethodsQ18_2017,
  'meth-q16-2017': MethodsQ16_2017,
  'meth-q12-2017': MethodsQ12_2017,
  'meth-q13-2017': MethodsQ13_2017,
  'meth-q4-2018': MethodsQ4_2018,
  'meth-q15-2018': MethodsQ15_2018,
  'meth-q16-2018': MethodsQ16_2018,
  'chem-q29-2015': ChemistryQ29_2015,
  'chem-q15-2015': ChemistryQ15_2015,
  'chem-q8-2015': ChemistryQ8_2015,
  'chem-q28-2015': ChemistryQ28_2015,
  'chem-q4-2015': ChemistryQ4_2015,
  'chem-q22-2015': ChemistryQ22_2015,
  'chem-q27-2016': ChemistryQ27_2016,
  'chem-q20-2016': ChemistryQ20_2016,
  'chem-q25-2016': ChemistryQ25_2016,
  'chem-q24-2016': ChemistryQ24_2016,
  'chem-q26-2016': ChemistryQ26_2016,
  'chem-q29-2016': ChemistryQ29_2016,
  'chem-q9-2017': ChemistryQ9_2017,
  'chem-q26-2017': ChemistryQ26_2017,
  'chem-q14-2017': ChemistryQ14_2017,
  'chem-q3-2017': ChemistryQ3_2017,
  'chem-q22-2017': ChemistryQ22_2017,
  'chem-q23-2017': ChemistryQ23_2017,
  'chem-q26-2018': ChemistryQ26_2018,
  'chem-q2-2018': ChemistryQ2_2018,
  'chem-q12-2018': ChemistryQ12_2018,
  'chem-q17-2018': ChemistryQ17_2018,
  'chem-q25-2018': ChemistryQ25_2018,
  'chem-q27-2018': ChemistryQ27_2018,

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
