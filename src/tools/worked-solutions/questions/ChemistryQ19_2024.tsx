// 2024 Chemistry Exam, MCQ 19. VCAA examination report: 34% correct. Comparing cyclohexane and
// benzene on isomers, bond strength, homologous series, and valence electrons, by elimination
// against genuine organic chemistry facts. Question text transcribed from the original paper
// (rendered from page images — the 2024 exam PDF has no extractable text). The report's comment
// writes "C₆C₁₂ (any pentene)" for C₆H₁₂ (any hexene) — kept verbatim and explained in the
// working. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 34, B: 14, C: 22, D: 30 },
  answer: 'A',
  comment: (
    <>
      Linear compounds with the same molecular formula of both C₆C₁₂ (any pentene) and C₆H₆
      (1,5-hexadiyne) can and do exist.
      <br />
      Average bond strengths in benzene are much greater than cyclohexane.
      <br />
      These molecules do not have the same functional groups, and therefore cannot be members of
      the same homologous series.
      <br />
      Each carbon in both structures have the same number of valence electrons.
      <br />
      Many students confused the structural differences between cyclohexane and benzene.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Cyclohexane is <Chem eq="C6H12" />, a ring of six carbon atoms joined by single bonds; benzene is <Chem eq="C6H6" />, a ring of six carbon atoms with delocalised electrons.</>,
    reason: <>The starting molecular formulas each option has to be checked against.</>,
  },
  {
    working: <>A: C₆H₁₂ is also the formula of the straight-chain hexenes, e.g. hex-1-ene, <Chem eq="CH2=CHCH2CH2CH2CH3" /> (a C=C double bond in place of the ring). C₆H₆ is also the formula of hexa-1,5-diyne, <Chem eq="HC≡CCH2CH2C≡CH" /> (the report&rsquo;s example).</>,
    reason: <>Both have structural isomers that are not cyclic. Correct.</>,
  },
  {
    working: <>B: benzene&rsquo;s carbon–carbon bonds, with their delocalised electrons, are stronger (and shorter) than the C–C single bonds in cyclohexane.</>,
    reason: <>Bond strengths are genuinely different, not the same. Ruled out.</>,
  },
  {
    working: <>C: cyclohexane is a <b>cycloalkane</b> (single bonds only) while benzene is an <b>aromatic hydrocarbon</b> (delocalised ring system) — these are chemically distinct families with different general formulas and reactivity, not members of one homologous series.</>,
    reason: <>Different functional-group families. Ruled out.</>,
  },
  {
    working: <>D: every carbon atom, in any compound, has exactly <b>4 valence electrons</b> — this never changes based on what molecule the carbon happens to be part of.</>,
    reason: <>Valence electron count is a property of the element, not the compound. Ruled out.</>,
  },
  {
    working: <b>Only the claim about both having non-cyclic structural isomers holds up.</b>,
    reason: <>Matches option <b>A</b>. Option <b>D</b>, chosen by 30%, gives carbon a different number of valence electrons in different compounds; every carbon atom has 4. (The report&rsquo;s comment writes &ldquo;C₆C₁₂ (any pentene)&rdquo;; these are slips for C₆H₁₂ and any hexene — pentenes are C₅H₁₀.)</>,
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
