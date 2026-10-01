// 2022 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 59% correct.
// Which equation's graph meets |z − 5| = 2 at exactly two points. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 9, C: 10, D: 12, E: 59 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z-5|=2 \iff (x-5)^2+y^2=4" />,
    reason: <><Katex tex="|z-5|" /> is the distance from <Katex tex="z" /> to the point <Katex tex="5" />, so this is the circle of radius 2 centred at (5, 0). Its Cartesian form is handy for testing the lines below. Now check each option against this circle in turn.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: } x=3,\ y&>0\\ x=3 \implies (3-5)^2+y^2&=4\\ y&=0 \ \text{(excluded)}\end{aligned}" />,
    reason: <><Katex tex="\mathrm{Arg}(z-3)=\tfrac{\pi}{2}" /> means <Katex tex="z-3" /> points straight up, so <Katex tex="z" /> lies on the vertical half-line above (3, 0). The point (3, 0) itself is not on it, because <Katex tex="\mathrm{Arg}(0)" /> is undefined. The line <Katex tex="x=3" /> touches the circle only at (3, 0), the excluded endpoint, so A meets the circle at 0 points.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B: centre } (1,0),\ r&=2\\ \text{distance between centres}&=5-1\\ &=4=2+2\end{aligned}" />,
    reason: <>Another circle of radius 2. Two circles whose centres are exactly the sum of their radii apart touch from outside at one point, here (3, 0). B: 1 point.</>,
  },
  {
    working: <Katex display tex="\text{C: } y=2 \implies (x-5)^2+4=4 \implies x=5" />,
    reason: <><Katex tex="\mathrm{Im}(z)=2" /> is the horizontal line <Katex tex="y=2" />. It meets the circle only at its top point (5, 2), so it is a tangent. C: 1 point.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{D: } y&=2-x\\ (x-5)^2+(2-x)^2&=4\\ 2x^2-14x+25&=0\\ \Delta=(-14)^2-4(2)(25)&=-4<0\end{aligned}" />,
    reason: <><Katex tex="\mathrm{Re}(z)+\mathrm{Im}(z)=2" /> is the line <Katex tex="x+y=2" />. Substitute it into the circle’s Cartesian equation: each real solution for <Katex tex="x" /> gives an intersection point, and a negative discriminant means there are none. D: 0 points.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{E: centre } (5,5),\ r&=4\\ \text{distance between centres}&=5\\ 4-2<5&<4+2\end{aligned}" />,
    reason: <><Katex tex="|z-(5+5i)|=4" /> is the circle of radius 4 centred at (5, 5). Compare the distance between the centres with the radii 2 and 4: more than <Katex tex="4+2=6" /> and the circles miss; exactly 6 and they touch once; less than <Katex tex="4-2=2" /> and the small circle sits inside the big one. Strictly in between, as here, they cross at two points. (Solving the two Cartesian equations together confirms it: <Katex tex="y=1.3" />, <Katex tex="x=5\pm\sqrt{2.31}" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{|z-5-5i|=4}" />,
    reason: <>Matches option <b>E</b>. Options A–D each meet the circle at most once.</>,
  },
]

export default function SpecialistQ6_2022() {
  return (
    <MCQShell
      question={
        <p>
          Given <Katex tex="z=x+yi" />, where <Katex tex="x,y\in R" /> and <Katex tex="z\in C" />, an
          equation that has a graph that has two points of intersection with the graph given by{' '}
          <Katex tex="|z-5|=2" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\mathrm{Arg}(z-3)=\tfrac{\pi}{2}" /> },
        { letter: 'B', content: <Katex tex="|z-1|=2" /> },
        { letter: 'C', content: <Katex tex="\mathrm{Im}(z)=2" /> },
        { letter: 'D', content: <Katex tex="\mathrm{Re}(z)+\mathrm{Im}(z)=2" /> },
        { letter: 'E', content: <Katex tex="|z-5-5i|=4" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
