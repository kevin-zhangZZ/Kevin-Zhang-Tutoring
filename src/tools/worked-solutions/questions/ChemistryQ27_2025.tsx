// 2025 Chemistry Exam, MCQ 27. VCAA examination report: 41% correct. Which lab test can
// distinguish geranial (an aldehyde) from linalool (a tertiary alcohol), by elimination against
// genuine functional-group test chemistry. Question text transcribed from the original paper;
// the skeletal structures are cropped from the original VCAA exam PDF. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import structuresSrc from './chem-2025-mcq27-structures.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 41, B: 21, C: 13, D: 24 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      Geranial is an aldehyde and is readily oxidised by acidified dichromate and a colour change
      from orange to green will occur.
      <br />
      Linalool is a tertiary alcohol and therefore cannot be readily oxidised by acidified
      dichromate and so no colour change will occur, it will remain orange. Therefore, the use of
      dichromate will enable identification of these two compounds.
      <br />
      If acidified permanganate was to be used, the colour change would be from bright purple to
      pale pink upon reaction, not vice versa.
      <br />
      Both compounds have C=C double bonds and will readily decolourise bromine solution.
      <br />
      Neither compound contains a carboxyl group and so neither will generate carbon dioxide gas.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>From the structures: geranial (C₁₀H₁₆O) ends in a –CHO group, so it is an <b>aldehyde</b>; linalool (C₁₀H₁₈O) has its –OH on a carbon bonded to three other carbons, so it is a <b>tertiary alcohol</b>. Both have C=C double bonds. A distinguishing test has to give <i>different</i> results for the two.</>,
    reason: <>Sets up what each option is actually being tested against.</>,
  },
  {
    working: <>A: acidified dichromate (orange, Cr₂O₇²⁻) oxidises aldehydes to carboxylic acids, turning green (Cr³⁺) — geranial reacts and changes colour. A tertiary alcohol has no H on the carbon bearing –OH, so it <b>cannot</b> be oxidised by dichromate at all — linalool stays orange.</>,
    reason: <>A colour change for geranial and none for linalool. Correct.</>,
  },
  {
    working: <>B: acidified permanganate (MnO₄⁻) is purple, and when it oxidises an aldehyde it's <i>reduced</i> to pale pink/colourless Mn²⁺ — so the real colour change is purple → pale pink, the opposite direction to what this option states.</>,
    reason: <>The colour change is described backwards. Ruled out.</>,
  },
  {
    working: <>C: bromine solution tests for C=C double bonds by decolourising (addition across the double bond) — but <b>both</b> geranial and linalool contain C=C double bonds, so both would decolourise bromine water equally.</>,
    reason: <>Doesn't distinguish the two compounds — both give the same positive result. Ruled out.</>,
  },
  {
    working: <>D: sodium hydrogen carbonate reacting to produce bubbles (CO₂) is a test for a <b>carboxylic acid</b> group — neither geranial (aldehyde) nor linalool (alcohol) has a carboxyl group, so neither would react.</>,
    reason: <>Both compounds give a negative result — no distinction made. Ruled out.</>,
  },
  {
    working: <b>Only the acidified dichromate test gives different, correctly described results for the two compounds.</b>,
    reason: <>Matches option <b>A</b>. Option <b>D</b>, chosen by 24%, tests for a carboxyl group, which neither compound has.</>,
  },
]

export default function ChemistryQ27_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 26 and 27.</p>
          <p className="mb-2">
            Geranial and linalool are two natural organic compounds found in essential oils
            extracted from some citrus fruits. The skeletal structures for geranial and linalool
            are given below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={structuresSrc}
              alt="Skeletal structures: geranial, a ten-carbon chain with an aldehyde group at one end and two C=C double bonds; linalool, with an OH on a carbon that also carries a methyl group and a vinyl group, and one further C=C — from the original 2025 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>
            Which one of the following laboratory tests could be used to confirm that a sample is
            pure geranial and not pure linalool?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'React the sample with acidified dichromate ion, H⁺/Cr₂O₇²⁻. The colour of the solution will change from orange to green.', isAnswer: true },
        { letter: 'B', content: 'React the sample with acidified permanganate ion, H⁺/MnO₄⁻. The colour of the solution will change from pale pink to purple.' },
        { letter: 'C', content: 'React the sample with bromine solution. The colour of the solution will change from brown to colourless.' },
        { letter: 'D', content: 'React the sample with solid sodium hydrogen carbonate, NaHCO₃. Bubbles will be produced.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
