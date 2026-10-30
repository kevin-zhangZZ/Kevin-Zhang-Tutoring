// 2025 Chemistry Exam, MCQ 10 — BONUS: a VCAA-flagged question with no single correct answer.
// VCAA's report explains the flaw directly: statement I turned out to be true as well as
// statements II and III, but no option offered "I, II and III" as a combination. Question text
// transcribed from the original paper; the flow chart of steps is cropped from the original VCAA
// exam PDF. The report prints no percentages for this question (percentages: {}). Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stepsSrc from './chem-2025-mcq10-steps.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: ['A', 'B', 'C', 'D'],
  flawed: (
    <>
      VCAA&rsquo;s report explains this one directly: all three statements — I, II, <b>and</b> III
      — turned out to be true, but none of the four options on offer combines all three. Since
      no listed option could be fully correct, VCAA accepted all four.
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
    working: (
      <>
        Finely chopped and heated — physical, no enzyme
        <br />
        Hydrolysis — <b>enzyme-catalysed</b>
        <br />
        Fermentation — <b>enzyme-catalysed</b> (enzymes in yeast)
        <br />
        Distillation — physical separation, no enzyme
        <br />
        → exactly two steps use enzymes: <b>II is true</b>.
      </>
    ),
    reason: <>Go through the four steps one at a time. Enzymes are biological catalysts for chemical reactions; chopping, heating and distilling are physical processes, so only hydrolysis and fermentation need them (the report: &ldquo;only hydrolysis and fermentation require enzymes&rdquo;).</>,
  },
  {
    working: (
      <>
        <Chem eq="C12H22O11(aq) + H2O(l) -> C6H12O6(aq) + C6H12O6(aq)" />
        <br />
        sucrose + water → glucose + fructose: <b>III is true</b>.
      </>
    ),
    reason: <>Hydrolysis uses water to break a large molecule into smaller ones. The main sugar in sugar cane is sucrose, a disaccharide, which hydrolyses into glucose and fructose (both C₆H₁₂O₆); any cellulose present hydrolyses to glucose too. Either way glucose is a product.</>,
  },
  {
    working: <>Fermentation: <Chem eq="C6H12O6(aq) -> 2C2H5OH(aq) + 2CO2(g)" /></>,
    reason: <>To test statement I, write the fermentation equation and track the oxidation number of carbon — oxidation is an <b>increase</b> in oxidation number.</>,
  },
  {
    working: (
      <>
        Glucose, <Chem eq="C6H12O6" />: 6<i>x</i> + 12(+1) + 6(−2) = 0 → <i>x</i> = 0
        <br />
        Ethanol, <Chem eq="C2H6O" />: 2<i>x</i> + 6(+1) + 1(−2) = 0 → <i>x</i> = −2
        <br />
        Carbon dioxide, <Chem eq="CO2" />: <i>x</i> + 2(−2) = 0 → <i>x</i> = +4
      </>
    ),
    reason: <>H is +1 and O is −2, and the oxidation numbers in a neutral molecule add to zero. These are average values for carbon across each molecule — enough to see which way carbon goes.</>,
  },
  {
    working: (
      <>
        C: 0 → +4 (in CO₂) — <b>oxidised</b>
        <br />
        C: 0 → −2 (in ethanol) — <b>reduced</b>
        <br />
        → oxidation does occur during fermentation: <b>I is true</b>.
      </>
    ),
    reason: <>Some of glucose&rsquo;s carbon is oxidised and some is reduced in the same reaction, so fermentation involves <b>both</b> oxidation and reduction (the report&rsquo;s point). It is easy to assume fermentation &ldquo;isn&rsquo;t a redox reaction&rdquo; because there is no separate oxidising agent, but the oxidation numbers show otherwise.</>,
  },
  {
    working: <b>I, II and III are all true — but no option offers &ldquo;I, II and III&rdquo;.</b>,
    reason: (
      <>
        No option is fully correct, so VCAA accepted all four (A, B, C and D) — any option
        chosen earned the mark. Option <b>D</b> (II and III) is the closest, but it leaves out statement
        I; options <b>B</b> and <b>C</b> each leave out a true statement too, and <b>A</b> leaves
        out two.
      </>
    ),
  },
]

export default function ChemistryQ10_2025() {
  return (
    <MCQShell
      flawed={
        <p>
          VCAA's report explains this one directly: all three statements — I, II, <b>and</b> III
          — turned out to be true, but none of the four options on offer combines all three. Since
          no listed option could be fully correct, VCAA accepted all four. All four
          are marked below.
        </p>
      }
      question={
        <>
          <p className="mb-2">
            The production of bioethanol from sugar cane follows the steps shown below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={stepsSrc}
              alt="Flow chart beside a sugar cane plant: finely chopped and heated → hydrolysis → fermentation → distillation — from the original 2025 VCAA exam paper"
              className="w-full max-w-[520px]"
            />
          </div>
          <p className="mb-2">Consider the following statements:</p>
          <div className="grid grid-cols-[2.5em_1fr] gap-y-1 mb-2 pl-2">
            <span>I</span><span>Oxidation occurs during fermentation.</span>
            <span>II</span><span>Enzymes catalyse only two of the steps shown.</span>
            <span>III</span><span>Glucose is a product of the hydrolysis step.</span>
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
