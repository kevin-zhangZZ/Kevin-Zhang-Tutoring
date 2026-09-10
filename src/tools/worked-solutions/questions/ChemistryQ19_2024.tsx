// 2024 Chemistry Exam, MCQ 19. VCAA examination report: 34% correct. Comparing cyclohexane and
// benzene on isomers, bond strength, homologous series, and valence electrons, by elimination
// against genuine organic chemistry facts. Question text transcribed from the original paper
// (rendered from page images — the 2024 exam PDF has no extractable text). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 34, B: 14, C: 22, D: 30 },
  answer: 'A',
  comment: (
    <>
      Linear compounds with the same molecular formula as both C₆H₁₂ (e.g. hex-1-ene) and C₆H₆
      (e.g. hexa-1,3-dien-5-yne) can and do exist. Average bond strengths in benzene are much
      greater than in cyclohexane. These molecules do not have the same functional groups, and
      therefore cannot be members of the same homologous series. Each carbon in both structures
      has the same number of valence electrons.</>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Cyclohexane is <Chem eq="C6H12" /> (a saturated ring, one degree of unsaturation from the ring itself); benzene is <Chem eq="C6H6" /> (aromatic, four degrees of unsaturation).</>,
    reason: 'The starting molecular formulas each option has to be checked against.',
  },
  {
    working: <>A: any structural isomer sharing the <i>same</i> molecular formula and degree of unsaturation doesn't have to be cyclic — a straight-chain alkene like hex-1-ene has the formula C₆H₁₂ with one degree of unsaturation (a C=C double bond instead of a ring), and a linear compound like hexa-1,3-dien-5-yne has formula C₆H₆ with four degrees of unsaturation (from double/triple bonds instead of the benzene ring).</>,
    reason: 'Genuine non-cyclic isomers exist for both molecular formulas. Correct.',
  },
  {
    working: <>B: benzene's C–C bonds are strengthened by <b>delocalised π-electron resonance</b> around the ring, making them significantly stronger (and shorter) than the plain single C–C σ-bonds in cyclohexane.</>,
    reason: 'Bond strengths are genuinely different, not the same. Ruled out.',
  },
  {
    working: <>C: cyclohexane is a <b>cycloalkane</b> (single bonds only) while benzene is an <b>aromatic hydrocarbon</b> (delocalised ring system) — these are chemically distinct families with different general formulas and reactivity, not members of one homologous series.</>,
    reason: 'Different functional-group families. Ruled out.',
  },
  {
    working: <>D: every carbon atom, in any compound, has exactly <b>4 valence electrons</b> — this never changes based on what molecule the carbon happens to be part of.</>,
    reason: "Valence electron count is a property of the element, not the compound. Ruled out.",
  },
  {
    working: <b>Only the claim about both having non-cyclic structural isomers holds up.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ19_2024() {
  return (
    <MCQShell
      question={<p>Which one of the following statements about cyclohexane and benzene is correct?</p>}
      options={[
        { letter: 'A', content: 'Both have structural isomers that are not cyclic.', isAnswer: true },
        { letter: 'B', content: 'Both have the same average bond strength between their carbon atoms.' },
        { letter: 'C', content: 'Both are members of the same homologous series.' },
        { letter: 'D', content: 'Each carbon in cyclohexane has one more valence electron than each carbon in benzene.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
