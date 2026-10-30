// 2024 Specialist NHT — Exam 1, Question 10 (4 marks). The NHT report gives sample answers only,
// with no statistics. Integration by parts on ∫ 4 arcsin(x/3) dx from 3/2 to 3√3/2 (u = 4 arcsin(x/3),
// dv/dx = 1), then the remaining ∫ 4x/√(9 − x²) dx by the substitution w = 9 − x²; answer
// (2√3 − 1)π + 6(1 − √3) ≈ 3.349. Question text transcribed from the original paper (read from a
// rendered page image). Answer checked with sympy and against the VCAA report's sample answer, which
// agrees. The report's line "Another substitution may be used to evaluate the resulting integral." is
// part of its worked answer, not a separate note, so it is not quoted as a comment. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&u=4\arcsin\!\left(\tfrac x3\right),\ \ \frac{du}{dx}=\frac{4}{\sqrt{9-x^2}} \\ &\frac{dv}{dx}=1,\ \ v=x\end{aligned}" />,
    reason: <>There is only one factor, so treat it as <Katex tex="4\arcsin\!\left(\tfrac x3\right)\times1" />. We can differentiate arcsin (<Katex tex="\tfrac{d}{dx}\arcsin\!\left(\tfrac xa\right)=\tfrac1{\sqrt{a^2-x^2}}" /> for <Katex tex="a>0" />, here with <Katex tex="a=3" />, then times 4) but have no standard antiderivative for it, so let it be <Katex tex="u" /> and let <Katex tex="1" /> be <Katex tex="\tfrac{dv}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\int_{3/2}^{3\sqrt3/2}4\arcsin\!\left(\tfrac x3\right)dx \\ &=\Big[4x\arcsin\!\left(\tfrac x3\right)\Big]_{3/2}^{3\sqrt3/2} \\ &\quad-\int_{3/2}^{3\sqrt3/2}\frac{4x}{\sqrt{9-x^2}}\,dx\end{aligned}" />,
    reason: <>Integration by parts: <Katex tex="\int u\tfrac{dv}{dx}\,dx=uv-\int v\tfrac{du}{dx}\,dx" />. The new integral has no arcsin in it, which is the point of the method.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Big[4x\arcsin\!\left(\tfrac x3\right)\Big]_{3/2}^{3\sqrt3/2} \\ &=4\cdot\tfrac{3\sqrt3}{2}\arcsin\!\left(\tfrac{\sqrt3}{2}\right) \\ &\quad-4\cdot\tfrac32\arcsin\!\left(\tfrac12\right) \\ &=6\sqrt3\cdot\tfrac\pi3-6\cdot\tfrac\pi6 \\ &=2\sqrt3\pi-\pi\end{aligned}" />,
    reason: <>At the terminals, <Katex tex="\tfrac x3" /> becomes <Katex tex="\tfrac{\sqrt3}2" /> and <Katex tex="\tfrac12" />: exact values, <Katex tex="\arcsin\!\left(\tfrac{\sqrt3}{2}\right)=\tfrac\pi3" /> and <Katex tex="\arcsin\!\left(\tfrac12\right)=\tfrac\pi6" />. The limits were chosen to make this work.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&w=9-x^2,\quad\frac{dw}{dx}=-2x \\ &x=\tfrac32\Rightarrow w=\tfrac{27}{4} \\ &x=\tfrac{3\sqrt3}{2}\Rightarrow w=\tfrac94\end{aligned}" />,
    reason: <>In the remaining integral the numerator <Katex tex="x" /> is a multiple of the derivative of <Katex tex="9-x^2" />, so substitute <Katex tex="w=9-x^2" />. Change the terminals too: <Katex tex="9-\tfrac94=\tfrac{27}4" /> and <Katex tex="9-\tfrac{27}4=\tfrac94" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\int_{3/2}^{3\sqrt3/2}\frac{4x}{\sqrt{9-x^2}}\,dx \\ &=\int_{27/4}^{9/4}\frac{-2}{\sqrt w}\,dw \\ &=2\int_{9/4}^{27/4}w^{-1/2}\,dw\end{aligned}" />,
    reason: <>From <Katex tex="\tfrac{dw}{dx}=-2x" />, <Katex tex="x\,dx=-\tfrac12\,dw" />, so <Katex tex="4x\,dx=-2\,dw" />; and <Katex tex="\sqrt{9-x^2}=\sqrt w" />. The new lower terminal is <Katex tex="\tfrac{27}4" /> and the upper is <Katex tex="\tfrac94" />; swapping them into increasing order changes the sign.</>,
  },
  {
    working: <Katex display tex="=2\Big[2\sqrt w\Big]_{9/4}^{27/4}=4\left(\frac{3\sqrt3}{2}-\frac32\right)=6\sqrt3-6" />,
    reason: <>An antiderivative of <Katex tex="w^{-1/2}" /> is <Katex tex="\frac{w^{1/2}}{1/2}=2\sqrt w" />. Then <Katex tex="\sqrt{\tfrac{27}4}=\tfrac{3\sqrt3}2" /> and <Katex tex="\sqrt{\tfrac94}=\tfrac32" />.</>,
    more: <>Without the substitution: <Katex tex="\tfrac{d}{dx}\sqrt{9-x^2}=\tfrac{-x}{\sqrt{9-x^2}}" />, so an antiderivative of <Katex tex="\tfrac{4x}{\sqrt{9-x^2}}" /> is <Katex tex="-4\sqrt{9-x^2}" />, and <Katex tex="-4\left(\tfrac32\right)+4\left(\tfrac{3\sqrt3}2\right)=6\sqrt3-6" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\int_{3/2}^{3\sqrt3/2}4\arcsin\!\left(\tfrac x3\right)dx \\ &=2\sqrt3\pi-\pi-\left(6\sqrt3-6\right)\end{aligned}" />,
    reason: <>Put the two pieces together: the <Katex tex="uv" /> term minus the second integral. Keep the bracket so the minus sign reaches both terms.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(2\sqrt3-1\right)\pi+6-6\sqrt3}" />,
    reason: <>In the form <Katex tex="a\pi+b" /> with <Katex tex="a=2\sqrt3-1" /> and <Katex tex="b=6-6\sqrt3" />. VCAA writes <Katex tex="b" /> as <Katex tex="6\left(1-\sqrt3\right)" />.</>,
    more: <>Sanity check: the integrand rises from <Katex tex="4\cdot\tfrac\pi6\approx2.09" /> to <Katex tex="4\cdot\tfrac\pi3\approx4.19" /> over an interval of length <Katex tex="\tfrac{3\sqrt3-3}2\approx1.10" />, so the integral lies between about 2.3 and 4.6. Our answer is <Katex tex="\approx3.35" /> ✓.</>,
  },
]

export default function SpecialistQ10_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (4 marks)</p>
        <p>
          Use integration by parts to evaluate{' '}
          <Katex tex="\displaystyle\int_{\frac32}^{\frac{3\sqrt3}{2}}\left(4\arcsin\!\left(\frac x3\right)\right)dx" />.
        </p>
        <p>
          Give your answer in the form <Katex tex="a\pi+b" />, where <Katex tex="a,b\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Integration by parts reverses the product rule: <Katex tex="\int u\tfrac{dv}{dx}\,dx=uv-\int v\tfrac{du}{dx}\,dx" />.
            It is the tool for integrating a function you can differentiate but not integrate directly, like{' '}
            <Katex tex="\arcsin" />, <Katex tex="\arctan" /> or <Katex tex="\log_e" />: write it as itself times 1, let
            it be <Katex tex="u" />, and the derivative replaces it with an algebraic expression.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={4} />
      </div>
    </div>
  )
}
