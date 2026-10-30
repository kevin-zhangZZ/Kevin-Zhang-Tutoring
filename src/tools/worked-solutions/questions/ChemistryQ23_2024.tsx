// 2024 Chemistry Exam, MCQ 23. VCAA examination report: 59% correct. Why water must be kept out
// of the base-catalysed transesterification of a triglyceride with methanol (biodiesel
// production): esterification is an equilibrium with water as a product, so water drives
// hydrolysis instead. Question text transcribed from the original paper (rendered from page
// images — the 2024 exam PDF has no extractable text). VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 59, C: 30, D: 3 },
  answer: 'B',
  comment: (
    <>
      Esterification reactions are equilibrium systems with water as a product. Therefore, in the
      presence of water, any ester formed is going to potentially undergo hydrolysis and form the
      fatty acid rather than the desired biodiesel.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>triglyceride + 3CH₃OH ⇌ glycerol + 3 methyl esters (biodiesel, Compound J)</>,
    reason: <>The reaction in the stem is <b>transesterification</b>, with KOH as the catalyst. Like esterification, it is an <b>equilibrium</b>: ester links can be made and broken.</>,
  },
  {
    working: (
      <>
        With water present, ester links are <b>hydrolysed</b>:
        <br />
        <Chem eq="RCOOCH3 + H2O <=> RCOOH + CH3OH" />
        <br />and in KOH the fatty acid is converted to its salt (soap): <Chem eq="RCOOH + OH- -> RCOO- + H2O" />
      </>
    ),
    reason: <>Water is a <b>product</b> of esterification, so adding it pushes the equilibrium back towards the <b>acid and alcohol</b> (Le Chatelier). The ester links of both the triglyceride and the biodiesel are broken to fatty acid, which the strong base then turns into soap — fatty acid or soap forms <b>instead of</b> the desired methyl ester, lowering the yield of Compound J.</>,
  },
  {
    working: (
      <>
        A ✗ — KOH is corrosive, but the reaction needs <b>concentrated</b> KOH and adding water is the problem, not a fix.
        <br />C ✗ — triglycerides are <b>non-polar</b> and do not dissolve in water.
        <br />D ✗ — water does not increase the frequency of successful collisions between triglyceride and methanol; it dilutes them and causes a competing reaction.
      </>
    ),
    reason: <>Check each other option against the chemistry. C&rsquo;s premise is false: the long hydrocarbon chains of a triglyceride make it insoluble in water (it is glycerol that is water-soluble). D gives a rate explanation, but water&rsquo;s effect here is on <b>which products form</b>, not on collision frequency.</>,
  },
  {
    working: <b>H₂O should not be added, because it interferes with the desired reaction.</b>,
    reason: <>Matches option <b>B</b>. Option <b>C</b>, chosen by 30%, rests on the false idea that the triglyceride is soluble in water.</>,
  },
]

export default function ChemistryQ23_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 22 and 23.</p>
          <p className="mb-3">
            A triglyceride is reacted with methanol, CH₃OH, in the presence of concentrated KOH(aq).
            The products of this reaction are glycerol and Compound J.
          </p>
          <p>When the triglyceride is reacted with methanol to produce glycerol and Compound J</p>
        </>
      }
      options={[
        { letter: 'A', content: 'H₂O should be added to the KOH directly, because KOH is corrosive and causes skin burns.' },
        { letter: 'B', content: 'H₂O should not be added to the reaction mixture because it interferes with the desired reaction.', isAnswer: true },
        { letter: 'C', content: 'H₂O should be added to separate the triglyceride from glycerol since the triglyceride is soluble in water.' },
        { letter: 'D', content: 'H₂O should not be added to the reaction mixture because it increases the frequency of successful collisions.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
