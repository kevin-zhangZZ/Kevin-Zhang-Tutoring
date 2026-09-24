// 2014 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 69% correct.
// The principal argument of a quotient of complex numbers. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 10, C: 69, D: 5, E: 11 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Arg}\!\left(\frac{z_1}{z_2}\right) = \mathrm{Arg}(z_1)-\mathrm{Arg}(z_2)" />,
    reason: <>Dividing subtracts the arguments — no need to carry out the division itself.</>,
  },
  {
    working: <Katex display tex="z_1 = -3\sqrt2-\sqrt6\,i:\quad \tan(\alpha) = \frac{\sqrt6}{3\sqrt2} = \frac{1}{\sqrt3}" />,
    reason: <>The reference angle from the magnitudes of the components: <Katex tex="\tfrac{\sqrt6}{3\sqrt2}=\tfrac{\sqrt3}{3}" />.</>,
  },
  {
    working: <Katex display tex="\text{third quadrant} \implies \mathrm{Arg}(z_1) = -\pi+\tfrac\pi6 = -\tfrac{5\pi}{6}" />,
    reason: <>Both components are negative. Measuring the principal argument clockwise keeps it in <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="z_2 = 2+2i:\quad \mathrm{Arg}(z_2) = \tfrac\pi4" />,
    reason: <>Equal positive components, so <Katex tex="45^\circ" /> in the first quadrant.</>,
  },
  {
    working: <Katex display tex="-\tfrac{5\pi}{6}-\tfrac\pi4 = \frac{-10\pi-3\pi}{12} = -\frac{13\pi}{12}" />,
    reason: <>Which is outside <Katex tex="(-\pi,\pi]" /> — it is option A, the trap for stopping here.</>,
  },
  {
    working: <Katex display tex="-\tfrac{13\pi}{12}+2\pi = \tfrac{11\pi}{12}" />,
    reason: <>Adding a full turn brings it into the principal range.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{11\pi}{12}}" />,
    reason: <>Matches option <b>C</b>. Option A (4%) is the unadjusted <Katex tex="-\tfrac{13\pi}{12}" />; option E (11%) has the right size with the wrong sign. Check: <Katex tex="\tfrac{11\pi}{12}" /> is in the second quadrant, and the quotient <Katex tex="\tfrac{(-3\sqrt2-\sqrt6 i)(2-2i)}{8}" /> has a negative real part and a positive imaginary part ✓.</>,
  },
]

export default function SpecialistQ8_2014() {
  return (
    <MCQShell
      question={
        <p>
          The principal argument of{' '}
          <Katex tex="\dfrac{-3\sqrt2-i\sqrt6}{2+2i}" /> is
        </p>
      }
      background={
        <p>
          The principal argument must land in <Katex tex="(-\pi,\pi]" />. Subtracting two
          arguments can easily fall outside that interval, and adding or subtracting{' '}
          <Katex tex="2\pi" /> to bring it back is the step three of the five options are
          designed to catch.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\tfrac{13\pi}{12}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{7\pi}{12}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{11\pi}{12}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\tfrac{13\pi}{12}" /> },
        { letter: 'E', content: <Katex tex="-\tfrac{11\pi}{12}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
