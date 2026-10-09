// 2023 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 72% correct.
// Counting solutions of cos(x) = k on a closed interval, endpoints included. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 6, C: 14, D: 4, E: 72 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} a+\sec(x) &= 0 \\ \sec(x) &= -a \\ \cos(x) &= -\frac1a \end{aligned}" />,
    reason: <><Katex tex="x" />-intercepts are where <Katex tex="y=0" />. Since <Katex tex="\sec(x)=\tfrac{1}{\cos(x)}" />, taking reciprocals turns this into a cosine equation, whose solutions are easier to count.</>,
    more: <>Taking reciprocals needs <Katex tex="a\ne0" />, but <Katex tex="a=0" /> gives no intercepts anyway, since <Katex tex="\sec(x)" /> is never 0.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \cos(x)=k \text{ on } [-\pi,\pi]: \\ \begin{aligned} -1\le k<1 &:\ \text{2 solutions} \\ k=1 &:\ \text{1 solution} \\ |k|>1 &:\ \text{none} \end{aligned} \end{gathered}" />,
    reason: <>Picture <Katex tex="y=\cos(x)" />: it rises from <Katex tex="-1" /> at <Katex tex="x=-\pi" /> to 1 at <Katex tex="x=0" />, then falls back to <Katex tex="-1" /> at <Katex tex="x=\pi" />. So each level from <Katex tex="-1" /> up to (but not including) 1 is reached once on each side of <Katex tex="x=0" />, while the peak <Katex tex="k=1" /> is reached only at <Katex tex="x=0" />.</>,
    more: <>This is because cosine is even: if <Katex tex="x_0" /> is a solution, so is <Katex tex="-x_0" />, and the two are the same only when <Katex tex="x_0=0" />. (<Katex tex="k=0" /> would give <Katex tex="x=\pm\tfrac\pi2" />, where <Katex tex="\sec(x)" /> isn't defined, but <Katex tex="k=-\tfrac1a" /> is never 0.)</>,
  },
  {
    working: <Katex display tex="k = -\frac1a: \quad |k|\le1 \iff |a|\ge1" />,
    reason: <>For any intercepts at all we need <Katex tex="-1\le k\le1" />, and since <Katex tex="|k|=\tfrac{1}{|a|}" /> this means <Katex tex="|a|\ge1" /> (so <Katex tex="-1<a<1" /> gives none).</>,
  },
  {
    working: <Katex display tex="\begin{gathered} a=-1 \implies k=1: \\ \text{one solution } (x=0) \end{gathered}" />,
    reason: <>Excluded: <Katex tex="\cos(x)=1" /> only at <Katex tex="x=0" />, so there is only one intercept.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} a=1 \implies k=-1: \\ \text{two solutions } (x=\pm\pi) \end{gathered}" />,
    reason: <>Included: <Katex tex="\sec(\pm\pi)=-1" />, so <Katex tex="y=1+\sec(x)" /> is 0 at both endpoints, and the closed interval <Katex tex="-\pi\le x\le\pi" /> includes them.</>,
  },
  {
    working: <Katex display tex="\boxed{a < -1 \ \text{ or } \ a \ge 1}" />,
    reason: <>Matches option <b>E</b>: take <Katex tex="|a|\ge1" /> and remove <Katex tex="a=-1" />.</>,
    more: (
      <>
        <p>
          The asymmetry is the whole question: <Katex tex="a=1" /> works (two intercepts, at the endpoints) and{' '}
          <Katex tex="a=-1" /> does not (one intercept, at <Katex tex="x=0" />). Option <b>C</b>, the most common wrong
          answer, has these the other way round. Option <b>B</b> is exactly the set of values that give no intercepts at
          all, and options <b>A</b> and <b>D</b> sit almost entirely inside it: the only values in them that give any intercepts are{' '}
          <Katex tex="a=1" /> in <b>A</b> (two) and <Katex tex="a=-1" /> in <b>D</b> (one).
        </p>
        <p>
          A graph check: the intercepts are where the horizontal line <Katex tex="y=-a" /> meets{' '}
          <Katex tex="y=\sec(x)" />. On <Katex tex="[-\pi,\pi]" />, <Katex tex="\sec(x)" /> has a U-shaped middle branch
          whose lowest point is 1 (at <Katex tex="x=0" />), and two outer pieces whose highest points are{' '}
          <Katex tex="-1" /> (at the endpoints <Katex tex="x=\pm\pi" />). A line above height 1 (<Katex tex="a<-1" />)
          crosses the U twice; at height 1 (<Katex tex="a=-1" />) it only touches the bottom of the U; between{' '}
          <Katex tex="-1" /> and 1 it misses everything; at height <Katex tex="-1" /> or below (<Katex tex="a\ge1" />)
          it meets each outer piece once.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ3_2023() {
  return (
    <MCQShell
      question={
        <p>
          In the interval <Katex tex="-\pi\le x\le\pi" />, the graph of{' '}
          <Katex tex="y=a+\sec(x)" />, where <Katex tex="a\in R" />, has two{' '}
          <Katex tex="x" />-intercepts when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0\le a\le1" /> },
        { letter: 'B', content: <Katex tex="-1<a<1" /> },
        { letter: 'C', content: <Katex tex="a\le-1 \ \text{ or } \ a>1" /> },
        { letter: 'D', content: <Katex tex="-1\le a<0" /> },
        { letter: 'E', content: <Katex tex="a<-1 \ \text{ or } \ a\ge1" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
