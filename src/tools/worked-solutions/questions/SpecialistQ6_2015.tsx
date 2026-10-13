// 2015 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 43% correct.
// Identify which relation's graph in the complex plane passes through a given point.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 8, C: 21, D: 16, E: 43 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>A sketch of each shows that option E is the line <Katex tex="x=1" />.</>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="z = 1+2i" />
        <Katex display tex="\implies\; \bar z = 1-2i" />
      </>
    ),
    reason: <>A graph passes through a point exactly when the point satisfies the relation. So substitute <Katex tex="z=1+2i" /> (and its conjugate) into each option.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{A: } z\bar z &= |z|^2 \\ &= 1^2+2^2 \\ &= 5 \ne \sqrt5 \end{aligned}" />,
    reason: <><Katex tex="z\bar z=|z|^2" /> for every <Katex tex="z" />. Here that is <Katex tex="5" />, not <Katex tex="\sqrt5" />.</>,
    more: <>Option A is the circle <Katex tex="|z|^2=\sqrt5" />, i.e. radius <Katex tex="5^{1/4}" />. The trap: <Katex tex="|1+2i|=\sqrt5" />, so it is tempting to match <Katex tex="\sqrt5" /> with the modulus — but <Katex tex="z\bar z" /> is the modulus <em>squared</em>.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{B: } \mathrm{Arg}(1+2i) = \arctan(2) \approx 1.107" />
        <Katex display tex="\tfrac{\pi}{3}\approx1.047 \;\ne\; 1.107" />
      </>
    ),
    reason: <><Katex tex="1+2i" /> is in the first quadrant, so its argument is <Katex tex="\arctan\!\left(\tfrac21\right)" />. That is not <Katex tex="\tfrac\pi3" />.</>,
    more: <>In exact terms, <Katex tex="\tan\tfrac\pi3=\sqrt3\ne2" />. On a rough sketch the ray <Katex tex="\mathrm{Arg}(z)=\tfrac\pi3" /> (<Katex tex="60^\circ" />) passes close to <Katex tex="1+2i" /> (about <Katex tex="63.4^\circ" />), which is why a sketch alone can mislead here.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{C: } |z-1| = |2i| = 2" />
        <Katex display tex="|z-2i| = |1| = 1 \quad (2 \ne 1)" />
      </>
    ),
    reason: <><Katex tex="|z-a|" /> is the distance from <Katex tex="z" /> to <Katex tex="a" />. The point is not equidistant from <Katex tex="1" /> and <Katex tex="2i" />.</>,
    more: <>Option C is the perpendicular bisector of the segment from <Katex tex="1" /> to <Katex tex="2i" />. Expanding <Katex tex="(x-1)^2+y^2=x^2+(y-2)^2" /> gives the line <Katex tex="y=\tfrac x2+\tfrac34" />, and at <Katex tex="x=1" /> that is <Katex tex="y=1.25" />, not <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\text{D: } \mathrm{Re}(z)=1, \qquad 2\,\mathrm{Im}(z) = 4 \quad (1 \ne 4)" />,
    reason: <>Read the relation carefully: it needs the real part to be twice the imaginary part.</>,
    more: <>Here the <em>imaginary</em> part is twice the real part, so <Katex tex="1+2i" /> lies on <Katex tex="\mathrm{Im}(z)=2\,\mathrm{Re}(z)" /> (the line <Katex tex="y=2x" />). Option D is the different line <Katex tex="x=2y" />, i.e. <Katex tex="y=\tfrac x2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{E: } z+\bar z &= (1+2i)+(1-2i) \\ &= 2 \quad \checkmark \end{aligned}" />,
    reason: <>This one holds. In general <Katex tex="z+\bar z = 2\,\mathrm{Re}(z)" />, so E is <Katex tex="\mathrm{Re}(z)=1" />: the vertical line <Katex tex="x=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z+\bar z = 2}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>The report suggests sketching each relation; substituting the point, as above, is quicker and settles every option exactly. Option C (21%) was the most popular wrong answer, probably because <Katex tex="1+2i" /> has real part <Katex tex="1" /> and imaginary part <Katex tex="2" />, so it looks tied equally to <Katex tex="1" /> and <Katex tex="2i" />. The distances in the C row (<Katex tex="2" /> and <Katex tex="1" />) show it is not.</>,
  },
]

export default function SpecialistQ6_2015() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following relations has a graph that passes through the point <Katex tex="1+2i" />{' '}
          in the complex plane?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="z\bar z = \sqrt5" /> },
        { letter: 'B', content: <Katex tex="\mathrm{Arg}(z) = \dfrac{\pi}{3}" /> },
        { letter: 'C', content: <Katex tex="|z-1| = |z-2i|" /> },
        { letter: 'D', content: <Katex tex="\mathrm{Re}(z) = 2\,\mathrm{Im}(z)" /> },
        { letter: 'E', content: <Katex tex="z+\bar z = 2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
