// 2020 Specialist Mathematics — Exam 1 Question 5 (4 marks). A vector resolute run
// backwards to recover an unknown component, then the perpendicular part. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [17, 12, 27, 44],
  average: 2,
  comment: (
    <>
      Using the formula for the vector resolute, it is found that{' '}
      <Katex tex="\dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\underset{\sim}{b}\cdot\underset{\sim}{b}}=\dfrac{-3m+1}{m^2+2}=-\dfrac{11}{18}" />.
      This resulted in the quadratic equation{' '}
      <Katex tex="11m^2-54m+40=0,\ (11m-10)(m-4)=0" /> giving <Katex tex="m=4" /> as the solution
      (<Katex tex="m" /> is an integer).
      <br />
      Students who factorised to solve the quadratic equation were generally more successful than
      those who used the quadratic formula.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [73, 28],
  average: 0.3,
  comment: (
    <>
      Some students did not attempt this question as they were unable to find an integer
      value of <Katex tex="m" /> in Question 5a. to use in their calculation. Of those who did
      attempt this question, arithmetic errors often caused them not to be awarded the mark.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{vector resolute of } \underset{\sim}{a} \text{ along } \underset{\sim}{b} = \left(\frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\underset{\sim}{b}\cdot\underset{\sim}{b}}\right)\underset{\sim}{b}" />,
    reason: <>The given answer is already written as a scalar times <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+m\underset{\sim}{j}-\underset{\sim}{k}" />, so compare the scalars rather than expanding into components.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (2)(1)+(-3)(m)+(1)(-1) = 1-3m" />,
    reason: <>Component by component.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{b}\cdot\underset{\sim}{b} = 1+m^2+1 = m^2+2" />,
    reason: <>The squared length; no square root needed in this formula.</>,
  },
  {
    working: <Katex display tex="\frac{1-3m}{m^2+2} = -\frac{11}{18}" />,
    reason: <>Equating the two scalar multipliers of <Katex tex="\underset{\sim}{b}" />.</>,
  },
  {
    working: <Katex display tex="18(1-3m) = -11\left(m^2+2\right)" />,
    reason: <>Cross-multiplying; <Katex tex="m^2+2>0" /> always, so no sign worries.</>,
  },
  {
    working: <Katex display tex="18-54m = -11m^2-22 \implies 11m^2-54m+40 = 0" />,
    reason: <>Everything onto one side, leading coefficient positive.</>,
  },
  {
    working: <Katex display tex="(11m-10)(m-4) = 0 \implies m = \tfrac{10}{11} \text{ or } m = 4" />,
    reason: <>Factorising — the report notes students who factorised were generally more successful than those who used the quadratic formula.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 4}" />,
    reason: <><Katex tex="m" /> is given to be an integer, so <Katex tex="\tfrac{10}{11}" /> is rejected. The condition is in the question for exactly this reason.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}_{\perp} = \underset{\sim}{a}-\left(\text{resolute of } \underset{\sim}{a} \text{ along } \underset{\sim}{b}\right)" />,
    reason: <>The two components must add back to <Katex tex="\underset{\sim}{a}" />, so subtract the parallel part.</>,
  },
  {
    working: <Katex display tex="= \left(2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}\right)+\tfrac{11}{18}\left(\underset{\sim}{i}+4\underset{\sim}{j}-\underset{\sim}{k}\right)" />,
    reason: <>Subtracting a negative multiple, with <Katex tex="m=4" /> now substituted.</>,
  },
  {
    working: <Katex display tex="= \left(\tfrac{36}{18}+\tfrac{11}{18}\right)\underset{\sim}{i}+\left(-\tfrac{54}{18}+\tfrac{44}{18}\right)\underset{\sim}{j}+\left(\tfrac{18}{18}-\tfrac{11}{18}\right)\underset{\sim}{k}" />,
    reason: <>Put everything over 18 before adding — the report notes arithmetic errors often cost the mark here.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{47}{18}\underset{\sim}{i}-\tfrac{5}{9}\underset{\sim}{j}+\tfrac{7}{18}\underset{\sim}{k}}" />,
    reason: <>Check: its dot product with <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+4\underset{\sim}{j}-\underset{\sim}{k}" /> is <Katex tex="\tfrac{47}{18}-\tfrac{40}{18}-\tfrac{7}{18}=0" /> ✓.</>,
  },
]

export default function SpecialistQ5_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
        <p>
          Let <Katex tex="\underset{\sim}{a}=2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" /> and{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+m\underset{\sim}{j}-\underset{\sim}{k}" />, where{' '}
          <Katex tex="m" /> is an integer.
          <br />
          The vector resolute of <Katex tex="\underset{\sim}{a}" />{' '}
          in the direction of <Katex tex="\underset{\sim}{b}" /> is{' '}
          <Katex tex="-\dfrac{11}{18}\left(\underset{\sim}{i}+m\underset{\sim}{j}-\underset{\sim}{k}\right)" />.
        </p>
      </div>

      <PartCard letter="a" topic="Vector Resolute" marks={3} statement={<>Find the value of <Katex tex="m" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Perpendicular Part"
        marks={1}
        statement={
          <>
            Find the component of <Katex tex="\underset{\sim}{a}" /> that is perpendicular to{' '}
            <Katex tex="\underset{\sim}{b}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
