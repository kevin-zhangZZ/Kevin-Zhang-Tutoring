// 2020 Specialist Mathematics — Exam 1 Question 8 (5 marks). A volume of revolution whose
// integrand needs a partial fraction decomposition with an irreducible quadratic. Question
// text transcribed from the original paper (VCAA printed no figure). Answer checked with sympy
// and against the VCAA examination report and itute, which both give
// 2π(log_e(2√3 + 2) + π/3) ≈ 17.25 by the same method. Solution is original. The answer form
// allows any real a and b (so every number fits it — a point Marty Ross makes on his blog); the
// solution simply gives the intended a = 2 + 2√3, b = π/3.
//
// Interactive diagrams (§15), all this site's own explanatory figures: the solid sliced into n
// discs of volume πy²Δx, with a toggle for the two bounding cylinders behind the size check
// (interactives/spec-2020e1-q8-discs.tsx); sliders for A, B and C that show why x² + 1 needs
// Bx + C on top, and a constant numerator failing (interactives/spec-2020e1-q8-fit.tsx); the area
// under y² stacked as the three partial-fraction layers, each a standard integral
// (interactives/spec-2020e1-q8-layers.tsx). The WrongMethod (constant numerator, found by
// substituting x = −1 and x = 0) gives 2π(log_e(1 + √3) + π/3) ≈ 12.89, checked with sympy — the
// correct answer less the dropped 2x/(x² + 1) layer, π log_e 4.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const DiscsWidget = lazyWidget(() => import('../interactives/spec-2020e1-q8-discs'))
const FitWidget = lazyWidget(() => import('../interactives/spec-2020e1-q8-fit'))
const LayersWidget = lazyWidget(() => import('../interactives/spec-2020e1-q8-layers'))

const EXAM: SAExaminerStats = {
  marks: [14, 22, 16, 11, 16, 20],
  average: 2.5,
  comment: (
    <>
      Many students identified the correct form of the partial fraction decomposition for the
      integrand: <Katex tex="\dfrac{A}{x+1}+\dfrac{Bx+C}{x^2+1}" />
      <br />
      This led to the integral{' '}
      <Katex tex="\displaystyle2\pi\int_0^{\sqrt3}\left(\frac{1}{x+1}+\frac{x}{x^2+1}+\frac{1}{x^2+1}\right)dx" />
      <br />
      A number of students used a substitution to evaluate the integral{' '}
      <Katex tex="\displaystyle\int_0^{\sqrt3}\frac{x}{x^2+1}\,dx" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_0^{\sqrt3}y^2\,dx" />,
    reason: <>Rotating about the <Katex tex="x" />-axis turns each thin slice of width <Katex tex="dx" /> into a disc of radius <Katex tex="y" />, with volume <Katex tex="\pi y^2\,dx" />; adding the discs from <Katex tex="x=0" /> to <Katex tex="x=\sqrt3" /> is this integral. The radius goes in <em>squared</em>, which is exactly what removes the square root.</>,
    more: <>The first diagram below slices the solid up.</>,
  },
  {
    working: <Katex display tex="y^2 = \frac{4\left(x^2+x+1\right)}{(x+1)\left(x^2+1\right)}" />,
    reason: <>Squaring: the 2 out the front becomes 4 and the root disappears, leaving a rational function. Its numerator has degree 2 and its denominator degree 3, so it is already a proper fraction and can go straight into partial fractions, with no division first. Set the 4 aside and decompose the fraction.</>,
  },
  {
    working: <Katex display tex="\frac{x^2+x+1}{(x+1)\left(x^2+1\right)} = \frac{A}{x+1}+\frac{Bx+C}{x^2+1}" />,
    reason: <>One term for each factor of the denominator. <Katex tex="x+1" /> is linear, so it gets a constant, <Katex tex="A" />. <Katex tex="x^2+1" /> is an irreducible quadratic (<Katex tex="x^2+1\ge1" />, so it has no real roots and can&apos;t be factorised), and a quadratic denominator needs a <em>linear</em> numerator, <Katex tex="Bx+C" />. With only a constant there, the coefficients can&apos;t all be matched. The report notes many students identified this form.</>,
    more: <>See the common mistake and the second diagram below.</>,
  },
  {
    working: <Katex display tex="x^2+x+1 = A\left(x^2+1\right)+(Bx+C)(x+1)" />,
    reason: <>Multiplying both sides by <Katex tex="(x+1)\left(x^2+1\right)" />. This is an identity, true for every <Katex tex="x" />, so we may substitute any convenient value of <Katex tex="x" /> or compare coefficients.</>,
  },
  {
    working: <Katex display tex="x=-1: \ 1 = 2A \implies A = \tfrac12" />,
    reason: <>Choose <Katex tex="x=-1" />, the root of <Katex tex="x+1" />: it makes that factor zero, which wipes out the whole <Katex tex="(Bx+C)(x+1)" /> term and leaves one unknown. Left side <Katex tex="(-1)^2+(-1)+1=1" />; right side <Katex tex="A(1+1)=2A" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x^2: \ 1 = A+B \implies B = \tfrac12" />
        <Katex display tex="\text{const}: \ 1 = A+C \implies C = \tfrac12" />
      </>
    ),
    reason: <><Katex tex="x^2+1" /> has no real root to substitute, so compare coefficients instead. The right side expands to <Katex tex="(A+B)x^2+(B+C)x+(A+C)" />; matching its <Katex tex="x^2" /> and constant terms with <Katex tex="x^2+x+1" /> gives <Katex tex="B" /> and <Katex tex="C" />. The <Katex tex="x" /> term is a free check: <Katex tex="B+C=\tfrac12+\tfrac12=1" /> ✓.</>,
  },
  {
    working: (
      <>
        <Katex display tex="y^2 = \frac{2}{x+1}+\frac{2x+2}{x^2+1}" />
        <Katex display tex="= \frac{2}{x+1}+\frac{2x}{x^2+1}+\frac{2}{x^2+1}" />
      </>
    ),
    reason: <>Multiplying back by 4 (<Katex tex="4\times\tfrac12=2" />), then splitting <Katex tex="\tfrac{2x+2}{x^2+1}" /> into two fractions. Each of the three pieces is now a standard integral: a log, an <Katex tex="\tfrac{f'}{f}" /> log and an arctan. Keep the 2 with the <Katex tex="x" />: <Katex tex="2x" /> is exactly the derivative of <Katex tex="x^2+1" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="V = \pi\Big[2\log_e(x+1)+\log_e\left(x^2+1\right)" />
        <Katex display tex="\qquad+\,2\arctan(x)\Big]_0^{\sqrt3}" />
      </>
    ),
    reason: <><Katex tex="\int\tfrac{2}{x+1}\,dx=2\log_e(x+1)" />, with no modulus needed since <Katex tex="x+1>0" /> on <Katex tex="\left[0,\sqrt3\right]" />. <Katex tex="\int\tfrac{2x}{x^2+1}\,dx=\log_e\left(x^2+1\right)" /> because the numerator is the derivative of the denominator (the <Katex tex="\tfrac{f'}{f}" /> form), so no substitution is required (the report notes a number of students used one). <Katex tex="\int\tfrac{2}{x^2+1}\,dx=2\arctan(x)" />, from the formula sheet&apos;s <Katex tex="\int\tfrac{a}{a^2+x^2}\,dx=\tan^{-1}\left(\tfrac xa\right)" /> with <Katex tex="a=1" />.</>,
    more: <>The third diagram below shows each piece as a layer of area.</>,
  },
  {
    working: (
      <>
        <Katex display tex="= \pi\left[2\log_e\left(\sqrt3+1\right)+\log_e(4)+2\cdot\tfrac\pi3\right]" />
        <Katex display tex="-\,\pi\left[0+0+0\right]" />
      </>
    ),
    reason: <>Upper terminal: <Katex tex="\left(\sqrt3\right)^2+1=4" /> and <Katex tex="\arctan\sqrt3=\tfrac\pi3" /> (because <Katex tex="\tan\tfrac\pi3=\sqrt3" />). Lower terminal: <Katex tex="\log_e(1)=0" /> and <Katex tex="\arctan(0)=0" />, so every term vanishes at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="= \pi\left[2\log_e\left(\sqrt3+1\right)+2\log_e(2)+\tfrac{2\pi}{3}\right]" />,
    reason: <>The answer has to look like <Katex tex="2\pi\left(\log_e(a)+b\right)" />, so every term needs a factor of 2 for the <Katex tex="2\pi" /> to come out. <Katex tex="\log_e(4)=\log_e\left(2^2\right)=2\log_e(2)" /> supplies it.</>,
  },
  {
    working: <Katex display tex="\boxed{V = 2\pi\left(\log_e\left(2+2\sqrt3\right)+\frac\pi3\right)}" />,
    reason: <>Taking out <Katex tex="2\pi" /> and combining the logs with <Katex tex="\log_e(m)+\log_e(n)=\log_e(mn)" />: <Katex tex="\log_e\left(\sqrt3+1\right)+\log_e(2)=\log_e\left(2\sqrt3+2\right)" />. So <Katex tex="a=2+2\sqrt3" /> and <Katex tex="b=\tfrac\pi3" /> (VCAA writes <Katex tex="a" /> as <Katex tex="2\sqrt3+2" />); the <Katex tex="\pi" /> in <Katex tex="b" /> could only come from the arctan term. Numerically <Katex tex="V\approx17.25" />. Check the size: the radius falls from <Katex tex="y(0)=2" /> to <Katex tex="y\left(\sqrt3\right)\approx1.45" />, so the solid lies between cylinders of volume <Katex tex="\pi(1.45)^2\sqrt3\approx11.4" /> and <Katex tex="\pi(2)^2\sqrt3\approx21.8" /> ✓.</>,
  },
]

export default function SpecialistQ8_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (5 marks)</p>
        <p>
          Find the volume, <Katex tex="V" />, of the solid of revolution formed when the
          graph of{' '}
          <Katex tex="y=2\sqrt{\dfrac{x^2+x+1}{(x+1)\left(x^2+1\right)}}" /> is rotated about
          the <Katex tex="x" />-axis over the interval{' '}
          <Katex tex="\left[0,\sqrt3\right]" />. Give your answer in the form{' '}
          <Katex tex="V=2\pi\left(\log_e(a)+b\right)" />, where <Katex tex="a,b\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The square root and the 2 out the front are both there to be removed by the{' '}
            <Katex tex="y^2" /> in the volume formula, so the real question is the partial
            fraction decomposition underneath.
          </p>
          <p>
            Partial fractions, the rule: a linear factor such as <Katex tex="x+1" /> gets a
            constant on top, <Katex tex="\tfrac{A}{x+1}" />; an irreducible quadratic factor (one
            with no real roots, such as <Katex tex="x^2+1" />) gets a linear numerator,{' '}
            <Katex tex="\tfrac{Bx+C}{x^2+1}" />. The fraction has to be proper first (the
            numerator&apos;s degree less than the denominator&apos;s).
          </p>
          <p>
            The three integrals this leads to are all standard:{' '}
            <Katex tex="\int\tfrac{1}{x+1}\,dx=\log_e(x+1)" />,{' '}
            <Katex tex="\int\tfrac{2x}{x^2+1}\,dx=\log_e\left(x^2+1\right)" /> (the top is the
            derivative of the bottom) and <Katex tex="\int\tfrac{1}{x^2+1}\,dx=\arctan(x)" />.
          </p>
          <p>
            The given answer form is a strong hint: a single logarithm plus something, all
            times <Katex tex="2\pi" />. Seeing that <Katex tex="b=\tfrac\pi3" /> has to come
            from an arctan tells you the <Katex tex="\tfrac{1}{x^2+1}" /> piece must survive
            the decomposition.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Why V = π∫y² dx: the solid is a stack of thin discs, each with face area πy²">
          <DiscsWidget />
        </Explore>
        <WrongMethod
          title="Put just a constant over x² + 1"
          working={
            <>
              <Katex display tex="\frac{x^2+x+1}{(x+1)\left(x^2+1\right)} = \frac{A}{x+1}+\frac{C}{x^2+1}" />
              <Katex display tex="x=-1: \ A=\tfrac12" />
              <Katex display tex="x=0: \ 1=A+C \implies C=\tfrac12" />
              <Katex display tex="V = \pi\int_0^{\sqrt3}\left(\frac{2}{x+1}+\frac{2}{x^2+1}\right)dx" />
              <Katex display tex="= 2\pi\left(\log_e\left(1+\sqrt3\right)+\frac\pi3\right) \approx 12.89" />
            </>
          }
        >
          <p>
            Nothing looks wrong: two substitutions always &ldquo;find&rdquo; two constants, and the
            answer even fits the form <Katex tex="2\pi\left(\log_e(a)+b\right)" /> and passes the
            size check (it is between 11.4 and 21.8). But test a third value of <Katex tex="x" />:
            at <Katex tex="x=1" /> the identity <Katex tex="x^2+x+1=A\left(x^2+1\right)+C(x+1)" />{' '}
            says <Katex tex="3=\tfrac12\cdot2+\tfrac12\cdot2=2" />.
          </p>
          <p>
            Comparing coefficients shows why no choice of <Katex tex="A" /> and <Katex tex="C" />{' '}
            can fix it: <Katex tex="x^2" /> needs <Katex tex="A=1" />, <Katex tex="x" /> needs{' '}
            <Katex tex="C=1" />, and then the constant term is <Katex tex="A+C=2" />, not 1. Three
            equations, two unknowns. The form is missing the <Katex tex="Bx" /> term, and with it
            the whole <Katex tex="\tfrac{2x}{x^2+1}" /> piece: the wrong answer is exactly the right
            one minus <Katex tex="\pi\log_e(4)" />. Always check a decomposition with one extra value
            of <Katex tex="x" />. The second diagram below lets you try to make a constant fit.
          </p>
        </WrongMethod>
        <Explore title="Why x² + 1 needs Bx + C on top: three coefficients to match need three unknowns">
          <FitWidget />
        </Explore>
        <Explore title="Three layers under y², three standard integrals — and where a and b = π/3 come from">
          <LayersWidget />
        </Explore>
        <SAExaminerReport stats={EXAM} maxMarks={5} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
