// 2026 Specialist NHT — Exam 2, Section B Question 1 (11 marks). The NHT report gives sample
// answers only, with no statistics, plus short notes on b., c., d.i and e. A rational function
// f(x) = (x³ − 2x² + 8)/(2(4 − x²)): the form Ax + B + Cx/(4 − x²), its three asymptotes, f′, the
// turning points and the stationary point of inflection, a sketch, then two families: f_k (when is
// there only one asymptote?) and f_b (its oblique asymptote, and when are there exactly two?).
// Question text transcribed from the original paper; the blank axes in e. are cropped from the
// original VCAA exam PDF, and the e. answer is this site's own matplotlib drawing on VCAA's exact
// grid (x from −6 to 6, gridlines every 1; y from −4 to 6, gridlines every 0.5). The report's own
// sketch for e. is extracted from the report and shown inside its comment, which refers to it. That
// sketch labels the right-hand turning point "(−2√3, (2 − 3√3)/2)": a slip for 2√3, kept as printed
// and pointed out in the working. Answers checked with sympy and against the VCAA report's sample
// answers: a. −x/2 + 1 + 2x/(4 − x²); b. x = ±2, y = −x/2 + 1; c. x²(12 − x²)/(2(4 − x²)²);
// d.i (∓2√3, (2 ± 3√3)/2); d.ii (0, 1); e. x-intercept −1.5; f. k < 0; g.i y = −x/2 − b/2;
// g.ii b = 0, −4. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import axesSrc from './spec-2026nhte2-q1e-axes.png'
import sketchSrc from './spec-2026nhte2-q1e-sketch.png'
import reportGraphSrc from './spec-2026nhte2-q1e-report-graph.png'

const F = String.raw`\frac{x^3-2x^2+8}{2\left(4-x^2\right)}`

const REPORT_B: SAExaminerStats = {
  comment: <>All three asymptotes were required.</>,
}

const REPORT_C: SAExaminerStats = {
  comment: <>A CAS question for 1 mark.</>,
}

const REPORT_DI: SAExaminerStats = {
  comment: <>Many students incorrectly included the coordinates for the stationary point of inflection.</>,
}

const REPORT_E: SAExaminerStats = {
  comment: (
    <>
      Care should be taken with:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>the position of labelled points – they should be within the box shown in the sketch below</li>
        <li>
          the <Katex tex="y" />-intercept as it must have zero gradient
        </li>
        <li>asymptotic behaviour.</li>
      </ul>
      <img
        loading="lazy"
        decoding="async"
        src={reportGraphSrc}
        alt="VCAA's sketch from the report: the graph of f with dashed asymptotes x = −2, x = 2 and y = −x/2 + 1, the turning points and the x-intercept −1.5 each inside a small dotted box, and the point (0, 1)"
        className="w-full max-w-[360px] mt-1"
      />
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &x^3-2x^2+8 \\ &= \left(4-x^2\right)(2-x) + 4x \end{aligned}" />,
    reason: <>The numerator has a higher degree than the denominator, so divide first. Dividing by <Katex tex="4-x^2" /> gives quotient <Katex tex="2-x" /> and remainder <Katex tex="4x" />.</>,
    more: <>Check by expanding: <Katex tex="(4-x^2)(2-x)=x^3-2x^2-4x+8" />, and adding <Katex tex="4x" /> gives back <Katex tex="x^3-2x^2+8" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f(x) &= \frac{(4-x^2)(2-x)+4x}{2\left(4-x^2\right)} \\ &= \frac{2-x}{2} + \frac{4x}{2\left(4-x^2\right)} \end{aligned}" />,
    reason: <>Split the fraction and cancel <Katex tex="4-x^2" /> from the first piece.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = -\frac{1}{2}x + 1 + \frac{2x}{4-x^2}}" />,
    reason: <>So <Katex tex="A=-\tfrac12" />, <Katex tex="B=1" />, <Katex tex="C=2" />.</>,
    more: <>On CAS, <Cas fn="expand" /> of <Katex tex="f(x)" /> gives the same split, though it may write the last term as <Katex tex="-\tfrac{1}{x+2}-\tfrac{1}{x-2}" />. Those two fractions add to <Katex tex="\tfrac{2x}{4-x^2}" />, which is the form the question asks for.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="4-x^2 = 0 \implies x = \pm 2" />,
    reason: <>Vertical asymptotes come from zeros of the denominator, provided the numerator is not also zero there.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x=2&:\ 8-8+8 = 8 \neq 0 \\ x=-2&:\ -8-8+8 = -8 \neq 0 \end{aligned}" />,
    reason: <>The numerator is non-zero at both, so nothing cancels: both are genuine vertical asymptotes.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \text{As } x\to\pm\infty,\ \frac{2x}{4-x^2}\to 0 \\ \implies y = -\frac12x+1 \end{gathered}" />,
    reason: <>From part a., <Katex tex="f(x)" /> is the line <Katex tex="-\tfrac12x+1" /> plus a fraction that dies away for large <Katex tex="|x|" />: an oblique asymptote.</>,
  },
  {
    working: <Katex display tex="\boxed{x=-2,\quad x=2,\quad y=-\frac12x+1}" />,
    reason: <>The report notes all three asymptotes were required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Cas fn="derivative">derivative(f(x), x)</Cas>,
    reason: <>Define <Katex tex="f" /> on CAS and differentiate. The report calls this a CAS question for 1 mark.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f'(x) &= -\frac12 + \frac{2\left(4-x^2\right) - 2x(-2x)}{\left(4-x^2\right)^2} \\ &= -\frac12 + \frac{2x^2+8}{\left(4-x^2\right)^2} \end{aligned}" />,
    reason: <>By hand from the part a. form: the quotient rule on <Katex tex="\tfrac{2x}{4-x^2}" />, with <Katex tex="u=2x" /> and <Katex tex="v=4-x^2" />, so <Katex tex="u'=2" /> and <Katex tex="v'=-2x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{x^2\left(12-x^2\right)}{2\left(4-x^2\right)^2}}" />,
    reason: <>Over the common denominator <Katex tex="2(4-x^2)^2" /> the numerator is <Katex tex="-(16-8x^2+x^4)+4x^2+16=12x^2-x^4" />.</>,
    more: <>Any equivalent form earns the mark. The report lists four, including <Katex tex="\tfrac{2(x^2+4)}{(x^2-4)^2}-\tfrac12" /> (the middle line here) and <Katex tex="-\tfrac12+\tfrac{1}{(x+2)^2}+\tfrac{1}{(x-2)^2}" />. The factorised form is the one to keep: it makes part d. almost immediate.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f'(x)=0 &\implies x^2\left(12-x^2\right)=0 \\ &\implies x = 0,\ \pm2\sqrt3 \end{aligned}" />,
    reason: <>Stationary points: set the numerator of <Katex tex="f'" /> from part c. to zero (the denominator is never zero on the domain).</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \text{sign of } f'(x) = \text{sign of } \left(12-x^2\right) \\ \text{for } x\neq0 \end{gathered}" />,
    reason: <>Both <Katex tex="x^2" /> and <Katex tex="2(4-x^2)^2" /> are positive away from <Katex tex="x=0" />, so only <Katex tex="12-x^2" /> can change the sign of <Katex tex="f'" />.</>,
    more: <><Katex tex="12-x^2" /> changes sign at <Katex tex="\pm2\sqrt3" />, so those are turning points. At <Katex tex="x=0" /> it stays positive on both sides: <Katex tex="f'" /> touches zero without changing sign, so <Katex tex="x=0" /> is <em>not</em> a turning point (it is part d.ii&rsquo;s stationary point of inflection).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f\left(2\sqrt3\right) &= -\sqrt3+1+\frac{4\sqrt3}{4-12} \\ &= \frac{2-3\sqrt3}{2} \\ f\left(-2\sqrt3\right) &= \sqrt3+1+\frac{-4\sqrt3}{4-12} \\ &= \frac{2+3\sqrt3}{2} \end{aligned}" />,
    reason: <>Substitute into the part a. form, which is quicker than the original rule. <Katex tex="x^2=12" /> in both.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered} \left(-2\sqrt3,\ \frac{2+3\sqrt3}{2}\right), \\ \left(2\sqrt3,\ \frac{2-3\sqrt3}{2}\right) \end{gathered}}" />,
    reason: <>The report notes many students incorrectly also listed the stationary point of inflection. It is stationary but not a turning point.</>,
    more: <>Nature, for the sketch: <Katex tex="f'" /> goes <Katex tex="-" /> to <Katex tex="+" /> at <Katex tex="-2\sqrt3" /> (a local minimum, <Katex tex="\approx(-3.46,\ 3.60)" />) and <Katex tex="+" /> to <Katex tex="-" /> at <Katex tex="2\sqrt3" /> (a local maximum, <Katex tex="\approx(3.46,\ -1.60)" />). The minimum is higher than the maximum, which is fine: they lie on different branches.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(0)=0,\quad f'(x)>0 \text{ either side of } x=0" />,
    reason: <>From part d.i: <Katex tex="x=0" /> is stationary, and <Katex tex="f'" /> does not change sign there, so it is a stationary point of inflection.</>,
  },
  {
    working: <Katex display tex="f(0) = \frac{8}{2\times4} = 1" />,
  },
  {
    working: <Katex display tex="\boxed{(0,\ 1)}" />,
    reason: <>This is also the <Katex tex="y" />-intercept.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: (
      <>
        <Cas fn="solve">solve(x^3 − 2x^2 + 8 = 0, x)</Cas>
        <Katex display tex="x = -1.5097\ldots \approx -1.5" />
      </>
    ),
    reason: <><Katex tex="f(x)=0" /> only when the numerator is zero. The cubic has just one real root (CAS gives no others), so there is one <Katex tex="x" />-intercept, to one decimal place as asked.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x\to-2^-:&\ f\to+\infty \\ x\to-2^+:&\ f\to-\infty \\ x\to2^-:&\ f\to+\infty \\ x\to2^+:&\ f\to-\infty \end{aligned}" />,
    reason: <>Near each vertical asymptote, check signs: the numerator is <Katex tex="-8" /> near <Katex tex="x=-2" /> and <Katex tex="8" /> near <Katex tex="x=2" />, and <Katex tex="4-x^2" /> is positive between the asymptotes and negative outside them.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} f(x)-\left(-\tfrac12x+1\right) = \frac{2x}{4-x^2} \\ \begin{cases} >0, & x<-2 \\ <0, & x>2 \end{cases} \end{gathered}" />,
    reason: <>So the left branch approaches the oblique asymptote from above and the right branch from below.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          loading="lazy"
          decoding="async"
          src={sketchSrc}
          alt="Our sketch on VCAA's grid: three branches of f with dashed asymptotes x = −2, x = 2 and y = −x/2 + 1. The left branch has a minimum at (−2√3, (2 + 3√3)/2); the middle branch rises from −∞ through (−1.5, 0) and the flat point (0, 1) to +∞; the right branch has a maximum at (2√3, (2 − 3√3)/2)"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Three asymptotes with their equations, both turning points and the stationary point of inflection <Katex tex="(0,1)" /> in exact form, and the <Katex tex="x" />-intercept to one decimal place. The curve is flat as it crosses the <Katex tex="y" />-axis.</>,
    more: <>Graph <Katex tex="f" /> on CAS with the window set to the printed axes and copy it carefully. The report says each labelled point should land inside a small box around its true position, the <Katex tex="y" />-intercept must be drawn with zero gradient, and the curve must approach each asymptote without crossing the vertical ones. Its own sketch labels the right-hand maximum <Katex tex="\left(-2\sqrt3,\tfrac{2-3\sqrt3}{2}\right)" />: a slip for <Katex tex="2\sqrt3" />, as part d.i shows.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f_k(x) &= -\frac12x+1 \\ &\quad +\frac{kx-2k+8}{2\left(k-x^2\right)} \end{aligned}" />,
    reason: <>Whatever <Katex tex="k" /> is, the numerator is a cubic over a quadratic, so dividing always leaves the same linear quotient (here <Katex tex="x^3-2x^2+8=(k-x^2)(2-x)+kx-2k+8" />): there is always an oblique asymptote, <Katex tex="y=-\tfrac12x+1" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} k-x^2 = 0 \text{ has no real solutions} \\ \iff k<0 \end{gathered}" />,
    reason: <>So &ldquo;only one&rdquo; asymptote means no vertical asymptotes at all: the denominator must never be zero.</>,
    more: <>Check the other cases. <Katex tex="k=0" />: <Katex tex="x=0" /> is a vertical asymptote (the numerator is 8 there). <Katex tex="k>0" />: <Katex tex="x=\pm\sqrt k" />; the numerator&rsquo;s only real zero (<Katex tex="\approx-1.51" />) could cancel one of them at most, leaving the other. Either way there are at least two asymptotes.</>,
  },
  {
    working: <Katex display tex="\boxed{k<0}" />,
  },
]

const ROWS_GI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &x^3+bx^2+8 \\ &= \left(4-x^2\right)(-x-b) + 4x + 4b + 8 \end{aligned}" />,
    reason: <>Divide as in part a.: quotient <Katex tex="-x-b" />, remainder <Katex tex="4x+4b+8" />.</>,
    more: <>Check: <Katex tex="(4-x^2)(-x-b)=x^3+bx^2-4x-4b" />, and adding <Katex tex="4x+4b+8" /> returns the numerator.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f_b(x) &= -\frac{x}{2}-\frac{b}{2} \\ &\quad + \frac{2x+2b+4}{4-x^2} \end{aligned}" />,
    reason: <>The fraction tends to 0 as <Katex tex="x\to\pm\infty" />, leaving the linear part.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\frac12x-\frac{b}{2}}" />,
    reason: <>Sanity check: with <Katex tex="b=-2" /> this is part b.&rsquo;s <Katex tex="y=-\tfrac12x+1" />.</>,
  },
]

const ROWS_GII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} \text{oblique asymptote} \\ + \text{ exactly one of } x=\pm2 \end{gathered}" />,
    reason: <>The oblique asymptote is always there (part g.i), so two asymptotes means one of the vertical ones must disappear. That happens when the numerator is also zero there, so the factor cancels.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x=2:&\quad 8+4b+8=0 \implies b=-4 \\ x=-2:&\quad -8+4b+8=0 \implies b=0 \end{aligned}" />,
    reason: <>Substitute each zero of the denominator into the numerator <Katex tex="x^3+bx^2+8" />.</>,
    more: <>No single <Katex tex="b" /> removes both. Check <Katex tex="b=0" />: <Katex tex="x^3+8=(x+2)(x^2-2x+4)" />, so <Katex tex="f_0(x)=\tfrac{x^2-2x+4}{2(2-x)}" /> for <Katex tex="x\neq-2" />, leaving only <Katex tex="x=2" />. Likewise <Katex tex="b=-4" />: <Katex tex="x^3-4x^2+8=(x-2)(x^2-2x-4)" />, leaving only <Katex tex="x=-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = 0 \ \text{ or } \ b = -4}" />,
  },
]

export default function SpecialistQ1_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (11 marks)</p>
        <p>
          Consider the function <Katex tex="f" /> with rule <Katex tex={`f(x) = ${F}`} />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Every part of this question comes back to one move: dividing the cubic numerator by
              the quadratic denominator. The quotient is a straight line, which is the oblique
              asymptote; whatever is left over is a proper fraction that shrinks to 0 for large{' '}
              <Katex tex="|x|" />. Vertical asymptotes sit where the denominator is zero, unless the
              numerator is zero there too, in which case the factor cancels and the asymptote
              disappears.
            </p>
            <p>
              Parts f. and g. are about counting asymptotes as a constant changes: either the
              denominator stops having real zeros (part f.) or the numerator shares one of them
              (part g.).
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
            Express <Katex tex="f(x)" /> in the form <Katex tex="Ax+B+\dfrac{Cx}{4-x^2}" />, where{' '}
            <Katex tex="A,\ B,\ C \in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Asymptotes"
        marks={1}
        statement={<>State the equations of the straight-line asymptotes of the graph of <Katex tex="f" />.</>}
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Derivative"
        marks={1}
        statement={<>Find <Katex tex="f'(x)" />.</>}
        examinerReport={REPORT_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Turning Points"
        marks={1}
        statement={<>State the coordinates of any turning points of the graph of <Katex tex="f" />.</>}
        examinerReport={REPORT_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Stationary Inflection"
        marks={1}
        statement={
          <>
            The graph of <Katex tex="f" /> has a stationary point of inflection.
            <br />
            State the coordinates of this point of inflection.
          </>
        }
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Sketch Graph"
        marks={3}
        statement={
          <div className="flex flex-col gap-2">
            <p>
              Sketch the graph of <Katex tex="f" />, including asymptotes, on the axes below.
              <br />
              Label the following features:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>the straight-line asymptotes with their equations</li>
              <li>any turning points and points of inflection, with their coordinates</li>
              <li>
                any <Katex tex="x" />-intercepts, with values given correct to one decimal place
              </li>
            </ul>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-1">
              <img
                loading="lazy"
                decoding="async"
                src={axesSrc}
                alt="VCAA's blank axes: x from −6 to 6 with gridlines every 1, y from −4 to 6 with gridlines every 0.5"
                className="w-full max-w-[460px]"
              />
            </div>
          </div>
        }
        examinerReport={REPORT_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Asymptotes"
        marks={1}
        statement={
          <>
            Now consider the function <Katex tex="f_k" /> with rule{' '}
            <Katex tex="f_k(x) = \dfrac{x^3-2x^2+8}{2\left(k-x^2\right)}" />, where{' '}
            <Katex tex="k \in R" />.
            <br />
            For what value(s) of <Katex tex="k" /> will the graph of <Katex tex="f_k" /> have only one
            straight-line asymptote?
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">g.</p>
        <p>
          Next, consider the function <Katex tex="f_b" /> with rule{' '}
          <Katex tex="f_b(x) = \dfrac{x^3+bx^2+8}{2\left(4-x^2\right)}" />, where{' '}
          <Katex tex="b \in R" />.
        </p>
      </div>

      <PartCard
        letter="g.i"
        topic="Oblique Asymptote"
        marks={1}
        statement={<>Find the equation of the oblique asymptote of the graph of <Katex tex="f_b" />.</>}
      >
        <WorkingTable rows={ROWS_GI} />
      </PartCard>

      <PartCard
        letter="g.ii"
        topic="Asymptotes"
        marks={1}
        statement={
          <>
            For what value(s) of <Katex tex="b" /> will the graph of <Katex tex="f_b" /> have two
            straight-line asymptotes?
          </>
        }
      >
        <WorkingTable rows={ROWS_GII} />
      </PartCard>
    </div>
  )
}
