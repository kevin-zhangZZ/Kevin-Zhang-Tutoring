// 2023 Specialist Mathematics — Exam 1 Question 10 (6 marks). A double-angle rewrite turns a
// vector function into a circle traversed at constant speed. Question text transcribed from
// the original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: (
    <>
      This question was answered very well. A small number of students gave{' '}
      <Katex tex="2-3\cos(2t)" /> as their answer.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [25, 6, 69],
  average: 1.4,
  comment: (
    <>
      Students needed to use a double angle formula to express <Katex tex="y" /> in terms of{' '}
      <Katex tex="\sin(2t)" /> and then use another trigonometric identity to show that the
      Cartesian equation of the path was the circle.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      Some students applied a geometric argument or used circle mensuration,{' '}
      <Katex tex="3(2a)=\tfrac{3\pi}{4}" />, to obtain the answer. A number of students
      correctly evaluated an arc-length integral.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [44, 49, 7],
  average: 0.6,
  comment: (
    <>
      While many students realised that they needed to solve{' '}
      <Katex tex="\underset{\sim}{r}(t)\cdot\underset{\sim}{\dot r}(t)=0" />, many were not
      able to get to the final result.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(2t) = 1-2\sin^2(t) \implies \sin^2(t) = \frac{1-\cos(2t)}{2}" />,
    reason: 'The double-angle identity, rearranged to remove the square.',
  },
  {
    working: <Katex display tex="5-6\sin^2(t) = 5-6\cdot\frac{1-\cos(2t)}{2} = 5-3\bigl(1-\cos(2t)\bigr)" />,
    reason: 'Substituting.',
  },
  {
    working: <Katex display tex="\boxed{5-6\sin^2(t) = 2+3\cos(2t)}" />,
    reason: <>So <Katex tex="\alpha=2" />, <Katex tex="\beta=3" />, both positive integers as required. Sign check at <Katex tex="t=0" />: <Katex tex="5-0=5" /> and <Katex tex="2+3=5" /> ✓ — this is what rules out <Katex tex="2-3\cos(2t)" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x = 5-6\sin^2(t) = 2+3\cos(2t) \implies x-2 = 3\cos(2t)" />,
    reason: 'Straight from part a.',
  },
  {
    working: <Katex display tex="y = 1+6\sin(t)\cos(t) = 1+3\bigl(2\sin(t)\cos(t)\bigr) = 1+3\sin(2t)" />,
    reason: <>The other double-angle formula, <Katex tex="\sin(2t)=2\sin(t)\cos(t)" />.</>,
  },
  {
    working: <Katex display tex="y-1 = 3\sin(2t)" />,
    reason: 'Now both components are a constant plus 3 times a single trigonometric function of 2t.',
  },
  {
    working: <Katex display tex="\left(\frac{x-2}{3}\right)^2+\left(\frac{y-1}{3}\right)^2 = \cos^2(2t)+\sin^2(2t) = 1" />,
    reason: 'The Pythagorean identity is what eliminates the parameter.',
  },
  {
    working: <Katex display tex="\boxed{(x-2)^2+(y-1)^2 = 9} \ \checkmark" />,
    reason: <>A circle of centre <Katex tex="(2,1)" /> and radius 3 — the fact parts c. and d. both lean on.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(t) = -6\sin(2t)\underset{\sim}{i}+6\cos(2t)\underset{\sim}{j}" />,
    reason: 'Differentiating the tidied components from part b.',
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{\dot r}(t)\right| = \sqrt{36\sin^2(2t)+36\cos^2(2t)} = 6" />,
    reason: 'Constant speed — the particle goes round the circle at a steady 6 units per second.',
  },
  {
    working: <Katex display tex="\text{distance} = \int_0^a 6\,dt = 6a" />,
    reason: 'Arc length of a constant-speed path is just speed × time.',
  },
  {
    working: <Katex display tex="6a = \frac{3\pi}{4} \implies \boxed{a = \frac{\pi}{8}}" />,
    reason: <>The geometric route is the same sum: in time <Katex tex="a" /> the particle sweeps an angle <Katex tex="2a" /> about the centre, so the arc is <Katex tex="r\theta=3(2a)" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t)\cdot\underset{\sim}{\dot r}(t) = 0 \ \text{ for perpendicular vectors}" />,
    reason: <>Note this is the position vector from the <em>origin</em>, not from the centre of the circle — otherwise the answer would be "never".</>,
  },
  {
    working: <Katex display tex="= \bigl(2+3\cos(2t)\bigr)\bigl(-6\sin(2t)\bigr)+\bigl(1+3\sin(2t)\bigr)\bigl(6\cos(2t)\bigr)" />,
    reason: 'Matching components and adding.',
  },
  {
    working: <Katex display tex="= -12\sin(2t)-18\sin(2t)\cos(2t)+6\cos(2t)+18\sin(2t)\cos(2t)" />,
    reason: 'Expanding.',
  },
  {
    working: <Katex display tex="= 6\bigl(\cos(2t)-2\sin(2t)\bigr) = 0" />,
    reason: 'The two product terms cancel exactly, which is the point of the question.',
  },
  {
    working: <Katex display tex="\cos(2t) = 2\sin(2t) \implies \tan(2t) = \frac12" />,
    reason: <>Dividing by <Katex tex="\cos(2t)" />, which is safe because <Katex tex="\cos(2t)=0" /> would force <Katex tex="\sin(2t)=0" /> too.</>,
  },
  {
    working: <Katex display tex="2t = \arctan\!\left(\frac12\right)+k\pi" />,
    reason: <>Tangent has period <Katex tex="\pi" />, so every solution differs by <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \frac12\arctan\!\left(\frac12\right)+\frac{k\pi}{2}, \quad k\in\mathbb{N}\cup\{0\}}" />,
    reason: <>Halving. Only non-negative <Katex tex="k" /> is kept because the question states <Katex tex="t\ge0" />. The first time is about <Katex tex="0.232" /> seconds.</>,
  },
]

export default function SpecialistQ10_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (6 marks)</p>
        <p>
          The position vector of a particle at time <Katex tex="t" /> seconds is given by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\left(5-6\sin^2(t)\right)\underset{\sim}{i}+\bigl(1+6\sin(t)\cos(t)\bigr)\underset{\sim}{j}" />
          , where <Katex tex="t\ge0" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Both components hide a double angle. Rewriting them as{' '}
            <Katex tex="2+3\cos(2t)" /> and <Katex tex="1+3\sin(2t)" /> turns an awkward
            vector function into a circle of radius 3 about <Katex tex="(2,1)" />, traced at
            constant speed 6. Every later part becomes easy once that is done — which is why
            part a. is set first.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Write <Katex tex="5-6\sin^2(t)" /> in the form{' '}
            <Katex tex="\alpha+\beta\cos(2t)" />, where{' '}
            <Katex tex="\alpha,\beta\in\mathbb{Z}^+" />.
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
            Show that the Cartesian equation of the path of the particle is{' '}
            <Katex tex="(x-2)^2+(y-1)^2=9" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={
          <>
            The particle is at point <Katex tex="A" /> when <Katex tex="t=0" /> and at point{' '}
            <Katex tex="B" /> when <Katex tex="t=a" />, where <Katex tex="a" /> is a positive
            real constant. If the distance travelled along the curve from <Katex tex="A" /> to{' '}
            <Katex tex="B" /> is <Katex tex="\dfrac{3\pi}{4}" />, find <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            Find all values of <Katex tex="t" /> for which the position vector of the
            particle, <Katex tex="\underset{\sim}{r}(t)" />, is perpendicular to its velocity
            vector, <Katex tex="\underset{\sim}{\dot r}(t)" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
