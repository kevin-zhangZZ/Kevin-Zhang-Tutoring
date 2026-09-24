// 2025 Mathematical Methods — Exam 2, Section B Question 4 (19 marks). A shifted sine over
// one and a quarter periods: values, periodicity, a tangent, Newton's method, a general
// tangent in terms of its point of contact, and a cubic matched to it. Question text
// transcribed from the original paper; three figures are crops of VCAA's own artwork, and
// the part e.ii. answer is an SVG overlay on the part d. crop (300 dpi; calibration from the
// printed curve — x = 0 at 70.5 px, 213.46 px per unit; y = 0 at 739 px, 215 px per unit —
// checked with a PIL composite against the printed curve and dashed tangent). Answers checked
// with sympy/scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2025e2-q4-graph.png'
import tangentSrc from './meth-2025e2-q4d-tangent.png'
import tSrc from './meth-2025e2-q4f-tangent.png'

const DX0 = 70.5
const DUX = 213.46
const DY0 = 739
const DUY = 215
const dpx = (x: number) => DX0 + x * DUX
const dpy = (y: number) => DY0 - y * DUY
const X1 = 5.826445
const tangentAtX1 = (x: number) => Math.cos(X1) * (x - X1) + Math.sin(X1) + 1

function NewtonOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[560px]">
        <img
          src={tangentSrc}
          alt="The part d. graph with the answer drawn over it: a straight line touching the curve at x = x₁ ≈ 5.83 on the rising part after the minimum, sloping upward and crossing the x-axis at x₂ ≈ 5.2"
          className="w-full block"
        />
        <svg viewBox="0 0 1942 857" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line
            x1={dpx(4.75)}
            y1={dpy(tangentAtX1(4.75))}
            x2={dpx(7.85)}
            y2={dpy(tangentAtX1(7.85))}
            stroke="#f97316"
            strokeWidth={6}
          />
          <circle cx={dpx(X1)} cy={dpy(tangentAtX1(X1))} r={13} fill="#f97316" />
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [7, 93],
  average: 0.9,
  comment: (
    <>
      This question was answered well. Some students, however, left their answer as{' '}
      <Katex tex="\sin\left(\dfrac{2\pi}{3}\right)+1" /> or gave an approximate value when an exact
      answer was required.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [22, 78],
  average: 0.8,
  comment: (
    <>
      Some responses only had <Katex tex="x=\dfrac{\pi}{6}" />, or the first two solutions, or put{' '}
      <Katex tex="\dfrac{7\pi}{2}" /> instead of <Katex tex="\dfrac{13\pi}{6}" />. Others
      incorrectly gave extra solutions or a general solution, not considering the restricted
      domain.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [59, 26, 15],
  average: 0.6,
  comment: (
    <>
      Many students were able to find the <Katex tex="k" /> value but not the <Katex tex="a" />{' '}
      value. <Katex tex="a=\dfrac{5\pi}{2}" />, <Katex tex="a=\dfrac{9\pi}{2}" /> and{' '}
      <Katex tex="a=2\pi" /> were common incorrect responses. <Katex tex="k=-2\pi" /> and{' '}
      <Katex tex="a=\infty" /> were also occasional incorrect responses.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      An equation was required. There were some transcription errors. Some students inefficiently
      attempted to find the equation by hand, rather than selecting to use their CAS, and made
      errors.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [35, 65],
  average: 0.6,
  comment: (
    <>
      The incorrect response of <Katex tex="5.0" /> was occasionally seen.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [72, 28],
  average: 0.3,
  comment: (
    <>
      Many students did not attempt this question. Some students drew lines which were not
      tangential to the curve at any point. Some drew a line that clearly cut the curve at{' '}
      <Katex tex="x=5.82\ldots" /> Others were unable to find <Katex tex="x_1" />. Students should
      use a ruler when drawing lines.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [34, 17, 49],
  average: 1.1,
  comment: (
    <>
      This was a ‘show that’ question and appropriate working needed to be shown. Many students
      were able to find the gradient. Some students did not express{' '}
      <Katex tex="y-(\sin(p)+1)" /> correctly, writing <Katex tex="y-\sin(p)+1" />. Others used{' '}
      <Katex tex="y=mx+c" />, claiming <Katex tex="c=\sin(p)+1" />.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [72, 5, 23],
  average: 0.5,
  comment: (
    <>
      Exact answers were required. Some students gave their answers in coordinate form without
      stating the minimum and maximum values of the <Katex tex="y" />-intercept. Others labelled
      the values incorrectly, giving <Katex tex="\max=1-2\pi" /> and{' '}
      <Katex tex="\min=1+\pi" />. Some had the minimum value as 1 and the maximum value as 2.{' '}
      <Katex tex="(2\pi,1-2\pi)" /> and <Katex tex="(\pi,1+\pi)" /> were other occasionally seen
      answers.
    </>
  ),
}

const EXAM_FIII: SAExaminerStats = {
  marks: [65, 25, 10],
  average: 0.4,
  comment: (
    <>
      <Katex tex="p=4.71\ldots" /> was often included in the response and was not awarded full
      marks. Other common incorrect responses were <Katex tex="p=4.49" /> and{' '}
      <Katex tex="p=7.73" />.
    </>
  ),
}

const EXAM_GI: SAExaminerStats = {
  marks: [27, 5, 68],
  average: 1.4,
  comment: (
    <>
      This was a ‘show that’ question. Appropriate working needed to be shown. Some students
      substituted <Katex tex="a=b=c=0" /> rather than <Katex tex="x=0" />.
    </>
  ),
}

const EXAM_GII: SAExaminerStats = {
  marks: [63, 8, 29],
  average: 0.7,
  comment: (
    <>
      This question was well done by those who attempted it. A common incorrect method was{' '}
      <Katex tex="\displaystyle\int_0^{2\pi}f(x)-g(x)\,dx" />. Some students gave their answer in
      exact form, not correct to two decimal places as required by the question.
    </>
  ),
}

const EXAM_GIII: SAExaminerStats = {
  marks: [67, 19, 14],
  average: 0.5,
  comment: (
    <>
      Exact answers were required. However, some students gave only approximate answers. Others
      just had the LHS of the equations, <Katex tex="br^2+r" /> and <Katex tex="2br+1" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f\!\left(\tfrac{2\pi}{3}\right) = \sin\!\left(\tfrac{2\pi}{3}\right)+1" />,
    reason: <>Substituting into the rule.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\tfrac{2\pi}{3}\right) = \sin\!\left(\pi-\tfrac{\pi}{3}\right) = \frac{\sqrt3}{2}" />,
    reason: <>Second quadrant, so the sine is positive and equals its first-quadrant partner.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{\sqrt3}{2}+1}" />,
    reason: <>Exact, as required — about <Katex tex="1.866" />, which matches the height of point <Katex tex="A" /> on the diagram.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(x)+1 = \tfrac32 \implies \sin(x) = \tfrac12" />,
    reason: <>Isolating the sine.</>,
  },
  {
    working: <Katex display tex="0 \le x \le \tfrac{5\pi}{2} \ \text{ covers one and a quarter periods}" />,
    reason: <>Which is why there are three solutions, not two — the domain runs past <Katex tex="2\pi" />.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{\pi}{6}, \ \pi-\tfrac{\pi}{6} = \tfrac{5\pi}{6}" />,
    reason: <>The two in the first revolution.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{\pi}{6}+2\pi = \tfrac{13\pi}{6} \ \le \tfrac{15\pi}{6} \ \checkmark" />,
    reason: <>The next one up. The following candidate <Katex tex="\tfrac{5\pi}{6}+2\pi=\tfrac{17\pi}{6}" /> exceeds the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{\pi}{6}, \ \frac{5\pi}{6}, \ \frac{13\pi}{6}}" />,
    reason: <>Three exact values.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(x+k) = f(x) \text{ for all } x \implies k \text{ is a period of } \sin" />,
    reason: <>The smallest positive one inside <Katex tex="\left(0,\tfrac{5\pi}{2}\right)" /> is the full period.</>,
  },
  {
    working: <Katex display tex="k = 2\pi" />,
    reason: <>And <Katex tex="2\pi<\tfrac{5\pi}{2}" />, so it is admissible.</>,
  },
  {
    working: <Katex display tex="\text{need both } x \text{ and } x+k \text{ inside } \left[0,\tfrac{5\pi}{2}\right]" />,
    reason: <>The report notes many students found <Katex tex="k" /> but not <Katex tex="a" />: <Katex tex="f(x+2\pi)" /> only exists while <Katex tex="x+2\pi" /> stays in the domain.</>,
  },
  {
    working: <Katex display tex="x+2\pi \le \tfrac{5\pi}{2} \implies x \le \tfrac{\pi}{2}" />,
    reason: <>The binding constraint.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 2\pi, \qquad a = \frac{\pi}{2}}" />,
    reason: <>The largest possible a.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \cos(x) \implies f'\!\left(\tfrac{2\pi}{3}\right) = -\tfrac12" />,
    reason: <><Katex tex="\cos\!\left(\tfrac{2\pi}{3}\right)=-\tfrac12" />: negative, matching the downward tangent on the diagram.</>,
  },
  {
    working: <Katex display tex="y-\left(\tfrac{\sqrt3}{2}+1\right) = -\tfrac12\left(x-\tfrac{2\pi}{3}\right)" />,
    reason: <>Point–gradient form, using the value from part a.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\frac{x}{2}+\frac{\pi}{3}+\frac{\sqrt3}{2}+1}" />,
    reason: <>An <em>equation</em> was required, not just the gradient. Numerically the intercept is about <Katex tex="2.913" />.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="x_{n+1} = x_n-\frac{f(x_n)}{f'(x_n)} = x_n-\frac{\sin(x_n)+1}{\cos(x_n)}" />,
    reason: <>The Newton iteration for this f.</>,
  },
  {
    working: <Katex display tex="x_0 = \tfrac{2\pi}{3}: \quad x_1 = \tfrac{2\pi}{3}-\frac{\tfrac{\sqrt3}{2}+1}{-\tfrac12} = 5.82644\ldots" />,
    reason: <>Dividing by the negative gradient throws the estimate a long way right — this is the tangent drawn on the part d. axes, and its <Katex tex="x" />-intercept is <Katex tex="x_1" />.</>,
  },
  {
    working: <Katex display tex="x_2 = x_1-\frac{\sin(x_1)+1}{\cos(x_1)} = 5.82644-\frac{0.55566}{0.89588}" />,
    reason: <>The second iteration.</>,
  },
  {
    working: <Katex display tex="\boxed{x_2 = 5.2}" />,
    reason: <>One decimal place. It is converging towards <Katex tex="\tfrac{3\pi}{2}\approx4.712" />, the point where <Katex tex="f=0" /> — slowly, because the root is also a turning point.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="x_1 = 5.826, \quad f(x_1) = 0.5557, \quad f'(x_1) = \cos(x_1) = 0.8959" />,
    reason: <>The point of contact and the gradient there.</>,
  },
  {
    working: <Katex display tex="y = 0.8959(x-5.826)+0.5557" />,
    reason: <>The tangent to draw, sloping upward this time.</>,
  },
  {
    working: <Katex display tex="\text{its } x\text{-intercept is } x_2 = 5.2" />,
    reason: <>Which is the whole point of the picture: each Newton step replaces the curve by its tangent and takes that line's <Katex tex="x" />-intercept as the next estimate.</>,
  },
  {
    working: <NewtonOverlay />,
    reason: <>A ruled line, touching the curve at <Katex tex="x=x_1" /> and cutting the axis at <Katex tex="x_2\approx5.2" />. The report notes some students drew lines that were not tangential to the curve at any point, or that clearly cut the curve at <Katex tex="x=5.82\ldots" /></>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{point of contact } \bigl(p,\ f(p)\bigr) = \bigl(p,\ \sin(p)+1\bigr)" />,
    reason: <>Reading the coordinates from the stem.</>,
  },
  {
    working: <Katex display tex="\text{gradient } = f'(p) = \cos(p)" />,
    reason: <>The derivative evaluated at the point of contact.</>,
  },
  {
    working: <Katex display tex="y-\bigl(\sin(p)+1\bigr) = \cos(p)(x-p)" />,
    reason: <>Point–gradient form. The report notes some students wrote <Katex tex="y-\sin(p)+1" /> in place of <Katex tex="y-(\sin(p)+1)" />, and others used <Katex tex="y=mx+c" /> claiming <Katex tex="c=\sin(p)+1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t(x) = \cos(p)(x-p)+\sin(p)+1}" />,
    reason: <>As required.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="t(0) = -p\cos(p)+\sin(p)+1" />,
    reason: <>The <Katex tex="y" />-intercept, now a function of <Katex tex="p" /> alone.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dp}\bigl[-p\cos(p)+\sin(p)+1\bigr] = -\cos(p)+p\sin(p)+\cos(p) = p\sin(p)" />,
    reason: <>The product rule produces a <Katex tex="+\cos(p)" /> that cancels the <Katex tex="-\cos(p)" /> — a very clean derivative.</>,
  },
  {
    working: <Katex display tex="p\sin(p) = 0 \ \text{ on } \left(0,\tfrac{5\pi}{2}\right) \implies p = \pi \ \text{ or } \ p = 2\pi" />,
    reason: <>Since <Katex tex="p>0" />, only the zeros of <Katex tex="\sin(p)" /> matter.</>,
  },
  {
    working: <Katex display tex="\text{sign of } p\sin(p): \ + \text{ on } (0,\pi), \ - \text{ on } (\pi,2\pi), \ + \text{ on } \left(2\pi,\tfrac{5\pi}{2}\right)" />,
    reason: <>So <Katex tex="p=\pi" /> is a maximum and <Katex tex="p=2\pi" /> a minimum — the report notes some students labelled them the wrong way round.</>,
  },
  {
    working: <Katex display tex="p=\pi: \ -\pi(-1)+0+1 = \pi+1; \qquad p=2\pi: \ -2\pi(1)+0+1 = 1-2\pi" />,
    reason: <>The endpoints give <Katex tex="1" /> and <Katex tex="2" />, both inside this range, so the turning points really are the extremes.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum } 1-2\pi, \qquad \text{maximum } \pi+1}" />,
    reason: <>Exact values, and stated as <Katex tex="y" />-intercepts rather than as coordinate pairs.</>,
  },
]

const ROWS_FIII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 0 \implies \sin(x) = -1 \implies x = \tfrac{3\pi}{2}" />,
    reason: <>The only <Katex tex="x" />-intercept of <Katex tex="f" /> in the domain.</>,
  },
  {
    working: <Katex display tex="t\!\left(\tfrac{3\pi}{2}\right) = 0: \quad \cos(p)\left(\tfrac{3\pi}{2}-p\right)+\sin(p)+1 = 0" />,
    reason: <>One equation in p.</>,
  },
  {
    working: <Katex display tex="\text{“unique”} \implies \cos(p)\ne0" />,
    reason: <>A horizontal tangent has either no <Katex tex="x" />-intercept or infinitely many. At <Katex tex="p=\tfrac{3\pi}{2}" /> the tangent <em>is</em> the <Katex tex="x" />-axis, so every point is an intercept — which is why that root must be rejected.</>,
  },
  {
    working: <Katex display tex="\text{solve numerically on } \left(0,\tfrac{5\pi}{2}\right)\setminus\left\{\tfrac{3\pi}{2}\right\}" />,
    reason: <>By <Cas fn="nSolve" />, or by graphing the left-hand side.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 2.38 \ \text{ or } \ p = 7.04}" />,
    reason: <>Two decimal places. The report notes <Katex tex="p=4.71\ldots" /> (that is, <Katex tex="\tfrac{3\pi}{2}" />) was often included and was not awarded full marks.</>,
  },
]

const ROWS_GI: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = ax^3+bx^2+cx+d \implies g(0) = d" />,
    reason: <>Only the constant term survives at zero.</>,
  },
  {
    working: <Katex display tex="f(0) = \sin(0)+1 = 1 \implies d = 1" />,
    reason: <>The first condition. The report notes some students substituted <Katex tex="a=b=c=0" /> rather than <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="g'(x) = 3ax^2+2bx+c \implies g'(0) = c" />,
    reason: <>Likewise for the derivative.</>,
  },
  {
    working: <Katex display tex="f'(0) = \cos(0) = 1 \implies c = 1" />,
    reason: <>The second condition.</>,
  },
  {
    working: <Katex display tex="\boxed{c = 1 \ \text{ and } \ d = 1}" />,
    reason: <>As required. In effect <Katex tex="g" /> now matches the Maclaurin behaviour of <Katex tex="f" /> to first order.</>,
  },
]

const ROWS_GII: WorkingRow[] = [
  {
    working: <Katex display tex="g(2\pi) = f(2\pi) = 1: \quad 8\pi^3a+4\pi^2b+2\pi+1 = 1" />,
    reason: <>Using <Katex tex="c=d=1" /> from part g.i.</>,
  },
  {
    working: <Katex display tex="g'(2\pi) = f'(2\pi) = 1: \quad 12\pi^2a+4\pi b+1 = 1 \implies b = -3\pi a" />,
    reason: <>The second equation solves immediately for b in terms of a.</>,
  },
  {
    working: <Katex display tex="8\pi^3a-12\pi^3a = -2\pi \implies -4\pi^3a = -2\pi \implies a = \frac{1}{2\pi^2}" />,
    reason: <>Substituting back.</>,
  },
  {
    working: <Katex display tex="b = -\frac{3}{2\pi} \implies g(x) = \frac{x^3}{2\pi^2}-\frac{3x^2}{2\pi}+x+1" />,
    reason: <>The cubic is now fully determined, and it meets <Katex tex="f" /> at <Katex tex="x=0" />, <Katex tex="x=\pi" /> and <Katex tex="x=2\pi" />.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_0^{2\pi}\left|f(x)-g(x)\right|dx" />,
    reason: <>They cross once inside, at <Katex tex="x=\pi" />, so the absolute value matters — two signed halves would cancel to nearly nothing.</>,
  },
  {
    working: <Katex display tex="\boxed{1.53 \text{ square units}}" />,
    reason: <>Two decimal places, as required — the report notes some students gave an exact form instead.</>,
  },
]

const ROWS_GIII: WorkingRow[] = [
  {
    working: <Katex display tex="a=0,\ c=1,\ d=1 \implies g(x) = bx^2+x+1" />,
    reason: <>A parabola now, not a cubic.</>,
  },
  {
    working: <Katex display tex="g(r) = f(r): \quad br^2+r+1 = \sin(r)+1 \implies br^2+r = \sin(r)" />,
    reason: <>The first condition.</>,
  },
  {
    working: <Katex display tex="g'(r) = f'(r): \quad 2br+1 = \cos(r) \implies b = \frac{\cos(r)-1}{2r}" />,
    reason: <>The second condition, solved for b.</>,
  },
  {
    working: <Katex display tex="\frac{r(\cos(r)-1)}{2}+r = \sin(r) \implies r\bigl(\cos(r)+1\bigr) = 2\sin(r)" />,
    reason: <>Substituting and tidying.</>,
  },
  {
    working: <Katex display tex="2r\cos^2\!\left(\tfrac{r}{2}\right) = 4\sin\!\left(\tfrac{r}{2}\right)\cos\!\left(\tfrac{r}{2}\right)" />,
    reason: <>Double-angle forms: <Katex tex="1+\cos r=2\cos^2\!\left(\tfrac r2\right)" /> and <Katex tex="\sin r=2\sin\!\left(\tfrac r2\right)\cos\!\left(\tfrac r2\right)" />.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\tfrac{r}{2}\right) = 0 \implies r = \pi" />,
    reason: <>The other factor gives <Katex tex="\tan\!\left(\tfrac r2\right)=\tfrac r2" />, whose first positive root <Katex tex="\tfrac r2\approx4.49" /> puts <Katex tex="r" /> outside the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{r = \pi, \qquad b = \frac{\cos(\pi)-1}{2\pi} = -\frac{1}{\pi}}" />,
    reason: <>Exact values. Check: <Katex tex="g(\pi) = -\pi+\pi+1 = 1 = \sin(\pi)+1" /> ✓ and <Katex tex="g'(\pi) = -2+1 = -1 = \cos(\pi)" /> ✓.</>,
  },
]

export default function MethodsQ4_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (19 marks)</p>
        <p>
          Consider the function{' '}
          <Katex tex="f:\left[0,\tfrac{5\pi}{2}\right]\to R" />,{' '}
          <Katex tex="f(x)=\sin(x)+1" />.
        </p>
        <p>
          The graph of <Katex tex="y=f(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A sine curve lifted one unit, running from (0, 1) up to 2, down to touch 0 near 3π/2, and back up to 2 at the right-hand endpoint — from the original 2025 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The curve touches the axis rather than crossing it: <Katex tex="f(x)=0" /> only at{' '}
            <Katex tex="x=\tfrac{3\pi}{2}" />, where the curve also has its minimum. That
            single fact runs through the second half of the question — it is why Newton's
            method converges so slowly in part e., and why part f.iii. has to exclude{' '}
            <Katex tex="p=\tfrac{3\pi}{2}" />, where the tangent lies flat along the{' '}
            <Katex tex="x" />-axis and has infinitely many intercepts.
          </p>
          <p>
            Part f.ii. rewards doing the algebra before the calculus: differentiating{' '}
            <Katex tex="-p\cos(p)+\sin(p)+1" /> gives simply <Katex tex="p\sin(p)" />, because
            the product rule throws up a <Katex tex="\cos(p)" /> that cancels.
          </p>
        </Background>
      </div>

      <PartCard letter="a" topic="Function Value" marks={1} statement={<>Evaluate <Katex tex="f\!\left(\tfrac{2\pi}{3}\right)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Trig Equation"
        marks={1}
        statement={
          <>
            Find the exact values of <Katex tex="x" /> for which{' '}
            <Katex tex="f(x)=\tfrac32" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Periodicity"
        marks={2}
        statement={
          <>
            There exist real numbers <Katex tex="a" /> and <Katex tex="k" /> in the interval{' '}
            <Katex tex="\left(0,\tfrac{5\pi}{2}\right)" />, such that{' '}
            <Katex tex="f(x+k)=f(x)" /> for all <Katex tex="x\in[0,a]" />.
            <br />
            Find the value of <Katex tex="k" /> and the largest possible value of{' '}
            <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Tangent Line"
        marks={1}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              Consider the tangent to the graph of <Katex tex="y=f(x)" /> at the point{' '}
              <Katex tex="A" /> where <Katex tex="x=\dfrac{2\pi}{3}" />, as shown on the axes
              below.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={tangentSrc}
                alt="The graph of y = f(x) on a grid with a dashed straight line touching it at the labelled point A where x = 2π/3 and sloping down to the right, crossing the x-axis just past 2π — from the original 2025 VCAA exam paper"
                className="w-full max-w-[560px]"
              />
            </div>
            <p>
              Find the equation of the tangent to the graph of <Katex tex="y=f(x)" /> at the point
              where <Katex tex="x=\dfrac{2\pi}{3}" />.
            </p>
          </div>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">e.</p>
        <p>
          Apply two iterations of Newton’s method to <Katex tex="f" /> with{' '}
          <Katex tex="x_0=\dfrac{2\pi}{3}" />.
        </p>
      </div>

      <PartCard
        letter="e.i"
        topic="Newton's Method"
        marks={1}
        statement={<>Write down <Katex tex="x_2" />, correct to one decimal place.</>}
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Newton's Method"
        marks={1}
        statement={
          <>
            On the axes in <b>part d</b>, draw the tangent to the graph of{' '}
            <Katex tex="y=f(x)" /> at the point where <Katex tex="x=x_1" />.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">f.</span> Now consider
          the line <Katex tex="y=t(x)" />, which is the tangent to the graph of{' '}
          <Katex tex="y=f(x)" /> at the point <Katex tex="\bigl(p,f(p)\bigr)" />, where{' '}
          <Katex tex="p\in\left(0,\tfrac{5\pi}{2}\right)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={tSrc}
            alt="The curve with a dashed tangent line labelled y = t(x) touching it at the labelled point (p, f(p)) on the rising part near the first peak — from the original 2025 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="f.i"
        topic="Tangent Line"
        marks={2}
        statement={<>Show that <Katex tex="t(x)=\cos(p)(x-p)+\sin(p)+1" />.</>}
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Tangent Intercept"
        marks={2}
        statement={
          <>
            Determine the minimum and maximum possible values for the <Katex tex="y" />
            -intercept of <Katex tex="y=t(x)" />, for{' '}
            <Katex tex="p\in\left(0,\tfrac{5\pi}{2}\right)" />.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>

      <PartCard
        letter="f.iii"
        topic="Tangent Intercept"
        marks={2}
        statement={
          <>
            Determine the values of <Katex tex="p" /> for which <Katex tex="y=t(x)" /> has a
            unique <Katex tex="x" />-intercept that is equal to the <Katex tex="x" />-intercept
            of <Katex tex="y=f(x)" />.
            <br />
            Give your answers correct to two decimal places.
          </>
        }
        examinerReport={EXAM_FIII}
      >
        <WorkingTable rows={ROWS_FIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">g.</span> Let{' '}
          <Katex tex="g:\left[0,\tfrac{5\pi}{2}\right]\to R" />,{' '}
          <Katex tex="g(x)=ax^3+bx^2+cx+d" /> be a polynomial function, where{' '}
          <Katex tex="a,b,c,d\in R" />.
          <br />
          Suppose <Katex tex="g(0)=f(0)" /> and{' '}
          <Katex tex="g'(0)=f'(0)" />.
        </p>
      </div>

      <PartCard letter="g.i" topic="Find Parameters" marks={2} statement={<>Show that <Katex tex="c=1" /> and <Katex tex="d=1" />.</>} examinerReport={EXAM_GI}>
        <WorkingTable rows={ROWS_GI} />
      </PartCard>

      <PartCard
        letter="g.ii"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            If <Katex tex="g(2\pi)=f(2\pi)" /> and <Katex tex="g'(2\pi)=f'(2\pi)" />,
            determine the area bounded by the graphs of <Katex tex="y=f(x)" /> and{' '}
            <Katex tex="y=g(x)" />, for <Katex tex="x\in[0,2\pi]" />.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_GII}
      >
        <WorkingTable rows={ROWS_GII} />
      </PartCard>

      <PartCard
        letter="g.iii"
        topic="Tangent Matching"
        marks={2}
        statement={
          <>
            Let <Katex tex="a=0" />, <Katex tex="c=1" />, <Katex tex="d=1" />.
            <br />
            Find{' '}
            <Katex tex="b" /> and <Katex tex="r" />, such that <Katex tex="g(r)=f(r)" /> and{' '}
            <Katex tex="g'(r)=f'(r)" />, where <Katex tex="b\in R" /> and{' '}
            <Katex tex="r\in\left(0,\tfrac{5\pi}{2}\right)" />.
          </>
        }
        examinerReport={EXAM_GIII}
      >
        <WorkingTable rows={ROWS_GIII} />
      </PartCard>
    </div>
  )
}
