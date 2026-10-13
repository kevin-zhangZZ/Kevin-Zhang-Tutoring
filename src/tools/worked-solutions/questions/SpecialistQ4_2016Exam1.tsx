// 2016 Specialist Mathematics — Exam 1, Question 4 (4 marks). A related-rates chain rule:
// the surface area of a growing cube whose side length is arctan(t). Question text
// transcribed from the original paper (no diagram given). Answer checked with sympy and
// against the VCAA examination report. Solution is original. No lettered parts, so this
// uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [23, 13, 20, 4, 40],
  average: 2.3,
  comment: (
    <>
      Students had mixed success with this question. Quite a few students made errors with
      the formula for the surface area of a cube, including <Katex tex="A=x^2" />,{' '}
      <Katex tex="2x^2" />, <Katex tex="4x^2" /> or more commonly <Katex tex="x^3" />. There
      was some confusion with <Katex tex="t" /> and <Katex tex="x" />, which resulted in a
      denominator <Katex tex="(1+x^2)" /> rather than <Katex tex="(1+t^2)" />. Some found the
      correct derivative using the chain rule but then did not continue by substituting for{' '}
      <Katex tex="t" /> and/or <Katex tex="x" />. Some students did not use the chain rule. A
      few wrote <Katex tex="t=\tan(x)" /> and some progressed successfully from there. Other
      methods were seen, including some students converting completely to the variable{' '}
      <Katex tex="x" />. Some students wrote <Katex tex="\arctan(t)" /> as{' '}
      <Katex tex="\tan^{-1}(t)" /> and then converted this to{' '}
      <Katex tex="\tfrac{1}{\tan(t)}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="A = 6x^2" />,
    reason: <>A cube has six square faces, each <Katex tex="x" /> by <Katex tex="x" />.</>,
    more: <>The report lists four wrong formulas for this one line: <Katex tex="x^2" /> (one face only), <Katex tex="2x^2" />, <Katex tex="4x^2" /> and, most often, <Katex tex="x^3" /> — which is the cube's volume, not its surface area. Saying "six faces, each <Katex tex="x" /> by <Katex tex="x" />" to yourself before writing anything avoids all four.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{dt} = \frac{dA}{dx}\times\frac{dx}{dt}" />,
    reason: <>We want <Katex tex="\tfrac{dA}{dt}" />, but <Katex tex="A" /> is given in terms of <Katex tex="x" />, and <Katex tex="x" /> in terms of <Katex tex="t" />. The chain rule links the two rates.</>,
    more: <>Equivalently, substitute first: <Katex tex="A=6\arctan^2(t)" />, then differentiate with respect to <Katex tex="t" /> — that still needs the chain rule (an outer square, an inner <Katex tex="\arctan" />), and gives the same line 4 below. The report also saw students write <Katex tex="t=\tan(x)" />: then <Katex tex="\tfrac{dt}{dx}=\sec^2(x)=1+\tan^2(x)=1+t^2" />, so <Katex tex="\tfrac{dx}{dt}=\tfrac{1}{1+t^2}" /> — the same result by a longer route. Others worked entirely in <Katex tex="x" />: <Katex tex="\tfrac{dx}{dt}=\tfrac{1}{\sec^2(x)}=\cos^2(x)" />, so <Katex tex="\tfrac{dA}{dt}=12x\cos^2(x)" />; at <Katex tex="t=1" />, <Katex tex="x=\tfrac{\pi}{4}" /> and <Katex tex="\cos^2\tfrac{\pi}{4}=\tfrac{1}{2}" />, giving <Katex tex="12\times\tfrac{\pi}{4}\times\tfrac{1}{2}=\tfrac{3\pi}{2}" /> again.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{dx} = 12x, \qquad \frac{dx}{dt} = \frac{1}{1+t^2}" />,
    reason: <>Power rule for <Katex tex="6x^2" />; the standard result <Katex tex="\tfrac{d}{dt}\arctan(t)=\tfrac{1}{1+t^2}" /> (on the formula sheet).</>,
    more: <>Two traps from the report. First, the derivative of <Katex tex="\arctan(t)" /> is in terms of <Katex tex="t" />: writing <Katex tex="\tfrac{1}{1+x^2}" /> mixes up the two variables. Second, <Katex tex="\arctan(t)=\tan^{-1}(t)" /> means the <em>inverse function</em> of <Katex tex="\tan" />, not the reciprocal <Katex tex="\tfrac{1}{\tan(t)}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dA}{dt} = \frac{12x}{1+t^2} = \frac{12\arctan(t)}{1+t^2}" />,
    reason: <>Multiply the two derivatives, then substitute <Katex tex="x=\arctan(t)" /> so everything is in terms of <Katex tex="t" />.</>,
    more: <>The report notes some students reached this correct derivative and stopped. The question asks for the rate <em>one day after</em> — a number — so you must still substitute <Katex tex="t=1" />.</>,
  },
  {
    working: <Katex display tex="t=1: \quad \frac{dA}{dt} = \frac{12\arctan(1)}{1+1} = \frac{12\times\frac{\pi}{4}}{2}" />,
    reason: <>"One day after" means <Katex tex="t=1" />. <Katex tex="\arctan(1)=\tfrac{\pi}{4}" /> because <Katex tex="\tan\tfrac{\pi}{4}=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dA}{dt} = \frac{3\pi}{2} \text{ mm}^2\text{ per day}}" />,
    reason: <><Katex tex="12\times\tfrac{\pi}{4}=3\pi" />, then halve. Exact answer with the units asked for.</>,
    more: <>Check: <Katex tex="\tfrac{3\pi}{2}\approx4.71" /> mm² per day. From <Katex tex="A=6\arctan^2(t)" />, the surface area is about 3.22 mm² at <Katex tex="t=0.9" /> and 4.16 mm² at <Katex tex="t=1.1" />, so over those 0.2 days it grows at about <Katex tex="\tfrac{4.16-3.22}{0.2}\approx4.7" /> mm² per day, which agrees with the answer.</>,
  },
]

export default function SpecialistQ4_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (4 marks)" always>
        <p>
          Chemicals are added to a container so that a particular crystal will grow in the
          shape of a cube. The side length of the crystal, <Katex tex="x" /> millimetres,{' '}
          <Katex tex="t" /> days after the chemicals were added to the container, is given by{' '}
          <Katex tex="x=\arctan(t)" />.
        </p>
        <p>
          Find the rate at which the surface area, <Katex tex="A" /> square millimetres, of
          the crystal is growing one day after the chemicals were added. Give your answer in
          square millimetres per day.
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
