// 2022 Specialist Mathematics — Exam 2, Section B Question 1 (11 marks). A one-parameter
// family of rational functions: asymptotes, a sketch, the distance between the turning
// points, and a washer volume against a line. Question text transcribed from the original
// paper; the sketch is this site's own matplotlib drawing of the answer, on VCAA's grid
// (x −4.5 to 4.5 with gridlines every 0.5; y about −8 to 8 with gridlines every 1). Answers checked with sympy and
// against the VCAA examination report. Solution is original.
//
// Interactive widget: d.ii. a slice of the solid as a washer, side view and face-on, sweeping
// across the region to 51.42, with a toggle for the report's "square of the difference" disc
// (spec-2022e2-q1dii-washer).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import sketchSrc from './spec-2022e2-q1b-sketch.png'

const WasherWidget = lazyWidget(() => import('../interactives/spec-2022e2-q1dii-washer'))

const EXAM_A: SAExaminerStats = { marks: [2, 18, 81], average: 1.8, comment: <>Generally well done.</> }

const EXAM_B: SAExaminerStats = {
  marks: [6, 23, 28, 43],
  average: 2.1,
  comment: (
    <>
      Setting the calculator screen to match the grid provided will help students sketch
      graphs correctly. Some responses did not show appropriate asymptotic behaviour. The
      oblique asymptote was occasionally sketched hastily without due regard to accurate
      position.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: <>Success in parts 1a. and 1b. was generally followed by correct responses here.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [22, 33, 45],
  average: 1.2,
  comment: (
    <>
      Students generally applied a distance formula successfully, but many did not restrict
      their final answer to positive values.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [19, 36, 45],
  average: 1.3,
  comment: (
    <>
      Most students found correct terminals and stated integrals with the factor of{' '}
      <Katex tex="\pi" /> and the <Katex tex="dx" /> operator. A significant number of
      responses incorrectly contained the integrand{' '}
      <Katex tex="\bigl(h(x)-g(x)\bigr)^2" />, i.e. students stated the square of the
      difference rather than the difference of the squares.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [63, 37],
  average: 0.4,
  comment: (
    <>
      As expected, most students who answered part 1di. correctly were successful here, but
      some students
      who correctly included <Katex tex="\pi" /> in their integral earlier did not include it
      in their evaluation of the volume.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="k=1: \quad f(x) = \frac{x^2}{x-1}" />,
    reason: <>Substituting the value of the parameter.</>,
  },
  {
    working: <Katex display tex="x-1 = 0 \implies x = 1" />,
    reason: <>The denominator vanishes and the numerator does not (<Katex tex="1^2=1\ne0" />), so this really is an asymptote and not a hole.</>,
  },
  {
    working: <Katex display tex="\frac{x^2}{x-1} = \frac{(x-1)(x+1)+1}{x-1} = x+1+\frac{1}{x-1}" />,
    reason: <>The numerator's degree is one more than the denominator's, so divide: expect an oblique asymptote, not a horizontal one. Writing <Katex tex="x^2=(x-1)(x+1)+1" /> does the division in one line (long division gives the same).</>,
  },
  {
    working: <Katex display tex="\boxed{x=1 \quad\text{and}\quad y=x+1}" />,
    reason: <>As <Katex tex="x\to\pm\infty" /> the remainder <Katex tex="\tfrac{1}{x-1}\to0" />, leaving the line.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{2x(x-1)-x^2}{(x-1)^2} = \frac{x^2-2x}{(x-1)^2} = \frac{x(x-2)}{(x-1)^2}" />,
    reason: <>Quotient rule, then factorise the numerator — the denominator is always positive, so only the numerator controls the sign.</>,
  },
  {
    working: <Katex display tex="f'(x)=0 \implies x=0 \ \text{ or } \ x=2" />,
    reason: <>The two turning points.</>,
  },
  {
    working: <Katex display tex="f(0)=0, \quad f(2)=\frac41=4" />,
    reason: <>The sign of <Katex tex="f'" /> is the sign of <Katex tex="x(x-2)" />: positive for <Katex tex="x<0" />, negative for <Katex tex="0<x<2" /> (<Katex tex="x\ne1" />), positive for <Katex tex="x>2" />. So <Katex tex="(0,0)" /> is a local maximum on the left branch and <Katex tex="(2,4)" /> a local minimum on the right.</>,
  },
  {
    working: <Katex display tex="x<1 \implies f(x)\le0; \qquad x>1 \implies f(x)>0" />,
    reason: <>Since <Katex tex="x^2\ge0" />, the sign of <Katex tex="f" /> follows the sign of <Katex tex="x-1" />. The left branch lies entirely on or below the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="f(x)-(x+1)=\frac{1}{x-1}" />,
    reason: <>This is positive for <Katex tex="x>1" /> and negative for <Katex tex="x<1" />, so the right branch approaches the oblique asymptote from above and the left branch from below, never crossing it: the asymptotic behaviour the report says some responses did not show.</>,
  },
  {
    working: <Katex display tex="y=x+1 \text{ passes through } (-1,0) \text{ and } (0,1)" />,
    reason: <>The report notes the oblique asymptote was occasionally sketched hastily, without regard to its position. Two grid points pin it down: rule it through them, draw <Katex tex="x=1" /> dashed, then hang each branch on the asymptotes. Setting the CAS graph window to match the printed grid (the report's tip) lets you copy the shape square by square.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="On VCAA's grid: the graph of y = x²/(x − 1), a left branch rising to the local maximum (0, 0) then falling steeply to the dashed asymptote x = 1, and a right branch falling from that asymptote to the local minimum (2, 4) before rising along the dashed oblique asymptote y = x + 1"
          className="w-full max-w-[460px]"
        />
      </div>
    ),
    reason: <>Both turning points labelled with their coordinates and both asymptotes with their equations, as asked.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="x-k = 0 \implies x = k" />,
    reason: <>At <Katex tex="x=k" /> the numerator is <Katex tex="k^2\ne0" /> (because <Katex tex="k\ne0" />), so only the denominator vanishes: a vertical asymptote, not a hole.</>,
  },
  {
    working: <Katex display tex="\frac{x^2}{x-k} = x+k+\frac{k^2}{x-k}" />,
    reason: <>The same division as in part a., using <Katex tex="x^2=(x-k)(x+k)+k^2" />. As <Katex tex="x\to\pm\infty" />, <Katex tex="\tfrac{k^2}{x-k}\to0" />, leaving the line.</>,
  },
  {
    working: <Katex display tex="\boxed{x=k \quad\text{and}\quad y=x+k}" />,
    reason: <>Check against part a.: <Katex tex="k=1" /> gives <Katex tex="x=1" /> and <Katex tex="y=x+1" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{2x(x-k)-x^2}{(x-k)^2} = \frac{x(x-2k)}{(x-k)^2}" />,
    reason: <>Exactly the part b. derivative with k in place of 1.</>,
  },
  {
    working: <Katex display tex="f'(x) = 0 \implies x = 0 \ \text{ or } \ x = 2k" />,
    reason: <>Since <Katex tex="k\ne0" />, these are two different values, and <Katex tex="f'" /> changes sign at each (each is a single root of the numerator), so both are genuine turning points.</>,
  },
  {
    working: <Katex display tex="f(0) = 0, \qquad f(2k) = \frac{4k^2}{2k-k} = 4k" />,
    reason: <>So the turning points are <Katex tex="(0,0)" /> and <Katex tex="(2k,4k)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} d &= \sqrt{(2k-0)^2+(4k-0)^2} \\ &= \sqrt{4k^2+16k^2} = \sqrt{20k^2} \end{aligned}" />,
    reason: <>The distance formula.</>,
  },
  {
    working: <Katex display tex="\boxed{d = 2\sqrt5\,|k|}" />,
    reason: <>The report notes many students did not restrict their answer to positive values: <Katex tex="\sqrt{k^2}=|k|" />, not <Katex tex="k" />, and <Katex tex="k" /> is allowed to be negative. A distance can never be negative.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} x<1 &\implies \frac{x^2}{x-1}\le0 \\ &\implies g(x) = \left|\frac{x^2}{x-1}\right| = \frac{x^2}{1-x} \end{aligned}" />,
    reason: <>The absolute value reflects the whole left branch above the axis, which is what creates a closed region with the line.</>,
  },
  {
    working: <Katex display tex="x+3 = \frac{x^2}{1-x} \implies (x+3)(1-x) = x^2" />,
    reason: <>Finding where the line meets that branch.</>,
  },
  {
    working: <Katex display tex="-x^2-2x+3 = x^2 \implies 2x^2+2x-3 = 0" />,
    reason: <>Expanding and collecting. The discriminant is <Katex tex="2^2-4(2)(-3)=28>0" />, so the line crosses this branch twice. (On the right branch, <Katex tex="x+3=\tfrac{x^2}{x-1}" /> gives <Katex tex="2x-3=0" />: only one crossing, so no closed region there.)</>,
  },
  {
    working: <Katex display tex="x = \frac{-2\pm\sqrt{28}}{4} = \frac{-2\pm2\sqrt7}{4} = \frac{-1\pm\sqrt7}{2}" />,
    reason: <>About <Katex tex="-1.82" /> and <Katex tex="0.82" />, both safely to the left of the asymptote <Katex tex="x=1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &h(x)\ge g(x) \ \text{ on this interval} \\ &\implies h \text{ is the outer radius} \end{aligned}" />,
    reason: <>Test a point inside: at <Katex tex="x=0" />, <Katex tex="h=3" /> and <Katex tex="g=0" />. Both curves are on or above the <Katex tex="x" />-axis here (<Katex tex="x+3>0" /> for <Katex tex="x>-3" />), so each thin slice of the region spins into a <em>washer</em>: a disc of radius <Katex tex="h(x)" /> with a hole of radius <Katex tex="g(x)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_{\frac{-1-\sqrt7}{2}}^{\frac{-1+\sqrt7}{2}}\left(\bigl(x+3\bigr)^2-\left(\frac{x^2}{x-1}\right)^2\right)dx}" />,
    reason: <>A washer's area is the whole disc minus the hole, <Katex tex="\pi h^2-\pi g^2" />, and the integral adds the washers from one intersection to the other. That is the <em>difference of the squares</em>, not the square of the difference — the report notes a significant number of responses had the latter. Squaring removes the absolute value, so <Katex tex="g^2" /> can be written without it.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: (
      <Cas fn="nInt">
        nInt((x+3)²−(x²/(x−1))², x, (−1−√7)/2, (−1+√7)/2)×π
      </Cas>
    ),
    reason: <>Evaluate the integral from part d.i. directly — exact terminals, so no rounding creeps in early.</>,
  },
  {
    working: <Katex display tex="\boxed{V \approx 51.42 \ \text{cubic units}}" />,
    reason: <>Correct to two decimal places. The <Katex tex="\pi" /> is easy to leave behind when moving from the stated integral to the number — the report notes some students did exactly that, which would give <Katex tex="16.37" />.</>,
  },
]

export default function SpecialistQ1_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (11 marks)</p>
        <p>
          Consider the family of functions <Katex tex="f" /> with rule{' '}
          <Katex tex="f(x)=\dfrac{x^2}{x-k}" />, where <Katex tex="k\in R\setminus\{0\}" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Whenever the numerator's degree is exactly one more than the denominator's, divide
              — the quotient is the oblique asymptote and the remainder is what dies away. Doing
              the division once with a general <Katex tex="k" /> answers parts a. and c.i. in one
              go.
            </p>
            <p>
              Part d. is the only place the absolute value matters. Without it{' '}
              <Katex tex="\tfrac{x^2}{x-1}" /> sits below the axis on the left of{' '}
              <Katex tex="x=1" /> and never encloses anything with <Katex tex="y=x+3" />; the
              modulus flips that branch up and creates the bounded region the question rotates.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Asymptotes"
        marks={2}
        statement={
          <>
            Write down the equations of the two asymptotes of the graph of{' '}
            <Katex tex="f" /> when <Katex tex="k=1" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> for <Katex tex="k=1" /> on the set of
            axes below. Clearly label any turning points with their coordinates and label any
            asymptotes with their equations.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Asymptotes"
        marks={1}
        statement={
          <>
            Find, in terms of <Katex tex="k" />, the equations of the asymptotes of the graph
            of <Katex tex="f(x)=\dfrac{x^2}{x-k}" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Turning Points"
        marks={2}
        statement={
          <>
            Find the distance between the two turning points of the graph of{' '}
            <Katex tex="f(x)=\dfrac{x^2}{x-k}" /> in terms of <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          Now consider the functions <Katex tex="h" /> and <Katex tex="g" />, where{' '}
          <Katex tex="h(x)=x+3" /> and <Katex tex="g(x)=\left|\dfrac{x^2}{x-1}\right|" />.
          <br />
          The region bounded by the curves of <Katex tex="h" /> and <Katex tex="g" /> is rotated
          about the <Katex tex="x" />-axis.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Volume of Revolution"
        marks={2}
        statement={
          <>
            Write down the definite integral that can be used to find the volume of the
            resulting solid.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            Hence, find the volume of this solid. Give your answer correct to two decimal
            places.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
        <Explore title="Each slice is a disc of radius h with a hole of radius g">
          <WasherWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
