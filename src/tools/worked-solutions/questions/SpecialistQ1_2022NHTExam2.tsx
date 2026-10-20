// 2022 Specialist NHT — Exam 2, Section B Question 1 (10 marks). The NHT report gives a sample
// answer for each part only, with no statistics and no comments. The rational function
// f(x) = x³/(x² − 1): partial fractions, its three asymptotes, f′, its stationary points (a local
// maximum, a stationary point of inflection at the origin and a local minimum), a sketch, and a
// disc volume from x = 2 to x = 4. Question text transcribed from the original paper. Part c.'s
// blank axes (x and y from −6 to 6, gridlines every 0.5, cells not square) are cropped from page
// 15 of the original VCAA exam PDF at 300 dpi (spec-2022nhte2-q1c-blank-axes.png); the finished
// sketch is this site's own matplotlib figure drawn on that grid, measured from the crop
// (spec-2022nhte2-q1c-sketch.png). Answers checked with sympy (including V = 74.1459…) and
// against the report's sample answers, which agree. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import blankAxesSrc from './spec-2022nhte2-q1c-blank-axes.png'
import sketchSrc from './spec-2022nhte2-q1c-sketch.png'

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{x^3}{x^2-1} = \frac{x(x^2-1)+x}{x^2-1} = x+\frac{x}{x^2-1}" />,
    reason: <>The numerator&apos;s degree is one more than the denominator&apos;s, so divide first. Writing <Katex tex="x^3=x(x^2-1)+x" /> does the division in one line: quotient <Katex tex="x" />, remainder <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{x}{(x-1)(x+1)} &= \frac{B}{x-1}+\frac{C}{x+1} \\ \implies x &= B(x+1)+C(x-1) \end{aligned}" />,
    reason: <>The remainder is a proper fraction, so split it over the two linear factors of <Katex tex="x^2-1" /> and clear the denominators.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x=1&:\ 1=2B \implies B=\tfrac12 \\ x=-1&:\ -1=-2C \implies C=\tfrac12 \end{aligned}" />,
    reason: <>Substitute the value that kills each bracket in turn, so one constant drops out each time.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x+\frac{1}{2(x-1)}+\frac{1}{2(x+1)}}" />,
    reason: <>So <Katex tex="A=1" />, <Katex tex="B=\tfrac12" />, <Katex tex="C=\tfrac12" />. Check at <Katex tex="x=2" />: <Katex tex="2+\tfrac12+\tfrac16=\tfrac83" />, and <Katex tex="\tfrac{2^3}{2^2-1}=\tfrac83" /> too.</>,
    more: <>VCAA writes this as <Katex tex="x+\tfrac12\times\tfrac{1}{x-1}+\tfrac12\times\tfrac{1}{x+1}" />, the same thing.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-1=0 \implies x=\pm1" />,
    reason: <>Vertical asymptotes are where the denominator is zero and the numerator is not: at <Katex tex="x=\pm1" /> the numerator is <Katex tex="\pm1\ne0" />. In the part a.i. form, these are where <Katex tex="\tfrac{1}{2(x-1)}" /> and <Katex tex="\tfrac{1}{2(x+1)}" /> blow up.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty:\quad \frac{1}{2(x-1)}+\frac{1}{2(x+1)}\to0" />,
    reason: <>Far from the origin both fractions shrink to nothing, so <Katex tex="f(x)" /> gets ever closer to the line <Katex tex="y=x" />: an oblique asymptote.</>,
  },
  {
    working: <Katex display tex="\boxed{x=1,\quad x=-1,\quad y=x}" />,
    reason: <>All three asymptotes, written as equations. Part a.i. is what makes the oblique one easy to read off.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{3x^2(x^2-1)-x^3(2x)}{(x^2-1)^2}" />,
    reason: <><Katex tex="f" /> is a quotient, so use <Katex tex="\left(\tfrac uv\right)'=\tfrac{u'v-uv'}{v^2}" /> with <Katex tex="u=x^3" /> and <Katex tex="v=x^2-1" />.</>,
    more: <>On CAS, <Cas fn="derivative" /> gives the same result. Differentiating the part a.i. form instead gives <Katex tex="1-\tfrac{1}{2(x-1)^2}-\tfrac{1}{2(x+1)^2}" />, which is equal to it.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{x^4-3x^2}{(x^2-1)^2} = \frac{x^2(x^2-3)}{(x^2-1)^2}}" />,
    reason: <>Expand the numerator, <Katex tex="3x^4-3x^2-2x^4=x^4-3x^2" />, then factor it. The factored form is the useful one for part b.ii.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f'(x)=0 &\implies x^2(x^2-3)=0 \\ &\implies x=0 \ \text{ or } \ x=\pm\sqrt3 \end{aligned}" />,
    reason: <>A fraction is zero only when its numerator is. None of these is <Katex tex="\pm1" />, so all three are in the domain.</>,
  },
  {
    working: <Katex display tex="f(0)=0, \qquad f\left(\pm\sqrt3\right) = \frac{\pm3\sqrt3}{3-1} = \pm\frac{3\sqrt3}{2}" />,
    reason: <>Substitute into <Katex tex="f" /> for the <Katex tex="y" />-coordinates. <Katex tex="\left(\sqrt3\right)^3=3\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} |x|>\sqrt3 &\implies f'(x)>0 \\ |x|<\sqrt3,\ x\ne0,\pm1 &\implies f'(x)<0 \end{aligned}" />,
    reason: <>The nature comes from the sign of <Katex tex="f'" /> either side. The denominator <Katex tex="(x^2-1)^2" /> and the factor <Katex tex="x^2" /> are never negative, so the sign of <Katex tex="f'" /> is the sign of <Katex tex="x^2-3" />.</>,
    more: <>The square <Katex tex="x^2" /> is the key: it makes <Katex tex="f'" /> zero at <Katex tex="x=0" /> without changing its sign there. That is what a stationary point of inflection looks like in the derivative.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{aligned} &\left(-\sqrt3,\ -\tfrac{3\sqrt3}{2}\right) \text{ local maximum} \\ &(0,\ 0) \text{ stationary point of inflection} \\ &\left(\sqrt3,\ \tfrac{3\sqrt3}{2}\right) \text{ local minimum} \end{aligned}}"
      />
    ),
    reason: <>At <Katex tex="x=-\sqrt3" />, <Katex tex="f'" /> goes from positive to negative: a maximum. At <Katex tex="x=0" /> it is negative on both sides: no turn, so a stationary point of inflection. At <Katex tex="x=\sqrt3" /> it goes from negative to positive: a minimum.</>,
    more: <>The local maximum is lower than the local minimum. That is not a contradiction: they lie on different branches of the graph, with the asymptotes between them. A check: <Katex tex="f(-x)=-f(x)" />, so the graph has rotational symmetry about the origin, and the two turning points are each other&apos;s images under that symmetry.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x=1,\ \ x=-1,\ \ y=x \ \text{ (dashed)}" />,
    reason: <>From part a.ii. Draw the asymptotes first and label them with their equations; the curve hangs on them.</>,
  },
  {
    working: <Katex display tex="f(x)-x = \frac{x}{x^2-1}" />,
    reason: <>From part a.i. For <Katex tex="x>1" /> this is positive, so the right branch approaches <Katex tex="y=x" /> from above; for <Katex tex="x<-1" /> it is negative, so the left branch approaches from below.</>,
    more: <>It is zero only at <Katex tex="x=0" />: the middle branch crosses the oblique asymptote at the origin. An asymptote describes behaviour far away, so a graph is allowed to cross it nearby.</>,
  },
  {
    working: <Katex display tex="x\to1^{+}: f\to+\infty, \quad x\to1^{-}: f\to-\infty" />,
    reason: <>Just right of <Katex tex="x=1" /> the numerator is about 1 and the denominator a small positive number; just left, a small negative number. Since <Katex tex="f" /> is odd, the behaviour at <Katex tex="x=-1" /> is the mirror image: <Katex tex="+\infty" /> just right of it, <Katex tex="-\infty" /> just left.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's sketch on VCAA's grid: the graph of y = x³/(x² − 1) with dashed asymptotes x = −1, x = 1 and y = x. The left branch rises along y = x from below to the local maximum (−√3, −3√3/2), then falls to −∞ at x = −1; the middle branch comes down from +∞ at x = −1, flattens through the stationary point of inflection (0, 0) and falls to −∞ at x = 1; the right branch falls from +∞ at x = 1 to the local minimum (√3, 3√3/2), then rises along y = x from above"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Three branches, the three asymptotes labelled with their equations and the three stationary points labelled with their exact coordinates, as asked.</>,
    more: <>The stationary point of inflection at the origin counts as a stationary point, so it needs its label too; VCAA&apos;s sample answer labels all three. The middle branch should look flat as it passes through <Katex tex="(0,0)" />. To copy the shape square by square, set the CAS graph window to the printed grid, <Katex tex="-6" /> to <Katex tex="6" /> on both axes.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx" />,
    reason: <>Rotating about the <Katex tex="x" />-axis turns each thin vertical strip into a disc of radius <Katex tex="y=f(x)" />, so its volume is <Katex tex="\pi y^2\,\delta x" />.</>,
    more: <>Between <Katex tex="x=2" /> and <Katex tex="x=4" /> the graph is the right branch, continuous (the asymptote <Katex tex="x=1" /> is outside the interval) and above the <Katex tex="x" />-axis, so the discs are solid with no holes.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_2^4 \frac{x^6}{(x^2-1)^2}\,dx}" />,
    reason: <><Katex tex="\left(\tfrac{x^3}{x^2-1}\right)^2=\tfrac{x^6}{(x^2-1)^2}" />, with terminals <Katex tex="2" /> and <Katex tex="4" /> from the question. Keep the <Katex tex="\pi" /> and the <Katex tex="dx" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">π×nInt(x⁶/(x²−1)², x, 2, 4)</Cas>,
    reason: <>Evaluate the part d.i. integral on CAS, with the <Katex tex="\pi" /> included.</>,
    more: <>CAS also gives the exact value, <Katex tex="\pi\left(\tfrac{343}{15}+\tfrac52\log_e(3)-\tfrac54\log_e(5)\right)=74.1459\ldots" />, but the question asks only for one decimal place.</>,
  },
  {
    working: <Katex display tex="\boxed{V \approx 74.1 \ \text{cubic units}}" />,
    reason: <>Correct to one decimal place. A check: the radius grows from <Katex tex="f(2)=\tfrac83" /> to <Katex tex="f(4)=\tfrac{64}{15}\approx4.3" />, so <Katex tex="V" /> lies between the cylinders <Katex tex="\pi\left(\tfrac83\right)^2(2)\approx44.7" /> and <Katex tex="\pi(4.3)^2(2)\approx114" />.</>,
    more: <>Leaving out the <Katex tex="\pi" /> gives <Katex tex="23.6" />, the volume divided by <Katex tex="\pi" />.</>,
  },
]

export default function SpecialistQ1_2022NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (10 marks)</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Each part feeds the next. The partial-fraction form from a.i. shows the oblique
              asymptote <Katex tex="y=x" /> at a glance and tells you which side of it the graph
              lies on; the factored derivative from b.i. gives the stationary points and their
              nature; and parts a. and b. together are everything the sketch in c. needs.
            </p>
            <p>
              <Katex tex="f" /> is an odd function, <Katex tex="f(-x)=-f(x)" />, so its graph
              has rotational symmetry about the origin. Every feature on the right has a twin on
              the left, which is a free check on each answer.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">a.</p>
        <p>
          Consider the function <Katex tex="f" /> with rule <Katex tex="f(x)=\dfrac{x^3}{x^2-1}" />.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Partial Fractions"
        marks={1}
        statement={
          <>
            Express <Katex tex="f(x)" /> in the form <Katex tex="Ax+\dfrac{B}{x-1}+\dfrac{C}{x+1}" />,
            where <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" /> are real constants.
          </>
        }
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Asymptotes"
        marks={1}
        statement={<>Write down the equations of the asymptotes of the graph of <Katex tex="f" />.</>}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard letter="b.i" topic="Derivative" marks={1} statement={<>Write down <Katex tex="f'(x)" />.</>}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Stationary Points"
        marks={2}
        statement={<>Find the stationary points of the graph of <Katex tex="f" /> and state their nature.</>}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            <p>
              Sketch the graph of <Katex tex="f" /> on the set of axes below. Label the asymptotes
              with their equations and label the stationary points with their coordinates.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={blankAxesSrc}
                alt="Blank axes from the original VCAA exam paper: x and y each from −6 to 6, numbered every 2, with gridlines every 0.5"
                className="w-full max-w-[460px]"
              />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          The part of the graph of <Katex tex="f" /> from <Katex tex="x=2" /> to <Katex tex="x=4" /> is
          rotated about the <Katex tex="x" />-axis to form a solid of revolution.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Volume of Revolution"
        marks={1}
        statement={<>Write down a definite integral that gives the volume of the solid formed.</>}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={<>Find the volume of the solid, correct to one decimal place.</>}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
