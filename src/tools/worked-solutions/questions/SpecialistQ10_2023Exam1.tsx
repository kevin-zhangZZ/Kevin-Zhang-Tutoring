// 2023 Specialist Mathematics — Exam 1 Question 10 (6 marks). A double-angle rewrite turns a
// vector function into a circle traversed at constant speed. Question text transcribed from
// the original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.
// Interactives: c. spec-2023e1-q10c-arc (the particle turns 2a about the centre, so the arc is
// 3 × 2a); d. spec-2023e1-q10d-perpendicular (r ⊥ ṙ only at the points nearest to and farthest
// from O, twice a lap).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const ArcWidget = lazyWidget(() => import('../interactives/spec-2023e1-q10c-arc'))
const PerpendicularWidget = lazyWidget(() => import('../interactives/spec-2023e1-q10d-perpendicular'))

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
      Cartesian equation of the path was the circle <Katex tex="(x-2)^2+(y-1)^2=9" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      Some students were able to apply a geometric argument or use circle mensuration,{' '}
      <Katex tex="3\times(2a)=\tfrac{3\pi}{4}" />, to obtain the answer. A number of students
      correctly evaluated an integral for the arc length to find the value of{' '}
      <Katex tex="a" />.
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
    reason: <>The answer must contain <Katex tex="\cos(2t)" />, so use the version of the cosine double-angle formula that contains <Katex tex="\sin^2(t)" />, and make <Katex tex="\sin^2(t)" /> the subject.</>,
  },
  {
    working: <Katex display tex="5-6\sin^2(t) = 5-6\cdot\frac{1-\cos(2t)}{2}" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="= 5-3\bigl(1-\cos(2t)\bigr) = 5-3+3\cos(2t)" />,
    reason: <>Take care with the sign when expanding: <Katex tex="-3\bigl(1-\cos(2t)\bigr) = -3+3\cos(2t)" />. Getting this sign wrong gives <Katex tex="2-3\cos(2t)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{5-6\sin^2(t) = 2+3\cos(2t)}" />,
    reason: <>So <Katex tex="\alpha=2" />, <Katex tex="\beta=3" />, both positive integers as required. Sign check at <Katex tex="t=0" />: <Katex tex="5-0=5" /> and <Katex tex="2+3=5" /> ✓ — this is what rules out <Katex tex="2-3\cos(2t)" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}x &= 5-6\sin^2(t) = 2+3\cos(2t)\\ \implies x-2 &= 3\cos(2t)\end{aligned}" />,
    reason: <>Straight from part a.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}y &= 1+6\sin(t)\cos(t)\\ &= 1+3\bigl(2\sin(t)\cos(t)\bigr)\\ &= 1+3\sin(2t)\end{aligned}" />,
    reason: <>The product <Katex tex="\sin(t)\cos(t)" /> is a sign to use the sine double-angle formula, <Katex tex="\sin(2t)=2\sin(t)\cos(t)" />: write the 6 as <Katex tex="3\times2" />.</>,
  },
  {
    working: <Katex display tex="y-1 = 3\sin(2t)" />,
    reason: <>Now both components are a constant plus 3 times a single trigonometric function of 2t.</>,
  },
  {
    working: <Katex display tex="\left(\frac{x-2}{3}\right)^2+\left(\frac{y-1}{3}\right)^2 = \cos^2(2t)+\sin^2(2t) = 1" />,
    reason: <>Make <Katex tex="\cos(2t)" /> and <Katex tex="\sin(2t)" /> the subjects (divide by 3), then square and add: <Katex tex="\cos^2(2t)+\sin^2(2t)=1" /> removes <Katex tex="t" />. This is the standard way to eliminate the parameter when one component has <Katex tex="\cos" /> and the other <Katex tex="\sin" /> of the same angle.</>,
  },
  {
    working: <Katex display tex="\boxed{(x-2)^2+(y-1)^2 = 9}" />,
    reason: <>A circle of centre <Katex tex="(2,1)" /> and radius 3 — the fact parts c. and d. both lean on. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{\dot r}(t) = -6\sin(2t)\underset{\sim}{i}+6\cos(2t)\underset{\sim}{j}" />,
    reason: <>Differentiate the tidied components from part b., <Katex tex="x=2+3\cos(2t)" /> and <Katex tex="y=1+3\sin(2t)" />. They are much easier to work with than the original ones.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{\dot r}(t)\right| = \sqrt{36\sin^2(2t)+36\cos^2(2t)} = 6" />,
    reason: <>Speed is the magnitude of the velocity. Here it is constant: the particle goes round the circle at a steady 6 units per second.</>,
  },
  {
    working: <Katex display tex="\text{distance} = \int_0^a \left|\underset{\sim}{\dot r}(t)\right|dt = \int_0^a 6\,dt = 6a" />,
    reason: <>The distance travelled along the curve is the integral of the speed (the arc length formula). With a constant speed it is simply speed × time.</>,
  },
  {
    working: <Katex display tex="6a = \frac{3\pi}{4} \implies \boxed{a = \frac{\pi}{8}}" />,
    reason: <>The geometric route gives the same equation. Since <Katex tex="x-2=3\cos(2t)" /> and <Katex tex="y-1=3\sin(2t)" />, the particle is at angle <Katex tex="2t" /> about the centre <Katex tex="(2,1)" />, starting from <Katex tex="A(5,1)" />. So by time <Katex tex="a" /> it has turned <Katex tex="2a" /> (not <Katex tex="a" />), and the arc is radius × angle <Katex tex="=3(2a)" />. Here <Katex tex="2a=\tfrac{\pi}{4}" />, less than one full turn.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t)\cdot\underset{\sim}{\dot r}(t) = 0 \ \text{ for perpendicular vectors}" />,
    reason: <>Two non-zero vectors are perpendicular exactly when their dot product is 0. (Neither is ever zero: the speed is 6, and the origin is not on the circle.) Use the tidied forms <Katex tex="\underset{\sim}{r}(t)=\bigl(2+3\cos(2t)\bigr)\underset{\sim}{i}+\bigl(1+3\sin(2t)\bigr)\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{\dot r}(t)" /> from part c. Note that <Katex tex="\underset{\sim}{r}(t)" /> is measured from the <em>origin</em>, not from the centre of the circle. A radius is perpendicular to the velocity at every instant, so from the centre the answer would be "always".</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= \bigl(2+3\cos(2t)\bigr)\bigl(-6\sin(2t)\bigr)\\ &\quad+\bigl(1+3\sin(2t)\bigr)\bigl(6\cos(2t)\bigr)\end{aligned}" />,
    reason: <>Matching components and adding.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= -12\sin(2t)-18\sin(2t)\cos(2t)\\ &\quad+6\cos(2t)+18\sin(2t)\cos(2t)\end{aligned}" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="= 6\bigl(\cos(2t)-2\sin(2t)\bigr) = 0" />,
    reason: <>The <Katex tex="\pm18\sin(2t)\cos(2t)" /> terms cancel, leaving an equation with just one <Katex tex="\cos(2t)" /> and one <Katex tex="\sin(2t)" /> term.</>,
  },
  {
    working: <Katex display tex="\cos(2t) = 2\sin(2t) \implies \tan(2t) = \frac12" />,
    reason: <>Divide both sides by <Katex tex="\cos(2t)" /> to get a single trigonometric function. This is safe: if <Katex tex="\cos(2t)" /> were 0 the equation would force <Katex tex="\sin(2t)=0" /> too, but <Katex tex="\sin(2t)" /> and <Katex tex="\cos(2t)" /> are never both 0.</>,
  },
  {
    working: <Katex display tex="2t = \arctan\!\left(\frac12\right)+k\pi" />,
    reason: <>"All values" means the general solution, not just the first one. Tangent has period <Katex tex="\pi" />, so from the solution <Katex tex="\arctan\left(\tfrac12\right)" /> every other solution is a whole number of <Katex tex="\pi" />s away, <Katex tex="k\in Z" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \frac12\arctan\!\left(\frac12\right)+\frac{k\pi}{2}, \quad k\in N\cup\{0\}}" />,
    reason: <>Halving everything, the spacing becomes <Katex tex="\tfrac{\pi}{2}" />. The question states <Katex tex="t\ge0" />, and <Katex tex="\tfrac12\arctan\left(\tfrac12\right)\approx0.232" /> is less than <Katex tex="\tfrac{\pi}{2}" />, so <Katex tex="k=-1" /> already gives a negative time: keep <Katex tex="k=0,1,2,\ldots" /> only. These are the moments the particle is farthest from or nearest to the origin, twice in each lap of <Katex tex="\pi" /> seconds (see below).</>,
  },
]

export default function SpecialistQ10_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (6 marks)</p>
        <p>The position vector of a particle at time <Katex tex="t" /> seconds is given by</p>
        <Katex
          display
          tex="\begin{aligned}\underset{\sim}{r}(t)={}&\left(5-6\sin^2(t)\right)\underset{\sim}{i}\\&+\bigl(1+6\sin(t)\cos(t)\bigr)\underset{\sim}{j}, \ \text{where } t\ge0.\end{aligned}"
        />
      </div>

      <DetailOnly>
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
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Double Angle"
        marks={1}
        statement={
          <>
            Write <Katex tex="5-6\sin^2(t)" /> in the form{' '}
            <Katex tex="\alpha+\beta\cos(2t)" />, where{' '}
            <Katex tex="\alpha,\beta\in Z^+" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Cartesian Equation"
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
        topic="Distance Along Path"
        marks={1}
        statement={
          <>
            The particle is at point <Katex tex="A" /> when <Katex tex="t=0" /> and at point{' '}
            <Katex tex="B" /> when <Katex tex="t=a" />, where <Katex tex="a" /> is a positive
            real constant.
            <br />
            If the distance travelled along the curve from <Katex tex="A" /> to{' '}
            <Katex tex="B" /> is <Katex tex="\dfrac{3\pi}{4}" />, find <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="In time a the particle turns 2a about the centre, so the arc is 3 × 2a">
          <ArcWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="d"
        topic="Perpendicular Vectors"
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
        <Explore title="Position ⊥ velocity only at the points nearest to and farthest from O, twice a lap">
          <PerpendicularWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
