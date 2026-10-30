// 2021 Chemistry Exam, MCQ 15. VCAA examination report: 56% correct. Flashpoint and
// intermolecular forces: chain length, structural isomers, fire risk and optical isomers
// (3-methylhexane). Question text transcribed from the original paper. Flashpoint is not named
// in the current (2024–) study design, which lists boiling point, melting point and viscosity,
// but it follows the same intermolecular-force reasoning — a note says so. VCAA report only.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 11, C: 19, D: 56 },
  answer: 'D',
  comment: (
    <>
      The flashpoint of a substance depends significantly on the strength of intermolecular
      attraction.
      <br />
      A. Pentane, C₅H₁₂, with weaker intermolecular dispersion force attraction than octane,
      C₈H₁₈, has a lower flashpoint.
      <br />
      B. Structural isomers are different compounds and the intermolecular attraction in branched
      isomers is generally weaker than in straight-chain isomers. Consequently, structural isomers
      have different flashpoints.
      <br />
      C. Fire risk is greater with low flash point compounds since these give off ignitable vapour
      at lower temperatures.
      <br />
      D. Optical isomers have the same physical properties (i.e. the same strength of
      intermolecular attraction) and will have equal flashpoints.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Stronger intermolecular forces → harder to vaporise → <b>higher</b> flashpoint (like a higher boiling point).</>,
    reason: <>The flashpoint is the lowest temperature at which a liquid gives off enough vapour to ignite in air. Anything that holds the molecules together more strongly means more heating is needed before that much vapour forms.</>,
  },
  {
    working: <>A ✗ — pentane (<Chem eq="C5H12" />) is a smaller molecule than octane (<Chem eq="C8H18" />): weaker dispersion forces, so a <b>lower</b> flashpoint than octane.</>,
    reason: <>Within a homologous series, a longer chain means more electrons and more contact between molecules, so stronger dispersion forces. The statement has the trend backwards.</>,
  },
  {
    working: <>B ✗ — the structural isomers of <Chem eq="C4H10O" /> (e.g. butan-1-ol and 2-methylpropan-2-ol) are different compounds with different shapes, so different intermolecular forces and different flashpoints.</>,
    reason: <>Same molecular formula ≠ same properties. A more branched, compact isomer has less surface contact between molecules and so weaker dispersion forces than its straight-chain isomer. Some <Chem eq="C4H10O" /> isomers are not even alcohols: ethoxyethane, <Chem eq="CH3CH2OCH2CH3" />, has no O–H, so its molecules can&rsquo;t hydrogen bond to each other and it vaporises far more easily than the butanols.</>,
  },
  {
    working: <>C ✗ — a <b>higher</b> flashpoint means a <b>lower</b> fire risk.</>,
    reason: <>A low-flashpoint liquid gives off ignitable vapour at lower temperatures (even room temperature), so it is the more dangerous one. The statement reverses the relationship.</>,
  },
  {
    working: <>D ✓ — 3-methylhexane, <Chem eq="CH3CH2CH(CH3)CH2CH2CH3" />, has a chiral carbon (C3: H, <Chem eq="CH3" />, <Chem eq="C2H5" />, <Chem eq="C3H7" />), so it has two optical isomers. They have identical intermolecular forces, so equal flashpoints.</>,
    reason: <>A chiral centre is a carbon bonded to four different groups. Its two optical isomers are non-superimposable mirror images: the same atoms, the same bonds and the same shape (just mirrored), so the same intermolecular forces and the same physical properties — boiling point, flashpoint, viscosity.</>,
  },
  {
    working: <b>D — the optical isomers of 3-methylhexane have equal flashpoints.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b> (19%) reverses the flashpoint–fire-risk link; option <b>A</b> (14%) reverses the chain-length trend; option <b>B</b> (11%) treats structural isomers — which are different compounds — as having identical properties.</>,
  },
]

export default function ChemistryQ15_2021() {
  return (
    <MCQShell
      question={<p>Which one of the following statements is correct?</p>}
      options={[
        { letter: 'A', content: <>Pentane has a higher flashpoint than octane.</> },
        { letter: 'B', content: <>The flashpoint of all the structural isomers of <Chem eq="C4H10O" /> are equal.</> },
        { letter: 'C', content: <>The higher the flashpoint of a compound, the higher its fire risk.</> },
        { letter: 'D', content: <>The flashpoint of all the optical isomers of 3-methyl hexane are equal.</>, isAnswer: true },
      ]}
      background={
        <Background title="Flashpoint and the Current Study Design">
          <p>
            This question was set on the old (2017–2023) study design, which named flashpoint. The
            current study design asks about trends in boiling point, melting point and viscosity
            instead, and about chiral centres and isomers. Flashpoint follows exactly the same
            intermolecular-force reasoning as boiling point, so the question is still good
            practice — read &ldquo;flashpoint&rdquo; as &ldquo;how easily the liquid vaporises&rdquo;.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
