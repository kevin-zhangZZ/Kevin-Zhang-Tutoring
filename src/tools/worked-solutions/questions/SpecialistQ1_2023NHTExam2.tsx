// 2023 Specialist NHT — Exam 2, Section B Question 1 (9 marks). The NHT report gives sample
// answers only, with no statistics and no comments. The rational function
// f(x) = (4x² + 2x + 7)/(2x² − 3x − 2): division into 2 + (8x + 11)/(2x² − 3x − 2), its three
// asymptotes, a sketch with its two stationary points, its inflection point and y-intercept, the
// values of k that give g_k one or no vertical asymptotes, and a disc-volume integral for g₂.
// Question text transcribed from the original paper. Part c.'s blank axes (x and y from −6 to 6,
// gridlines every 0.5, cells not square) are cropped from page 12 of the original VCAA exam PDF
// at 300 dpi (spec-2023nhte2-q1c-blank-axes.png); the finished sketch is this site's own
// matplotlib figure drawn on that grid, measured from the crop (spec-2023nhte2-q1c-sketch.png).
// Answers checked with sympy and against the report's sample answers, which agree: a. 2 + (8x +
// 11)/(2x² − 3x − 2); b. y = 2, x = −1/2, x = 2; c. stationary points (−3.09, 1.48) and (0.34,
// −2.92), inflection point (−4.90, 1.54), y-intercept (0, −3.5); d.i. k = 9/8; d.ii. k > 9/8;
// e. π∫₀⁵ g₂(x)² dx (= 764.81…, not asked). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import blankAxesSrc from './spec-2023nhte2-q1c-blank-axes.png'
import sketchSrc from './spec-2023nhte2-q1c-sketch.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="4x^2+2x+7 = 2\left(2x^2-3x-2\right)+8x+11" />,
    reason: <>Numerator and denominator have the same degree, so divide first. The leading terms give a quotient of 2; what is left over, <Katex tex="4x^2+2x+7-\left(4x^2-6x-4\right)=8x+11" />, is the remainder.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 2+\frac{8x+11}{2x^2-3x-2}}" />,
    reason: <>Divide each term by <Katex tex="2x^2-3x-2" />. So <Katex tex="A=2" />, <Katex tex="B=8" />, <Katex tex="C=11" />.</>,
    more: <>Check at <Katex tex="x=0" />: <Katex tex="2+\tfrac{11}{-2}=-\tfrac72" />, and <Katex tex="\tfrac{7}{-2}=-\tfrac72" /> too. On CAS, propFrac gives the same form.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x\to\pm\infty: \ \frac{8x+11}{2x^2-3x-2}\to0 \implies y=2" />,
    reason: <>From part a. The remainder fraction has a higher power on the bottom than on the top, so it shrinks to 0 far from the origin and <Katex tex="f(x)" /> settles to 2.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} 2x^2-3x-2 = (2x+1)(x-2) = 0 \\ \implies x=-\tfrac12, \ x=2 \end{gathered}" />,
    reason: <>Vertical asymptotes come from the zeros of the denominator. Factorise: two numbers that multiply to <Katex tex="2\times(-2)=-4" /> and add to <Katex tex="-3" /> are <Katex tex="-4" /> and <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\Delta_{\text{num}} = 2^2-4(4)(7) = -108 < 0" />,
    reason: <>A zero of the denominator is only an asymptote if the numerator isn&apos;t also zero there (otherwise the factor could cancel, leaving a hole). The numerator has no real zeros at all, so both are genuine asymptotes.</>,
  },
  {
    working: <Katex display tex="\boxed{y=2, \quad x=-\tfrac12, \quad x=2}" />,
    reason: <>Three asymptotes, each written as an equation.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = -\frac{16x^2+44x-17}{(2x+1)^2(x-2)^2}" />,
    reason: <>Differentiate with CAS (or by the quotient rule on the part a. form). The denominator is never negative, so the sign of <Katex tex="f'" /> is decided by the quadratic on top.</>,
  },
  {
    working: (
      <>
        <Cas fn="solve">solve(d/dx(f(x)) = 0, x)</Cas>
        <Katex display tex="16x^2+44x-17=0 \implies x=\frac{-11\pm3\sqrt{21}}{8}" />
      </>
    ),
    reason: <>Stationary points are where <Katex tex="f'(x)=0" />, which is where the numerator is zero.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x&=-3.0934\ldots: & f&=1.4796\ldots \\ x&=0.3434\ldots: & f&=-2.9196\ldots \end{aligned}" />,
    reason: <>Substitute back into <Katex tex="f" /> and round: <Katex tex="(-3.09,\ 1.48)" /> and <Katex tex="(0.34,\ -2.92)" />. The quadratic <Katex tex="16x^2+44x-17" /> is negative between its roots, so <Katex tex="f'" /> (minus that, over a positive) changes from negative to positive at the first point, a local minimum just under <Katex tex="y=2" />, and from positive to negative at the second, the local maximum of the middle branch.</>,
    more: <>The middle branch runs from <Katex tex="-\infty" /> (just right of <Katex tex="x=-\tfrac12" />) up to this maximum and back down to <Katex tex="-\infty" /> (just left of <Katex tex="x=2" />), so it has to turn somewhere in between.</>,
  },
  {
    working: (
      <>
        <Cas fn="solve">solve(d²/dx²(f(x)) = 0, x)</Cas>
        <Katex display tex="x=-4.8992\ldots, \quad f=1.5355\ldots" />
      </>
    ),
    reason: <>An inflection point is where <Katex tex="f''" /> changes sign. <Katex tex="f''(x)=0" /> leads to a cubic with only one real root, and <Katex tex="f''" /> does change sign there, so there is exactly one inflection point. Rounded, it is <Katex tex="(-4.90,\ 1.54)" />.</>,
    more: <>This one is easy to miss. Left of the minimum the curve rises towards <Katex tex="y=2" /> as <Katex tex="x\to-\infty" />, so it approaches the asymptote from below, curving down far away but curving up near the minimum. The bend switches over at <Katex tex="x\approx-4.90" />.</>,
  },
  {
    working: <Katex display tex="f(0)=\frac{7}{-2}=-\frac72, \qquad f(x)\neq0" />,
    reason: <>The <Katex tex="y" />-intercept is <Katex tex="\left(0,-\tfrac72\right)" />. There are no <Katex tex="x" />-intercepts, because the numerator has no real zeros (part b.).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x\to-\tfrac12^{-}&: f\to+\infty \\ x\to-\tfrac12^{+}&: f\to-\infty \\ x\to2^{\pm}&: f\to\pm\infty \end{aligned}" />,
    reason: <>Near each vertical asymptote, check the sign of <Katex tex="\tfrac{8x+11}{(2x+1)(x-2)}" />. Near <Katex tex="x=-\tfrac12" /> the top is about 7 and <Katex tex="x-2" /> is negative, so the sign is opposite to <Katex tex="2x+1" />. Near <Katex tex="x=2" /> the top is 27 and <Katex tex="2x+1" /> is 5, so the sign matches <Katex tex="x-2" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's sketch on VCAA's grid: the graph of f with dashed asymptotes x = −1/2, x = 2 and y = 2. The left branch rises slowly from just under y = 2 through the inflection point (−4.90, 1.54) to the local minimum (−3.09, 1.48), then crosses y = 2 and shoots up to +∞ at x = −1/2; the middle branch comes up from −∞ at x = −1/2 through the y-intercept (0, −3.5) to the local maximum (0.34, −2.92) and falls to −∞ at x = 2; the right branch falls from +∞ at x = 2 towards y = 2 from above"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Three branches, the three asymptotes labelled with their equations, the two stationary points and the inflection point labelled to two decimal places, and the <Katex tex="y" />-intercept, as asked.</>,
    more: <>The left branch crosses its own horizontal asymptote, at <Katex tex="x=-\tfrac{11}{8}" /> (where <Katex tex="8x+11=0" />): an asymptote describes behaviour far away, so crossing it nearby is allowed. VCAA&apos;s sample answer labels the intercept as <Katex tex="-3.5" />. To copy the shape square by square, set the CAS window to the printed grid, <Katex tex="-6" /> to <Katex tex="6" /> on both axes.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\Delta = (-3)^2-4(2)(k) = 9-8k" />,
    reason: <>Vertical asymptotes come from real zeros of the denominator <Katex tex="2x^2-3x+k" />, and the discriminant counts them. The numerator never vanishes (part b.), so every real zero gives an asymptote.</>,
  },
  {
    working: <Katex display tex="\Delta=0 \implies 9-8k=0 \implies \boxed{k=\frac98}" />,
    reason: <>One vertical asymptote means exactly one (repeated) zero of the denominator: discriminant zero.</>,
    more: <>Then the denominator is <Katex tex="2\left(x-\tfrac34\right)^2" />, and the single asymptote is <Katex tex="x=\tfrac34" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\Delta<0 \implies 9-8k<0 \implies \boxed{k>\frac98}" />,
    reason: <>No vertical asymptotes means the denominator has no real zeros: discriminant negative. Dividing by <Katex tex="-8" /> flips the inequality.</>,
    more: <>Check with <Katex tex="f" /> itself: its <Katex tex="k=-2" /> gives <Katex tex="9+16=25>0" />, two asymptotes, as found. And part e.&apos;s <Katex tex="g_2" /> has <Katex tex="k=2>\tfrac98" />, so it has none.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx" />,
    reason: <>Rotating about the <Katex tex="x" />-axis turns each thin vertical strip into a disc of radius <Katex tex="y=g_2(x)" />, so its volume is <Katex tex="\pi y^2\,\delta x" />.</>,
    more: <>From part d.ii., <Katex tex="k=2" /> gives no vertical asymptotes, so <Katex tex="g_2" /> is continuous on <Katex tex="[0,5]" /> and the integral is an ordinary one.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^5 \left(\frac{4x^2+2x+7}{2x^2-3x+2}\right)^2 dx}" />,
    reason: <>Terminals 0 and 5 from the question. Keep the <Katex tex="\pi" />, the square and the <Katex tex="dx" />.</>,
    more: <>Not asked, but CAS gives <Katex tex="V\approx764.8" /> cubic units.</>,
  },
]

export default function SpecialistQ1_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (9 marks)</p>
        <p>
          Let <Katex tex="f(x)=\dfrac{4x^2+2x+7}{2x^2-3x-2}" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Each part feeds the next. Writing <Katex tex="f" /> as 2 plus a proper fraction (part a.)
              shows the horizontal asymptote at a glance; factorising the denominator gives the vertical
              ones (part b.); and those, together with the stationary and inflection points from CAS,
              are what the sketch in part c. needs.
            </p>
            <p>
              Part d. changes only the constant in the denominator. Whether a quadratic has two, one or
              no real zeros is decided by its discriminant, and that is the whole of part d.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Algebraic Division"
        marks={1}
        statement={
          <>
            Express <Katex tex="f(x)" /> in the form <Katex tex="A+\dfrac{Bx+C}{2x^2-3x-2}" />, where{' '}
            <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" /> are real constants.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Asymptotes"
        marks={2}
        statement={<>State the equations of the asymptotes of the graph of <Katex tex="f" />.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            <p>
              Sketch the graph of <Katex tex="f" /> on the axes below. Label the asymptotes with their
              equations and label any stationary and inflection points with their coordinates, correct
              to two decimal places.
              <br />
              Label any intercepts with the coordinate axes.
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
          Let <Katex tex="g_k(x)=\dfrac{4x^2+2x+7}{2x^2-3x+k}" />, where <Katex tex="k" /> is a real
          constant.
        </p>
        <p>
          For what values of <Katex tex="k" /> will the graph of <Katex tex="g_k" /> have
        </p>
      </div>

      <PartCard letter="d.i" topic="Vertical Asymptotes" marks={1} statement={<>one vertical asymptote</>}>
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard letter="d.ii" topic="Vertical Asymptotes" marks={1} statement={<>no vertical asymptotes?</>}>
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            The graph of <Katex tex="g_2" />, where <Katex tex="g_2(x)=\dfrac{4x^2+2x+7}{2x^2-3x+2}" />, is
            rotated about the <Katex tex="x" />-axis from <Katex tex="x=0" /> to <Katex tex="x=5" /> to form
            a solid of revolution.
            <br />
            Write down a definite integral that gives the volume of the solid formed. An evaluation of
            this integral is not required.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
