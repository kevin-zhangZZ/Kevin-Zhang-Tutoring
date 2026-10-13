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
      the negative reciprocal of the gradient of the tangent. Others used the negative of the
      gradient of the tangent.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(y)+y\sin(x) = x^2" />,
    reason: <><Katex tex="y" /> can't be made the subject, so differentiate both sides implicitly with respect to <Katex tex="x" />, treating <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
    more: <>Quick check that the point is on the curve: <Katex tex="\cos\!\left(-\tfrac{\pi}{2}\right)+\left(-\tfrac{\pi}{2}\right)\sin(0)=0+0=0=0^2" />. ✓</>,
  },
  {
    working: <Katex display tex="-\sin(y)\frac{dy}{dx} + \frac{dy}{dx}\sin(x) + y\cos(x) = 2x" />,
    reason: <>Chain rule on <Katex tex="\cos(y)" /> gives <Katex tex="-\sin(y)\tfrac{dy}{dx}" />; product rule on <Katex tex="y\sin(x)" />, where the derivative of <Katex tex="y" /> is <Katex tex="\tfrac{dy}{dx}" />.</>,
    more: <>Both <Katex tex="\tfrac{dy}{dx}" /> terms appear because <Katex tex="y" /> depends on <Katex tex="x" />: differentiating <Katex tex="\cos(y)" /> gives <Katex tex="-\sin(y)" /> times the inner derivative <Katex tex="\tfrac{dy}{dx}" />. For <Katex tex="y\sin(x)" />, take <Katex tex="u=y" /> (so <Katex tex="u'=\tfrac{dy}{dx}" />) and <Katex tex="v=\sin(x)" /> (so <Katex tex="v'=\cos(x)" />): <Katex tex="u'v+uv'=\tfrac{dy}{dx}\sin(x)+y\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="-\sin\!\left(-\frac{\pi}{2}\right)\frac{dy}{dx} + 0 + \left(-\frac{\pi}{2}\right)(1) = 0" />,
    reason: <>Substitute <Katex tex="x=0" />, <Katex tex="y=-\tfrac{\pi}{2}" /> straight away, using <Katex tex="\sin(0)=0" /> and <Katex tex="\cos(0)=1" />.</>,
    more: <>Substituting first means you never rearrange for <Katex tex="\tfrac{dy}{dx}" /> in general. Doing that gives <Katex tex="\tfrac{dy}{dx}=\tfrac{2x-y\cos(x)}{\sin(x)-\sin(y)}" />, which at the point is <Katex tex="\tfrac{0+\pi/2}{0-(-1)}=\tfrac{\pi}{2}" /> — the same answer with more algebra.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} - \frac{\pi}{2} = 0 \implies \frac{dy}{dx} = \frac{\pi}{2}" />,
    reason: <>Because <Katex tex="-\sin\!\left(-\tfrac{\pi}{2}\right)=-(-1)=+1" />. This is the gradient of the <em>tangent</em> at the point.</>,
    more: <>The report notes sign errors when substituting the point, and this double negative is where they happen. The inner value comes from <Katex tex="\sin" /> being odd: <Katex tex="\sin\!\left(-\tfrac{\pi}{2}\right)=-\sin\!\left(\tfrac{\pi}{2}\right)=-1" />.</>,
  },
  {
    working: <Katex display tex="m_{\perp} = -\frac{1}{\frac{\pi}{2}} = -\frac{2}{\pi}" />,
    reason: <>The line perpendicular to the graph (the normal) is perpendicular to the tangent, so <Katex tex="m_1m_2=-1" />: its gradient is the negative <em>reciprocal</em>.</>,
    more: <>The report lists students who found the tangent's gradient or equation instead, who used the reciprocal <Katex tex="\tfrac{2}{\pi}" />, and who used just the negative <Katex tex="-\tfrac{\pi}{2}" />. Only the negative reciprocal passes the check <Katex tex="\tfrac{\pi}{2}\times\left(-\tfrac{2}{\pi}\right)=-1" />.</>,
  },
  {
    working: <Katex display tex="y-\left(-\frac{\pi}{2}\right) = -\frac{2}{\pi}(x-0)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> with the given point and <Katex tex="m_{\perp}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\frac{2x}{\pi}-\frac{\pi}{2}}" />,
    reason: <>Make <Katex tex="y" /> the subject. The question asks for the equation, so don't stop at the gradient.</>,
    more: <>The report notes students who found the gradient of the perpendicular line and did not continue. Any equivalent form is fine, e.g. <Katex tex="4x+2\pi y+\pi^2=0" />.</>,
  },
]

export default function SpecialistQ3_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (4 marks)" always>
        <p>
          Find the equation of the line perpendicular to the graph of{' '}
          <Katex tex="\cos(y)+y\sin(x)=x^2" /> at{' '}
          <Katex tex="\left(0,-\tfrac{\pi}{2}\right)" />.
        </p>
      </Background>
      <Background>
        <p>
          The line perpendicular to a graph at a point is the <em>normal</em>: it is
          perpendicular to the tangent there. Plan: find the tangent gradient{' '}
          <Katex tex="\tfrac{dy}{dx}" /> at the point, turn it into the normal's gradient,
          then write the line through the point.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
      </div>
    </div>
  )
}
