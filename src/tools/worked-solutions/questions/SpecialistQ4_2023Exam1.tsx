// 2023 Specialist Mathematics — Exam 1 Question 4 (3 marks). Implicit differentiation of a
// product containing arcsin of y². Question text transcribed from the original paper. Answer
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [25, 6, 32, 37],
  average: 1.8,
  comment: (
    <>
      Students were required to demonstrate appropriate use of the product and/or chain rule
      (depending on the approach taken). This was often not done well. Students who performed
      the implicit differentiation well were often able to proceed through to the answer.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x\arcsin\left(y^2\right) = \pi" />,
    reason: <>A product of <Katex tex="x" /> and a function of <Katex tex="y" />, so the product rule comes first and the chain rule sits inside it.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left[x\arcsin\left(y^2\right)\right] = \arcsin\left(y^2\right)+x\cdot\frac{d}{dx}\arcsin\left(y^2\right)" />,
    reason: <>Product rule. The right-hand side is a constant, so it differentiates to 0.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\arcsin\left(y^2\right) = \frac{1}{\sqrt{1-y^4}}\cdot2y\frac{dy}{dx}" />,
    reason: <>Two chain rules stacked: the <Katex tex="\arcsin" /> derivative, then <Katex tex="\tfrac{d}{dx}y^2=2y\tfrac{dy}{dx}" />. Note <Katex tex="\left(y^2\right)^2=y^4" /> under the root.</>,
  },
  {
    working: <Katex display tex="\arcsin\left(y^2\right)+\frac{2xy}{\sqrt{1-y^4}}\cdot\frac{dy}{dx} = 0" />,
    reason: <>The differentiated relation.</>,
  },
  {
    working: <Katex display tex="\text{At } \left(6,\tfrac{1}{\sqrt2}\right): \ y^2 = \tfrac12, \ y^4 = \tfrac14 \implies \arcsin\!\left(\tfrac12\right) = \tfrac\pi6, \ \sqrt{1-\tfrac14} = \tfrac{\sqrt3}{2}" />,
    reason: <>Work out every piece before substituting — the numbers are chosen to be exact.</>,
  },
  {
    working: <Katex display tex="\frac\pi6+\frac{2(6)\left(\tfrac{1}{\sqrt2}\right)}{\tfrac{\sqrt3}{2}}\cdot\frac{dy}{dx} = 0" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\frac{12/\sqrt2}{\sqrt3/2} = \frac{24}{\sqrt2\sqrt3} = \frac{24}{\sqrt6} = 4\sqrt6" />,
    reason: <>Rationalising: <Katex tex="\tfrac{24}{\sqrt6}=\tfrac{24\sqrt6}{6}=4\sqrt6" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = -\frac{\pi}{6\cdot4\sqrt6} = -\frac{\pi}{24\sqrt6}" />,
    reason: <>Isolating the derivative.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = -\frac{\pi\sqrt6}{144}}" />,
    reason: <>Rationalising once more: <Katex tex="24\sqrt6\times\sqrt6=144" />. In the required form with <Katex tex="a=6" />, <Katex tex="b=144" />; about <Katex tex="-0.053" />.</>,
  },
]

export default function SpecialistQ4_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (3 marks)</p>
        <p>
          Consider the relation <Katex tex="x\arcsin\left(y^2\right)=\pi" />.
          <br />
          Use implicit differentiation to find <Katex tex="\dfrac{dy}{dx}" /> at the point{' '}
          <Katex tex="\left(6,\dfrac{1}{\sqrt2}\right)" />.
          <br />
          Give your answer in the form{' '}
          <Katex tex="-\dfrac{\pi\sqrt a}{b}" />, where <Katex tex="a,b\in Z^+" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two rules have to work together here, and the report notes this was often not
            done well: the <em>product</em> rule on{' '}
            <Katex tex="x\cdot\arcsin\left(y^2\right)" />, and a <em>double</em> chain rule
            inside it, because <Katex tex="y^2" /> is a function of <Katex tex="y" /> which is
            a function of <Katex tex="x" />.
          </p>
          <p>
            Substitute only after differentiating. The point is designed so that{' '}
            <Katex tex="y^2=\tfrac12" /> gives the exact value{' '}
            <Katex tex="\arcsin\!\left(\tfrac12\right)=\tfrac\pi6" />, and the given answer
            form warns you a surd is coming.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
