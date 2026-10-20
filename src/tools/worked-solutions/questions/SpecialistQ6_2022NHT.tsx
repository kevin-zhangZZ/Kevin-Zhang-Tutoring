// 2022 Specialist NHT — Exam 2, MCQ 6. The NHT report gives the answer key only, with no
// statistics. Complex numbers: for which real b the cubic 2z³ − 3z² − 12z + b = 0 has one real and
// two (non-real) complex solutions — exactly one x-intercept, so the horizontal line y = −b must
// miss both turning values 7 and −20. Question text transcribed from the original paper. Solution
// is original; the answer E agrees with the report's key. sympy confirms the turning values and
// the repeated roots at b = −7, (z + 1)²(2z − 7), and b = 20, (z − 2)²(2z + 5).
// Interactive diagram (§15): interactives/spec-2022nht-mcq6-level.tsx (this site's own explanatory
// figure) slides the line y = −b across the cubic and counts the real solutions.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const LevelWidget = lazyWidget(() => import('../interactives/spec-2022nht-mcq6-level'))

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2x^3-3x^2-12x=-b" />,
    reason: <>The coefficients are real, so non-real solutions come in conjugate pairs: &ldquo;one real and two complex&rdquo; means <b>exactly one</b> real solution. Real solutions are where the cubic <Katex tex="y=2x^3-3x^2-12x" /> meets the horizontal line <Katex tex="y=-b" />.</>,
    more: <>Moving <Katex tex="b" /> to the other side keeps the cubic fixed and turns <Katex tex="b" /> into the height of a horizontal line, which is much easier to picture than a cubic sliding up and down.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{d}{dx}\left(2x^3-3x^2-12x\right)&=6x^2-6x-12\\ &=6(x-2)(x+1)=0\end{aligned}" />,
    reason: <>Find the turning points: the line meets the cubic three times only if it passes between them.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=-1:&\quad -2-3+12=7\ \ (\text{local max})\\ x=2:&\quad 16-12-24=-20\ \ (\text{local min})\end{aligned}" />,
    reason: <>A positive cubic rises, falls, then rises again, so the first turning point is the maximum and the second the minimum.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&-b>7\ \text{ or }\ -b<-20\\ \iff\ &b<-7\ \text{ or }\ b>20\end{aligned}" />,
    reason: <>The line meets the cubic only once when it is above the local maximum or below the local minimum. Multiplying by <Katex tex="-1" /> reverses each inequality.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&b=-7:\\ &\quad 2z^3-3z^2-12z-7=(z+1)^2(2z-7)\\ &b=20:\\ &\quad 2z^3-3z^2-12z+20=(z-2)^2(2z+5)\end{aligned}" />,
    reason: <>Check the endpoints: there the line just touches a turning point, giving a repeated real root, so all three solutions are real. The endpoints are excluded.</>,
    more: <><Cas fn="factor">factor(2z³−3z²−12z−7)</Cas> confirms the first; <Cas fn="cSolve">cSolve(2z³−3z²−12z+21=0, z)</Cas> (taking <Katex tex="b=21>20" />) shows one real solution and a conjugate pair.</>,
  },
  {
    working: <Katex display tex="\boxed{\{b : b<-7\}\cup\{b : b>20\}}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option D includes <Katex tex="b=-7" /> and <Katex tex="b=20" />, where all three solutions are real. Option C is the opposite case, <Katex tex="-7<b<20" />, which gives three distinct real solutions. Options A and B each give only one of the two pieces.</>,
  },
]

export default function SpecialistQ6_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          The equation <Katex tex="2z^3-3z^2-12z+b=0" />, where <Katex tex="z\in C" /> and <Katex tex="b" /> is a real
          constant, will have one real and two complex solutions for
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\{b : b>20\}" /> only</> },
        { letter: 'B', content: <><Katex tex="\{b : b<-7\}" /> only</> },
        { letter: 'C', content: <Katex tex="\{b : -7<b<20\}" /> },
        { letter: 'D', content: <Katex tex="\{b : b\le-7\}\cup\{b : b\ge20\}" /> },
        { letter: 'E', content: <Katex tex="\{b : b<-7\}\cup\{b : b>20\}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="One real solution means the line y = −b clears both turning points">
          <LevelWidget />
        </Explore>
      }
    />
  )
}
