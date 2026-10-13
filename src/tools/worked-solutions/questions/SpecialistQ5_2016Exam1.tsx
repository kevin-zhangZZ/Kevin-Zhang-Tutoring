// 2016 Specialist Mathematics — Exam 1, Question 5 (4 marks). A vector resolute, then
// linear dependence solved for a parameter. Question text transcribed from the original
// paper (no diagram given). Answers checked with sympy and against the VCAA examination
// report. Solution is original. Reviewed Oct 2026 (2014-16 pass): mode 'review', no
// qualifying parts, so no interactives.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [32, 14, 54],
  average: 1.2,
  comment: (
    <>
      This question was well answered by students who knew what a vector resolute was and
      used the correct formula. Some found the scalar resolute and several had an incorrect
      formula for the vector resolute (sometimes not using the unit vector, occasionally
      finding the vector resolute in the direction of <Katex tex="\underset{\sim}{i}" />). A number of
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
      eliminated <Katex tex="\underset{\sim}{j}" />. Others used the discriminant of a{' '}
      <Katex tex="3\times3" /> matrix, with varied success.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 3(1)+5(-2)+(-2)(3) = -13" />,
    reason: <>Matching components, multiply and add. Negative, so the resolute points against <Katex tex="\underset{\sim}{b}" />.</>,
    more: <>Write the dot in <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}" />: the report notes a number of students left it out, and without it the expression has no meaning.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right|^2 = 1+4+9 = 14" />,
    reason: <>The <em>square</em> of the magnitude — the vector resolute divides by this, not by <Katex tex="\left|\underset{\sim}{b}\right|" />.</>,
  },
  {
    working: <Katex display tex="\text{vector resolute} = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\,\underset{\sim}{b}" />,
    reason: <>The standard formula: the component of <Katex tex="\underset{\sim}{a}" /> along <Katex tex="\underset{\sim}{b}" />, times a vector in that direction.</>,
    more: <>
      It comes from <Katex tex="\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}}" />, with{' '}
      <Katex tex="\hat{\underset{\sim}{b}}=\tfrac{1}{|\underset{\sim}{b}|}\underset{\sim}{b}" />: the scalar resolute{' '}
      <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}" /> (how far <Katex tex="\underset{\sim}{a}" /> reaches along{' '}
      <Katex tex="\underset{\sim}{b}" />) times the unit vector. The unit vector appears twice, so{' '}
      <Katex tex="|\underset{\sim}{b}|" /> appears twice in the denominator. Dropping one of them is the report's "not using the
      unit vector" slip; its other wrong formula resolved in the direction of <Katex tex="\underset{\sim}{i}" /> instead of{' '}
      <Katex tex="\underset{\sim}{b}" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{13}{14}\left(\underset{\sim}{i}-2\underset{\sim}{j}+3\underset{\sim}{k}\right)}" />,
    reason: <>Substitute. The answer is a <em>vector</em>; the number <Katex tex="-\tfrac{13}{\sqrt{14}}" /> would be the scalar resolute.</>,
    more: <>Expanded, this is <Katex tex="-\tfrac{13}{14}\underset{\sim}{i}+\tfrac{13}{7}\underset{\sim}{j}-\tfrac{39}{14}\underset{\sim}{k}" />; either form earns the marks. The report says some students gave the scalar resolute — read the question for "vector" or "scalar" before choosing the formula.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{c} = m\underset{\sim}{a}+n\underset{\sim}{b}" />,
    reason: <>Linear dependence means one vector is a combination of the others. <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> aren't parallel, so write <Katex tex="\underset{\sim}{c}" /> in terms of them.</>,
    more: <>
      The definition: <Katex tex="\alpha\underset{\sim}{a}+\beta\underset{\sim}{b}+\gamma\underset{\sim}{c}=\underset{\sim}{0}" /> for some scalars not all zero. If{' '}
      <Katex tex="\gamma=0" />, then <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> would be parallel, which they are not
      (their components aren't in proportion). So <Katex tex="\gamma\neq0" /> and we can divide by it to get{' '}
      <Katex tex="\underset{\sim}{c}" /> as a combination of <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />. Choosing{' '}
      <Katex tex="\underset{\sim}{c}" /> (the vector containing <Katex tex="d" />) keeps <Katex tex="d" /> on one side only.
    </>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}:\ 0 = 5m-2n; \qquad \underset{\sim}{i}:\ 1 = 3m+n" />,
    reason: <>Equate components. Use the two that don't involve <Katex tex="d" /> to find <Katex tex="m" /> and <Katex tex="n" /> first.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} n &= \tfrac52m \\ \implies 1 &= 3m+\tfrac52m = \tfrac{11}{2}m \\ \implies m &= \tfrac{2}{11},\ n = \tfrac{5}{11} \end{aligned}" />,
    reason: <>Substitute the <Katex tex="\underset{\sim}{j}" /> equation into the <Katex tex="\underset{\sim}{i}" /> equation.</>,
    more: <>The report says the main issues were algebraic errors in solving these simultaneous equations. Check before moving on: <Katex tex="5\cdot\tfrac{2}{11}-2\cdot\tfrac{5}{11}=0" /> and <Katex tex="3\cdot\tfrac{2}{11}+\tfrac{5}{11}=1" /> ✓.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{k}:\ d = -2m+3n = -\tfrac{4}{11}+\tfrac{15}{11}" />,
    reason: <>The <Katex tex="\underset{\sim}{k}" /> components must also match, and that fixes <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d = 1}" />,
    reason: <>So <Katex tex="\underset{\sim}{c}=\underset{\sim}{i}+\underset{\sim}{k}=\tfrac{2}{11}\underset{\sim}{a}+\tfrac{5}{11}\underset{\sim}{b}" />.</>,
    more: <>
      <b>Check:</b> <Katex tex="\tfrac{2}{11}\underset{\sim}{a}+\tfrac{5}{11}\underset{\sim}{b} = \tfrac{1}{11}\left(6+5,\ 10-10,\ -4+15\right) = \left(1,0,1\right)" /> ✓.
      <br /><b>Shortcut:</b> <Katex tex="2\underset{\sim}{a}+5\underset{\sim}{b}=11\underset{\sim}{i}+11\underset{\sim}{k}" /> has no{' '}
      <Katex tex="\underset{\sim}{j}" />. Of all combinations <Katex tex="m\underset{\sim}{a}+n\underset{\sim}{b}" />, only multiples of this one have zero <Katex tex="\underset{\sim}{j}" />, and{' '}
      <Katex tex="\underset{\sim}{c}" /> has none, so <Katex tex="\underset{\sim}{c}" /> is a multiple of{' '}
      <Katex tex="\underset{\sim}{i}+\underset{\sim}{k}" />; its <Katex tex="\underset{\sim}{i}" /> component is 1, so <Katex tex="d=1" />.
      <br /><b>About the report:</b> this is the "insightful" solution it mentions, but it prints{' '}
      <Katex tex="2\underset{\sim}{a}+\underset{\sim}{b}" />, but that is <Katex tex="7\underset{\sim}{i}+8\underset{\sim}{j}-\underset{\sim}{k}" />; it is{' '}
      <Katex tex="2\underset{\sim}{a}+5\underset{\sim}{b}" /> that eliminates <Katex tex="\underset{\sim}{j}" />. The report's "discriminant" of a{' '}
      <Katex tex="3\times3" /> matrix means its determinant (setting it to zero also gives <Katex tex="d=1" />); matrices are not in the current Specialist study design, so use the method above.
    </>,
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
        topic="Vector Resolute"
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
        topic="Linear Dependence"
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
