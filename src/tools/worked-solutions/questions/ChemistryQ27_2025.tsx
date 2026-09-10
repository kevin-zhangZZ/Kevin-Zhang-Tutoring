// 2025 Chemistry Exam, MCQ 27. VCAA examination report: 41% correct. Which lab test can
// distinguish geranial (an aldehyde) from linalool (a tertiary alcohol), by elimination against
// genuine functional-group test chemistry. Question text transcribed from the original paper.
// Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 41, B: 21, C: 13, D: 24 },
  answer: 'A',
  comment: (
    <>
      Geranial is an aldehyde and is readily oxidised by acidified dichromate, and a colour
      change from orange to green will occur. Linalool is a tertiary alcohol and therefore cannot
      be readily oxidised by acidified dichromate, so no colour change will occur — it will
      remain orange. If acidified permanganate was used instead, the colour change would be from
      bright purple to pale pink, not the reverse. Both compounds have C=C double bonds and will
      readily decolourise bromine solution. Neither compound contains a carboxyl group, so
      neither will generate carbon dioxide gas.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Geranial (molecular formula C₁₀H₁₆O) is an <b>aldehyde</b>. Linalool (C₁₀H₁₈O) is a <b>tertiary alcohol</b>. A good distinguishing test needs to give <i>different</i> results for these two functional groups specifically.</>,
    reason: 'Sets up what each option is actually being tested against.',
  },
  {
    working: <>A: acidified dichromate (orange, Cr₂O₇²⁻) oxidises aldehydes to carboxylic acids, turning green (Cr³⁺) — geranial reacts and changes colour. A tertiary alcohol has no H on the carbon bearing –OH, so it <b>cannot</b> be oxidised by dichromate at all — linalool stays orange.</>,
    reason: 'A genuine, correctly-directed colour difference between the two compounds. Correct.',
  },
  {
    working: <>B: acidified permanganate (MnO₄⁻) is purple, and when it oxidises an aldehyde it's <i>reduced</i> to pale pink/colourless Mn²⁺ — so the real colour change is purple → pale pink, the opposite direction to what this option states.</>,
    reason: 'The colour change is described backwards. Ruled out.',
  },
  {
    working: <>C: bromine solution tests for C=C double bonds by decolourising (addition across the double bond) — but <b>both</b> geranial and linalool contain C=C double bonds, so both would decolourise bromine water equally.</>,
    reason: "Doesn't distinguish the two compounds — both give the same positive result. Ruled out.",
  },
  {
    working: <>D: sodium hydrogen carbonate reacting to produce bubbles (CO₂) is a test for a <b>carboxylic acid</b> group — neither geranial (aldehyde) nor linalool (alcohol) has a carboxyl group, so neither would react.</>,
    reason: 'Both compounds give a negative result — no distinction made. Ruled out.',
  },
  {
    working: <b>Only the acidified dichromate test gives genuinely different, correctly-directed results for the two compounds.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ27_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Geranial and linalool are two natural organic compounds found in essential oils
            extracted from some citrus fruits — geranial (C₁₀H₁₆O) is an aldehyde, and linalool
            (C₁₀H₁₈O) is a tertiary alcohol.
          </p>
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
