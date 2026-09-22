// 2025 Mathematical Methods — Exam 1 Question 6 (3 marks). A binomial variance, then an
// upper-tail probability forced into a power-of-two form. Question text transcribed from
// the original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: (
    <>
      Common mistakes included finding the standard deviation instead of the variance, and
      incorrect multiplication of the fractions.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [31, 35, 34],
  average: 1.0,
  comment: (
    <>
      Many students correctly stated the binomial sum. The answer was required in a
      particular form, but some students were not able to reduce 4096 to a power of 2, and
      many calculated only one term instead of both.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\text{Bi}(6,\tfrac14) \implies \text{var}(X) = np(1-p)" />,
    reason: <>The standard formula. The question asks for the <em>variance</em>, so there is no square root at the end.</>,
  },
  {
    working: <Katex display tex="= 6\times\tfrac14\times\tfrac34" />,
    reason: <><Katex tex="1-\tfrac14=\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{var}(X) = \frac{18}{16} = \frac98}" />,
    reason: <>Taking a square root here would give the standard deviation <Katex tex="\tfrac{3}{2\sqrt2}" /> — a listed error.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge5) = \Pr(X=5)+\Pr(X=6)" />,
    reason: <>Two terms, not one. Stopping at <Katex tex="\Pr(X=5)" /> was the commonest loss of a mark.</>,
  },
  {
    working: <Katex display tex="\Pr(X=5) = \binom{6}{5}\left(\tfrac14\right)^5\left(\tfrac34\right)^1 = 6\times\frac{1}{1024}\times\frac34 = \frac{18}{4096}" />,
    reason: <><Katex tex="\binom{6}{5}=6" />, and <Katex tex="4^5=1024" />, <Katex tex="4^6=4096" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X=6) = \left(\tfrac14\right)^6 = \frac{1}{4096}" />,
    reason: <><Katex tex="\binom{6}{6}=1" /> and there is no failure factor.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge5) = \frac{18+1}{4096} = \frac{19}{4096}" />,
    reason: 'Adding over the common denominator.',
  },
  {
    working: <Katex display tex="4096 = 4^6 = \left(2^2\right)^6 = 2^{12}" />,
    reason: <>The step into the requested form <Katex tex="\tfrac{a}{2^b}" />. Leaving 4096 as it stood cost the mark.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X\ge5) = \frac{19}{2^{12}}}" />,
    reason: <>So <Katex tex="a=19" /> and <Katex tex="b=12" />, both integers as required.</>,
  },
]

export default function MethodsQ6_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Consider the binomial random variable{' '}
          <Katex tex="X\sim\text{Bi}\!\left(6,\tfrac14\right)" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The requested form <Katex tex="\tfrac{a}{2^b}" /> is a hint, not decoration. With{' '}
            <Katex tex="p=\tfrac14" /> every probability has a power of 4 underneath, and{' '}
            <Katex tex="4^6=2^{12}" /> — so keeping everything over 4096 rather than
            simplifying term by term makes the last step a single rewrite.
          </p>
        </Background>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find <Katex tex="\text{var}(X)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Determine <Katex tex="\Pr(X\ge5)" />. Give your answer in the form{' '}
            <Katex tex="\dfrac{a}{2^b}" />, where <Katex tex="a,b\in\mathbb{Z}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
