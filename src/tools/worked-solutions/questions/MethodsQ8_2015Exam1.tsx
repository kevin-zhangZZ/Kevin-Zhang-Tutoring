// 2015 Mathematical Methods (CAS) — Exam 1, Question 8 (3 marks).
// Conditional probability, a complement, and independence. Question text transcribed from
// the original paper (no diagram given). Answers checked against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = { marks: [13, 87], average: 0.9, comment: <>This question was well answered.</> }

const EXAM_B: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      A Karnaugh map was most useful for formulating a solution. Some poor manipulation of
      fractions was evident in responses.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [72, 28],
  average: 0.3,
  comment: (
    <>
      Many students made little headway into solving this problem due to their lack of
      understanding of independent
      events. The addition rule was then applied using an incorrect value for{' '}
      <Katex tex="\Pr(A)" />, resulting in final answers well outside the interval{' '}
      <Katex tex="[0,1]" />. Students must note that a probability must lie within{' '}
      <Katex tex="[0,1]" /> and is never a negative number.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A\cap B) = \Pr(A\mid B)\times\Pr(B)" />,
    reason: <>The definition of conditional probability, rearranged.</>,
  },
  {
    working: <Katex display tex="= \frac34\times\frac13" />,
    reason: <>Both values are given.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac14}" />,
    reason: <>Smaller than <Katex tex="\Pr(B)=\tfrac13" />, as an intersection must be.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="B = (A\cap B)\cup(A'\cap B)" />,
    reason: <>Every outcome in <Katex tex="B" /> either is in <Katex tex="A" /> or is not, and the two parts are disjoint.</>,
  },
  {
    working: <Katex display tex="\Pr(A'\cap B) = \Pr(B)-\Pr(A\cap B) = \frac13-\frac14" />,
    reason: <>Using part (a). A Karnaugh map does the same bookkeeping visually — the report recommends one.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{4-3}{12} = \frac{1}{12}}" />,
    reason: <>Common denominator <Katex tex="12" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A,B \text{ independent} \implies \Pr(A\mid B) = \Pr(A)" />,
    reason: <>That is what independence <em>means</em>: knowing <Katex tex="B" /> happened does not change the chance of <Katex tex="A" />. So <Katex tex="\Pr(A)=\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cap B) = \Pr(A)\Pr(B) = \frac34\times\frac13 = \frac14" />,
    reason: <>Consistent with part (a) — which is why the earlier value can be reused.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cup B) = \Pr(A)+\Pr(B)-\Pr(A\cap B) = \frac34+\frac13-\frac14" />,
    reason: <>The addition rule.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac12+\frac13 = \frac56}" />,
    reason: <>Between <Katex tex="0" /> and <Katex tex="1" />, which the report says many answers were not. Any probability outside that range is a signal to go back.</>,
  },
]

export default function MethodsQ8_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (3 marks)</p>
        <p>
          For events <Katex tex="A" /> and <Katex tex="B" /> from a sample space,{' '}
          <Katex tex="\Pr(A\mid B)=\tfrac34" /> and <Katex tex="\Pr(B)=\tfrac13" />.
        </p>
      </div>

      <PartCard letter="a" topic="Conditional Probability" marks={1} statement={<>Calculate <Katex tex="\Pr(A\cap B)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Complement"
        marks={1}
        statement={
          <>
            Calculate <Katex tex="\Pr(A'\cap B)" />, where <Katex tex="A'" /> denotes the
            complement of <Katex tex="A" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Independence"
        marks={1}
        statement={
          <>
            If events <Katex tex="A" /> and <Katex tex="B" /> are independent, calculate{' '}
            <Katex tex="\Pr(A\cup B)" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="What independence gives you">
          <p>
            Parts (a) and (b) use only the given conditional probability — no independence
            assumed. Part (c) adds it, and the useful consequence is{' '}
            <Katex tex="\Pr(A\mid B)=\Pr(A)" />: the conditional probability you were handed{' '}
            <em>is</em> <Katex tex="\Pr(A)" />.
          </p>
          <p>
            That single line supplies the missing piece of the addition rule. 72% of students
            scored zero on this part; the report says many applied the addition rule with a
            wrong value for <Katex tex="\Pr(A)" /> and ended up with answers outside{' '}
            <Katex tex="[0,1]" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
