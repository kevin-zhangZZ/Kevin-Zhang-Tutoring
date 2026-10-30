// 2020 Chemistry Exam, MCQ 24. VCAA examination report: 45% correct. Deciding which rinsing
// error makes the calculated concentration of citric acid in an acid–base titration too high.
// Question text transcribed from the original paper. VCAA report only. The report's "soltion" is
// kept verbatim. Acid–base titration is Unit 2 in the current study design (Unit 4 examines redox
// titrations, where the same rinsing rules apply). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 20, C: 21, D: 45 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      Since a 25.0 mL aliquot of citric acid soltion was titrated with a 0.0250 M solution of
      NaOH, the citric acid was added via a pipette and the NaOH(aq) added via a burette. So the
      appropriate rinsing procedures are:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>pipette – <Chem eq="C3H5O(COOH)3(aq)" /></li>
        <li>burette – NaOH(aq)</li>
        <li>conical flask – water.</li>
      </ul>
      Rinsing the pipette or the conical flask with NaOH(aq) means less{' '}
      <Chem eq="C3H5O(COOH)3" /> will be available for titration and the <i>V</i>(NaOH(aq))
      needed to reach the endpoint will be lower, leading to a lower calculated concentration of
      citric acid.
      <br />
      Rinsing the conical flask with <Chem eq="C3H5O(COOH)3(aq)" /> will increase the amount of
      NaOH(aq) required to reach the endpoint during the titration leading to a higher calculated{' '}
      <i>c</i>(<Chem eq="C3H5O(COOH)3" />).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        Correct rinsing:
        <br />
        pipette → the solution it delivers, <Chem eq="C3H5O(COOH)3(aq)" />
        <br />
        burette → the solution it delivers, NaOH(aq)
        <br />
        conical flask → water (deionised)
      </>
    ),
    reason: <>The pipette and burette deliver a <b>measured volume</b>, so any water left in them would dilute their solution; rinsing with that solution prevents this. The conical flask only holds the reaction, and the <b>amount</b> (mol) of acid in it is fixed by the pipette, so leftover water doesn&rsquo;t matter — but anything else left in it would change the amount of acid or base present.</>,
  },
  {
    working: (
      <>
        <i>c</i>(citric acid) = (<i>c</i>(NaOH) × titre ÷ 3) ÷ 0.0250 L
        <br />
        higher titre → higher calculated <i>c</i>(citric acid)
      </>
    ),
    reason: <>From Question 23: the calculation assumes the flask holds exactly the citric acid in 25.0 mL of solution. Anything that puts <b>extra acid</b> in the flask raises the titre and so the calculated concentration; anything that <b>removes acid</b> (neutralises it before the titration) lowers the titre and the result.</>,
  },
  {
    working: <>A — pipette rinsed with NaOH: leftover NaOH neutralises some citric acid → smaller titre → <b>lower</b>.</>,
    reason: <>The film of NaOH in the pipette ends up in the flask with the aliquot and reacts with some of the acid before the burette is opened.</>,
  },
  {
    working: <>B — pipette rinsed with <Chem eq="C3H5O(COOH)3" /> solution: correct procedure → <b>accurate</b>.</>,
    reason: <>This is what should be done, so it gives the actual concentration, not a higher one.</>,
  },
  {
    working: <>C — conical flask rinsed with NaOH: leftover NaOH neutralises some citric acid → smaller titre → <b>lower</b>.</>,
    reason: <>Same effect as A: base already in the flask means less NaOH is needed from the burette.</>,
  },
  {
    working: <>D — conical flask rinsed with <Chem eq="C3H5O(COOH)3" /> solution: extra citric acid in the flask → larger titre → <b>higher</b>.</>,
    reason: <>The flask now holds the 25.0 mL aliquot <i>plus</i> the acid film from the rinse, so more NaOH is needed — but the calculation still divides by 25.0 mL.</>,
  },
  {
    working: <b>Rinsing the conical flask with <Chem eq="C3H5O(COOH)3" /> solution gives a concentration higher than the actual concentration.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b> (21%) and option <b>A</b> (14%) are errors, but they <i>lower</i> the result. Option <b>B</b> (20%) is the correct rinse for a pipette, so it causes no error at all.</>,
  },
]

export default function ChemistryQ24_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 23 and 24.</p>
          <p className="mb-2">
            A solution of citric acid, <Chem eq="C3H5O(COOH)3" />, was analysed by titration.
          </p>
          <p className="mb-3">
            25.0 mL aliquots of the <Chem eq="C3H5O(COOH)3" /> solution were titrated against a
            standardised solution of 0.0250 M sodium hydroxide, NaOH. Phenolphthalein indicator was
            used and the average titre was found to be 24.0 mL.
          </p>
          <p>
            Which one of the following would have resulted in a concentration that is higher than the
            actual concentration?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>The pipette was rinsed with NaOH solution.</> },
        { letter: 'B', content: <>The pipette was rinsed with <Chem eq="C3H5O(COOH)3" /> solution.</> },
        { letter: 'C', content: <>The conical flask was rinsed with NaOH solution.</> },
        { letter: 'D', content: <>The conical flask was rinsed with <Chem eq="C3H5O(COOH)3" /> solution.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
