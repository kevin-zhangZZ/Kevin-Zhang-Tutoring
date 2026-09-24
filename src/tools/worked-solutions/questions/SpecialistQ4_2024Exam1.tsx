// 2024 Specialist Mathematics — Exam 1 Question 4 (4 marks). The angle between two vectors,
// then matching a dot product to the magnitude of a cross product. Question text
// transcribed from the original paper (2024 papers are image-only, so read from rendered
// pages). Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [10, 45, 45],
  average: 1.4,
  comment: (
    <>
      While many students successfully found that{' '}
      <Katex tex="\cos(\theta)=-\dfrac{1}{\sqrt2}" />, not all were able to find the correct
      angle (in degrees or radians) between the vectors. The result{' '}
      <Katex tex="\theta=\dfrac{\pi}{4}" /> was frequently seen.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 29, 60],
  average: 1.5,
  comment: (
    <>
      This question was answered well, with many students making good progress towards finding{' '}
      <Katex tex="\left|\underset{\sim}{a}\times\underset{\sim}{c}\right|" />.
      <br />
      Occasional transcription errors were observed, as were algebraic errors. Some students
      did not give both values of <Katex tex="n" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (0)(2)+(3)(-1)+(3)(-2) = -9" />,
    reason: <>Note <Katex tex="\underset{\sim}{a}" /> has no <Katex tex="\underset{\sim}{i}" /> component, so the first product is zero.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right| = \sqrt{0+9+9} = 3\sqrt2, \qquad \left|\underset{\sim}{b}\right| = \sqrt{4+1+4} = 3" />,
    reason: <>Both magnitudes.</>,
  },
  {
    working: <Katex display tex="\cos(\theta) = \frac{-9}{3\sqrt2\times3} = \frac{-9}{9\sqrt2} = -\frac{1}{\sqrt2}" />,
    reason: <>The standard formula. A negative cosine means an obtuse angle — the sign is the thing to hold onto.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \frac{3\pi}{4} \ \left(=135^\circ\right)}" />,
    reason: <>Not <Katex tex="\tfrac{\pi}{4}" />, which is what dropping the minus sign gives — the report notes that result was frequently seen. The angle between two vectors is taken in <Katex tex="[0,\pi]" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{c} = (0)(n)+(3)(2)+(3)(1) = 9" />,
    reason: <>The <Katex tex="n" /> drops out of the dot product, because <Katex tex="\underset{\sim}{a}" /> has no <Katex tex="\underset{\sim}{i}" /> component.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\underset{\sim}{a}\times\underset{\sim}{c} = \begin{vmatrix}\underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k}\\0 & 3 & 3\\n & 2 & 1\end{vmatrix}"
      />
    ),
    reason: <>Setting up the determinant.</>,
  },
  {
    working: <Katex display tex="= (3-6)\underset{\sim}{i} - (0-3n)\underset{\sim}{j} + (0-3n)\underset{\sim}{k} = -3\underset{\sim}{i}+3n\underset{\sim}{j}-3n\underset{\sim}{k}" />,
    reason: <>Watch the middle sign — the j component carries a minus in front of its minor.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\times\underset{\sim}{c}\right| = \sqrt{9+9n^2+9n^2} = 3\sqrt{1+2n^2}" />,
    reason: <>Taking the factor of 3 out from under the root.</>,
  },
  {
    working: <Katex display tex="9 = 3\sqrt{1+2n^2} \implies 3 = \sqrt{1+2n^2} \implies 9 = 1+2n^2" />,
    reason: <>Setting the dot product equal to the magnitude and squaring.</>,
  },
  {
    working: <Katex display tex="\boxed{n^2 = 4 \implies n = \pm2}" />,
    reason: <>Both values, and both are integers as required. The report notes some students did not give both values of <Katex tex="n" />.</>,
  },
]

export default function SpecialistQ4_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
        <p>
          Consider the vectors{' '}
          <Katex tex="\underset{\sim}{a}=3\underset{\sim}{j}+3\underset{\sim}{k}" />,{' '}
          <Katex tex="\underset{\sim}{b}=2\underset{\sim}{i}-\underset{\sim}{j}-2\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{c}=n\underset{\sim}{i}+2\underset{\sim}{j}+\underset{\sim}{k}" />,
          where <Katex tex="n\in Z" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Both parts hinge on signs. In part a. the dot product is negative, so the angle
            is obtuse — the report notes <Katex tex="\tfrac{\pi}{4}" /> was frequently seen,
            even from students who had found <Katex tex="\cos\theta=-\tfrac{1}{\sqrt2}" />.
          </p>
          <p>
            In part b., squaring produces <Katex tex="n^2=4" />, and a squared unknown has{' '}
            <em>two</em> solutions. Both are integers, so both belong in the answer.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Angle Between Vectors"
        marks={2}
        statement={
          <>
            Find the angle between <Katex tex="\underset{\sim}{a}" /> and{' '}
            <Katex tex="\underset{\sim}{b}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Dot & Cross Product"
        marks={2}
        statement={
          <>
            Find all possible values of <Katex tex="n" /> such that the dot product of{' '}
            <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{c}" /> is equal
            to the magnitude of the cross product of <Katex tex="\underset{\sim}{a}" /> and{' '}
            <Katex tex="\underset{\sim}{c}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
