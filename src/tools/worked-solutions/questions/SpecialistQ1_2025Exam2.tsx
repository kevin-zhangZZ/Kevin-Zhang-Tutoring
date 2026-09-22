// 2025 Specialist Mathematics — Exam 2, Section B Question 1 (10 marks). A rational function
// with a cubic denominator: sketch, volume of revolution, then a family of curves where the
// constant in the denominator controls the stationary point, the asymptotes and the
// inflection. Question text transcribed from the original paper; the sketch is our own
// drawing of the answer. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2025e2-q1a-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [6.97, 17.07, 35.07, 40.9],
  average: 2.09,
  comment: (
    <>
      Many graphs were not accurately drawn. To improve accuracy, students can sketch the
      function on their CAS calculator and set the domain, range and scale to match those
      provided in the question. Some responses did not include the coordinates of the maximum
      in exact form, but rounded to one decimal place. Several responses incorrectly sketched
      the point of inflection as a stationary one, and many did not label the horizontal
      asymptote <Katex tex="y=0" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [9.9, 90.1],
  average: 0.9,
  comment: <>Students must make sure variables are defined if they are being used in formulas.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [18.51, 81.49],
  average: 0.81,
}

const EXAM_C: SAExaminerStats = {
  marks: [26.47, 73.53],
  average: 0.73,
  comment: (
    <>
      Vertical asymptotes are found by equating the denominator to 0. This question specified
      that separate equations should be written for each asymptote, but many responses did not
      do so.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [15.68, 84.32],
  average: 0.84,
  comment: (
    <>
      The stationary point is where <Katex tex="x=1" />, so this coordinate is found by
      substituting into <Katex tex="y(x)" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [54.15, 45.85],
  average: 0.45,
  comment: (
    <>
      If there are no stationary points, then there must be an asymptote at{' '}
      <Katex tex="x=1" />, and this gives <Katex tex="a=-3" />. Solving the denominator then
      gives the equations of the asymptotes.
    </>
  ),
}

const EXAM_DIII: SAExaminerStats = {
  marks: [20.12, 9.09, 70.78],
  average: 1.5,
  comment: (
    <>
      Found by equating the second derivative at <Katex tex="x=2" /> to zero. Students must
      show an appropriate method to gain both marks.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^3+x+2 = (x+1)(x^2-x+2)" />,
    reason: <>Factorising the denominator. <Katex tex="x=-1" /> is a root because <Katex tex="-1-1+2=0" />.</>,
  },
  {
    working: <Katex display tex="x^2-x+2: \ \Delta = 1-8 = -7 < 0" />,
    reason: 'No further real roots, so there is exactly one vertical asymptote.',
  },
  {
    working: <Katex display tex="\text{vertical asymptote: } x = -1" />,
    reason: 'The numerator is 3x = −3 there, not zero, so the graph really does blow up.',
  },
  {
    working: <Katex display tex="\deg(\text{denominator}) > \deg(\text{numerator}) \implies y \to 0 \text{ as } x\to\pm\infty" />,
    reason: 'Horizontal asymptote y = 0 — the label most often left off.',
  },
  {
    working: <Katex display tex="y' = \frac{3(x^3+x+2)-3x(3x^2+1)}{(x^3+x+2)^2} = \frac{6-6x^3}{(x^3+x+2)^2}" />,
    reason: 'Quotient rule, then collecting. The denominator is a square, so only the numerator can change sign.',
  },
  {
    working: <Katex display tex="6-6x^3 = 0 \implies x = 1 \implies y = \frac{3}{1+1+2} = \frac{3}{4}" />,
    reason: <>The only stationary point, at <Katex tex="\left(1,\tfrac34\right)" /> — an exact value is expected, not 0.8.</>,
  },
  {
    working: <Katex display tex="y'' = 0 \implies x = 1.6864\ldots \implies y = 0.5964\ldots" />,
    reason: <>By <Cas fn="solve" /> on the second derivative. The question asks for one decimal place here: <Katex tex="(1.7,\,0.6)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{see the sketch below}}" />,
    reason: <>Both branches drawn, <Katex tex="x=-1" /> and <Katex tex="y=0" /> labelled, and the inflection shown as a non-stationary point.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_{a}^{b} y^2\,dx" />,
    reason: 'The disc formula for rotation about the x-axis.',
  },
  {
    working: <Katex display tex="\text{region: } 0 \le x \le 2" />,
    reason: <>The curve meets the x-axis at the origin, and the line <Katex tex="x=2" /> closes the region on the right.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^2\left(\frac{3x}{x^3+x+2}\right)^2dx}" />,
    reason: 'Written down only — part b.ii. does the evaluating.',
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\pi\int_0^2\left(\frac{3x}{x^3+x+2}\right)^2dx = 2.28801\ldots" />,
    reason: <>By <Cas fn="nInt" /> — there is no useful antiderivative here.</>,
  },
  {
    working: <Katex display tex="\boxed{V \approx 2.29 \text{ cubic units}}" />,
    reason: 'Two decimal places, as asked.',
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x^3-5x+2 = 0" />,
    reason: 'Vertical asymptotes occur where the denominator vanishes and the numerator does not.',
  },
  {
    working: <Katex display tex="x = 2 \text{ is a root}: \ 8-10+2 = 0" />,
    reason: 'Trying the factors of the constant term finds it quickly.',
  },
  {
    working: <Katex display tex="x^3-5x+2 = (x-2)(x^2+2x-1)" />,
    reason: 'Dividing out the known factor.',
  },
  {
    working: <Katex display tex="x^2+2x-1 = 0 \implies x = \frac{-2\pm\sqrt{8}}{2} = -1\pm\sqrt2" />,
    reason: 'Completing the square or the quadratic formula.',
  },
  {
    working: <Katex display tex="\boxed{x = 2, \qquad x = -1+\sqrt2, \qquad x = -1-\sqrt2}" />,
    reason: 'Three separate equations — writing the roots as a list of numbers was not accepted.',
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="y(x) = \frac{3x}{x^3+ax+2}" />,
    reason: 'The family, with a as the parameter.',
  },
  {
    working: <Katex display tex="y' = \frac{3(x^3+ax+2)-3x(3x^2+a)}{(x^3+ax+2)^2} = \frac{6-6x^3}{(x^3+ax+2)^2}" />,
    reason: <>The <Katex tex="3ax" /> terms cancel, so a disappears from the numerator entirely.</>,
  },
  {
    working: <Katex display tex="6-6x^3 = 0 \implies x = 1 \quad \text{for every } a" />,
    reason: 'The stationary point always sits at x = 1 — a surprising and very useful fact for parts d.ii. and d.iii.',
  },
  {
    working: <Katex display tex="\boxed{y_P = \frac{3}{1+a+2} = \frac{3}{a+3}}" />,
    reason: 'Substituting x = 1 into the rule.',
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the only candidate is } x = 1 \text{ (part d.i.)}" />,
    reason: 'So the graph can only fail to have a stationary point if x = 1 is not in its domain.',
  },
  {
    working: <Katex display tex="1+a+2 = 0 \implies a = -3" />,
    reason: 'The denominator must vanish at x = 1.',
  },
  {
    working: <Katex display tex="x^3-3x+2 = (x-1)^2(x+2)" />,
    reason: <>Factorising with <Katex tex="a=-3" />. The numerator <Katex tex="3x" /> is 3 at x = 1 and −6 at x = −2, so neither zero cancels.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 1 \qquad \text{and} \qquad x = -2}" />,
    reason: 'Again as two separate equations. The repeated factor still gives a genuine asymptote, not a hole.',
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="y' = \frac{6-6x^3}{D^2}, \qquad D = x^3+ax+2" />,
    reason: 'From part d.i. Naming the denominator keeps the next line readable.',
  },
  {
    working: <Katex display tex="y'' = \frac{-18x^2D^2-\left(6-6x^3\right)\cdot2D\left(3x^2+a\right)}{D^4} = \frac{-18x^2D-12\left(1-x^3\right)\left(3x^2+a\right)}{D^3}" />,
    reason: 'Quotient rule again, then cancelling one factor of D.',
  },
  {
    working: <Katex display tex="x = 2: \quad -18(4)(8+2a+2)-12(1-8)(12+a) = 0" />,
    reason: 'An inflection needs the second derivative to vanish, so only the numerator matters.',
  },
  {
    working: <Katex display tex="-72(10+2a)+84(12+a) = -720-144a+1008+84a = 288-60a" />,
    reason: 'Expanding and collecting.',
  },
  {
    working: <Katex display tex="288-60a = 0 \implies \boxed{a = \frac{24}{5}}" />,
    reason: <>Equivalently by <Cas fn="solve" /> on <Katex tex="y''(2)=0" />. With this a the denominator has no real zero near x = 2, so the point is a genuine inflection.</>,
  },
]

export default function SpecialistQ1_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (10 marks)</p>
        <p>
          Parts a. to c. concern the curve <Katex tex="y(x) = \dfrac{3x}{x^3+x+2}" /> and two
          close relatives of it; part d. generalises the denominator to{' '}
          <Katex tex="x^3+ax+2" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Everything in this question turns on the denominator. Its real zeros give the
            vertical asymptotes; its degree being higher than the numerator&rsquo;s gives the
            horizontal asymptote <Katex tex="y=0" />; and, once the quotient rule is applied,
            the <Katex tex="ax" /> term cancels out of the numerator of{' '}
            <Katex tex="y'" /> altogether.
          </p>
          <p>
            That last cancellation is the key to part d.: whatever <Katex tex="a" /> is, the
            only stationary point sits at <Katex tex="x=1" />. So &ldquo;no stationary
            points&rdquo; can only mean that <Katex tex="x=1" /> has been removed from the
            domain — which pins <Katex tex="a" /> down immediately.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y(x) = \dfrac{3x}{x^3+x+2}" /> on the axes provided
            (<Katex tex="-4\le x\le4" />, <Katex tex="-2\le y\le2" />). Label the asymptotes
            with their equations, and label the turning point and the point of inflection with
            their coordinates. Give the coordinates of the point of inflection correct to one
            decimal place.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="The curve y = 3x/(x³+x+2): a branch rising from just above the x-axis on the far left to +∞ at the dashed asymptote x = −1, and a branch rising from −∞ through the origin to a maximum at (1, 3/4), passing the inflection (1.7, 0.6) and decaying to the asymptote y = 0"
            className="w-full max-w-[520px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="b.i"
        marks={1}
        statement={
          <>
            The region bounded by the graph of <Katex tex="y = \dfrac{3x}{x^3+x+2}" />, the
            coordinate axes and the line <Katex tex="x = 2" /> is rotated about the{' '}
            <Katex tex="x" />-axis to form a solid of revolution. Write down a definite integral
            that, when evaluated, will give the volume of the solid of revolution.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={1}
        statement={<>Find the volume of the solid of revolution correct to two decimal places.</>}
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={
          <>
            Find the equations of the vertical asymptotes of the curve given by{' '}
            <Katex tex="y = \dfrac{3x}{x^3-5x+2}" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          A family of curves is given by <Katex tex="y(x) = \dfrac{3x}{x^3+ax+2}" />, where{' '}
          <Katex tex="a\in\mathbb{R}" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        marks={1}
        statement={
          <>
            Consider the case where the graph has a stationary point <Katex tex="P" />. Find the{' '}
            <Katex tex="y" />-coordinate of <Katex tex="P" /> in terms of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        marks={1}
        statement={
          <>
            For a given value of <Katex tex="a" />, the graph has no stationary points. Find the
            equations of the vertical asymptotes of the graph in this case.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="d.iii"
        marks={2}
        statement={
          <>
            For a given value of <Katex tex="a" />, the graph will have a point of inflection at{' '}
            <Katex tex="x = 2" />. Find the value of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_DIII}
      >
        <WorkingTable rows={ROWS_DIII} />
      </PartCard>
    </div>
  )
}
