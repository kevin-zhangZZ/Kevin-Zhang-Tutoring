// 2025 Chemistry Exam, MCQ 10 — BONUS: a VCAA-flagged question with no single correct answer.
// VCAA's report explains the flaw directly: statement I turned out to be true as well as
// statements II and III, but no option offered "I, II and III" as a combination. Question text
// transcribed from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 35, C: 13, D: 34 },
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
}

const ROWS: WorkingRow[] = [
  {
    working: <>The production steps given are: finely chopped and heated → <b>hydrolysis</b> → <b>fermentation</b> → distillation.</>,
    reason: 'Sets up which steps each statement is actually asking about.',
  },
  {
    working: <>II: "Enzymes catalyse only two of the steps shown." Hydrolysis (breaking starch down into glucose) and fermentation (glucose into ethanol) are both enzyme-catalysed biological processes. Chopping/heating is mechanical/thermal, and distillation is a purely physical separation — neither uses an enzyme.</>,
    reason: 'Exactly two of the four steps (hydrolysis and fermentation) are enzyme-catalysed. True.',
  },
  {
    working: <>III: "Glucose is a product of the hydrolysis step." Hydrolysis breaks down starch (a glucose polymer) using water, and glucose is indeed among the products formed.</>,
    reason: 'True — this is exactly what the hydrolysis step is for.',
  },
  {
    working: <>I: "Oxidation occurs during fermentation." Fermentation converts glucose (C₆H₁₂O₆) into ethanol (C₂H₅OH) and carbon dioxide (CO₂). Tracking the oxidation number of carbon: it starts at 0 (averaged across glucose's carbons), ends at −2 in ethanol's CH₂/CH₃ carbons, and ends at +4 in CO₂.</>,
    reason: "Carbon atoms end up at both a lower and a higher oxidation state than they started at — this is a disproportionation reaction.",
  },
  {
    working: <>Since some carbon atoms are reduced (0 → −2, forming ethanol) while others are oxidised (0 → +4, forming CO₂), fermentation genuinely involves <b>both</b> processes at once — meaning statement I ("oxidation occurs during fermentation") is also true, not false as the question-writers likely intended.</>,
    reason: 'This is the crux of the flaw: I is actually correct, alongside II and III.',
  },
  {
    working: <b>All three statements (I, II, and III) are true — but no option among A–D offers "I, II and III" as a combination, so no single listed option can correctly capture the full truth.</b>,
    reason: 'A genuine gap in the option set, not an error in any one option\'s own wording — VCAA accepted all four since none of the four given combinations was fully correct.',
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
            The production of bioethanol from sugar cane follows the steps shown below: finely
            chopped and heated → hydrolysis → fermentation → distillation.
          </p>
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
