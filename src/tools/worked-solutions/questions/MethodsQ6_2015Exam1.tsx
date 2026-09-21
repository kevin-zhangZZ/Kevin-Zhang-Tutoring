// 2015 Mathematical Methods (CAS) — Exam 1, Question 6 (3 marks).
// Standardising a normal probability, then a conditional probability using only the 68-95
// facts. Question text transcribed from the original paper (no diagram given). Answers
// checked against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      Those students who drew a diagram of a normal curve with relevant areas shaded found
      this helpful. An answer of <Katex tex="2" /> was common. The answer of{' '}
      <Katex tex="1.9" /> was also common, and was two standard deviations below the mean of{' '}
      <Katex tex="X" />. This question required a conversion to the standard normal curve.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [42, 22, 37],
  average: 1.0,
  comment: (
    <>
      Most students could state the relevant rule and obtained the correct denominator of{' '}
      <Katex tex="\tfrac12" /> but then failed to recognise that{' '}
      <Katex tex="\Pr(X<2.8\mid X>2.5)=\tfrac{\Pr(2.5<X<2.8)}{\Pr(X>2.5)}" />.
      Probabilities greater than <Katex tex="1" /> occurred.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>3.1) = \Pr\!\left(Z>\frac{3.1-2.5}{0.3}\right) = \Pr(Z>2)" />,
    reason: <>Standardising: <Katex tex="3.1" /> is exactly two standard deviations above the mean.</>,
  },
  {
    working: <Katex display tex="\Pr(Z>2) = \Pr(Z<-2)" />,
    reason: <>The standard normal is symmetric about <Katex tex="0" />, so the right tail beyond <Katex tex="2" /> equals the left tail below <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = -2}" />,
    reason: <>The question asks for <Katex tex="\Pr(Z<b)" />, a <em>left</em> tail, so the sign must flip. Answering <Katex tex="2" /> ignores the direction; answering <Katex tex="1.9" /> works in <Katex tex="X" /> instead of <Katex tex="Z" />. Half the state gave one of those.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<2.8\mid X>2.5) = \frac{\Pr(2.5<X<2.8)}{\Pr(X>2.5)}" />,
    reason: <>The intersection of "less than <Katex tex="2.8" />" and "greater than <Katex tex="2.5" />" is the strip between them — not the whole left tail.</>,
  },
  {
    working: <Katex display tex="\Pr(X>2.5) = \frac12" />,
    reason: <><Katex tex="2.5" /> is the mean, so exactly half the distribution lies above it.</>,
  },
  {
    working: <Katex display tex="2.8 = 2.5+0.3 \implies \Pr(2.5<X<2.8) = \Pr(0<Z<1)" />,
    reason: <>One standard deviation above the mean.</>,
  },
  {
    working: <Katex display tex="\Pr(Z<-1) = 0.16 \implies \Pr(Z>1) = 0.16" />,
    reason: <>By symmetry. This is the only numerical fact the question supplies, so everything must be built from it.</>,
  },
  {
    working: <Katex display tex="\Pr(0<Z<1) = 0.5-0.16 = 0.34" />,
    reason: <>The right half of the distribution, less the tail beyond <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{0.34}{0.5} = 0.68}" />,
    reason: <>Two decimal places. Between <Katex tex="0" /> and <Katex tex="1" />, which the report says was not true of every answer.</>,
  },
]

export default function MethodsQ6_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Let the random variable <Katex tex="X" /> be normally distributed with mean{' '}
          <Katex tex="2.5" /> and standard deviation <Katex tex="0.3" />. Let{' '}
          <Katex tex="Z" /> be the standard normal random variable, such that{' '}
          <Katex tex="Z\sim N(0,1)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Find <Katex tex="b" /> such that <Katex tex="\Pr(X>3.1)=\Pr(Z<b)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Sketch the curve">
          <p>
            Both parts of this question are about matching one region of a normal curve to
            another. A quick sketch with the relevant area shaded settles the sign in part
            (a) and the numerator in part (b) at a glance — the report recommends exactly
            that.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Using the fact that, correct to two decimal places,{' '}
            <Katex tex="\Pr(Z<-1)=0.16" />, find{' '}
            <Katex tex="\Pr(X<2.8\mid X>2.5)" />. Write the answer correct to two decimal
            places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
