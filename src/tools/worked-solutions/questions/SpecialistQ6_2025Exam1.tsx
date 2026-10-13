// 2025 Specialist Mathematics — Exam 1 Question 6 (4 marks). A solid of revolution whose
// integral is a reverse chain rule in arctan. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [16, 13, 13, 20, 38],
  average: 2.5,
  comment: (
    <>
      Most students were able to make some progress with this question, recognising that a
      substitution (or integration by parts) would be necessary. Common errors included:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          missing factor of <Katex tex="\pi" /> through working
        </li>
        <li>
          neglecting to adjust the terminals for the definite integral if a substitution was used
        </li>
        <li>
          incorrect terminals for definite integral if a substitution was used
        </li>
        <li>
          algebraic and arithmetic errors.
        </li>
      </ul>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx = \pi\int_1^{\sqrt3}\frac{\arctan(x)}{1+x^2}\,dx" />,
    reason: <>Volume about the <Katex tex="x" />-axis is <Katex tex="\pi\int y^2\,dx" />. Squaring removes the square root straight away.</>,
    more: <>Keep the <Katex tex="\pi" /> out the front on every line from here on. The report lists a missing factor of <Katex tex="\pi" /> among the common errors — usually from writing <Katex tex="\int y^2\,dx" /> on line one, or dropping the <Katex tex="\pi" /> part-way through.</>,
  },
  {
    working: <Katex display tex="\text{let } u = \arctan(x) \implies du = \frac{dx}{1+x^2}" />,
    reason: <>Spot that <Katex tex="\tfrac{1}{1+x^2}" /> is the derivative of <Katex tex="\arctan(x)" />, so <Katex tex="\tfrac{\arctan(x)}{1+x^2}\,dx" /> becomes exactly <Katex tex="u\,du" />.</>,
  },
  {
    working: <Katex display tex="x=1 \implies u = \frac{\pi}{4}; \qquad x=\sqrt3 \implies u = \frac{\pi}{3}" />,
    reason: <>Substitute each <Katex tex="x" />-terminal into <Katex tex="u=\arctan(x)" />: <Katex tex="\arctan(1)=\tfrac{\pi}{4}" /> since <Katex tex="\tan\tfrac{\pi}{4}=1" />, and <Katex tex="\arctan(\sqrt3)=\tfrac{\pi}{3}" />.</>,
    more: <>The report lists two terminal errors among the common errors: neglecting to adjust them (integrating <Katex tex="u\,du" /> from <Katex tex="1" /> to <Katex tex="\sqrt3" />), and adjusting them incorrectly. The new terminals are angles in radians, <Katex tex="\arctan(1)" /> and <Katex tex="\arctan(\sqrt3)" /> — not <Katex tex="45" /> and <Katex tex="60" />, and not <Katex tex="\tan(1)" /> and <Katex tex="\tan(\sqrt3)" />.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_{\pi/4}^{\pi/3}u\,du = \pi\left[\frac{u^2}{2}\right]_{\pi/4}^{\pi/3}" />,
    reason: <>In terms of <Katex tex="u" /> the integral is just <Katex tex="\int u\,du = \tfrac{u^2}{2}" />.</>,
    more: (
      <>
        <p>
          Equivalently, without substituting: the antiderivative is{' '}
          <Katex tex="\tfrac{1}{2}\arctan^2(x)" />, so{' '}
          <Katex tex="V=\tfrac{\pi}{2}\left[\arctan^2(x)\right]_1^{\sqrt3}" /> with the original
          terminals.
        </p>
        <p className="mt-2">
          The report also shows integration by parts. Calling the integral{' '}
          <Katex tex="I" /> and taking <Katex tex="\arctan(x)" /> as the part to differentiate
          gives <Katex tex="I=\left[\arctan^2(x)\right]_1^{\sqrt3}-I" />, so{' '}
          <Katex tex="2I=\tfrac{\pi^2}{9}-\tfrac{\pi^2}{16}" /> — the same answer, but more
          working than the substitution.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{\pi}{2}\left(\frac{\pi^2}{9}-\frac{\pi^2}{16}\right) = \frac{\pi^3}{2}\cdot\frac{16-9}{144}" />,
    reason: <>Squaring the terminals: <Katex tex="\left(\tfrac{\pi}{3}\right)^2=\tfrac{\pi^2}{9}" />, <Katex tex="\left(\tfrac{\pi}{4}\right)^2=\tfrac{\pi^2}{16}" />; then a common denominator of 144.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{7\pi^3}{288} \ \text{ cubic units}}" />,
    reason: <>So <Katex tex="a=7" />, <Katex tex="b=3" />, <Katex tex="c=288" />, all positive integers, as the required form asks.</>,
    more: <>Check: <Katex tex="\tfrac{7\pi^3}{288}\approx 0.754" />, a sensible size: <Katex tex="y" /> falls from about <Katex tex="0.63" /> to <Katex tex="0.51" />, so the solid sits between cylinders of volume <Katex tex="\pi(0.51)^2(\sqrt3-1)\approx0.60" /> and <Katex tex="\pi(0.63)^2(\sqrt3-1)\approx0.91" />.</>,
  },
]

export default function SpecialistQ6_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (4 marks)</p>
        <p>
          Find the volume of the solid of revolution formed when the area between the curve{' '}
          <Katex tex="y=\sqrt{\dfrac{\arctan(x)}{1+x^2}}" /> and the <Katex tex="x" />-axis
          from <Katex tex="x=1" /> to <Katex tex="x=\sqrt3" /> is rotated about the{' '}
          <Katex tex="x" />-axis.
          <br />
          Give your answer in the form{' '}
          <Katex tex="\dfrac{a\pi^b}{c}" />, where <Katex tex="a,b,c\in Z^+" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Squaring <Katex tex="y" /> leaves <Katex tex="\tfrac{\arctan(x)}{1+x^2}" />,
            which is a function multiplied by its own derivative — the pattern that signals
            a substitution. The terminals <Katex tex="1" /> and <Katex tex="\sqrt3" /> are tan of
            standard angles, which is what makes the
            answer a clean multiple of <Katex tex="\pi^3" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={EXAM} maxMarks={4} />
      </div>
    </div>
  )
}
