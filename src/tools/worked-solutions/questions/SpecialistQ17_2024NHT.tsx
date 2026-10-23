// 2024 Specialist NHT — Exam 2, MCQ 17. The NHT report gives the answer key only, with no
// statistics. Vectors: the angle between a line and a plane is 90° minus the angle between the
// line's direction and the plane's normal. Question text transcribed from the original paper.
// Solution is original; the answer A agrees with the report's key. sympy: the angle between
// (√2, 1, 1) and (√2, −1, 1) is π/3, so the line meets the plane at π/6.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const v = (s: string) => `\\underset{\\sim}{${s}}`
const I = v('i'), J = v('j'), K = v('k'), D = v('d'), N = v('n'), R = v('r')

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex={`${D}=\\sqrt2\\,${I}+${J}+${K},\\qquad ${N}=\\sqrt2\\,${I}-${J}+${K}`} />,
    reason: <>The line&apos;s direction is the vector multiplying <Katex tex="t" />. A normal to the plane <Katex tex="ax+by+cz=k" /> is <Katex tex={`a${I}+b${J}+c${K}`} />, read off the coefficients.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}${D}\\cdot${N}&=2-1+1=2\\\\ |${D}|=|${N}|&=\\sqrt{2+1+1}=2\\end{aligned}`} />,
    reason: <>The scalar product and both magnitudes.</>,
  },
  {
    working: <Katex display tex={`\\cos\\alpha=\\frac{${D}\\cdot${N}}{|${D}||${N}|}=\\frac{2}{2\\times2}=\\frac12\\implies\\alpha=\\frac{\\pi}{3}`} />,
    reason: <>This <Katex tex="\alpha" /> is the angle between the line and the <b>normal</b>, not the plane itself.</>,
    more: <>The normal sticks straight out of the plane. A line lying in the plane would be at <Katex tex="\tfrac{\pi}{2}" /> to the normal, and a line perpendicular to the plane would be at 0 to it. So the angle to the plane is what is left over from <Katex tex="\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="\theta=\frac{\pi}{2}-\frac{\pi}{3}=\frac{\pi}{6}" />,
    reason: <>The angle between a line and a plane is the complement of the angle between the line and the normal.</>,
    more: <>Equivalently, <Katex tex={`\\sin\\theta=\\dfrac{|${D}\\cdot${N}|}{|${D}||${N}|}=\\tfrac12`} />. The point <Katex tex="(2,-1,3)" /> on the line plays no part: only directions decide the angle.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta=\frac{\pi}{6}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>C</b>, <Katex tex="\tfrac{\pi}{3}" />, is the angle between the line and the normal, stopping one step short.</>,
  },
]

export default function SpecialistQ17_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The angle at which the line with
          equation <Katex tex={`${R}(t)=2${I}-${J}+3${K}+t\\left(\\sqrt2\\,${I}+${J}+${K}\\right),\\ t\\in R`} />, intersects
          the plane with equation <Katex tex="\sqrt2\,x-y+z=3" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\pi}{6}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{4}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{\pi}{3}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{3\pi}{4}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{2\pi}{3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
