// 2024 Specialist Mathematics — Exam 1 Question 4 (4 marks). The angle between two vectors,
// then matching a dot product to the magnitude of a cross product. Question text
// transcribed from the original paper (2024 papers are image-only, so read from rendered
// pages). Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

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
    reason: <>Multiply matching components and add. <Katex tex="\underset{\sim}{a}" /> has no <Katex tex="\underset{\sim}{i}" /> component, so its <Katex tex="\underset{\sim}{i}" />-coefficient is 0.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\left|\underset{\sim}{a}\right| &= \sqrt{0^2+3^2+3^2} = 3\sqrt2 \\ \left|\underset{\sim}{b}\right| &= \sqrt{2^2+(-1)^2+(-2)^2} = 3\end{aligned}" />,
    reason: <>Each magnitude is the square root of the sum of the squared components.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\cos(\theta) = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{a}\right|\left|\underset{\sim}{b}\right|} = \frac{-9}{3\sqrt2\times3} = -\frac{1}{\sqrt2}"
      />
    ),
    reason: <>The angle formula. Keep the minus sign: a negative cosine means the angle is obtuse.</>,
    more: (
      <>
        The angle between two vectors is always taken in <Katex tex="[0,\pi]" />, and on that
        interval cosine is positive for acute angles and negative for obtuse ones. So the sign
        of the dot product alone already tells you which kind of angle you are looking for.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\theta = \pi-\frac{\pi}{4} = \frac{3\pi}{4} \ \left(=135^\circ\right)}" />,
    reason: <>Since <Katex tex="\cos\tfrac{\pi}{4}=\tfrac{1}{\sqrt2}" /> and <Katex tex="\cos(\pi-x)=-\cos(x)" />, the obtuse angle with cosine <Katex tex="-\tfrac{1}{\sqrt2}" /> is <Katex tex="\pi-\tfrac{\pi}{4}" />.</>,
    more: (
      <>
        The report notes <Katex tex="\theta=\tfrac{\pi}{4}" /> was frequently seen, even from
        students who had correctly found <Katex tex="\cos(\theta)=-\tfrac{1}{\sqrt2}" />. That is
        the angle for <Katex tex="+\tfrac{1}{\sqrt2}" />: the reference angle, not the answer.
        Check: <Katex tex="\cos\tfrac{3\pi}{4}=-\tfrac{1}{\sqrt2}" /> ✓. Either radians or degrees
        is accepted.
      </>
    ),
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
    reason: <>The cross product as a determinant: unit vectors on top, then the components of <Katex tex="\underset{\sim}{a}" />, then of <Katex tex="\underset{\sim}{c}" />.</>,
    more: (
      <>
        The report mentions occasional transcription errors. Copy the rows straight from the
        stem — <Katex tex="\underset{\sim}{a}" /> is <Katex tex="(0,3,3)" />, with the missing{' '}
        <Katex tex="\underset{\sim}{i}" /> component written as 0, and{' '}
        <Katex tex="\underset{\sim}{c}" /> is <Katex tex="(n,2,1)" /> — and keep{' '}
        <Katex tex="\underset{\sim}{a}" /> on the middle row, since{' '}
        <Katex tex="\underset{\sim}{c}\times\underset{\sim}{a}" /> is the negative.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}&= (3-6)\underset{\sim}{i} - (0-3n)\underset{\sim}{j} + (0-3n)\underset{\sim}{k} \\ &= -3\underset{\sim}{i}+3n\underset{\sim}{j}-3n\underset{\sim}{k}\end{aligned}" />,
    reason: <>Expand along the top row: each unit vector times its 2×2 minor, with a minus in front of the <Katex tex="\underset{\sim}{j}" /> term.</>,
    more: (
      <>
        Each minor is the 2×2 determinant left after crossing out that unit vector&apos;s row and
        column, e.g. for <Katex tex="\underset{\sim}{i}" />: <Katex tex="(3)(1)-(3)(2)=-3" />.
        Check: the cross product is perpendicular to <Katex tex="\underset{\sim}{a}" />, and indeed{' '}
        <Katex tex="(0)(-3)+(3)(3n)+(3)(-3n)=0" /> ✓.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\left|\underset{\sim}{a}\times\underset{\sim}{c}\right| &= \sqrt{9+9n^2+9n^2} \\ &= \sqrt{9(1+2n^2)} = 3\sqrt{1+2n^2}\end{aligned}" />,
    reason: <>Square each component, add, then take the common factor 9 out of the root as 3.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}9 &= 3\sqrt{1+2n^2} \\ 3 &= \sqrt{1+2n^2} \\ 9 &= 1+2n^2\end{aligned}" />,
    reason: <>Set the dot product equal to the magnitude, divide by 3, then square both sides.</>,
    more: (
      <>
        Squaring cannot introduce a false solution here: both sides of{' '}
        <Katex tex="3=\sqrt{1+2n^2}" /> are positive. The report&apos;s version squares straight
        away, <Katex tex="81=18n^2+9" />, which gives the same result.
      </>
    ),
  },
  {
    working: <Katex display tex="2n^2 = 8 \implies n^2 = 4 \implies \boxed{n = \pm2}" />,
    reason: <>A square equal to 4 has two roots, and both are integers, so both values of <Katex tex="n" /> count.</>,
    more: (
      <>
        The report notes some students did not give both values of <Katex tex="n" />. Check{' '}
        <Katex tex="n=-2" />: <Katex tex="\underset{\sim}{a}\times\underset{\sim}{c}=-3\underset{\sim}{i}-6\underset{\sim}{j}+6\underset{\sim}{k}" />,
        with magnitude <Katex tex="\sqrt{9+36+36}=9" />, equal to the dot product 9 ✓.
      </>
    ),
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Two tools are needed. The angle between vectors comes from{' '}
              <Katex tex="\cos(\theta)=\dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{a}\right|\left|\underset{\sim}{b}\right|}" />. The cross
              product <Katex tex="\underset{\sim}{a}\times\underset{\sim}{c}" /> is a vector
              (found with a 3×3 determinant), so part b. compares the number{' '}
              <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{c}" /> with that vector&apos;s
              length.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
