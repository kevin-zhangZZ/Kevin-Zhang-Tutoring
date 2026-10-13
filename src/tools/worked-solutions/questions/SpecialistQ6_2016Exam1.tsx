// 2016 Specialist Mathematics — Exam 1, Question 6 (3 marks). A quotient of powers of
// complex numbers, done in polar form. Question text transcribed from the original paper
// (no diagram given). Answer checked with sympy and against the VCAA examination report.
// Solution is original. No lettered parts, so this uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [8, 14, 26, 52],
  average: 2.2,
  comment: (
    <>
      This question was well answered overall. Those students who used polar form tended to
      have greater success than those who tried to solve the equation in Cartesian form and
      often made algebraic or arithmetical errors. It was common for the incorrect argument
      to be used, usually due to the incorrect quadrant but sometimes due to not knowing
      exact values. A sketch may have been helpful. Many sign errors were seen. An elegant
      solution used the fact that the numerator turns out to be four times the square of the
      denominator.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\left|1-\sqrt3i\right| = \sqrt{1+3} = 2, \qquad \operatorname{Arg} = -\frac{\pi}{3}" />,
    reason: <>Reference angle <Katex tex="\tan^{-1}\!\left(\tfrac{\sqrt3}{1}\right)=\tfrac{\pi}{3}" />; the point <Katex tex="(1,-\sqrt3)" /> is in the fourth quadrant, so the argument is negative.</>,
    more: <>The report says a wrong argument was common, usually from the wrong quadrant (here that would be, e.g., <Katex tex="\tfrac{\pi}{3}" /> or <Katex tex="-\tfrac{2\pi}{3}" />), sometimes a wrong exact value, and that a sketch may have helped. A five-second sketch of <Katex tex="1-\sqrt3i" /> as the point <Katex tex="(1,-\sqrt3)" />, right one and down about 1.7, settles the quadrant before any calculator-free trig.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 1-\sqrt3i &= 2\operatorname{cis}\!\left(-\frac{\pi}{3}\right) \\ 1+\sqrt3i &= 2\operatorname{cis}\!\left(\frac{\pi}{3}\right) \end{aligned}" />,
    reason: <>The denominator is the conjugate, so same modulus and opposite argument.</>,
  },
  {
    working: <Katex display tex="\left(1-\sqrt3i\right)^4 = 2^4\operatorname{cis}\!\left(-\frac{4\pi}{3}\right)" />,
    reason: <>De Moivre: raise the modulus to the power, multiply the argument by it.</>,
  },
  {
    working: <Katex display tex="= 16\operatorname{cis}\!\left(\frac{2\pi}{3}\right)" />,
    reason: <>Adding <Katex tex="2\pi" /> brings the argument back into <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="\frac{16\operatorname{cis}\!\left(\frac{2\pi}{3}\right)}{2\operatorname{cis}\!\left(\frac{\pi}{3}\right)} = 8\operatorname{cis}\!\left(\frac{2\pi}{3}-\frac{\pi}{3}\right)" />,
    reason: <>Divide the moduli, subtract the arguments.</>,
  },
  {
    working: <Katex display tex="= 8\operatorname{cis}\!\left(\frac{\pi}{3}\right) = 8\left(\frac12+\frac{\sqrt3}{2}i\right)" />,
    reason: <>Exact values for <Katex tex="\tfrac{\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{4+4\sqrt3\,i}" />,
    reason: <>Expand: <Katex tex="8\times\tfrac12=4" /> and <Katex tex="8\times\tfrac{\sqrt3}{2}=4\sqrt3" />, so <Katex tex="a=4" /> and <Katex tex="b=4\sqrt3" />.</>,
    more: <>Check (catches the sign errors the report mentions): <Katex tex="\left(4+4\sqrt3i\right)\left(1+\sqrt3i\right) = 4+4\sqrt3i+4\sqrt3i-12 = -8+8\sqrt3i" />, and <Katex tex="16\operatorname{cis}\!\left(\tfrac{2\pi}{3}\right) = 16\left(-\tfrac12+\tfrac{\sqrt3}{2}i\right) = -8+8\sqrt3i" /> too. The report's elegant shortcut: <Katex tex="\left(1-\sqrt3i\right)^2 = -2-2\sqrt3i = -2\left(1+\sqrt3i\right)" />, so the numerator is <Katex tex="4\left(1+\sqrt3i\right)^2" />, four times the square of the denominator, and the quotient is <Katex tex="4\left(1+\sqrt3i\right)" /> in one line. Worth spotting, but polar form is the reliable route.</>,
  },
]

export default function SpecialistQ6_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 6 (3 marks)" always>
        <p>
          Write <Katex tex="\dfrac{\left(1-\sqrt3i\right)^4}{1+\sqrt3i}" /> in the form{' '}
          <Katex tex="a+bi" />, where <Katex tex="a" /> and <Katex tex="b" /> are real
          constants.
        </p>
      </Background>
      <Background>
        <p>
          Expanding the fourth power in Cartesian form works (square, then square again),
          but then you still multiply top and bottom by the conjugate of the denominator, and
          every step is a chance for a sign error. Polar form turns the whole thing into
          arithmetic on a modulus and an argument.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
      </div>
    </div>
  )
}
