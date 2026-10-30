// 2025 Specialist NHT — Exam 1, Question 1 (5 marks). The NHT report gives sample answers only,
// with no statistics. Parametric path x = 4t/(t² + 1), y = 2(1 − t²)/(t² + 1), t ≥ 0: its
// Cartesian equation x² + y² = 4 (c = 4), the limit point (0, −2) as t → ∞, and a sketch of the
// right-hand semicircle traced clockwise from (0, 2). Question text transcribed from the original
// paper (read from rendered page images; the 2025 paper has no text layer). Part c.'s blank axes
// are cropped from page 3 of the original VCAA exam PDF at 300 dpi
// (spec-2025nhte1-q1c-blank-axes.png: x and y from −4 to 4, gridlines every 1, numbered every 2);
// the finished sketch is this site's own matplotlib figure drawn on that grid
// (spec-2025nhte1-q1c-sketch.png). Answers checked with sympy and against the report's sample
// answers, which agree (c = 4; h = 0, k = −2; semicircle from (0, 2) clockwise towards (0, −2),
// open there). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'
import blankAxesSrc from './spec-2025nhte1-q1c-blank-axes.png'
import sketchSrc from './spec-2025nhte1-q1c-sketch.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+y^2=\frac{16t^2}{\left(t^2+1\right)^2}+\frac{4\left(1-t^2\right)^2}{\left(t^2+1\right)^2}" />,
    reason: <>We want a relation between <Katex tex="x" /> and <Katex tex="y" /> with no <Katex tex="t" />. The question already tells us its form, so square each coordinate and add: both have the same denominator, which makes the sum easy.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &=\frac{16t^2+4\left(1-2t^2+t^4\right)}{\left(t^2+1\right)^2} \\ &=\frac{4t^4+8t^2+4}{\left(t^2+1\right)^2} \end{aligned}" />,
    reason: <>Expand <Katex tex="(1-t^2)^2=1-2t^2+t^4" /> and collect: <Katex tex="16t^2-8t^2=8t^2" />.</>,
  },
  {
    working: <Katex display tex="=\frac{4\left(t^4+2t^2+1\right)}{\left(t^2+1\right)^2}=\frac{4\left(t^2+1\right)^2}{\left(t^2+1\right)^2}=4" />,
    reason: <>Take out the common factor 4 and recognise a perfect square: <Katex tex="t^4+2t^2+1=(t^2+1)^2" />. Everything with <Katex tex="t" /> cancels, as it must if the path is the curve <Katex tex="x^2+y^2=c" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c=4}" />,
    reason: <>So the particle moves on the circle with centre <Katex tex="O" /> and radius <Katex tex="\sqrt4=2" /> cm.</>,
    more: <>Check with one value: at <Katex tex="t=1" />, <Katex tex="x=\tfrac{4}{2}=2" /> and <Katex tex="y=0" />, and <Katex tex="2^2+0^2=4" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="h=\lim_{t\to\infty}\frac{4t}{t^2+1}=\lim_{t\to\infty}\frac{\frac{4}{t}}{1+\frac{1}{t^2}}=0" />,
    reason: <>Divide the numerator and denominator by <Katex tex="t^2" />, the highest power in the denominator. As <Katex tex="t\to\infty" />, <Katex tex="\tfrac4t\to0" /> and <Katex tex="\tfrac{1}{t^2}\to0" />.</>,
  },
  {
    working: <Katex display tex="k=\lim_{t\to\infty}\frac{2\left(1-t^2\right)}{t^2+1}=\lim_{t\to\infty}\frac{\frac{2}{t^2}-2}{1+\frac{1}{t^2}}=-2" />,
    reason: <>Same method. The <Katex tex="t^2" /> terms dominate, so the fraction tends to the ratio of their coefficients, <Katex tex="\tfrac{-2}{1}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h=0,\ k=-2}" />,
    reason: <>So the particle approaches the point <Katex tex="(0,-2)" />.</>,
    more: <>Sanity check: <Katex tex="(0,-2)" /> is on the circle from part a (<Katex tex="0^2+(-2)^2=4" />), as it must be, since the particle gets as close to it as we like.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="t=0:\ \ x=0,\ \ y=2" />,
    reason: <>Substitute <Katex tex="t=0" /> to find where the particle starts. Since <Katex tex="t=0" /> is allowed, this end of the path is a closed (filled) point.</>,
  },
  {
    working: <Katex display tex="t\ge0\implies x=\frac{4t}{t^2+1}\ge0" />,
    reason: <>For <Katex tex="t\ge0" /> the numerator is non-negative and the denominator positive, so the particle stays on the right-hand half of the circle (<Katex tex="x\ge0" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &y=\frac{2\left(1-t^2\right)}{t^2+1}=\frac{4}{t^2+1}-2 \\ &\text{decreases as } t \text{ increases} \end{aligned}" />,
    reason: <>Rewrite <Katex tex="2(1-t^2)=4-2(t^2+1)" />. As <Katex tex="t" /> grows, <Katex tex="\tfrac{4}{t^2+1}" /> shrinks, so <Katex tex="y" /> falls steadily from 2 towards <Katex tex="-2" />: the particle moves down the right semicircle, which is <b>clockwise</b>.</>,
    more: <>At <Katex tex="t=1" /> it passes through <Katex tex="(2,0)" />, the rightmost point; after that <Katex tex="y<0" />.</>,
  },
  {
    working: <Katex display tex="t\to\infty:\ (x,y)\to(0,-2)\ \text{(not reached)}" />,
    reason: <>From part b. The particle only approaches <Katex tex="(0,-2)" />: solving <Katex tex="y=-2" /> gives <Katex tex="2(1-t^2)=-2(t^2+1)" />, i.e. <Katex tex="2=-2" />, which has no solution. So that end of the path is an open circle.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's answer sketch on the VCAA grid: the right half of the circle x² + y² = 4, starting at the closed point (0, 2) where t = 0, with an arrow pointing clockwise, passing through (2, 0) and ending at an open circle at (0, −2)"
          className="w-full max-w-[400px]"
        />
      </div>
    ),
    reason: <>The right-hand semicircle of radius 2, from the closed point <Katex tex="(0,2)" /> clockwise to the open point <Katex tex="(0,-2)" />, with an arrow for the direction of motion.</>,
    more: <>VCAA&apos;s sample answer draws exactly this: a filled dot at <Katex tex="(0,2)" />, a clockwise arrow, and an open dot at <Katex tex="(0,-2)" />.</>,
  },
]

export default function SpecialistQ1_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (5 marks)</p>
        <p>
          The position of a particle with respect to the origin, <Katex tex="O" />, at time <Katex tex="t" /> seconds,{' '}
          <Katex tex="t\ge0" />, is given by the parametric equations <Katex tex="x=\dfrac{4t}{t^2+1}" /> and{' '}
          <Katex tex="y=\dfrac{2\left(1-t^2\right)}{t^2+1}" />, where <Katex tex="x" /> and <Katex tex="y" /> are measured
          in centimetres.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Parametric to Cartesian"
        marks={2}
        statement={
          <>
            The Cartesian equation of the path of the particle is given by <Katex tex="x^2+y^2=c" />.
            <br />
            Find the value of <Katex tex="c" />.
          </>
        }
      >
        <Background>
          <p>
            A parametric curve gives <Katex tex="x" /> and <Katex tex="y" /> separately in terms of a third variable, here
            time <Katex tex="t" />. Its Cartesian equation is what is left once <Katex tex="t" /> is eliminated. Solving one
            equation for <Katex tex="t" /> would be messy here; since the target <Katex tex="x^2+y^2" /> is given, just
            compute it and watch the <Katex tex="t" />&apos;s cancel.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Limits"
        marks={1}
        statement={
          <>
            As the value of <Katex tex="t" /> approaches infinity, the position of the particle approaches the point{' '}
            <Katex tex="(h,k)" />.
            <br />
            Find the values of <Katex tex="h" /> and <Katex tex="k" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Parametric Path"
        marks={2}
        statement={
          <>
            <p>
              Sketch the graph of the path of the particle for <Katex tex="t\ge0" /> on the axes below.
              <br />
              Use an arrow to indicate the direction of the particle&apos;s motion.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={blankAxesSrc}
                alt="Blank x–y axes from the original VCAA exam paper: x and y from −4 to 4, gridlines every 1, numbered every 2"
                className="w-full max-w-[380px]"
              />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Draw the whole circle"
          working={<Katex display tex="x^2+y^2=4\implies\text{full circle}" />}
        >
          The Cartesian equation describes every point the path <i>could</i> use, not the part the particle actually
          covers. With <Katex tex="t\ge0" />, <Katex tex="x" /> is never negative, and <Katex tex="(0,-2)" /> is never reached,
          so only the right half, open at the bottom, is the path. Always check the parameter&apos;s domain against the
          Cartesian curve.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
