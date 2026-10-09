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
    reason: <><Katex tex="|z-5|" /> is the distance from <Katex tex="z" /> to the point <Katex tex="5" />, so this is the circle of radius 2 centred at (5, 0). Now check each option against it.</>,
    more: <>Sketch it first: it runs from <Katex tex="x=3" /> to <Katex tex="x=7" /> along the real axis. For the half-line and the lines (A, C and D), substitute into the Cartesian form and count the real solutions. For the circles (B and E), it is quicker to compare the distance between the centres with the radii.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: } x=3,\ y&>0\\ x=3 \implies (3-5)^2+y^2&=4\\ y&=0 \ \text{(excluded)}\end{aligned}" />,
    reason: <><Katex tex="\mathrm{Arg}(z-3)=\tfrac{\pi}{2}" /> is the vertical half-line going up from (3, 0), not including (3, 0) itself. The line <Katex tex="x=3" /> touches the circle only at (3, 0), so A meets it at 0 points.</>,
    more: <>Why a half-line: <Katex tex="z-3" /> must point straight up, so its real part is 0 and its imaginary part is positive, giving <Katex tex="x=3" />, <Katex tex="y>0" />. The point <Katex tex="z=3" /> is left out because <Katex tex="\mathrm{Arg}(0)" /> is undefined. The line <Katex tex="x=3" /> is a tangent at the circle’s leftmost point, so even if you forgot to exclude the endpoint, A would give 1 point, not 2.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B: centre } (1,0),\ r&=2\\ \text{distance between centres}&=5-1\\ &=4=2+2\end{aligned}" />,
    reason: <>Another circle of radius 2. Its centre is exactly the sum of the radii away, so the two circles touch from outside at one point, (3, 0). B: 1 point.</>,
    more: (
      <>
        <p>
          The general rule for two circles with radii <Katex tex="R\ge r" /> whose centres are a distance{' '}
          <Katex tex="d" /> apart (picture the small circle sliding towards the large one, then over it, to see each case):
        </p>
        <Katex display tex="\begin{array}{ll} d>R+r & \text{0 points (apart)}\\ d=R+r & \text{1 point (touch outside)}\\ R-r<d<R+r & \text{2 points (cross)}\\ d=R-r & \text{1 point (touch inside)}\\ d<R-r & \text{0 points (inside)}\end{array}" />
      </>
    ),
  },
  {
    working: <Katex display tex="\text{C: } y=2 \implies (x-5)^2+4=4 \implies x=5" />,
    reason: <><Katex tex="\mathrm{Im}(z)=2" /> is the horizontal line <Katex tex="y=2" />. It meets the circle only at its top point (5, 2), so it is a tangent. C: 1 point.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{D: } y&=2-x\\ (x-5)^2+(2-x)^2&=4\\ x^2-10x+25+x^2-4x+4&=4\\ 2x^2-14x+25&=0\\ \Delta=(-14)^2-4(2)(25)&=-4<0\end{aligned}" />,
    reason: <><Katex tex="\mathrm{Re}(z)+\mathrm{Im}(z)=2" /> is the line <Katex tex="x+y=2" />. Substitute it into the circle’s Cartesian equation: each real solution for <Katex tex="x" /> gives an intersection point, and a negative discriminant means there are none. D: 0 points.</>,
    more: <>D was the most popular wrong answer (12%). The line passes close to the circle, so on a rough sketch it is easy to think it cuts through. How close? The squared distance from (5, 0) to a point <Katex tex="(x,\,2-x)" /> on the line is <Katex tex="(x-5)^2+(2-x)^2=2x^2-14x+29" />, which is smallest at its turning point <Katex tex="x=3.5" />, where it equals 4.5. So the nearest point of the line, (3.5, −1.5), is <Katex tex="\sqrt{4.5}\approx2.12" /> from the centre: just outside the radius of 2. Here the algebra, not the sketch, has to decide.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{E: centre } (5,5),\ r&=4\\ \text{distance between centres}&=5\\ 4-2<5&<4+2\end{aligned}" />,
    reason: <><Katex tex="|z-(5+5i)|=4" /> is the circle of radius 4 centred at (5, 5). The distance between the centres, 5, is less than the sum of the radii (6) but more than their difference (2), so the circles cross at two points.</>,
    more: <>Solving the two Cartesian equations together confirms it. Subtracting <Katex tex="(x-5)^2+(y-5)^2=16" /> from <Katex tex="(x-5)^2+y^2=4" /> gives <Katex tex="10y-25=-12" />, so <Katex tex="y=1.3" />. Then <Katex tex="(x-5)^2=4-1.69=2.31" />, so <Katex tex="x=5\pm\sqrt{2.31}" />: two points.</>,
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
