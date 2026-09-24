// 2025 Chemistry Exam, MCQ 10 — BONUS: a VCAA-flagged question with no single correct answer.
// VCAA's report explains the flaw directly: statement I turned out to be true as well as
// statements II and III, but no option offered "I, II and III" as a combination. Question text
// transcribed from the original paper; the flow chart of steps is cropped from the original VCAA
// exam PDF. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stepsSrc from './chem-2025-mcq10-steps.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: ['A', 'B', 'C', 'D'],
  flawed: (
    <>
      Statement II is clearly a correct statement as only hydrolysis and fermentation require
      enzymes to occur. Statement III is also correct, as during hydrolysis, glucose is formed
      (among other possibilities). Statement I caused issues and confusion: fermentation of
      glucose to form ethanol and carbon dioxide involves <b>both</b> a reduction and an
      oxidation process — the oxidation number of carbon changes from 0 to −2 as ethanol is
      formed, and also from 0 to +4 as carbon dioxide is formed. Since there was no option for
      I, II and III being correct, all four options were accepted.
    </>
  ),
  comment: (
    <>
      Statement II is clearly a correct statement as only hydrolysis and fermentation require
      enzymes to occur.
      <br />
      Statement III is also correct as during hydrolysis, glucose is formed (among other
      possibilities).
      <br />
      Statement I caused issues and confusion. Fermentation of glucose to form ethanol and carbon
      dioxide involves BOTH a reduction and oxidation process. The oxidation number of carbon
      changes from 0 to −2 as ethanol is formed and also from 0 to +4 as carbon dioxide is formed.
      <br />
      Since there was no option for I, II and III being correct, all four options were accepted.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The production steps given are: finely chopped and heated → <b>hydrolysis</b> → <b>fermentation</b> → distillation.</>,
    reason: <>Sets up which steps each statement is actually asking about.</>,
  },
  {
    working: <>II: "Enzymes catalyse only two of the steps shown." Hydrolysis (breaking sucrose down into glucose and fructose) and fermentation (glucose into ethanol) are both enzyme-catalysed biological processes. Chopping/heating is mechanical/thermal, and distillation is a purely physical separation — neither uses an enzyme.</>,
    reason: <>Exactly two of the four steps (hydrolysis and fermentation) are enzyme-catalysed. True.</>,
  },
  {
    working: <>III: "Glucose is a product of the hydrolysis step." Hydrolysis breaks down the sugar in sugar cane, mainly sucrose, using water; glucose is among the products (with fructose).</>,
    reason: <>True — this is exactly what the hydrolysis step is for.</>,
  },
  {
    working: <>I: "Oxidation occurs during fermentation." Fermentation converts glucose (C₆H₁₂O₆) into ethanol (C₂H₅OH) and carbon dioxide (CO₂). Tracking the oxidation number of carbon: it starts at 0 (averaged across glucose's carbons), averages −2 across ethanol's two carbons, and ends at +4 in CO₂.</>,
    reason: <>Carbon atoms end up at both a lower and a higher oxidation state than they started at — this is a disproportionation reaction.</>,
  },
  {
    working: <>Since some carbon atoms are reduced (0 → −2, forming ethanol) while others are oxidised (0 → +4, forming CO₂), fermentation genuinely involves <b>both</b> processes at once — so statement I ("oxidation occurs during fermentation") is also true.</>,
    reason: <>This is the crux of the flaw: I is actually correct, alongside II and III.</>,
  },
  {
    working: <b>All three statements (I, II, and III) are true — but no option among A–D offers "I, II and III" as a combination, so no single listed option can correctly capture the full truth.</b>,
    reason: <>A genuine gap in the option set, not an error in any one option's own wording — VCAA accepted all four since none of the four given combinations was fully correct.</>,
  },
]

export default function ChemistryQ10_2025() {
  return (
    <MCQShell
      flawed={
        <p>
          VCAA's report explains this one directly: all three statements — I, II, <b>and</b> III
          — turned out to be true, but none of the four options on offer combines all three. Since
          no listed option could be fully correct, VCAA accepted all four after review. All four
          are marked below.
        </p>
      }
      question={
        <>
          <p className="mb-2">
            The production of bioethanol from sugar cane follows the steps shown below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={stepsSrc}
              alt="Flow chart beside a sugar cane plant: finely chopped and heated → hydrolysis → fermentation → distillation — from the original 2025 VCAA exam paper"
              className="w-full max-w-[520px]"
            />
          </div>
          <p className="mb-2">Consider the following statements:</p>
          <div className="flex flex-col gap-1 mb-2">
            <span>I. Oxidation occurs during fermentation.</span>
            <span>II. Enzymes catalyse only two of the steps shown.</span>
            <span>III. Glucose is a product of the hydrolysis step.</span>
          </div>
          <p>Which of the statements about the production of bioethanol is/are correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'II only', isAnswer: true },
        { letter: 'B', content: 'I and II', isAnswer: true },
        { letter: 'C', content: 'I and III', isAnswer: true },
        { letter: 'D', content: 'II and III', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
