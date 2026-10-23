// 2025 Specialist NHT — Exam 2, Section B Question 1 (10 marks). The NHT report gives a sample
// answer for each part only, with no statistics and no comments. The family of rational functions
// f(x) = (x³ + ax² + ax + 3)/(x² − 1): implied domain, the partial-fraction form x + a + g(x),
// no stationary points when a = −2, a sketch for a = −2 (a hole at (1, −3/2), asymptotes x = −1 and
// y = x − 2), f″(x) in a given form, and no points of inflection when a = −2 or a = −1. Question
// text transcribed from the original paper (which has no text layer; read from the page images).
// Part c.'s blank axes (x and y from about −6 to 6, numbered every 2, gridlines every 1 in x and
// every 0.5 in y, cells not square) are cropped from page 11 of the original VCAA exam PDF at
// 300 dpi (spec-2025nhte2-q1c-blank-axes.png); the finished sketch is this site's own matplotlib
// figure drawn on that grid, measured from the crop (spec-2025nhte2-q1c-sketch.png). Answers
// checked with sympy and against the report's sample answers, which agree: a. R \ {−1, 1};
// d.i. A = 2, B = −2, p = 3. The report's sketch for c. shows the hole at (1, −3/2) as an open
// circle without labelling it; ours does the same. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import blankAxesSrc from './spec-2025nhte2-q1c-blank-axes.png'
import sketchSrc from './spec-2025nhte2-q1c-sketch.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-1=0 \iff x=\pm1" />,
    reason: <>The only thing that can fail in a rational function is division by zero, so remove every <Katex tex="x" /> that makes the denominator zero.</>,
  },
  {
    working: <Katex display tex="\boxed{R\setminus\{-1,\,1\}}" />,
    reason: <>Every other real number is allowed. The domain does not depend on <Katex tex="a" />, because <Katex tex="a" /> appears only in the numerator.</>,
    more: <>Why the condition <Katex tex="a\ne-2" />? At <Katex tex="x=1" /> the numerator is <Katex tex="1+a+a+3=2a+4" />, which is zero exactly when <Katex tex="a=-2" />. Then the factor <Katex tex="x-1" /> cancels and the graph has a hole at <Katex tex="x=1" /> instead of an asymptote (part c.). The implied domain is still <Katex tex="R\setminus\{-1,1\}" />, since <Katex tex="f(1)" /> is <Katex tex="\tfrac00" />, which is undefined.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &x^3+ax^2+ax+3 \\ &\quad= (x+a)(x^2-1)+(a+1)x+(a+3) \end{aligned}" />,
    reason: <>The numerator has degree 3 and the denominator degree 2, so divide first. <Katex tex="(x+a)(x^2-1)=x^3+ax^2-x-a" />; subtracting this from the numerator leaves the remainder <Katex tex="(a+1)x+(a+3)" />.</>,
  },
  {
    working: <Katex display tex="f(x) = x+a+\frac{(a+1)x+(a+3)}{(x-1)(x+1)}" />,
    reason: <>Divide through by <Katex tex="x^2-1=(x-1)(x+1)" />. The quotient <Katex tex="x+a" /> is the <Katex tex="x+a" /> in the given form, so <Katex tex="g(x)" /> is the remaining proper fraction.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\frac{(a+1)x+(a+3)}{(x-1)(x+1)} \\ &\qquad = \frac{A}{x-1}+\frac{B}{x+1} \\ &\implies (a+1)x+(a+3) \\ &\qquad = A(x+1)+B(x-1) \end{aligned}" />,
    reason: <>Split the proper fraction over the two linear factors of the denominator, then multiply through by <Katex tex="(x-1)(x+1)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x=1&:\ 2a+4=2A \implies A=a+2 \\ x=-1&:\ 2=-2B \implies B=-1 \end{aligned}" />,
    reason: <>Substitute the value that makes each bracket zero, so one unknown drops out each time. At <Katex tex="x=-1" /> the left side is <Katex tex="-(a+1)+(a+3)=2" />: the <Katex tex="a" /> cancels.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x)=\frac{a+2}{x-1}-\frac{1}{x+1}}" />,
    reason: <>As required.</>,
    more: <>A check with <Katex tex="a=0" />, <Katex tex="x=2" />: <Katex tex="f(2)=\tfrac{8+3}{3}=\tfrac{11}{3}" />, and <Katex tex="2+0+\tfrac{2}{1}-\tfrac13=\tfrac{11}{3}" /> too.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=x+a+(a+2)(x-1)^{-1}-(x+1)^{-1}" />,
    reason: <>The form from part b.i. is far easier to differentiate than the original quotient: each fraction is just a power.</>,
  },
  {
    working: <Katex display tex="f'(x)=1-\frac{a+2}{(x-1)^2}+\frac{1}{(x+1)^2}" />,
    reason: <>Differentiate each term, using <Katex tex="\tfrac{d}{dx}(x-k)^{-1}=-(x-k)^{-2}" />. The constant <Katex tex="a" /> differentiates to zero.</>,
  },
  {
    working: <Katex display tex="a=-2:\quad f'(x)=1+\frac{1}{(x+1)^2}" />,
    reason: <>With <Katex tex="a=-2" /> the middle term has coefficient <Katex tex="a+2=0" /> and disappears.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}f'(x)=1+\frac{1}{(x+1)^2}>1 \\ \text{so } f'(x)\ne0\end{gathered}}" />,
    reason: <>A non-zero square is positive, so <Katex tex="f'(x)>1" />: the equation <Katex tex="f'(x)=0" /> has no real solutions, so there are no stationary points. As required.</>,
    more: <>VCAA writes it as the equation <Katex tex="0=1+\tfrac{1}{(x+1)^2}" />, &ldquo;which has no real solutions for <Katex tex="x" />&rdquo;. Either way, the conclusion must be stated: a &lsquo;show that&rsquo; is not finished at the formula for <Katex tex="f'(x)" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} a=-2:\quad f(x)&=x-2+\frac{0}{x-1}-\frac{1}{x+1} \\ &=x-2-\frac{1}{x+1},\quad x\ne\pm1 \end{aligned}" />,
    reason: <>Substitute <Katex tex="a=-2" /> into the part b.i. form. The <Katex tex="\tfrac{a+2}{x-1}" /> term vanishes, so there is no asymptote at <Katex tex="x=1" />. But <Katex tex="x=1" /> is still outside the domain (the original fraction is <Katex tex="\tfrac00" /> there).</>,
  },
  {
    working: <Katex display tex="f(1)\to1-2-\tfrac12=-\tfrac32 \implies \text{hole at } \left(1,\,-\tfrac32\right)" />,
    reason: <>The simplified rule gives the point the graph would pass through at <Katex tex="x=1" />. Since <Katex tex="x=1" /> is excluded, draw an open circle there.</>,
  },
  {
    working: <Katex display tex="\text{Asymptotes: } x=-1, \quad y=x-2" />,
    reason: <>As <Katex tex="x\to-1" />, <Katex tex="\tfrac{1}{x+1}" /> blows up: a vertical asymptote. As <Katex tex="x\to\pm\infty" />, <Katex tex="\tfrac{1}{x+1}\to0" />, so <Katex tex="f(x)" /> approaches the line <Katex tex="y=x-2" />: an oblique asymptote.</>,
    more: <>Which side of each asymptote? <Katex tex="f(x)-(x-2)=-\tfrac{1}{x+1}" /> is negative for <Katex tex="x>-1" /> (the right branch sits below the oblique asymptote) and positive for <Katex tex="x<-1" /> (the left branch sits above it). Just right of <Katex tex="x=-1" />, <Katex tex="-\tfrac{1}{x+1}\to-\infty" />; just left, <Katex tex="+\infty" />.</>,
  },
  {
    working: <Katex display tex="f(0)=0-2-1=-3" />,
    reason: <>The <Katex tex="y" />-intercept.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x-2-\frac{1}{x+1}=0 &\implies (x-2)(x+1)=1 \\ &\implies x^2-x-3=0 \\ &\implies x=\frac{1\pm\sqrt{13}}{2} \end{aligned}" />,
    reason: <>The <Katex tex="x" />-intercepts. Multiply by <Katex tex="x+1" /> and use the quadratic formula: <Katex tex="x=\tfrac{1\pm\sqrt{1+12}}{2}" />. Both values (<Katex tex="\approx-1.30" /> and <Katex tex="\approx2.30" />) are in the domain.</>,
    more: <>The left one, <Katex tex="\tfrac{1-\sqrt{13}}{2}\approx-1.30" />, is just left of the asymptote <Katex tex="x=-1" />: the left branch crosses the <Katex tex="x" />-axis as it shoots up towards <Katex tex="+\infty" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's sketch on VCAA's grid: the graph of y = x − 2 − 1/(x + 1) with dashed asymptotes x = −1 and y = x − 2. The left branch rises above y = x − 2, crossing the x-axis at ((1 − √13)/2, 0), and shoots up to +∞ at x = −1; the right branch comes up from −∞ just right of x = −1, through (0, −3), has an open circle at (1, −3/2), crosses the x-axis at ((1 + √13)/2, 0) and approaches y = x − 2 from below"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Two branches, both asymptotes labelled with their equations, the three axis intercepts labelled with their exact values, and the open circle at <Katex tex="\left(1,-\tfrac32\right)" />.</>,
    more: <>The question asks only for the asymptotes and intercepts to be labelled, so VCAA&apos;s sample answer leaves the hole unlabelled, but it must be shown as an open circle: without it the graph claims <Katex tex="f(1)" /> exists. Part b.ii. is a check on the shape: the graph is increasing everywhere, with no turning points.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=1-(a+2)(x-1)^{-2}+(x+1)^{-2}" />,
    reason: <>From part b.ii., written with negative powers so the next derivative is just the power rule.</>,
  },
  {
    working: <Katex display tex="f''(x)=2(a+2)(x-1)^{-3}-2(x+1)^{-3}" />,
    reason: <>Differentiate again: <Katex tex="\tfrac{d}{dx}(x-k)^{-2}=-2(x-k)^{-3}" />. Watch the signs: <Katex tex="-(a+2)\times(-2)=+2(a+2)" /> and <Katex tex="1\times(-2)=-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f''(x)=\frac{2(a+2)}{(x-1)^3}+\frac{-2}{(x+1)^3}}" />,
    reason: <>In the required form with <Katex tex="A=2" />, <Katex tex="B=-2" /> and <Katex tex="p=3" />.</>,
    more: <>VCAA also writes it as <Katex tex="\tfrac{2(a+2)}{(x-1)^3}-\tfrac{2}{(x+1)^3}" />. The same <Katex tex="p" /> appears in both denominators, as the form demands.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="a=-2:\quad f''(x)=-\frac{2}{(x+1)^3}" />,
    reason: <>Substitute into the part d.i. result: the first term has coefficient <Katex tex="2(a+2)=0" />.</>,
  },
  {
    working: <Katex display tex="-\frac{2}{(x+1)^3}=0 \ \text{ has no real solutions}" />,
    reason: <>A fraction is zero only when its numerator is, and the numerator is <Katex tex="-2" />. At a point of inflection <Katex tex="f''(x)=0" /> (here <Katex tex="f''" /> exists everywhere in the domain), so there are none.</>,
    more: <><Katex tex="f''" /> does change sign at <Katex tex="x=-1" />, but that is the vertical asymptote, not a point on the graph, so it is not a point of inflection.</>,
  },
  {
    working: <Katex display tex="a=-1:\quad f''(x)=\frac{2}{(x-1)^3}-\frac{2}{(x+1)^3}" />,
    reason: <>Now <Katex tex="2(a+2)=2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{2}{(x-1)^3}=\frac{2}{(x+1)^3} &\implies (x-1)^3=(x+1)^3 \\ &\implies x-1=x+1 \\ &\implies -1=1 \end{aligned}" />,
    reason: <>Set <Katex tex="f''(x)=0" /> and cross-multiply. A real number has exactly one real cube root, so the cubes are equal only if the bases are.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}f''(x)=0 \text{ has no real solutions} \\ \text{for } a=-2 \text{ or } a=-1\text{, so} \\ \text{no points of inflection}\end{gathered}}" />,
    reason: <>The last line is impossible, so <Katex tex="f''(x)=0" /> has no solution when <Katex tex="a=-1" /> either. As required.</>,
    more: <>Check with <Katex tex="a=-1" />: the numerator of <Katex tex="f''" /> over a common denominator is <Katex tex="2(x+1)^3-2(x-1)^3=4(3x^2+1)" />, which is always positive, so <Katex tex="f''" /> is never zero.</>,
  },
]

export default function SpecialistQ1_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (10 marks)</p>
        <p>
          Consider the family of functions <Katex tex="f" /> with rule{' '}
          <Katex tex="f(x)=\dfrac{x^3+ax^2+ax+3}{x^2-1}" />, where <Katex tex="a" /> is a real constant.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The whole question runs on the form from part b.i.,{' '}
              <Katex tex="f(x)=x+a+\tfrac{a+2}{x-1}-\tfrac{1}{x+1}" />. It shows the oblique asymptote{' '}
              <Katex tex="y=x+a" /> at a glance, it differentiates term by term without the quotient
              rule, and it shows what is special about <Katex tex="a=-2" />: the <Katex tex="\tfrac{1}{x-1}" />{' '}
              term disappears, so the asymptote at <Katex tex="x=1" /> becomes a hole.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Implied Domain"
        marks={1}
        statement={<>Write down the implied domain of <Katex tex="f" /> given that <Katex tex="a\ne-2" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          The rule for <Katex tex="f" /> can be written as <Katex tex="f(x)=x+a+g(x)" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Partial Fractions"
        marks={2}
        statement={
          <>
            Using partial fractions, show that <Katex tex="g(x)=\dfrac{a+2}{x-1}-\dfrac{1}{x+1}" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Stationary Points"
        marks={1}
        statement={
          <>
            Show that when <Katex tex="a=-2" /> the graph of <Katex tex="y=f(x)" /> has no stationary points.
          </>
        }
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
              Sketch the graph of <Katex tex="y=f(x)" /> when <Katex tex="a=-2" /> on the axes below.
              <br />
              Label all asymptotes with their equations, and label any intercepts with the coordinate
              axes with their values.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={blankAxesSrc}
                alt="Blank axes from the original VCAA exam paper: x and y each numbered every 2 from −4 to 4, with gridlines every 1 in x and every 0.5 in y"
                className="w-full max-w-[460px]"
              />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Draw an asymptote at x = 1 as well"
          working={<Katex display tex="\begin{gathered} x^2-1=0 \implies \\ \text{asymptotes } x=1,\ x=-1 \end{gathered}" />}
        >
          When <Katex tex="a=-2" /> the numerator is also zero at <Katex tex="x=1" />:{' '}
          <Katex tex="x^3-2x^2-2x+3=(x-1)(x^2-x-3)" />. The factor <Katex tex="x-1" /> cancels, so near{' '}
          <Katex tex="x=1" /> the graph stays close to <Katex tex="-\tfrac32" /> instead of blowing up. A
          zero of the denominator gives an asymptote only when the numerator is not also zero there;
          otherwise it gives a hole.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Second Derivative"
        marks={1}
        statement={
          <>
            Using <Katex tex="f(x)=x+a+\dfrac{a+2}{x-1}-\dfrac{1}{x+1}" />, find <Katex tex="f''(x)" /> where{' '}
            <Katex tex="a" /> is an arbitrary real constant.
            <br />
            Give your answer in the form <Katex tex="f''(x)=\dfrac{A(a+2)}{(x-1)^p}+\dfrac{B}{(x+1)^p}" />{' '}
            where <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="p\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Points of Inflection"
        marks={2}
        statement={
          <>
            Hence, verify that the graph of <Katex tex="y=f(x)" /> has no points of inflection when{' '}
            <Katex tex="a=-2" /> and <Katex tex="a=-1" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
