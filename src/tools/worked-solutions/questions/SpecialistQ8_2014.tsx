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
    working: <Katex display tex="\mathrm{Arg}\!\left(\frac{z_1}{z_2}\right) = \mathrm{Arg}(z_1)-\mathrm{Arg}(z_2) \pm 2k\pi" />,
    reason: <>Let <Katex tex="z_1=-3\sqrt2-\sqrt6\,i" /> (top) and <Katex tex="z_2=2+2i" /> (bottom). Dividing subtracts arguments; a multiple of <Katex tex="2\pi" /> may be needed to land in <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="z_1:\ \tan(\alpha) = \frac{\sqrt6}{3\sqrt2} = \frac{1}{\sqrt3} \implies \alpha = \tfrac\pi6" />,
    reason: <>Reference angle <Katex tex="\alpha" />: <Katex tex="\tan(\alpha)=\tfrac{|\mathrm{Im}|}{|\mathrm{Re}|}" />, ignoring signs (<Katex tex="\tfrac{\sqrt6}{3\sqrt2}=\tfrac{\sqrt3}{3}" />).</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}(z_1) = -\pi+\tfrac\pi6 = -\tfrac{5\pi}{6}" />,
    reason: <>Both parts negative, so third quadrant: go clockwise by <Katex tex="\pi-\alpha" />, giving <Katex tex="\mathrm{Arg}(z_1)=-(\pi-\alpha)" />, which stays in <Katex tex="(-\pi,\pi]" />.</>,
    more: <>Option B, <Katex tex="\tfrac{7\pi}{12}" />, comes from putting <Katex tex="z_1" /> in the second quadrant instead (<Katex tex="\tfrac{5\pi}{6}-\tfrac\pi4=\tfrac{7\pi}{12}" />). A quick sketch of <Katex tex="z_1" /> prevents it: real part negative and imaginary part negative means below-left of the origin.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}(z_2) = \tfrac\pi4" />,
    reason: <>Equal positive parts, so <Katex tex="45^\circ" /> in the first quadrant.</>,
  },
  {
    working: <Katex display tex="-\tfrac{5\pi}{6}-\tfrac\pi4 = \frac{-10\pi-3\pi}{12} = -\frac{13\pi}{12}" />,
    reason: <>Outside <Katex tex="(-\pi,\pi]" />, since <Katex tex="-\tfrac{13\pi}{12} < -\pi" />. Stopping here gives option A.</>,
  },
  {
    working: <Katex display tex="-\tfrac{13\pi}{12}+2\pi = \tfrac{11\pi}{12}" />,
    reason: <>Adding a full turn describes the same direction and brings it into the principal range.</>,
    more: <>Check: <Katex tex="\tfrac{11\pi}{12}" /> is in the second quadrant. Multiplying top and bottom by <Katex tex="2-2i" />, the quotient is <Katex tex="\tfrac{(-6\sqrt2-2\sqrt6)+(6\sqrt2-2\sqrt6)i}{8}" />, which has a negative real part and a positive imaginary part (<Katex tex="6\sqrt2\approx8.5 > 2\sqrt6\approx4.9" />) ✓.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{11\pi}{12}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option A (4%) is the unadjusted <Katex tex="-\tfrac{13\pi}{12}" />. Option D (5%), <Katex tex="\tfrac{13\pi}{12}" />, is <Katex tex="\mathrm{Arg}(z_2)-\mathrm{Arg}(z_1)" />: the subtraction done the wrong way round, and also outside the range. Option E (11%), <Katex tex="-\tfrac{11\pi}{12}" />, is D brought into range: the argument of <Katex tex="\tfrac{z_2}{z_1}" />, not <Katex tex="\tfrac{z_1}{z_2}" />. Option B (10%) is the wrong-quadrant slip noted above.</>,
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
          The principal argument, <Katex tex="\mathrm{Arg}" />, is the one argument in{' '}
          <Katex tex="(-\pi,\pi]" />. Subtracting two principal arguments can land outside
          that interval; adding or subtracting <Katex tex="2\pi" /> (a full turn, same
          direction) brings it back. Two of the options, A and D, are not even in{' '}
          <Katex tex="(-\pi,\pi]" />, so they can be crossed off at once.
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
