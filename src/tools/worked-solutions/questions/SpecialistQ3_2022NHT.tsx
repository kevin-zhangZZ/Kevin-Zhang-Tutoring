// 2022 Specialist NHT — Exam 2, MCQ 3. The NHT report gives the answer key only, with no
// statistics. Functions: the graph of the relation x + |2y| = 4 is two half-lines meeting at
// (4, 0); with the y-axis they enclose a triangle of area 8. Question text transcribed from the
// original paper (VCAA printed no figure). The sketch in the working,
// spec-2022nht-mcq3-region.png, is this site's own explanatory figure (matplotlib), not VCAA's.
// Solution is original; the answer C agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import regionSrc from './spec-2022nht-mcq3-region.png'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x=4-2|y|=\begin{cases}4-2y, & y\ge0\\ 4+2y, & y<0\end{cases}" />,
    reason: <>Make <Katex tex="x" /> the subject (<Katex tex="|2y|=2|y|" />), then split the modulus by the sign of <Katex tex="y" />. Each piece is a straight line.</>,
    more: <>Replacing <Katex tex="y" /> by <Katex tex="-y" /> leaves <Katex tex="|2y|" /> unchanged, so the graph is symmetric about the <Katex tex="x" />-axis: the lower piece is the mirror image of the upper one.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=0:&\ \ 2|y|=4\implies y=\pm2\\ y=0:&\ \ x=4\end{aligned}" />,
    reason: <>The corners of the region: where the graph meets the <Katex tex="y" />-axis, and the point where the two pieces join.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={regionSrc} alt="This site's own sketch of x + |2y| = 4: two half-lines meeting at (4, 0) and crossing the y-axis at (0, 2) and (0, −2), with the triangle they enclose with the y-axis shaded" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <>The enclosed region is the triangle with vertices <Katex tex="(0,2)" />, <Katex tex="(0,-2)" /> and <Katex tex="(4,0)" />.</>,
  },
  {
    working: <Katex display tex="A=\tfrac12\times\underbrace{4}_{\text{base}}\times\underbrace{4}_{\text{height}}=8" />,
    reason: <>Take the side on the <Katex tex="y" />-axis, from <Katex tex="-2" /> to <Katex tex="2" />, as the base (length <Katex tex="4" />); the height is the distance from there to <Katex tex="(4,0)" />, also <Katex tex="4" />.</>,
    more: <>As an integral: <Katex tex="2\int_0^2(4-2y)\,dy=2\left[4y-y^2\right]_0^2=2\times4=8" />, the strip from the <Katex tex="y" />-axis to the line, doubled for the half below the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\boxed{8}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option B, <Katex tex="4" />, is only the half above the <Katex tex="x" />-axis. Option D, <Katex tex="16" />, is the area for <Katex tex="x+|y|=4" />, which meets the <Katex tex="y" />-axis at <Katex tex="\pm4" />: dropping the <Katex tex="2" /> doubles the base.</>,
  },
]

export default function SpecialistQ3_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          The area of the region, in square units, enclosed by the graph of the relation with rule{' '}
          <Katex tex="x+|2y|=4" /> and the <Katex tex="y" />-axis is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="8" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="16" /> },
        { letter: 'E', content: <Katex tex="32" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
