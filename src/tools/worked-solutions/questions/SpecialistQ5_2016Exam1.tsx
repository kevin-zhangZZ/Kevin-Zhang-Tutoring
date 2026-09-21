// 2016 Specialist Mathematics — Exam 1, Question 5 (4 marks). A vector resolute, then
// linear dependence solved for a parameter. Question text transcribed from the original
// paper (no diagram given). Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [32, 14, 54],
  average: 1.2,
  comment: (
    <>
      This question was well answered by students who knew what a vector resolute was and
      used the correct formula. Some found the scalar resolute and several had an incorrect
      formula for the vector resolute (sometimes not using the unit vector). A number of
      students did not show the dot in the dot product.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [24, 18, 59],
  average: 1.4,
  comment: (
    <>
      Most students performed well on this question. The main issues were due to algebraic
      errors in the solution of the simultaneous equations. Some insightful solutions were
      seen using the fact that <Katex tex="2\underset{\sim}{a}+\underset{\sim}{b}" />{' '}
      eliminated <Katex tex="\underset{\sim}{j}" />. Others used the determinant of a{' '}
      <Katex tex="3\times3" /> matrix, with varied success.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 3(1)+5(-2)+(-2)(3) = -13" />,
    reason: <>Matching components, multiply and add. Negative, so the resolute points against <Katex tex="\underset{\sim}{b}" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right|^2 = 1+4+9 = 14" />,
    reason: <>The <em>square</em> of the magnitude — the vector resolute divides by this, not by <Katex tex="\left|\underset{\sim}{b}\right|" />.</>,
  },
  {
    working: <Katex display tex="\text{vector resolute} = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\,\underset{\sim}{b}" />,
    reason: <>Equivalently <Katex tex="\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}}" />: the unit vector appears twice, which is where the square comes from.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{13}{14}\left(\underset{\sim}{i}-2\underset{\sim}{j}+3\underset{\sim}{k}\right)}" />,
    reason: <>A <em>vector</em>. The scalar resolute would be <Katex tex="-\tfrac{13}{\sqrt{14}}" />, which the report says some students gave instead.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{c} = m\underset{\sim}{a}+n\underset{\sim}{b}" />,
    reason: <>Linear dependence means one vector is a combination of the other two.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}:\ 0 = 5m-2n; \qquad \underset{\sim}{i}:\ 1 = 3m+n" />,
    reason: <>Start with the component that does not involve <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="n = \tfrac52m \implies 1 = 3m+\tfrac52m = \tfrac{11}{2}m \implies m = \tfrac{2}{11},\ n = \tfrac{5}{11}" />,
    reason: <>Two equations, two unknowns.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{k}:\ d = -2m+3n = -\tfrac{4}{11}+\tfrac{15}{11}" />,
    reason: <>Now the third component fixes <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d = 1}" />,
    reason: <>Check: <Katex tex="\tfrac{2}{11}\underset{\sim}{a}+\tfrac{5}{11}\underset{\sim}{b} = \tfrac{1}{11}\left(6+5,\ 10-10,\ -4+15\right) = \left(1,0,1\right)" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{vmatrix}3&5&-2\\1&-2&3\\1&0&d\end{vmatrix} = -11d+11 = 0" />,
    reason: <>The determinant route in one line, if you are comfortable with it: three vectors are dependent exactly when the determinant of their components vanishes.</>,
  },
]

export default function SpecialistQ5_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (4 marks)</p>
        <p>
          Consider the vectors{' '}
          <Katex tex="\underset{\sim}{a}=3\underset{\sim}{i}+5\underset{\sim}{j}-2\underset{\sim}{k}" />
          ,{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}-2\underset{\sim}{j}+3\underset{\sim}{k}" />{' '}
          and <Katex tex="\underset{\sim}{c}=\underset{\sim}{i}+d\underset{\sim}{k}" />,
          where <Katex tex="d" /> is a real constant.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Find the vector resolute of <Katex tex="\underset{\sim}{a}" /> in the direction
            of <Katex tex="\underset{\sim}{b}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Find the value of <Katex tex="d" /> if the vectors are linearly dependent.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
