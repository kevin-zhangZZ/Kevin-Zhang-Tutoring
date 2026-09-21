// 2016 Specialist Mathematics — Exam 1, Question 3 (4 marks). Implicit differentiation,
// then the perpendicular (normal) line at a point. Question text transcribed from the
// original paper (no diagram given). Answer checked with sympy and against the VCAA
// examination report. Solution is original. No lettered parts, so this uses the plain card
// layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [15, 8, 19, 5, 53],
  average: 2.8,
  comment: (
    <>
      Students generally dealt well with the implicit differentiation, with most realising
      the need for the chain rule and the product rule. Several students made a sign error
      when substituting the given point; others found the gradient of the perpendicular line
      and did not continue. Others found the gradient and/or equation of the tangent, while
      some thought that the gradient of the normal was equal to the reciprocal rather than
      the negative reciprocal of the gradient of the tangent.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(y)+y\sin(x) = x^2" />,
    reason: <>Differentiate both sides with respect to <Katex tex="x" />, treating <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="-\sin(y)\frac{dy}{dx} + \frac{dy}{dx}\sin(x) + y\cos(x) = 2x" />,
    reason: <>Chain rule on <Katex tex="\cos(y)" />, then product rule on <Katex tex="y\sin(x)" /> — with another chain rule hidden in the <Katex tex="\tfrac{dy}{dx}" />.</>,
  },
  {
    working: <Katex display tex="-\sin\!\left(-\frac{\pi}{2}\right)\frac{dy}{dx} + 0 + \left(-\frac{\pi}{2}\right)(1) = 0" />,
    reason: <>Substituting <Katex tex="\left(0,-\tfrac{\pi}{2}\right)" /> straight away — no need to rearrange for <Katex tex="\tfrac{dy}{dx}" /> in general. Note <Katex tex="\sin(0)=0" /> and <Katex tex="\cos(0)=1" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} - \frac{\pi}{2} = 0 \implies \frac{dy}{dx} = \frac{\pi}{2}" />,
    reason: <>Because <Katex tex="-\sin\!\left(-\tfrac{\pi}{2}\right)=-(-1)=+1" />. The report says the double negative here is where the sign errors happened.</>,
  },
  {
    working: <Katex display tex="m_{\perp} = -\frac{1}{\frac{\pi}{2}} = -\frac{2}{\pi}" />,
    reason: <>Negative <em>reciprocal</em> — not the reciprocal, and not just the negative. The report lists both of those as errors.</>,
  },
  {
    working: <Katex display tex="y-\left(-\frac{\pi}{2}\right) = -\frac{2}{\pi}(x-0)" />,
    reason: <>Point–gradient form.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\frac{2x}{\pi}-\frac{\pi}{2}}" />,
    reason: <>Finish with the equation, not just the gradient — the report notes students who stopped one line early.</>,
  },
]

export default function SpecialistQ3_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (4 marks)">
        <p>
          Find the equation of the line perpendicular to the graph of{' '}
          <Katex tex="\cos(y)+y\sin(x)=x^2" /> at{' '}
          <Katex tex="\left(0,-\tfrac{\pi}{2}\right)" />.
        </p>
        <p>
          The curve cannot be written as <Katex tex="y=\ldots" />, so implicit
          differentiation is the only route — and with a point supplied you can substitute
          before rearranging, which keeps the algebra to two lines.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
