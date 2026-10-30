// 2024 Specialist NHT — Exam 1, Question 5 (5 marks). The NHT report gives sample answers only,
// with no statistics. Implicit differentiation of 6e^y arctan(x/√3) − π cos(y) = 0 at its x-intercept
// (1, 0), then the normal: dy/dx = −3√3/(2π), normal gradient 2π/(3√3) = 2√3π/9, and
// y = (2√3π/9)x − 2√3π/9. Question text transcribed from the original paper (read from a rendered
// page image). Answer checked with sympy and against the VCAA report's sample answer, which agrees
// (it gives both 2π/(3√3) and 2√3π/9 forms). Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&(1,0): \\ &6e^0\arctan\!\left(\tfrac{1}{\sqrt3}\right)-\pi\cos(0) \\ &\quad=6\cdot\frac{\pi}{6}-\pi=0\end{aligned}" />,
    reason: <>An <Katex tex="x" />-intercept of 1 means the point <Katex tex="(1,0)" />. Checking it satisfies the equation confirms the point, and recalls <Katex tex="\arctan\!\left(\tfrac1{\sqrt3}\right)=\tfrac\pi6" />, which we need again below.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{d}{dx}\arctan\!\left(\tfrac{x}{\sqrt3}\right)&=\frac{1/\sqrt3}{1+x^2/3} \\ &=\frac{3/\sqrt3}{3+x^2} \\ &=\frac{\sqrt3}{x^2+3}\end{aligned}" />,
    reason: <>The relation can&apos;t be rearranged into <Katex tex="y=\ldots" />, so differentiate every term with respect to <Katex tex="x" /> as it stands. First find the derivative of the arctan factor, which the product rule needs next. The formula sheet gives <Katex tex="\tfrac{d}{dx}\tan^{-1}(ax)=\tfrac{a}{1+(ax)^2}" />; here <Katex tex="a=\tfrac1{\sqrt3}" />. Multiply top and bottom by 3 to clear the fractions, and <Katex tex="\tfrac{3}{\sqrt3}=\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{d}{dx}\left(6e^y\arctan\!\left(\tfrac{x}{\sqrt3}\right)\right) \\ &=6e^y\frac{dy}{dx}\arctan\!\left(\tfrac{x}{\sqrt3}\right) \\ &\quad+6e^y\cdot\frac{\sqrt3}{x^2+3} \\ &=6e^y\arctan\!\left(\tfrac{x}{\sqrt3}\right)\frac{dy}{dx} \\ &\quad+\frac{6\sqrt3\,e^y}{x^2+3}\end{aligned}" />,
    reason: <>A product of <Katex tex="6e^y" /> and <Katex tex="\arctan\!\left(\tfrac x{\sqrt3}\right)" />, so use the product rule. <Katex tex="y" /> is a function of <Katex tex="x" />, so differentiating <Katex tex="e^y" /> with respect to <Katex tex="x" /> needs the chain rule, giving <Katex tex="e^y\tfrac{dy}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(-\pi\cos(y)\right)=\pi\sin(y)\frac{dy}{dx}" />,
    reason: <>Chain rule: the derivative of <Katex tex="\cos(y)" /> is <Katex tex="-\sin(y)" />, times <Katex tex="\tfrac{dy}{dx}" />. The two minus signs make a plus.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&6e^y\arctan\!\left(\tfrac{x}{\sqrt3}\right)\frac{dy}{dx}+\frac{6\sqrt3\,e^y}{x^2+3} \\ &\quad+\pi\sin(y)\frac{dy}{dx}=0\end{aligned}" />,
    reason: <>The right side is 0, a constant, so its derivative is 0.</>,
  },
  {
    working: <Katex display tex="(1,0):\quad 6\cdot\frac{\pi}{6}\cdot\frac{dy}{dx}+\frac{6\sqrt3}{4}+0=0" />,
    reason: <>Substitute <Katex tex="x=1" />, <Katex tex="y=0" /> before rearranging. <Katex tex="e^0=1" />, <Katex tex="\sin(0)=0" /> and <Katex tex="x^2+3=4" />, so the equation becomes linear in <Katex tex="\tfrac{dy}{dx}" /> with plain-number coefficients.</>,
  },
  {
    working: <Katex display tex="\pi\frac{dy}{dx}=-\frac{3\sqrt3}{2}\implies\frac{dy}{dx}=-\frac{3\sqrt3}{2\pi}" />,
    reason: <>This is the gradient of the <b>tangent</b> at <Katex tex="(1,0)" />. The line perpendicular to the curve is perpendicular to this tangent (the normal).</>,
  },
  {
    working: <Katex display tex="m_N=-\frac{1}{dy/dx}=\frac{2\pi}{3\sqrt3}=\frac{2\sqrt3\,\pi}{9}" />,
    reason: <>Perpendicular lines have gradients whose product is <Katex tex="-1" />: take the negative reciprocal. Rationalise: <Katex tex="\tfrac{2\pi}{3\sqrt3}\cdot\tfrac{\sqrt3}{\sqrt3}=\tfrac{2\sqrt3\pi}{9}" />.</>,
  },
  {
    working: <Katex display tex="y-0=\frac{2\sqrt3\,\pi}{9}(x-1)" />,
    reason: <>Point–gradient form through <Katex tex="(1,0)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y=\frac{2\sqrt3\,\pi}{9}x-\frac{2\sqrt3\,\pi}{9}}" />,
    reason: <>In the form <Katex tex="y=mx+c" /> as asked. VCAA&apos;s sample answer gives this and the unrationalised form <Katex tex="y=\tfrac{2\pi}{3\sqrt3}x-\tfrac{2\pi}{3\sqrt3}" />. Sanity check: <Katex tex="x=1" /> gives <Katex tex="y=0" />, so the line passes through the intercept ✓.</>,
    more: <><Katex tex="m_N\approx1.21" /> and the tangent gradient is <Katex tex="\approx-0.83" />; their product is <Katex tex="-1" /> ✓.</>,
  },
]

export default function SpecialistQ5_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (5 marks)</p>
        <p>
          The curve defined by <Katex tex="6e^y\arctan\!\left(\dfrac{x}{\sqrt3}\right)-\pi\cos(y)=0" /> has an{' '}
          <Katex tex="x" />-intercept of 1.
        </p>
        <p>
          Find the equation of the straight line that is <b>perpendicular</b> to the curve at this intercept.
          <br />
          Give your answer in the form <Katex tex="y=mx+c" />, where <Katex tex="m,c\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The relation can&apos;t be rearranged into <Katex tex="y=\ldots" />, so differentiate both sides with respect
            to <Katex tex="x" /> as they stand, treating <Katex tex="y" /> as a function of <Katex tex="x" />. Every term
            containing <Katex tex="y" /> picks up a factor <Katex tex="\tfrac{dy}{dx}" /> from the chain rule.
          </p>
          <p>
            &ldquo;Perpendicular to the curve&rdquo; means perpendicular to its tangent: this is the normal line, whose
            gradient is the negative reciprocal of the tangent&apos;s.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Use the tangent gradient for the line"
          working={<Katex display tex="y=-\frac{3\sqrt3}{2\pi}x+\frac{3\sqrt3}{2\pi}" />}
        >
          That is the tangent at <Katex tex="(1,0)" />, the line that touches the curve. The question asks for the line
          that is <b>perpendicular</b> to the curve (VCAA bolded the word), so the gradient must be{' '}
          <Katex tex="-1\div\left(-\tfrac{3\sqrt3}{2\pi}\right)" />.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={5} />
      </div>
    </div>
  )
}
